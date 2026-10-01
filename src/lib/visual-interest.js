export const DEFAULT_ALLOWED_SHOT_SCALES = [
  'extreme-wide',
  'wide',
  'medium-wide',
  'medium',
  'close',
  'detail',
  'top-down',
  'elevated-overview',
  'sectional'
];

function text(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function maxRun(images, selector, predicate = () => true) {
  let best = 0;
  let current = 0;
  let previous = null;
  let endIndex = -1;
  for (let index = 0; index < images.length; index += 1) {
    const image = images[index];
    if (!predicate(image)) {
      current = 0;
      previous = null;
      continue;
    }
    const value = selector(image);
    if (value && value === previous) current += 1;
    else current = value ? 1 : 0;
    previous = value || null;
    if (current > best) {
      best = current;
      endIndex = index;
    }
  }
  return { length: best, endIndex };
}

export function buildVisualInterestPromptParts(scene) {
  const parts = [];
  const shotScale = text(scene?.shotScale);
  const energy = text(scene?.visualEnergyDevice);
  const change = text(scene?.visualChangeFromPrevious);

  if (shotScale) parts.push(`Use this deliberate shot scale: ${shotScale}.`);
  if (energy) parts.push(`Visual-interest mechanism: ${energy}. Make this mechanism visibly shape the composition instead of producing a static generic illustration.`);
  if (change) parts.push(`Make this frame visibly distinct from the previous one in this specific way: ${change}.`);

  return parts;
}

export function buildHardTextInstruction({ isCover, coverText }) {
  if (isCover) {
    return `TEXT SAFETY — HARD RULE: the only visible text allowed anywhere in this image is exactly "${text(coverText)}". Internal prompt identifiers such as BILD 01, IMAGE 01, SCENE 01, scene names, captions, labels, headings and image numbers are metadata only and must never be drawn. No second text line, no logo, no watermark and no pseudo-writing.`;
  }
  return 'No visible text. TEXT SAFETY — HARD RULE: this must be a pure illustration with ZERO visible text. Do not draw any word, letter, number, caption, heading, scene title, map label, image number, logo, watermark or pseudo-writing. Internal prompt identifiers such as BILD 02, BILD 11, BILD 29, IMAGE, SCENE and all numbering are metadata only and must NEVER appear inside the artwork.';
}

export function validateVisualInterestScene(scene, { imageNumber, isCover, policy, hardMaximumSeconds } = {}) {
  const errors = [];
  const number = imageNumber ?? scene?.imageNumber ?? '?';
  const minimumScore = Number(policy?.minimumVisualInterestScore ?? 8);
  const allowedShotScales = new Set(Array.isArray(policy?.allowedShotScales) && policy.allowedShotScales.length
    ? policy.allowedShotScales
    : DEFAULT_ALLOWED_SHOT_SCALES);

  const shotScale = text(scene?.shotScale);
  const energy = text(scene?.visualEnergyDevice);
  const change = text(scene?.visualChangeFromPrevious);
  const visibleTextPolicy = text(scene?.visibleTextPolicy);
  const interestScore = Number(scene?.visualInterestScore);

  if (!shotScale) errors.push(`shotScale fehlt bei Bild ${number}.`);
  else if (!allowedShotScales.has(shotScale)) errors.push(`shotScale bei Bild ${number} ist nicht erlaubt: ${shotScale}.`);

  if (!energy) errors.push(`visualEnergyDevice fehlt bei Bild ${number}.`);
  if (!change) errors.push(`visualChangeFromPrevious fehlt bei Bild ${number}.`);
  if (!Number.isFinite(interestScore) || interestScore < minimumScore || interestScore > 10) {
    errors.push(`visualInterestScore bei Bild ${number} muss zwischen ${minimumScore} und 10 liegen.`);
  }

  const expectedTextPolicy = isCover ? 'COVER_TEXT_ONLY' : 'NO_VISIBLE_TEXT';
  if (visibleTextPolicy !== expectedTextPolicy) {
    errors.push(`visibleTextPolicy bei Bild ${number} muss ${expectedTextPolicy} sein.`);
  }

  const hold = Number(scene?.plannedHoldSeconds);
  const hardMax = Number(hardMaximumSeconds);
  if (Number.isFinite(hold) && Number.isFinite(hardMax) && hold > hardMax) {
    errors.push(`Bild ${number} ist mit ${hold}s länger als das Hard-Maximum ${hardMax}s.`);
  }

  return errors;
}

export function validateVisualInterestSequence(images, policy = {}) {
  const errors = [];
  if (!Array.isArray(images) || !images.length) return errors;

  const maxSameForm = Number(policy.maxConsecutiveSameVisualForm ?? 2);
  const maxCharacters = Number(policy.maxConsecutiveCharacterScenes ?? 2);
  const maxSameScale = Number(policy.maxConsecutiveSameShotScale ?? 2);
  const minFormsPer10 = Number(policy.minimumDistinctVisualFormsPer10Images ?? 3);

  const sameForm = maxRun(images, (image) => text(image.visualForm));
  if (sameForm.length > maxSameForm) {
    const start = sameForm.endIndex - sameForm.length + 2;
    const end = sameForm.endIndex + 1;
    errors.push(`Visual-Monotonie: Bilder ${start}–${end} verwenden ${sameForm.length}x dieselbe Visual Form hintereinander.`);
  }

  let characterRun = 0;
  let characterRunStart = 0;
  for (let index = 0; index < images.length; index += 1) {
    if (text(images[index].visualForm) === 'character-scene') {
      if (characterRun === 0) characterRunStart = index;
      characterRun += 1;
      if (characterRun > maxCharacters) {
        errors.push(`Visual-Monotonie: Bilder ${characterRunStart + 1}–${index + 1} sind ${characterRun} Character Scenes hintereinander.`);
        break;
      }
    } else {
      characterRun = 0;
    }
  }

  const sameScale = maxRun(images, (image) => text(image.shotScale));
  if (sameScale.length > maxSameScale) {
    const start = sameScale.endIndex - sameScale.length + 2;
    const end = sameScale.endIndex + 1;
    errors.push(`Shot-Monotonie: Bilder ${start}–${end} verwenden ${sameScale.length}x dieselbe Shot Scale hintereinander.`);
  }

  if (images.length >= 10) {
    for (let start = 0; start <= images.length - 10; start += 1) {
      const window = images.slice(start, start + 10);
      const distinct = new Set(window.map((image) => text(image.visualForm)).filter(Boolean));
      if (distinct.size < minFormsPer10) {
        errors.push(`Zu wenig visuelle Vielfalt: Bilder ${start + 1}–${start + 10} enthalten nur ${distinct.size} verschiedene Visual Forms; erwartet mindestens ${minFormsPer10}.`);
        break;
      }
    }
  }

  return errors;
}
