function validScore(value, minimum) {
  const score = Number(value);
  return Number.isFinite(score) && score >= minimum && score <= 10;
}

export function validateWholeVideoQc(qc, visualPolicy = {}) {
  const errors = [];
  const gate = visualPolicy.wholeVideoCoherenceGate ?? {};
  const minimumScore = Number(gate.minimumScore ?? 8);
  const maximumExplanationShare = Number(gate.maximumExplanationOnlyVisualShare ?? 0.35);
  const maximumExplanationRun = Number(gate.maximumConsecutiveExplanationOnlyVisuals ?? 2);

  if (!qc || typeof qc !== 'object') return { passed: false, errors: ['WHOLE_VIDEO_QC.json ist ungültig.'] };
  if (Number(qc.schemaVersion) < 1) errors.push('WHOLE_VIDEO_QC.schemaVersion fehlt oder ist ungültig.');
  if (qc.status !== 'APPROVED') errors.push('WHOLE_VIDEO_QC.status muss APPROVED sein.');
  if (!qc.reviewMethod || qc.reviewMethod === 'UNREVIEWED') errors.push('WHOLE_VIDEO_QC braucht eine echte Review-Methode.');

  if (qc.scriptContinuousProse !== true) errors.push('Voice-over muss zuerst als zusammenhängender Fließtext geschrieben sein.');
  if (qc.scriptReadAloudPassed !== true) errors.push('Script-Read-aloud-QC wurde nicht bestanden.');
  if (qc.visualsDerivedAfterScript !== true) errors.push('Visuals müssen nach dem fertigen Script abgeleitet worden sein.');
  if (qc.coherentVisualArc !== true) errors.push('Die Bildfolge wurde nicht als kohärenter visueller Bogen freigegeben.');

  const share = Number(qc.explanationOnlyVisualShare);
  if (!Number.isFinite(share) || share < 0 || share > maximumExplanationShare) {
    errors.push(`explanationOnlyVisualShare muss zwischen 0 und ${maximumExplanationShare} liegen.`);
  }

  const maxRun = Number(qc.maxConsecutiveExplanationOnlyVisuals);
  if (!Number.isInteger(maxRun) || maxRun < 0 || maxRun > maximumExplanationRun) {
    errors.push(`Maximal ${maximumExplanationRun} explanation-only Visuals dürfen direkt hintereinander liegen.`);
  }

  if (qc.historicalWorldReturnsAfterExplanation !== true) errors.push('Nach Erklärblöcken muss die historische Welt wieder sichtbar werden.');
  if (qc.editorialTextUsedOnlyWhenUseful !== true) errors.push('Redaktioneller Text wurde nicht auf echten Orientierungs-/Verständnisnutzen geprüft.');
  if (qc.transitionsReviewed !== true) errors.push('Die Übergänge zwischen allen Visuals müssen als Sequenz geprüft sein.');
  if (!validScore(qc.overallCoherenceScore, minimumScore)) errors.push(`overallCoherenceScore muss mindestens ${minimumScore}/10 sein.`);
  if (qc.approved !== true) errors.push('WHOLE_VIDEO_QC.approved muss true sein.');

  return { passed: errors.length === 0, errors };
}
