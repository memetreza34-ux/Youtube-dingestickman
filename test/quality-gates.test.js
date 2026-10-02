import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { evaluateTopic } from '../src/cli/check-youtube-topic.js';
import { validatePhase2 } from '../src/cli/validate-youtube-phase2.js';
import { sha256 } from '../src/lib/pipeline.js';
import { validateStoryQc } from '../src/lib/story-quality.js';
import { calculateTopicWeightedScore, validateTopicScorecard } from '../src/lib/topic-quality.js';
import { validateWholeVideoQc } from '../src/lib/whole-video-quality.js';
import { buildHardTextInstruction, validateVisualInterestScene, validateVisualInterestSequence } from '../src/lib/visual-interest.js';

test('Topic Director Scorecard erzwingt Discovery, Qualität und Bedeutung', async () => {
  const policy = JSON.parse(await readFile('config/topic-policy.json', 'utf8'));
  const scorecard = {
    schemaVersion: 1,
    status: 'APPROVED',
    candidate: 'Warum ein Versorgungssystem eine Festung verwundbar machte',
    proposedTitle: 'Die Schwachstelle uneinnehmbarer Festungen',
    topicFamily: 'technology_infrastructure_systems',
    discovery: { rawCandidateCount: 30, shortlistSize: 12, selectedRank: 2, selectedFromShortlist: true },
    duplicateCheckDecision: 'APPROVED_NEW',
    storyEnginePresent: true,
    isolatedAnecdoteOnly: false,
    diversityGatePassed: true,
    largerHistoricalPoint: 'Versorgung kann stärkere Mauern bedeutungslos machen.',
    sourceabilityEvidence: 'Primär- und Sekundärquellen zur Belagerung und Versorgung sind vorhanden.',
    titleDirections: ['Schwachstelle Festung', 'Hunger besiegt Mauern', 'Warum Versorgung entscheidet'],
    visualForms: ['architecture-city', 'map-geography', 'process-sequence', 'cause-effect', 'object-focus'],
    scores: {
      curiosityGap: 8.5,
      stakes: 8.2,
      storyEngine: 9,
      visualPotential: 8.7,
      historicalSignificance: 8,
      freshnessDistinctiveness: 8.1,
      titlePotential: 8.4,
      sourceability: 9
    },
    approvedByTopicDirector: true
  };
  scorecard.weightedScore = calculateTopicWeightedScore(scorecard, policy);
  scorecard.qualityBand = 'PRIORITY';
  const result = validateTopicScorecard(scorecard, policy);
  assert.equal(result.passed, true, result.errors.join('\n'));
  assert.ok(result.weightedScore >= 8.3);

  const weak = validateTopicScorecard({ ...scorecard, isolatedAnecdoteOnly: true }, policy);
  assert.equal(weak.passed, false);
  assert.match(weak.errors.join('\n'), /isoliertes Anekdoten-Thema/i);
});

test('Topic Director V3 blockiert mechanism-only Themen trotz guter Scores', async () => {
  const policy = JSON.parse(await readFile('config/topic-policy.json', 'utf8'));
  const base = {
    schemaVersion: 2,
    status: 'APPROVED',
    candidate: 'Wie ein System physikalisch funktioniert',
    proposedTitle: 'Warum dieses System alles veränderte',
    topicFamily: 'technology_infrastructure_systems',
    discovery: { rawCandidateCount: 30, shortlistSize: 12, selectedRank: 1, selectedFromShortlist: true },
    duplicateCheckDecision: 'APPROVED_NEW',
    storyEnginePresent: true,
    isolatedAnecdoteOnly: false,
    diversityGatePassed: true,
    largerHistoricalPoint: 'Technik verändert Versorgung.',
    sourceabilityEvidence: 'Quellen vorhanden.',
    historicalStoryCorePresent: true,
    mechanismOnlyTopic: false,
    concreteHumanStakes: 'Eine konkrete Stadt verliert ihre Versorgung.',
    eventProgression: 'Versorgung fällt aus → Menschen reagieren → politische Folge.',
    expectedExplanationMechanismShare: 0.25,
    titleDirections: ['Warum Versorgung scheiterte', 'Die Stadt ohne Nachschub', 'Als das System ausfiel'],
    visualForms: ['character-scene', 'architecture-city', 'object-focus', 'map-geography', 'cause-effect'],
    scores: { curiosityGap: 9, stakes: 9, storyEngine: 9, visualPotential: 9, historicalSignificance: 9, freshnessDistinctiveness: 9, titlePotential: 9, sourceability: 9 },
    approvedByTopicDirector: true
  };
  base.weightedScore = calculateTopicWeightedScore(base, policy);
  base.qualityBand = 'PRIORITY';
  assert.equal(validateTopicScorecard(base, policy).passed, true);

  const mechanismOnly = validateTopicScorecard({ ...base, mechanismOnlyTopic: true }, policy);
  assert.equal(mechanismOnly.passed, false);
  assert.match(mechanismOnly.errors.join('\n'), /Mechanismus|mechanismOnly/i);

  const tooMuchExplanation = validateTopicScorecard({ ...base, expectedExplanationMechanismShare: 0.7 }, policy);
  assert.equal(tooMuchExplanation.passed, false);
});

