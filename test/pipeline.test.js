import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { evaluateTopic } from '../src/cli/check-youtube-topic.js';
import { normalizeText, similarity } from '../src/lib/pipeline.js';

test('Repo besitzt freigegebene History-Bildwelt und gültige Themenregistry', async () => {
  const visual = JSON.parse(await readFile('config/visual-policy.json', 'utf8'));
  const channel = JSON.parse(await readFile('config/channel-policy.json', 'utf8'));
  const registry = JSON.parse(await readFile('config/topic-registry.json', 'utf8'));
  assert.equal(visual.status, 'READY');
  assert.equal(visual.styleId, 'history-stickman-adaptive-v1');
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

test('Pipeline behält allgemeine Produktionsregeln', async () => {
  const policy = JSON.parse(await readFile('config/pipeline.json', 'utf8'));
  assert.equal(policy.coverPolicy.firstSceneIsCover, true);
  assert.equal(policy.coverPolicy.coverCandidateCount, 3);
  assert.equal(policy.imagePolicy.fixedImageCountForbidden, true);
  assert.equal(policy.imagePolicy.nonCoverGenerationCount, 1);
  assert.deepEqual(policy.imagePolicy.targetAverageHoldSeconds, [4.5, 7.5]);
  assert.equal(policy.audioPolicy.playbackRate, 1.1);
  assert.equal(policy.audioPolicy.loudnessTargetLufs, -16);
  assert.equal(policy.audioPolicy.truePeakDbtp, -1.5);
  assert.equal(policy.endHoldPolicy.targetSeconds, 1.3);
});

test('Projekt-Template nutzt aktive Kanalbildwelt ohne fertiges Videothema', async () => {
  const meta = JSON.parse(await readFile('youtube/templates/video-template/99-technik/video.json', 'utf8'));
  const prompt = await readFile('youtube/templates/video-template/00-bildprompts/google-flow-prompt.txt', 'utf8');
  assert.equal(meta.visualStyleId, 'UNSET');
  assert.equal(meta.topic, '');
  assert.equal(meta.title, '');
  assert.match(prompt, /ACTIVE_STYLE_ID:\s*history-stickman-adaptive-v1/);
  assert.match(prompt, /Human characters are NOT required in every image/i);
  assert.match(prompt, /No fixed image count/i);
  assert.match(prompt, /same art universe across all images/i);
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
