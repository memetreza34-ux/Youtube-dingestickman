const REQUIRED_SCENE_FIELDS = [
  'viewerTakeaway',
  'visualPurpose',
  'topicAnchor',
  'visualForm',
  'visualConcept',
  'dominantSubject',
  'actionState',
  'composition',
  'camera',
  'depthPlan',
  'lightingMood',
  'continuityNote',
  'historicalAccuracyNote'
];

const VISUAL_FORM_GUARDS = {
  comparison: 'Keep both comparison poles visible in the same frame and clearly opposed through space, scale, state or placement.',
  'cause-effect': 'Make the cause and its consequence visibly connected in one readable composition instead of showing only one side of the relationship.',
  'process-sequence': 'Make the changed state immediately readable and preserve the established place and near-same viewpoint when continuity improves the comparison.',
  'system-hierarchy': 'Express the hierarchy through physical height, distance, routes, grouping or spatial relationships; do not use corporate arrows or diagram boxes.',
  'battle-city-overview': 'Keep the spatial situation as the main idea; use the overview to show positions, routes, barriers or encirclement rather than turning it into a character close-up.',
  'object-focus': 'Let the main object carry the statement through scale, state and context; keep the background quiet and secondary.',
  'character-scene': 'Let posture, action, gaze or relationship between people communicate the point; do not use figures as passive decoration.'
};

function text(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function sentence(value) {
  const clean = text(value).replace(/\s+/g, ' ');
  if (!clean) return '';
  return /[.!?]$/.test(clean) ? clean : `${clean}.`;
}

function listSentence(items, fallback = '') {
  if (!Array.isArray(items) || !items.length) return fallback;
  const clean = items.map((item) => text(item)).filter(Boolean);
  if (!clean.length) return fallback;
  if (clean.length === 1) return clean[0];
  if (clean.length === 2) return `${clean[0]} and ${clean[1]}`;
  return `${clean.slice(0, -1).join(', ')}, and ${clean.at(-1)}`;
}

function containsPlaceholder(value) {
  return /\[[^\]]+\]|TODO|TBD|PLACEHOLDER|UNSET/i.test(String(value ?? ''));
}

export function validateStyleLock(styleLock, expectedStyleId) {
  if (!styleLock || typeof styleLock !== 'object') throw new Error('Flow Style Lock fehlt.');
  if (styleLock.status !== 'READY') throw new Error('Flow Style Lock ist nicht READY.');
  if (!text(styleLock.styleId)) throw new Error('Flow Style Lock enthält keine styleId.');
  if (expectedStyleId && styleLock.styleId !== expectedStyleId) {
    throw new Error(`Flow Style Lock styleId ${styleLock.styleId} passt nicht zu ${expectedStyleId}.`);
  }
  if (!text(styleLock.masterStylePrompt) || !text(styleLock.sceneStyleAnchor) || !text(styleLock.globalNegativePrompt)) {
    throw new Error('Flow Style Lock ist unvollständig: masterStylePrompt, sceneStyleAnchor und globalNegativePrompt sind Pflicht.');
  }
}