test('Story Quality Gate verlangt Story-Spine, Bedeutung und Payoff', async () => {
  const channel = JSON.parse(await readFile('config/channel-policy.json', 'utf8'));
  const qc = {
    schemaVersion: 1,
    status: 'APPROVED',
    reviewMethod: 'model-review-plus-human-check',
    centralQuestion: 'Warum scheiterte die Verteidigung trotz starker Mauern?',
    storySpine: 'Weil Versorgung abgeschnitten wurde, musste die Besatzung reagieren; dadurch verloren die Mauern ihren strategischen Wert.',
    historicalMeaning: 'Festungen waren nur so stark wie ihre Logistik.',
    hookPromise: 'Eine uneinnehmbare Burg hatte eine Schwachstelle, die nicht aus Stein bestand.',
    scores: { hook: 9, storyProgression: 9, historicalMeaning: 8.5, payoff: 9 },
    centralStoryShare: 0.8,
    personalityCuriosityShare: 0.1,
    maxConsecutivePurePersonalityCuriosityBeats: 1,
    beatFunctionsReviewed: true,
    endingAnswersOpeningQuestion: true,
    approved: true
  };
  assert.equal(validateStoryQc(qc, channel).passed, true);
  const weak = validateStoryQc({ ...qc, personalityCuriosityShare: 0.5 }, channel);
  assert.equal(weak.passed, false);
});

test('Whole-Video-Coherence Gate erzwingt Fließtext-Workflow und begrenzt Erklärketten', async () => {
  const visual = JSON.parse(await readFile('config/visual-policy.json', 'utf8'));
  const qc = {
    schemaVersion: 1,
    status: 'APPROVED',
    reviewMethod: 'model-review-plus-human-check',
    scriptContinuousProse: true,
    scriptReadAloudPassed: true,
    visualsDerivedAfterScript: true,
    coherentVisualArc: true,
    explanationOnlyVisualShare: 0.25,
    maxConsecutiveExplanationOnlyVisuals: 2,
    historicalWorldReturnsAfterExplanation: true,
    editorialTextUsedOnlyWhenUseful: true,
    transitionsReviewed: true,
    overallCoherenceScore: 9,
    approved: true
  };
  assert.equal(validateWholeVideoQc(qc, visual).passed, true);
  assert.equal(validateWholeVideoQc({ ...qc, scriptContinuousProse: false }, visual).passed, false);
  assert.equal(validateWholeVideoQc({ ...qc, explanationOnlyVisualShare: 0.6 }, visual).passed, false);
  assert.equal(validateWholeVideoQc({ ...qc, maxConsecutiveExplanationOnlyVisuals: 3 }, visual).passed, false);
});

