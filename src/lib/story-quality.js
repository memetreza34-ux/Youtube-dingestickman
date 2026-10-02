function nonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validScore(value, minimum) {
  const score = Number(value);
  return Number.isFinite(score) && score >= minimum && score <= 10;
}

export function validateStoryQc(qc, channelPolicy = {}) {
  const errors = [];
  const gate = channelPolicy.storyQualityGate ?? {};
  const minimumScore = Number(gate.minimumReviewScore ?? 8);
  const minimumCentralStoryShare = Number(gate.minimumCentralStoryShare ?? 0.7);
  const maximumPersonalityCuriosityShare = Number(gate.maximumPersonalityCuriosityShare ?? 0.3);
  const maxConsecutivePersonality = Number(gate.maxConsecutivePurePersonalityCuriosityBeats ?? 2);

  if (!qc || typeof qc !== 'object') return { passed: false, errors: ['STORY_QC.json ist ungültig.'] };
  if (Number(qc.schemaVersion) < 1) errors.push('STORY_QC.schemaVersion fehlt oder ist ungültig.');
  if (qc.status !== 'APPROVED') errors.push('STORY_QC.status muss APPROVED sein.');
  if (!nonEmpty(qc.reviewMethod) || qc.reviewMethod === 'UNREVIEWED') errors.push('STORY_QC braucht eine echte Review-Methode.');

  for (const field of ['centralQuestion', 'storySpine', 'historicalMeaning', 'hookPromise']) {
    if (!nonEmpty(qc[field])) errors.push(`STORY_QC.${field} fehlt.`);
  }

  for (const key of ['hook', 'storyProgression', 'historicalMeaning', 'payoff']) {
    if (!validScore(qc?.scores?.[key], minimumScore)) errors.push(`STORY_QC.scores.${key} muss mindestens ${minimumScore}/10 sein.`);
  }

  const centralShare = Number(qc.centralStoryShare);
  if (!Number.isFinite(centralShare) || centralShare < minimumCentralStoryShare || centralShare > 1) errors.push(`centralStoryShare muss zwischen ${minimumCentralStoryShare} und 1 liegen.`);

  const personalityShare = Number(qc.personalityCuriosityShare);
  if (!Number.isFinite(personalityShare) || personalityShare < 0 || personalityShare > maximumPersonalityCuriosityShare) errors.push(`personalityCuriosityShare darf höchstens ${maximumPersonalityCuriosityShare} betragen.`);

  const maxRun = Number(qc.maxConsecutivePurePersonalityCuriosityBeats);
  if (!Number.isInteger(maxRun) || maxRun < 0 || maxRun > maxConsecutivePersonality) errors.push(`Maximal ${maxConsecutivePersonality} reine Personality-/Curiosity-Beats dürfen aufeinander folgen.`);

  if (qc.beatFunctionsReviewed !== true) errors.push('beatFunctionsReviewed muss true sein.');
  if (qc.endingAnswersOpeningQuestion !== true) errors.push('endingAnswersOpeningQuestion muss true sein.');
  if (qc.approved !== true) errors.push('STORY_QC.approved muss true sein.');

  return { passed: errors.length === 0, errors };
}
