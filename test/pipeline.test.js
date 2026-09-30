import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { evaluateTopic } from '../src/cli/check-youtube-topic.js';
import { validatePhase1 } from '../src/cli/validate-youtube-phase1.js';
import { findHighRiskPromptWords } from '../src/lib/flow-prompt.js';
import { normalizeText, similarity } from '../src/lib/pipeline.js';

test('Repo besitzt freigegebene History-Bildwelt und Flow Compiler V3', async () => {
  const visual = JSON.parse(await readFile('config/visual-policy.json', 'utf8'));
  const styleLock = JSON.parse(await readFile('config/flow-style-lock.json', 'utf8'));
  const channel = JSON.parse(await readFile('config/channel-policy.json', 'utf8'));
  const registry = JSON.parse(await readFile('config/topic-registry.json', 'utf8'));
  assert.equal(visual.status, 'READY');
  assert.equal(visual.styleId, 'history-stickman-adaptive-v1');
  assert.equal(visual.promptSystemVersion, 3);
  assert.equal(visual.promptSystem, 'flow-compiler-v3');
  assert.equal(visual.scenePlanningSchemaVersion, 2);
  assert.equal(visual.visualDirectorRequired, true);
  assert.equal(visual.flowPromptCompilerRequiredForNewProjects, true);
  assert.equal(visual.flowWorldLockRequired, true);
  assert.equal(visual.sceneStyleAnchorRequired, true);
  assert.equal(visual.promptMustPreserveVisualForm, true);
  assert.equal(visual.promptQcRequired, true);
  assert.equal(visual.promptQcMinimumScore, 8);
  assert.equal(visual.controlledVariationPolicy?.enabled, true);
  assert.equal(visual.controlledVariationPolicy?.fixedMasterReferenceImages, false);
  assert.equal(visual.controlledVariationPolicy?.sameStyleDifferentStaging, true);
  assert.equal(styleLock.status, 'READY');
  assert.equal(styleLock.styleId, visual.styleId);
  assert.equal(styleLock.promptSystem, 'flow-compiler-v3');
  assert.equal(styleLock.controlledVariationPolicy?.fixedMasterReferenceImages, false);
  assert.ok(styleLock.masterStylePrompt.length > 300);
  assert.ok(styleLock.sceneStyleAnchor.length > 100);
  assert.ok(Array.isArray(styleLock.highRiskPromptWords));
  assert.ok(styleLock.highRiskPromptWords.includes('cinematic'));
  assert.ok(Array.isArray(visual.requiredScenePlanningFields));
  assert.ok(visual.requiredScenePlanningFields.includes('viewerTakeaway'));
  assert.ok(visual.requiredScenePlanningFields.includes('visualConcept'));
  assert.ok(visual.requiredScenePlanningFields.includes('composition'));
  assert.ok(visual.requiredScenePlanningFields.includes('camera'));
  assert.ok(visual.requiredScenePlanningFields.includes('promptQcScore'));
  assert.equal(visual.coverTextRequired, true);
  assert.equal(visual.coverTextLanguage, 'de');
  assert.equal(visual.userSelectsCover, true);
  assert.equal(visual.flowMustStopAfterCoverCandidates, true);
  assert.equal(visual.selectedCoverRequiredBeforeRemainingImages, true);
  assert.equal(channel.visualSystem?.status, 'READY');
  assert.equal(channel.visualSystem?.styleId, visual.styleId);
  assert.equal(channel.targetDurationMinutes?.shortTestVideosAllowed, true);
  assert.equal(channel.targetDurationMinutes?.shortTestMaximumSeconds, 120);
  assert.ok(Array.isArray(registry.entries));
  for (const entry of registry.entries) {
    assert.ok(entry.id);
    assert.ok(entry.title);
    assert.ok(Array.isArray(entry.aliases));
    assert.ok(entry.status);
  }
});

