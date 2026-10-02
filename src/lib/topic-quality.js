function nonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function uniqueStrings(values) {
  return new Set((Array.isArray(values) ? values : []).map((value) => String(value).trim()).filter(Boolean));
}

export function calculateTopicWeightedScore(scorecard, policy) {
  const weights = policy?.scoreDimensions ?? {};
  const scores = scorecard?.scores ?? {};
  let weighted = 0;
  let weightTotal = 0;

  for (const [key, rawWeight] of Object.entries(weights)) {
    const weight = Number(rawWeight);
    const score = Number(scores[key]);
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(score)) continue;
    weighted += score * weight;
    weightTotal += weight;
  }

  return weightTotal ? Number((weighted / weightTotal).toFixed(2)) : NaN;
}

export function topicQualityBand(score, policy) {
  const priority = Number(policy?.discovery?.priorityThreshold ?? 8.3);
  const production = Number(policy?.discovery?.productionThreshold ?? 7.6);
  if (!Number.isFinite(score)) return 'INVALID';
  if (score >= priority) return 'PRIORITY';
  if (score >= production) return 'STRONG';
  if (score >= 7) return 'MAYBE';
  return 'REJECT';
}

export function validateTopicScorecard(scorecard, policy) {
  const errors = [];
  const discovery = policy?.discovery ?? {};
  const required = policy?.requiredBeforeProduction ?? {};
  const scoreDimensions = policy?.scoreDimensions ?? {};

  if (!scorecard || typeof scorecard !== 'object') return { passed: false, errors: ['TOPIC_SCORECARD.json ist ungültig.'], weightedScore: NaN, qualityBand: 'INVALID' };
  if (Number(scorecard.schemaVersion) < 1) errors.push('TOPIC_SCORECARD.schemaVersion fehlt oder ist ungültig.');
  if (scorecard.status !== 'APPROVED') errors.push('TOPIC_SCORECARD.status muss APPROVED sein.');
  if (!nonEmpty(scorecard.candidate)) errors.push('TOPIC_SCORECARD.candidate fehlt.');
  if (!nonEmpty(scorecard.proposedTitle)) errors.push('TOPIC_SCORECARD.proposedTitle fehlt.');
  if (!nonEmpty(scorecard.topicFamily) || !(policy?.topicFamilies ?? []).includes(scorecard.topicFamily)) errors.push('TOPIC_SCORECARD.topicFamily fehlt oder ist nicht in topic-policy erlaubt.');

  const round = scorecard.discovery ?? {};
  const minRaw = Number(discovery.minimumRawCandidates ?? 30);
  const minShortlist = Number(discovery.shortlistSize ?? 12);
  if (!Number.isInteger(Number(round.rawCandidateCount)) || Number(round.rawCandidateCount) < minRaw) errors.push(`Topic Director benötigt mindestens ${minRaw} Rohideen.`);
  if (!Number.isInteger(Number(round.shortlistSize)) || Number(round.shortlistSize) < minShortlist) errors.push(`Topic Director benötigt mindestens ${minShortlist} Shortlist-Kandidaten.`);
  if (!Number.isInteger(Number(round.selectedRank)) || Number(round.selectedRank) < 1 || Number(round.selectedRank) > Number(round.shortlistSize || 0)) errors.push('TOPIC_SCORECARD.discovery.selectedRank muss innerhalb der Shortlist liegen.');
  if (round.selectedFromShortlist !== true) errors.push('Das Thema muss ausdrücklich aus der Shortlist ausgewählt worden sein.');

  if (scorecard.duplicateCheckDecision !== 'APPROVED_NEW') errors.push('Duplicate-Check muss APPROVED_NEW sein.');
  if (scorecard.storyEnginePresent !== true) errors.push('Topic Scorecard benötigt storyEnginePresent=true.');
  if (scorecard.isolatedAnecdoteOnly !== false) errors.push('Ein isoliertes Anekdoten-Thema ist nicht produktionsreif.');
  if (scorecard.diversityGatePassed !== true) errors.push('Topic Diversity Gate wurde nicht bestanden.');
  if (!nonEmpty(scorecard.largerHistoricalPoint)) errors.push('largerHistoricalPoint fehlt: Thema braucht Bedeutung über die Kuriosität hinaus.');
  if (!nonEmpty(scorecard.sourceabilityEvidence)) errors.push('sourceabilityEvidence fehlt.');

  const titleDirections = uniqueStrings(scorecard.titleDirections);
  const visualForms = uniqueStrings(scorecard.visualForms);
  const minTitles = Number(required.minimumTitleDirections ?? 3);
  const minForms = Number(required.minimumDifferentVisualForms ?? 5);
  if (titleDirections.size < minTitles) errors.push(`Mindestens ${minTitles} unterschiedliche Titelrichtungen sind erforderlich.`);
  if (visualForms.size < minForms) errors.push(`Mindestens ${minForms} sinnvolle Visual Forms müssen vor Produktion erkennbar sein.`);

  for (const key of Object.keys(scoreDimensions)) {
    const value = Number(scorecard?.scores?.[key]);
    if (!Number.isFinite(value) || value < 0 || value > 10) errors.push(`Topic-Score ${key} muss zwischen 0 und 10 liegen.`);
  }

  const weightedScore = calculateTopicWeightedScore(scorecard, policy);
  const qualityBand = topicQualityBand(weightedScore, policy);
  const productionThreshold = Number(discovery.productionThreshold ?? 7.6);
  if (!Number.isFinite(weightedScore) || weightedScore < productionThreshold) errors.push(`Topic-Gesamtscore muss mindestens ${productionThreshold}/10 sein; aktuell ${Number.isFinite(weightedScore) ? weightedScore : 'ungültig'}.`);
  if (Number.isFinite(Number(scorecard.weightedScore)) && Math.abs(Number(scorecard.weightedScore) - weightedScore) > 0.01) errors.push(`TOPIC_SCORECARD.weightedScore stimmt nicht mit der berechneten Bewertung ${weightedScore} überein.`);
  if (scorecard.qualityBand && scorecard.qualityBand !== qualityBand) errors.push(`TOPIC_SCORECARD.qualityBand muss ${qualityBand} sein.`);
  if (scorecard.approvedByTopicDirector !== true) errors.push('approvedByTopicDirector muss true sein.');

  return { passed: errors.length === 0, errors, weightedScore, qualityBand };
}
