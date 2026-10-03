function text(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function validScore(value, minimum) {
  const score = Number(value);
  return Number.isFinite(score) && score >= minimum && score <= 10;
}

export function validateNarrationAlignmentScene(scene, { imageNumber, policy, script } = {}) {
  const errors = [];
  const number = imageNumber ?? scene?.imageNumber ?? '?';
  const required = Array.isArray(policy?.requiredSceneFields) ? policy.requiredSceneFields : [];

  for (const field of required) {
    if (field === 'chronologyStep' || field === 'narrationMatchScore' || field === 'clarityScore') continue;
    if (!text(scene?.[field])) errors.push(`${field} fehlt bei Bild ${number}.`);
  }

  const step = Number(scene?.chronologyStep);
  if (!Number.isInteger(step) || step < 1) errors.push(`chronologyStep bei Bild ${number} muss eine ganze Zahl >= 1 sein.`);

  const narrationMinimum = Number(policy?.minimumNarrationMatchScore ?? 9);
  if (!validScore(scene?.narrationMatchScore, narrationMinimum)) {
    errors.push(`narrationMatchScore bei Bild ${number} muss mindestens ${narrationMinimum}/10 sein.`);
  }

  const clarityMinimum = Number(policy?.minimumClarityScore ?? 8);
  if (!validScore(scene?.clarityScore, clarityMinimum)) {
    errors.push(`clarityScore bei Bild ${number} muss mindestens ${clarityMinimum}/10 sein.`);
  }

  const narrationBeat = text(scene?.narrationBeat);
  if (policy?.requireExactNarrationBeatFromScript === true && narrationBeat && typeof script === 'string' && !script.includes(narrationBeat)) {
    errors.push(`narrationBeat von Bild ${number} kommt nicht exakt im Voice-over-Skript vor.`);
  }

  const visualAnswer = text(scene?.visualAnswer);
  if (visualAnswer && /allgemein|irgendwie|passendes bild|general topic/i.test(visualAnswer)) {
    errors.push(`visualAnswer bei Bild ${number} ist zu unspezifisch. Beschreibe konkret, was sichtbar sein muss.`);
  }

  return errors;
}

export function validateNarrationAlignmentSequence(images, policy = {}, script = '') {
  const errors = [];
  if (!Array.isArray(images) || !images.length) return errors;

  let previousStep = null;
  let previousBeatIndex = -1;
  const maxIncrease = Number(policy?.maximumChronologyStepIncrease ?? 1);

  for (let index = 0; index < images.length; index += 1) {
    const image = images[index];
    const number = index + 1;
    const step = Number(image?.chronologyStep);

    if (Number.isInteger(step)) {
      if (previousStep === null) {
        if (step !== 1) errors.push(`Chronologie muss bei Bild 1 mit chronologyStep=1 beginnen; aktuell ${step}.`);
      } else {
        if (policy?.chronologyStepsMustBeNonDecreasing === true && step < previousStep) {
          errors.push(`Chronologie läuft rückwärts: Bild ${number - 1} hat Schritt ${previousStep}, Bild ${number} Schritt ${step}.`);
        }
        if (Number.isFinite(maxIncrease) && step > previousStep + maxIncrease) {
          errors.push(`Chronologiesprung zu groß bei Bild ${number}: ${previousStep} → ${step}. Schritte dürfen höchstens um ${maxIncrease} steigen.`);
        }
      }
      previousStep = step;
    }

    const beat = text(image?.narrationBeat);
    if (beat && script) {
      const at = script.indexOf(beat);
      if (at >= 0) {
        if (at <= previousBeatIndex) errors.push(`Narrations-Reihenfolge ist nicht monoton bei Bild ${number}.`);
        previousBeatIndex = at;
      }
    }
  }

  return errors;
}

export function validateNarrationAlignmentProject({ meta, mapping, policy, script }) {
  const errors = [];
  if (!meta || Number(meta.narrationAlignmentGateVersion ?? 0) < 1) return { passed: true, errors, legacy: true };
  if (policy?.status !== 'READY') errors.push('Narration-Alignment-Policy ist nicht READY.');
  if (meta.chronologyPolicy?.mode !== 'strict-chronological') errors.push('Neue Projekte müssen chronologyPolicy.mode=strict-chronological verwenden.');
  if (meta.chronologyPolicy?.flashbacksAllowed !== false) errors.push('Neue Projekte dürfen standardmäßig keine Rückblenden verwenden.');
  if (meta.chronologyPolicy?.futureEventLeakageForbidden !== true) errors.push('futureEventLeakageForbidden muss true sein.');

  const images = Array.isArray(mapping?.images) ? mapping.images : [];
  if (!images.length) errors.push('Narration-Alignment benötigt Scene Cards.');

  for (let index = 0; index < images.length; index += 1) {
    errors.push(...validateNarrationAlignmentScene(images[index], {
      imageNumber: index + 1,
      policy,
      script
    }));
  }
  errors.push(...validateNarrationAlignmentSequence(images, policy, script));

  return { passed: errors.length === 0, errors, legacy: false };
}

export function buildNarrationAlignmentPromptParts(scene) {
  const parts = [];
  const beat = text(scene?.narrationBeat);
  const timeContext = text(scene?.timeContext);
  const visualAnswer = text(scene?.visualAnswer);
  const step = Number(scene?.chronologyStep);

  if (beat) parts.push(`NARRATION ALIGNMENT — HARD: the exact spoken beat for this image is: "${beat}". Visualize this beat, not the general topic.`);
  if (timeContext) parts.push(`TIME CONTEXT — HARD: ${timeContext}. Do not show later events, later damage, later positions or later consequences before the narration reaches them.`);
  if (Number.isInteger(step)) parts.push(`CHRONOLOGY STEP: ${step}. Preserve chronological progression.`);
  if (visualAnswer) parts.push(`VISUAL ANSWER — HARD: the viewer must immediately see this answer to the narration: ${visualAnswer}. Keep one primary takeaway and remove anything that competes with it.`);

  return parts;
}

export function injectNarrationAlignmentIntoPrompt(prompt, mapping) {
  let output = String(prompt ?? '');
  const images = Array.isArray(mapping?.images) ? mapping.images : [];

  const globalRule = `\n\nCHRONOLOGY AND NARRATION ALIGNMENT — HARD:\nFollow the historical sequence in the same order as the voice-over. Do not use a dramatic future-event cold open followed by an unmarked flashback. Do not show later damage, later positions, later consequences or later characters before the narration reaches them. Every image must answer the exact current spoken beat and must be readable around one primary takeaway.\n`;
  const insertionPoint = '\n\nNARRATION-FIRST RULE:';
  if (output.includes(insertionPoint)) output = output.replace(insertionPoint, `${globalRule}${insertionPoint}`);
  else output = `${globalRule}${output}`;

  for (const scene of images) {
    const number = Number(scene?.imageNumber);
    if (!Number.isInteger(number)) continue;
    const marker = `BILD ${String(number).padStart(2, '0')}\n`;
    if (!output.includes(marker)) throw new Error(`Flow-Prompt enthält Marker ${marker.trim()} nicht für Narration-Alignment.`);
    const instructions = buildNarrationAlignmentPromptParts(scene).join(' ');
    output = output.replace(marker, `${marker}${instructions}\n`);
  }

  return output;
}