test('Pipeline behält allgemeine Produktionsregeln und Cover-Gate', async () => {
  const policy = JSON.parse(await readFile('config/pipeline.json', 'utf8'));
  assert.equal(policy.coverPolicy.firstSceneIsCover, true);
  assert.equal(policy.coverPolicy.coverCandidateCount, 3);
  assert.equal(policy.coverPolicy.coverTextRequired, true);
  assert.equal(policy.coverPolicy.coverTextLanguage, 'de');
  assert.equal(policy.coverPolicy.rejectMisspelledCoverText, true);
  assert.equal(policy.coverPolicy.userSelectsCover, true);
  assert.equal(policy.coverPolicy.flowMustStopAfterCoverCandidates, true);
  assert.equal(policy.coverPolicy.selectedCoverRequiredBeforeRemainingImages, true);
  assert.equal(policy.coverPolicy.flowMayNotAutoSelectCover, true);
  assert.equal(policy.imagePolicy.fixedImageCountForbidden, true);
  assert.equal(policy.imagePolicy.nonCoverGenerationCount, 1);
  assert.deepEqual(policy.imagePolicy.targetAverageHoldSeconds, [4.5, 7.5]);
  assert.equal(policy.audioPolicy.playbackRate, 1.1);
  assert.equal(policy.audioPolicy.loudnessTargetLufs, -16);
  assert.equal(policy.audioPolicy.truePeakDbtp, -1.5);
  assert.equal(policy.endHoldPolicy.targetSeconds, 1.3);
});

test('Projekt-Template nutzt Scene Card V2, Flow Compiler V3 und World-Lock-Gate', async () => {
  const meta = JSON.parse(await readFile('youtube/templates/video-template/99-technik/video.json', 'utf8'));
  const mapping = JSON.parse(await readFile('youtube/templates/video-template/99-technik/BILD_AUDIO_ZUORDNUNG.json', 'utf8'));
  const worldLock = JSON.parse(await readFile('youtube/templates/video-template/99-technik/FLOW_WORLD_LOCK.json', 'utf8'));
  const prompt = await readFile('youtube/templates/video-template/00-bildprompts/google-flow-prompt.txt', 'utf8');
  assert.equal(meta.visualStyleId, 'UNSET');
  assert.equal(meta.topic, '');
  assert.equal(meta.title, '');
  assert.equal(meta.promptSystemVersion, 3);
  assert.equal(meta.promptSystem, 'flow-compiler-v3');
  assert.equal(meta.flowStyleLockFile, 'config/flow-style-lock.json');
  assert.equal(mapping.schemaVersion, 2);
  assert.ok(Object.hasOwn(mapping.images[0], 'viewerTakeaway'));
  assert.ok(Object.hasOwn(mapping.images[0], 'visualConcept'));
  assert.ok(Object.hasOwn(mapping.images[0], 'composition'));
  assert.ok(Object.hasOwn(mapping.images[0], 'camera'));
  assert.ok(Object.hasOwn(mapping.images[0], 'depthPlan'));
  assert.ok(Object.hasOwn(mapping.images[0], 'lightingMood'));
  assert.ok(Object.hasOwn(mapping.images[0], 'promptQcScore'));
  assert.equal(worldLock.status, 'PLANNED');
  assert.match(worldLock.settingName, /\[/);
  assert.equal(meta.coverPolicy?.coverTextRequired, true);
  assert.equal(meta.coverPolicy?.coverTextLanguage, 'de');
  assert.equal(meta.coverPolicy?.userSelectsCover, true);
  assert.equal(meta.coverPolicy?.flowMustStopAfterCoverCandidates, true);
  assert.equal(meta.coverPolicy?.selectedCoverRequiredBeforeRemainingImages, true);
  assert.match(prompt, /ACTIVE_STYLE_ID:\s*history-stickman-adaptive-v1/);
  assert.match(prompt, /PROMPT_SYSTEM:\s*flow-compiler-v3/i);
  assert.match(prompt, /STATUS:\s*NOT_BUILT/i);
  assert.match(prompt, /THIS FILE IS GENERATED, NOT MANUALLY AUTHORED/i);
  assert.match(prompt, /build:youtube-flow/i);
  assert.match(prompt, /FLOW_WORLD_LOCK\.json/i);
  assert.match(prompt, /Do not paste this placeholder file into Google Flow/i);
});

test('Visual-Director- und Flow-Dokumentation nutzt kontrollierte Variation', async () => {
  const style = await readFile('channel/10-STYLE-DNA-V2.md', 'utf8');
  const director = await readFile('channel/11-VISUAL-DIRECTOR.md', 'utf8');
  const qc = await readFile('channel/12-PROMPT-QC.md', 'utf8');
  const flow = await readFile('channel/08-FLOW-PROMPTING.md', 'utf8');
  const promptTemplate = await readFile('channel/09-IMAGE-PROMPT-TEMPLATE.md', 'utf8');
  assert.match(style, /visuelle Beziehung/i);
  assert.match(style, /keine festen globalen Master-Referenzbilder/i);
  assert.match(style, /Kontrollierte Variation/i);
  assert.match(director, /Viewer Takeaway/i);
  assert.match(director, /Visual Concept/i);
  assert.match(director, /Composition/i);
  assert.match(qc, /8\/10/);
  assert.match(qc, /Visual-Form-Treue/i);
  assert.match(flow, /Flow Compiler V3/i);
  assert.match(flow, /Gleicher Stil ≠ gleiche Szene/i);
  assert.match(flow, /keine globalen festen Master-Referenzbilder/i);
  assert.match(promptTemplate, /google-flow-prompt\.txt.*nicht mehr manuell/is);
});

test('Risikowortprüfung erkennt ganze Begriffe statt Teilstrings', async () => {
  const styleLock = JSON.parse(await readFile('config/flow-style-lock.json', 'utf8'));
  const neutralScene = {
    viewerTakeaway: 'Explain the defense clearly.',
    visualPurpose: 'Show a temporary camp.',
    topicAnchor: 'Roman camp',
    visualForm: 'architecture-city',
    visualConcept: 'Depict a low earthen rampart without exaggeration.',
    dominantSubject: 'temporary camp',
    actionState: 'the camp is occupied',
    composition: 'the camp fills the frame',
    camera: 'wide elevated view',
    depthPlan: 'foreground earth, midground camp, background hills',
    lightingMood: 'muted evening light',
    continuityNote: 'keep the same layout',
    historicalAccuracyNote: 'depict temporary earth defenses only'
  };
  assert.deepEqual(findHighRiskPromptWords(neutralScene, styleLock), []);
  assert.deepEqual(findHighRiskPromptWords({ ...neutralScene, visualConcept: 'Make it epic.' }, styleLock), ['epic']);
});

test('Neues V3-Marschlager-Testprojekt besteht Phase 1 vollständig', async () => {
  const dir = 'youtube/2026-KW40_28-09_bis_04-10/test-roemisches-marschlager-v3';
  const result = await validatePhase1(dir);
  assert.equal(result.passed, true, result.errors.join('\n'));
  const prompt = await readFile(path.join(dir, '00-bildprompts', 'google-flow-prompt.txt'), 'utf8');
  const mapping = JSON.parse(await readFile(path.join(dir, '99-technik', 'BILD_AUDIO_ZUORDNUNG.json'), 'utf8'));
  assert.equal(mapping.images.length, 11);
  assert.match(prompt, /PROMPT_SYSTEM:\s*flow-compiler-v3/i);
  assert.match(prompt, /CHANNEL STYLE — IMMUTABLE:/i);
  assert.match(prompt, /VIDEO WORLD LOCK — IMMUTABLE WITHIN THIS VIDEO:/i);
  assert.match(prompt, /BILD 11/i);
  assert.match(prompt, /FORT FÜR EINE NACHT\?/i);
  assert.doesNotMatch(prompt, /\[[^\]]+\]/);
});

