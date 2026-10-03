function text(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function focusOrigin(focus) {
  const map = {
    center: [50, 50],
    left: [32, 50],
    right: [68, 50],
    'upper-left': [32, 34],
    'upper-center': [50, 34],
    'upper-right': [68, 34],
    'lower-left': [32, 66],
    'lower-center': [50, 66],
    'lower-right': [68, 66]
  };
  return map[focus] ?? map.center;
}

export function validateDirectionProject({ meta, mapping, colorArc, policy } = {}) {
  const errors = [];
  if (!meta || Number(meta.directionQualityGateVersion ?? 0) < 1) return { passed: true, errors };
  const images = Array.isArray(mapping?.images) ? mapping.images : [];
  const colorPolicy = policy?.colorWorldArc ?? {};
  const pacing = policy?.semanticPacing ?? {};
  const motion = policy?.motionDirector ?? {};

  if (!colorArc || colorArc.status !== 'READY') errors.push('COLOR_WORLD_ARC.json muss READY sein.');
  const sections = Array.isArray(colorArc?.sections) ? colorArc.sections : [];
  const minSections = Number(colorPolicy.minimumSections ?? 3);
  const maxSections = Number(colorPolicy.maximumSections ?? 7);
  if (sections.length < minSections || sections.length > maxSections) errors.push(`COLOR_WORLD_ARC braucht ${minSections}–${maxSections} Story-Abschnitte.`);

  const sectionById = new Map();
  for (const section of sections) {
    for (const field of colorPolicy.requiredSectionFields ?? []) {
      if (field === 'startImage' || field === 'endImage') continue;
      if (!text(section?.[field])) errors.push(`COLOR_WORLD_ARC: ${field} fehlt in Abschnitt ${section?.id ?? '?'}.`);
    }
    const start = Number(section?.startImage);
    const end = Number(section?.endImage);
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start) errors.push(`COLOR_WORLD_ARC: ungültiger Bildbereich in Abschnitt ${section?.id ?? '?'}.`);
    if (text(section?.id)) sectionById.set(section.id, section);
  }

  if (colorPolicy.adjacentSectionsMustDiffer === true) {
    for (let i = 1; i < sections.length; i += 1) {
      const prev = sections[i - 1];
      const curr = sections[i];
      const same = text(prev.paletteBias) === text(curr.paletteBias)
        && text(prev.lighting) === text(curr.lighting)
        && text(prev.atmosphere) === text(curr.atmosphere);
      if (same) errors.push(`COLOR_WORLD_ARC: Abschnitte ${prev.id} und ${curr.id} unterscheiden sich visuell nicht.`);
    }
  }

  const allowedImportance = new Set(pacing.allowedBeatImportance ?? []);
  const allowedMotionTypes = new Set(motion.allowedTypes ?? []);
  const allowedDirections = new Set(motion.allowedDirections ?? []);
  const allowedIntensities = new Set(motion.allowedIntensities ?? []);
  const allowedFocuses = new Set(motion.allowedFocuses ?? []);
  const hardMin = Number(pacing.hardMinimumSeconds ?? 2.2);
  const preferredMax = Number(pacing.preferredMaximumSeconds ?? 4.5);
  const emphasisMax = Number(pacing.emphasisMaximumSeconds ?? 5.5);
  const absoluteMax = Number(pacing.absoluteMaximumSeconds ?? 6);
  const longAllowed = new Set(pacing.longHoldAllowedBeatImportance ?? ['emphasis', 'reveal', 'payoff']);

  let staticCount = 0;
  let moderateCount = 0;
  let sameMotionRun = 0;
  let previousMotion = null;

  for (let index = 0; index < images.length; index += 1) {
    const image = images[index];
    const number = Number(image.imageNumber ?? index + 1);
    const sectionId = text(image.colorArcSection);
    const section = sectionById.get(sectionId);
    if (!sectionId) errors.push(`Bild ${number}: colorArcSection fehlt.`);
    else if (!section) errors.push(`Bild ${number}: colorArcSection ${sectionId} existiert nicht in COLOR_WORLD_ARC.json.`);
    else if (number < Number(section.startImage) || number > Number(section.endImage)) errors.push(`Bild ${number}: liegt außerhalb des Bereichs von Color-Arc-Abschnitt ${sectionId}.`);

    if (!text(image.worldLifeDetail)) errors.push(`Bild ${number}: worldLifeDetail fehlt.`);
    if (!text(image.holdReason)) errors.push(`Bild ${number}: holdReason fehlt.`);

    const importance = text(image.beatImportance);
    if (!allowedImportance.has(importance)) errors.push(`Bild ${number}: beatImportance ist ungültig oder fehlt.`);
    const planned = Number(image.plannedHoldSeconds);
    if (!Number.isFinite(planned)) errors.push(`Bild ${number}: plannedHoldSeconds fehlt.`);
    else {
      if (planned < hardMin) errors.push(`Bild ${number}: geplanter Hold ${planned}s liegt unter Hard-Min ${hardMin}s.`);
      if (planned > absoluteMax) errors.push(`Bild ${number}: geplanter Hold ${planned}s überschreitet ${absoluteMax}s.`);
      if (planned > preferredMax && !longAllowed.has(importance)) errors.push(`Bild ${number}: ${planned}s sind für beatImportance=${importance} zu lang.`);
      if (planned > emphasisMax && !text(image.holdReason)) errors.push(`Bild ${number}: Hold über ${emphasisMax}s braucht eine konkrete Begründung.`);
    }

    const type = text(image.motionType);
    const direction = text(image.motionDirection);
    const intensity = text(image.motionIntensity);
    const focus = text(image.motionFocus);
    if (!allowedMotionTypes.has(type)) errors.push(`Bild ${number}: motionType ist ungültig oder fehlt.`);
    if (!allowedDirections.has(direction)) errors.push(`Bild ${number}: motionDirection ist ungültig oder fehlt.`);
    if (!allowedIntensities.has(intensity)) errors.push(`Bild ${number}: motionIntensity ist ungültig oder fehlt.`);
    if (!allowedFocuses.has(focus)) errors.push(`Bild ${number}: motionFocus ist ungültig oder fehlt.`);
    if (!text(image.motionReason)) errors.push(`Bild ${number}: motionReason fehlt.`);
    if (type === 'static') {
      staticCount += 1;
      if (direction !== 'none' || intensity !== 'none') errors.push(`Bild ${number}: static benötigt motionDirection=none und motionIntensity=none.`);
    } else {
      if (intensity === 'none') errors.push(`Bild ${number}: bewegte Szene darf nicht motionIntensity=none verwenden.`);
      if (type === 'pan' && direction === 'none') errors.push(`Bild ${number}: pan benötigt eine Richtung.`);
    }
    if (intensity === 'moderate') moderateCount += 1;
    if (type && type === previousMotion) sameMotionRun += 1;
    else sameMotionRun = type ? 1 : 0;
    previousMotion = type || null;
    if (sameMotionRun > Number(motion.maximumConsecutiveSameMotionType ?? 2)) errors.push(`Bild ${number}: motionType ${type} wird zu oft hintereinander wiederholt.`);
  }

  if (images.length) {
    const staticShare = staticCount / images.length;
    const moderateShare = moderateCount / images.length;
    if (staticShare < Number(motion.minimumStaticShare ?? 0.2) || staticShare > Number(motion.maximumStaticShare ?? 0.35)) {
      errors.push(`Motion Director: static-Anteil ${(staticShare * 100).toFixed(1)}% liegt außerhalb des erlaubten Bereichs.`);
    }
    if (moderateShare > Number(motion.maximumModerateShare ?? 0.25)) errors.push(`Motion Director: moderate-Anteil ${(moderateShare * 100).toFixed(1)}% ist zu hoch.`);
  }

  if (colorPolicy.sectionsMustCoverAllImages === true && images.length) {
    for (let number = 1; number <= images.length; number += 1) {
      const matches = sections.filter((section) => number >= Number(section.startImage) && number <= Number(section.endImage));
      if (matches.length !== 1) errors.push(`COLOR_WORLD_ARC: Bild ${number} muss von exakt einem Abschnitt abgedeckt sein; aktuell ${matches.length}.`);
    }
  }

  return { passed: errors.length === 0, errors };
}