test('Kontrollierter Redaktionstext ist erlaubt, interne Metadaten bleiben verboten', async () => {
  const visual = JSON.parse(await readFile('config/visual-policy.json', 'utf8'));
  const policy = visual.visualInterestGate;
  const textUsagePolicy = visual.textUsagePolicy;
  const scene = {
    imageNumber: 2,
    shotScale: 'wide',
    visualEnergyDevice: 'clear time jump',
    visualChangeFromPrevious: 'switch from night to daylight',
    visualInterestScore: 9,
    plannedHoldSeconds: 3,
    visibleTextPolicy: 'EDITORIAL_TEXT',
    editorialText: '10. April 1815',
    editorialTextPurpose: 'date'
  };
  assert.deepEqual(validateVisualInterestScene(scene, { imageNumber: 2, isCover: false, policy, textUsagePolicy, hardMaximumSeconds: 9 }), []);
  assert.match(buildHardTextInstruction({ isCover: false, scene }), /10\. April 1815/);
  const bad = validateVisualInterestScene({ ...scene, editorialText: 'BILD 02' }, { imageNumber: 2, isCover: false, policy, textUsagePolicy, hardMaximumSeconds: 9 });
  assert.match(bad.join('\n'), /Metadaten/i);
});

test('Drei explanation-only Visuals hintereinander werden blockiert', async () => {
  const visual = JSON.parse(await readFile('config/visual-policy.json', 'utf8'));
  const images = [1, 2, 3].map((imageNumber, index) => ({
    imageNumber,
    visualForm: ['cutaway-section', 'detail-inset', 'cause-effect'][index],
    shotScale: ['sectional', 'detail', 'wide'][index],
    explanationOnly: true
  }));
  const errors = validateVisualInterestSequence(images, visual.visualInterestGate);
  assert.match(errors.join('\n'), /Erklärbild-Kette/i);
});

