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

  if (Number(qc.schemaVersion) >= 2) {
    if (qc.chronologyReviewed !== true) errors.push('Chronologie wurde nicht als vollständige Sequenz geprüft.');
    if (qc.visualOrderMatchesNarrationOrder !== true) errors.push('Bildreihenfolge muss der zeitlichen Reihenfolge der Narration folgen.');
    if (qc.temporalJumpsExplicitlySignposted !== true) errors.push('Zeitwechsel/Rückblenden müssen ausdrücklich markiert oder als nicht vorhanden bestätigt sein.');
    if (qc.unnecessaryFlashbacksAbsent !== true) errors.push('Unnötige Rückblenden oder Vorgriffe müssen entfernt sein.');
  }

  if (Number(qc.schemaVersion) >= 3) {
    if (qc.chronologyMode !== 'strict-chronological') errors.push('Neue Produktionen verwenden standardmäßig chronologyMode=strict-chronological.');
    if (qc.historicalEventOrderReviewed !== true) errors.push('Historische Ereignisreihenfolge wurde nicht geprüft.');
    if (qc.narrationVisualAlignmentReviewed !== true) errors.push('Bild-Skript-Passung wurde nicht für die komplette Sequenz geprüft.');
    if (qc.everyVisualMatchesCurrentNarration !== true) errors.push('Mindestens ein Visual passt nicht eindeutig zum aktuell gesprochenen Narrations-Beat.');
    if (qc.visualClarityReviewed !== true) errors.push('Visuelle Verständlichkeit wurde nicht für alle Szenen geprüft.');
    if (qc.unclearVisualsAbsent !== true) errors.push('Unübersichtliche oder mehrdeutige Visuals müssen vor Phase 1 entfernt sein.');
    if (qc.onePrimaryTakeawayPerVisual !== true) errors.push('Jedes Visual braucht genau einen primären Takeaway.');
    if (qc.futureEventLeakageAbsent !== true) errors.push('Spätere Ereignisse/Zustände dürfen nicht vorzeitig in früheren Bildern auftauchen.');
  }

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