export function buildMotionFromScene(scene, durationSeconds) {
  const type = text(scene?.motionType) || 'static';
  const direction = text(scene?.motionDirection) || 'none';
  const intensity = text(scene?.motionIntensity) || 'none';
  const focus = text(scene?.motionFocus) || 'center';
  const duration = Math.max(0.1, Number(durationSeconds) || 0.1);
  const [originX, originY] = focusOrigin(focus);

  if (type === 'static' || intensity === 'none') {
    return { type: 'static', direction: 'none', intensity: 'none', focus, originX, originY, scaleFrom: 1.015, scaleTo: 1.015, xFrom: 0, xTo: 0, yFrom: 0, yTo: 0 };
  }

  const zoomRate = intensity === 'moderate' ? 0.005 : 0.0035;
  const panRate = intensity === 'moderate' ? 2.3 : 1.5;
  const zoomDelta = clamp(zoomRate * duration, 0.008, intensity === 'moderate' ? 0.028 : 0.018);
  const panDistance = clamp(panRate * duration, 3, intensity === 'moderate' ? 12 : 8);
  let scaleFrom = 1.018;
  let scaleTo = 1.018;
  let xFrom = 0;
  let xTo = 0;
  let yFrom = 0;
  let yTo = 0;

  if (type === 'push-in') {
    scaleFrom = 1.012;
    scaleTo = 1.012 + zoomDelta;
  } else if (type === 'pull-out') {
    scaleFrom = 1.012 + zoomDelta;
    scaleTo = 1.012;
  } else if (type === 'pan' || type === 'drift') {
    scaleFrom = type === 'drift' ? 1.018 : 1.025;
    scaleTo = type === 'drift' ? 1.018 + zoomDelta * 0.45 : 1.025;
    const half = panDistance / 2;
    if (direction === 'left') { xFrom = half; xTo = -half; }
    if (direction === 'right') { xFrom = -half; xTo = half; }
    if (direction === 'up') { yFrom = half; yTo = -half; }
    if (direction === 'down') { yFrom = -half; yTo = half; }
  }

  return { type, direction, intensity, focus, originX, originY, scaleFrom, scaleTo, xFrom, xTo, yFrom, yTo };
}

export function injectDirectionIntoPrompt(prompt, mapping, colorArc) {
  let output = String(prompt ?? '');
  const sections = new Map((colorArc?.sections ?? []).map((section) => [section.id, section]));
  for (const scene of mapping?.images ?? []) {
    const number = String(scene.imageNumber).padStart(2, '0');
    const marker = `BILD ${number}\n`;
    const section = sections.get(scene.colorArcSection);
    if (!section || !output.includes(marker)) continue;
    const instruction = `COLOR / WORLD ARC — HARD: section ${section.id}. Story function: ${section.storyFunction}. Palette bias: ${section.paletteBias}. Lighting: ${section.lighting}. Atmosphere: ${section.atmosphere}. Lived-in world cues for this section: ${section.worldLife}. Contrast purpose: ${section.contrastPurpose}. SCENE LIFE DETAIL — HARD: ${scene.worldLifeDetail}. Preserve the channel drawing style, but do not flatten every scene into the same beige-blue palette, horizon height, weather or light.\n`;
    output = output.replace(marker, `${marker}${instruction}`);
  }
  return output;
}