test('Test- und Paused-Themen warnen, blockieren aber nicht den Duplicate Check', async () => {
  const temp = await mkdtemp(path.join(tmpdir(), 'topic-status-filter-'));
  try {
    await mkdir(path.join(temp, 'config'), { recursive: true });
    await mkdir(path.join(temp, 'youtube'), { recursive: true });
    const registry = {
      version: 1,
      entries: [{ id: 'test-1', title: 'Exakt gleiches Thema', aliases: [], status: 'test' }]
    };
    await writeFile(path.join(temp, 'config', 'topic-registry.json'), JSON.stringify(registry));
    const allowed = await evaluateTopic('Exakt gleiches Thema', temp);
    assert.equal(allowed.decision, 'APPROVED_NEW');
    assert.match(allowed.warning, /blockiert.*nicht/i);

    registry.entries.push({ id: 'prod-1', title: 'Exakt gleiches Thema', aliases: [], status: 'production' });
    await writeFile(path.join(temp, 'config', 'topic-registry.json'), JSON.stringify(registry));
    const blocked = await evaluateTopic('Exakt gleiches Thema', temp);
    assert.equal(blocked.decision, 'BLOCKED_DUPLICATE');
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});

test('Phase-2-Visual-QC ist an den SHA-256 des geprüften Bildes gebunden', async () => {
  const temp = await mkdtemp(path.join(tmpdir(), 'phase2-qc-hash-'));
  try {
    const imagesDir = path.join(temp, '00-bildprompts', 'images');
    const audioDir = path.join(temp, '02-audio');
    const techDir = path.join(temp, '99-technik');
    await mkdir(imagesDir, { recursive: true });
    await mkdir(audioDir, { recursive: true });
    await mkdir(techDir, { recursive: true });
    const image1 = path.join(imagesDir, 'Bild 01.png');
    const image2 = path.join(imagesDir, 'Bild 02.png');
    await writeFile(image1, 'cover-image-v1');
    await writeFile(image2, 'second-image-v1');
    await writeFile(path.join(audioDir, 'voice.wav'), 'voice');
    await writeFile(path.join(techDir, 'video.json'), JSON.stringify({
      plannedImageCount: 2,
      phase2VisualQcRequired: true,
      phase2VisualQcHashVersion: 1,
      coverPolicy: { coverText: 'TEST COVER' }
    }));
    await writeFile(path.join(techDir, 'BILD_AUDIO_ZUORDNUNG.json'), JSON.stringify({
      images: [
        { imageNumber: 1, visibleTextPolicy: 'COVER_TEXT_ONLY' },
        { imageNumber: 2, visibleTextPolicy: 'NO_VISIBLE_TEXT', editorialText: '', editorialTextPurpose: '' }
      ]
    }));
    const qc = {
      schemaVersion: 2,
      status: 'APPROVED',
      reviewMethod: 'vision-review',
      hashAlgorithm: 'sha256',
      minimumNarrationSupportScore: 8,
      minimumVisualInterestScore: 8,
      minimumStyleConsistencyScore: 8,
      images: [
        {
          imageNumber: 1, fileName: 'Bild 01.png', sha256: await sha256(image1), approved: true,
          narrationSupportScore: 9, visualInterestScore: 9, styleConsistencyScore: 9,
          weirdnessDetected: false, imageNumberVisible: false, unexpectedTextDetected: false, pseudoTextDetected: false,
          visibleTextDetected: true, visibleTextExact: 'TEST COVER'
        },
        {
          imageNumber: 2, fileName: 'Bild 02.png', sha256: await sha256(image2), approved: true,
          narrationSupportScore: 9, visualInterestScore: 9, styleConsistencyScore: 9,
          weirdnessDetected: false, imageNumberVisible: false, unexpectedTextDetected: false, pseudoTextDetected: false,
          visibleTextDetected: false, visibleTextExact: ''
        }
      ]
    };
    await writeFile(path.join(techDir, 'PHASE2_VISUAL_QC.json'), JSON.stringify(qc));
    assert.equal((await validatePhase2(temp)).passed, true);

    await writeFile(image2, 'second-image-replaced-after-review');
    const changed = await validatePhase2(temp);
    assert.equal(changed.passed, false);
    assert.match(changed.errors.join('\n'), /SHA-256 stimmt nicht/i);
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});

test('Phase 2 akzeptiert exakt freigegebenen Redaktionstext und nichts anderes', async () => {
  const temp = await mkdtemp(path.join(tmpdir(), 'phase2-editorial-text-'));
  try {
    const imagesDir = path.join(temp, '00-bildprompts', 'images');
    const audioDir = path.join(temp, '02-audio');
    const techDir = path.join(temp, '99-technik');
    await mkdir(imagesDir, { recursive: true });
    await mkdir(audioDir, { recursive: true });
    await mkdir(techDir, { recursive: true });
    const image1 = path.join(imagesDir, 'Bild 01.png');
    const image2 = path.join(imagesDir, 'Bild 02.png');
    await writeFile(image1, 'cover');
    await writeFile(image2, 'editorial');
    await writeFile(path.join(audioDir, 'voice.wav'), 'voice');
    await writeFile(path.join(techDir, 'video.json'), JSON.stringify({ plannedImageCount: 2, phase2VisualQcRequired: true, phase2VisualQcHashVersion: 1, coverPolicy: { coverText: 'TEST COVER' } }));
    await writeFile(path.join(techDir, 'BILD_AUDIO_ZUORDNUNG.json'), JSON.stringify({ images: [
      { imageNumber: 1, visibleTextPolicy: 'COVER_TEXT_ONLY' },
      { imageNumber: 2, visibleTextPolicy: 'EDITORIAL_TEXT', editorialText: '1816', editorialTextPurpose: 'year' }
    ] }));
    const qc = {
      schemaVersion: 2, status: 'APPROVED', reviewMethod: 'vision-review', hashAlgorithm: 'sha256',
      minimumNarrationSupportScore: 8, minimumVisualInterestScore: 8, minimumStyleConsistencyScore: 8,
      images: [
        { imageNumber: 1, fileName: 'Bild 01.png', sha256: await sha256(image1), approved: true, narrationSupportScore: 9, visualInterestScore: 9, styleConsistencyScore: 9, weirdnessDetected: false, imageNumberVisible: false, unexpectedTextDetected: false, pseudoTextDetected: false, visibleTextDetected: true, visibleTextExact: 'TEST COVER' },
        { imageNumber: 2, fileName: 'Bild 02.png', sha256: await sha256(image2), approved: true, narrationSupportScore: 9, visualInterestScore: 9, styleConsistencyScore: 9, weirdnessDetected: false, imageNumberVisible: false, unexpectedTextDetected: false, pseudoTextDetected: false, visibleTextDetected: true, visibleTextExact: '1816' }
      ]
    };
    await writeFile(path.join(techDir, 'PHASE2_VISUAL_QC.json'), JSON.stringify(qc));
    assert.equal((await validatePhase2(temp)).passed, true);
    qc.images[1].visibleTextExact = 'BILD 02';
    await writeFile(path.join(techDir, 'PHASE2_VISUAL_QC.json'), JSON.stringify(qc));
    assert.equal((await validatePhase2(temp)).passed, false);
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});