export function buildWorldLockText(worldLock) {
  if (!worldLock || typeof worldLock !== 'object') throw new Error('FLOW_WORLD_LOCK.json fehlt oder ist ungültig.');
  if (worldLock.status !== 'READY') throw new Error('FLOW_WORLD_LOCK.json muss vor dem Prompt-Build auf READY stehen.');

  const settingName = text(worldLock.settingName);
  const settingDescription = text(worldLock.settingDescription);
  const timeWeatherLogic = text(worldLock.timeWeatherLogic);
  if (!settingName || !settingDescription || containsPlaceholder(settingName) || containsPlaceholder(settingDescription)) {
    throw new Error('FLOW_WORLD_LOCK.json braucht settingName und settingDescription ohne Platzhalter.');
  }

  const parts = [
    `Keep one consistent interpretation of ${settingName} throughout this video.`,
    sentence(settingDescription)
  ];

  const places = listSentence(worldLock.recurringPlaces);
  if (places) parts.push(`Recurring places must remain visually identical in silhouette, layout and defining features: ${places}.`);

  const characters = listSentence(worldLock.recurringCharacters);
  if (characters) parts.push(`Recurring characters must keep the same face construction, hair, clothing and identifying props: ${characters}.`);

  const props = listSentence(worldLock.recurringProps);
  if (props) parts.push(`Recurring props must keep the same design and base colors: ${props}.`);

  const palette = listSentence(worldLock.basePalette);
  if (palette) parts.push(`Use this video-world palette as the local color bias while staying inside the channel palette: ${palette}.`);

  if (timeWeatherLogic) parts.push(sentence(`Time and weather continuity: ${timeWeatherLogic}`));

  const rules = Array.isArray(worldLock.continuityRules)
    ? worldLock.continuityRules.map((item) => sentence(item)).filter(Boolean)
    : [];
  parts.push(...rules);

  return parts.filter(Boolean).join(' ');
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function findHighRiskPromptWords(scene, styleLock) {
  const haystack = REQUIRED_SCENE_FIELDS.map((field) => text(scene?.[field])).join(' ').toLowerCase();
  const words = Array.isArray(styleLock?.highRiskPromptWords) ? styleLock.highRiskPromptWords : [];

  return words.filter((word) => {
    const needle = String(word ?? '').trim().toLowerCase();
    if (!needle) return false;
    const escaped = escapeRegex(needle).replace(/\s+/g, '\\s+');
    const pattern = new RegExp(`(^|[^a-z0-9])${escaped}($|[^a-z0-9])`, 'i');
    return pattern.test(haystack);
  });
}

export function compileScenePrompt(scene, { styleLock, coverText = '', isCover = false } = {}) {
  validateStyleLock(styleLock, styleLock?.styleId);
  for (const field of REQUIRED_SCENE_FIELDS) {
    if (!text(scene?.[field]) || containsPlaceholder(scene[field])) {
      throw new Error(`${field} fehlt oder enthält einen Platzhalter bei Bild ${scene?.imageNumber ?? '?'}.`);
    }
  }

  const supporting = Array.isArray(scene.supportingElements)
    ? scene.supportingElements.map((item) => text(item)).filter(Boolean)
    : [];
  if (supporting.length > 3) throw new Error(`Bild ${scene.imageNumber ?? '?'} hat mehr als drei Supporting Elements.`);

  const score = Number(scene.promptQcScore);
  if (!Number.isFinite(score) || score < 8 || score > 10) {
    throw new Error(`Bild ${scene.imageNumber ?? '?'} braucht promptQcScore 8–10 vor dem Build.`);
  }

  const risky = findHighRiskPromptWords(scene, styleLock);
  if (risky.length) {
    throw new Error(`Bild ${scene.imageNumber ?? '?'} enthält Style-Drift-Risikowörter: ${risky.join(', ')}. Formuliere konkret statt mit generischen Stilwörtern.`);
  }

  const parts = [
    sentence(styleLock.sceneStyleAnchor),
    sentence(scene.visualConcept),
    sentence(`Make ${scene.dominantSubject} the unmistakable dominant subject; ${scene.actionState}`),
    sentence(scene.composition),
    sentence(`Use ${scene.camera}`),
    sentence(`Organize depth as follows: ${scene.depthPlan}`),
    sentence(`Lighting and mood: ${scene.lightingMood}`)
  ];

  if (supporting.length) {
    parts.push(sentence(`Limit supporting context to ${listSentence(supporting)}; each must remain secondary to the dominant subject`));
  }

  const guard = VISUAL_FORM_GUARDS[text(scene.visualForm)];
  if (guard) parts.push(sentence(guard));

  parts.push(sentence(scene.continuityNote));
  parts.push(sentence(scene.historicalAccuracyNote));

  if (isCover) {
    const exactCover = text(coverText);
    if (!exactCover || containsPlaceholder(exactCover)) throw new Error('Cover-Text fehlt oder enthält einen Platzhalter.');
    parts.push(`Integrate exactly this German cover text: "${exactCover}". Make it large, correctly spelled and immediately readable in a calm high-contrast area without covering the dominant subject. No second text line, no logo, no image number and no pseudo-text.`);
  } else {
    parts.push('No visible text, labels, letters, numbers, logos, watermarks or pseudo-writing anywhere in the image.');
  }

  return parts.filter(Boolean).join(' ');
}

export function compileFlowPrompt({ meta, mapping, styleLock, worldLock }) {
  validateStyleLock(styleLock, meta?.visualStyleId);
  if (!meta || typeof meta !== 'object') throw new Error('video.json fehlt.');
  if (!mapping || !Array.isArray(mapping.images) || !mapping.images.length) throw new Error('BILD_AUDIO_ZUORDNUNG.json enthält keine Bilder.');

  const expectedCount = Number(meta.plannedImageCount);
  if (!Number.isInteger(expectedCount) || expectedCount !== mapping.images.length) {
    throw new Error(`plannedImageCount (${meta.plannedImageCount}) passt nicht zur Mapping-Länge (${mapping.images.length}).`);
  }

  const coverText = text(meta.coverPolicy?.coverText);
  const worldText = buildWorldLockText(worldLock);
  const styleReferenceInstruction = text(styleLock.referencePolicy?.instruction);
  const title = text(meta.title);
  const topic = text(meta.topic);
  const aspectRatio = text(meta.aspectRatio) || '16:9';

  const imageBlocks = mapping.images.map((scene, index) => {
    const expectedNumber = index + 1;
    if (Number(scene.imageNumber) !== expectedNumber) throw new Error(`Bildnummern sind nicht lückenlos bei ${expectedNumber}.`);
    const marker = `BILD ${String(expectedNumber).padStart(2, '0')}`;
    return `${marker}\n${compileScenePrompt(scene, { styleLock, coverText, isCover: expectedNumber === 1 })}`;
  });

  const finalImage = String(mapping.images.length).padStart(2, '0');
  const referenceBlock = styleReferenceInstruction
    ? `\nSTYLE REFERENCES / INGREDIENTS:\n${styleReferenceInstruction}\n`
    : '';

  return `ACTIVE_STYLE_ID: ${styleLock.styleId}\nPROMPT_SYSTEM: flow-compiler-v3\n\nGOOGLE FLOW MASTER PROMPT — ${title}\n\nCreate ${mapping.images.length} separate ${aspectRatio} historical explainer illustrations for one coherent German YouTube video. Topic: ${topic}\n\nCHANNEL STYLE — IMMUTABLE:\n${styleLock.masterStylePrompt}\n\nSTYLE CONSISTENCY RULE:\nThe CHANNEL STYLE is a hard rendering lock, not a suggestion. Scene content, era, weather, camera and mood may change, but linework, figure construction, flat-color rendering, cel shading, texture and detail hierarchy must not drift. Every BILD block below repeats a compact locked-style anchor on purpose.\n${referenceBlock}\nVIDEO WORLD LOCK — IMMUTABLE WITHIN THIS VIDEO:\n${worldText}\n\nCOVER TEXT:\nUse exactly this German cover text on every Bild-01 candidate: "${coverText}". Keep it large, correctly spelled and immediately readable with strong contrast. Never cover the dominant subject.\n\n${imageBlocks.join('\n\n')}\n\nGLOBAL NEGATIVE STYLE RULE:\n${styleLock.globalNegativePrompt}\n\nGLOBAL COMPOSITION RULES:\nOne image equals one immediately readable visual idea. Use one deliberately dominant subject and no more than three necessary supporting elements. Preserve the planned spatial relationship, camera, depth, state/action, continuity and historical constraint from each BILD block. Do not turn the scene into a collage, museum board, textbook poster, crowded wimmelbild or generic object inventory.\n\nTEXT RULE:\nBILD 01 must contain exactly "${coverText}". BILD 02 through BILD ${finalImage} contain no visible text. Never invent labels, English words, pseudo-writing, logos, watermarks or image numbers.\n\nGENERATION WORKFLOW — MANDATORY TWO-STAGE GATE:\nSTAGE 1 — COVER ONLY\n- Generate exactly THREE alternatives for BILD 01.\n- All three must use exactly the same cover text "${coverText}".\n- Reject and regenerate any candidate with missing, misspelled or poorly readable cover text.\n- After three acceptable candidates exist, STOP.\n- Do not generate BILD 02–${finalImage}.\n- Do not choose a winner. Wait for the user's explicit cover selection.\n\nSTAGE 2 — ONLY AFTER USER SELECTION\n- The selected cover becomes Bild 01.png.\n- Keep the CHANNEL STYLE and VIDEO WORLD LOCK unchanged.\n- Use the selected cover as an additional continuity reference, not as permission to alter the locked style.\n- Only then generate BILD 02 through BILD ${finalImage}, once each.\n- Maximum five active generations at once.\n- Final image folder contains only Bild 01.png through Bild ${finalImage}.png.\n`;
}
