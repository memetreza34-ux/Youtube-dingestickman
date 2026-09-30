import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { evaluateTopic } from '../src/cli/check-youtube-topic.js';
import { normalizeText, similarity } from '../src/lib/pipeline.js';

test('Repo besitzt freigegebene History-Bildwelt und Visual Director V2', async () => {
  const visual = JSON.parse(await readFile('config/visual-policy.json', 'utf8'));
  const channel = JSON.parse(await readFile('config/channel-policy.json', 'utf8'));
  const registry = JSON.parse(await readFile('config/topic-registry.json', 'utf8'));
  assert.equal(visual.status, 'READY');
  assert.equal(visual.styleId, 'history-stickman-adaptive-v1');
  assert.equal(visual.promptSystemVersion, 2);
  assert.equal(visual.scenePlanningSchemaVersion, 2);
  assert.equal(visual.visualDirectorRequired, true);
  assert.equal(visual.promptMustPreserveVisualForm, true);
  assert.equal(visual.promptQcRequired, true);
  assert.equal(visual.promptQcMinimumScore, 8);
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

test('Projekt-Template nutzt Scene Card V2, aktive Bildwelt und Cover-Gate', async () => {
  const meta = JSON.parse(await readFile('youtube/templates/video-template/99-technik/video.json', 'utf8'));
  const mapping = JSON.parse(await readFile('youtube/templates/video-template/99-technik/BILD_AUDIO_ZUORDNUNG.json', 'utf8'));
  const prompt = await readFile('youtube/templates/video-template/00-bildprompts/google-flow-prompt.txt', 'utf8');
  assert.equal(meta.visualStyleId, 'UNSET');
  assert.equal(meta.topic, '');
  assert.equal(meta.title, '');
  assert.equal(mapping.schemaVersion, 2);
  assert.ok(Object.hasOwn(mapping.images[0], 'viewerTakeaway'));
  assert.ok(Object.hasOwn(mapping.images[0], 'visualConcept'));
  assert.ok(Object.hasOwn(mapping.images[0], 'composition'));
  assert.ok(Object.hasOwn(mapping.images[0], 'camera'));
  assert.ok(Object.hasOwn(mapping.images[0], 'depthPlan'));
  assert.ok(Object.hasOwn(mapping.images[0], 'lightingMood'));
  assert.ok(Object.hasOwn(mapping.images[0], 'promptQcScore'));
  assert.equal(meta.coverPolicy?.coverTextRequired, true);
  assert.equal(meta.coverPolicy?.coverTextLanguage, 'de');
  assert.equal(meta.coverPolicy?.userSelectsCover, true);
  assert.equal(meta.coverPolicy?.flowMustStopAfterCoverCandidates, true);
  assert.equal(meta.coverPolicy?.selectedCoverRequiredBeforeRemainingImages, true);
  assert.match(prompt, /ACTIVE_STYLE_ID:\s*history-stickman-adaptive-v1/);
  assert.match(prompt, /PROMPT_SYSTEM:\s*visual-director-v2/i);
  assert.match(prompt, /Visual-Form Fidelity/i);
  assert.match(prompt, /Prompt Quality/i);
  assert.match(prompt, /same art universe across all images/i);
  assert.match(prompt, /COVER TEXT:/i);
  assert.match(prompt, /Bild 01 ALWAYS contains the exact short German cover text/i);
  assert.match(prompt, /STOP IMMEDIATELY/i);
  assert.match(prompt, /DO NOT choose a winner yourself/i);
  assert.match(prompt, /Wait for the user to explicitly select/i);
  assert.match(prompt, /ONLY AFTER USER SELECTION/i);
});

test('Visual-Director-Dokumentation ist vollständig vorhanden', async () => {
  const style = await readFile('channel/10-STYLE-DNA-V2.md', 'utf8');
  const director = await readFile('channel/11-VISUAL-DIRECTOR.md', 'utf8');
  const qc = await readFile('channel/12-PROMPT-QC.md', 'utf8');
  const refs = await readFile('channel/13-STYLE-REFERENCE-PACK.md', 'utf8');
  assert.match(style, /visuelle Beziehung/i);
  assert.match(director, /Viewer Takeaway/i);
  assert.match(director, /Visual Concept/i);
  assert.match(director, /Composition/i);
  assert.match(qc, /8\/10/);
  assert.match(qc, /Visual-Form-Treue/i);
  assert.match(refs, /neun Master-Referenzen/i);
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