test('Textnormalisierung und Ähnlichkeit funktionieren', () => {
  assert.equal(normalizeText('Über Größe!'), 'uber grosse');
  assert.ok(similarity('Warum gibt es Grenzen?', 'Wieso gibt es Grenzen?') > 0.5);
});

test('Themeneditor arbeitet nur mit Daten des aktuellen Repositories', async () => {
  const temp = await mkdtemp(path.join(tmpdir(), 'history-youtube-pipeline-'));
  try {
    await mkdir(path.join(temp, 'config'), { recursive: true });
    await mkdir(path.join(temp, 'youtube'), { recursive: true });
    await writeFile(path.join(temp, 'config', 'topic-registry.json'), JSON.stringify({ version: 1, entries: [] }));
    const result = await evaluateTopic('Völlig neues Testthema 987654321', temp);
    assert.equal(result.decision, 'APPROVED_NEW');
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});

test('Keine Alt-Themen oder fremde Alt-Bildwelt wurden in die zentrale Konfiguration übernommen', async () => {
  const files = [
    'README.md',
    'config/pipeline.json',
    'config/visual-policy.json',
    'config/flow-style-lock.json',
    'config/topic-registry.json',
    'youtube/WORKFLOW.md',
    'youtube/templates/video-template/00-bildprompts/google-flow-prompt.txt'
  ];
  const text = (await Promise.all(files.map((file) => readFile(file, 'utf8')))).join('\n').toLowerCase();
  const forbidden = [
    'serious-minimal-countryball',
    'nationalismus',
    'liberalismus',
    'konservatismus',
    'anarchismus',
    'kaliningrad',
    'zwei koreas'
  ];
  for (const value of forbidden) assert.equal(text.includes(value), false, `Altspur gefunden: ${value}`);
});
