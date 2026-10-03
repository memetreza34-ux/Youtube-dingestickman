import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

import { validatePreproduction } from '../src/cli/validate-youtube-preproduction.js';
import { validatePhase1Full } from '../src/cli/validate-youtube-phase1-full.js';

test('Holland-Waterlinie-1672 besteht Topic-, Story-, Chronologie-, Alignment- und Phase-1-Gates', async () => {
  const dir = 'youtube/2026-KW40_28-09_bis_04-10/holland-wasserlinie-1672';

  const pre = await validatePreproduction(dir);
  assert.equal(pre.passed, true, pre.errors.join('\n'));
  assert.ok(pre.topicScore >= 9.2);

  const phase1 = await validatePhase1Full(dir);
  assert.equal(phase1.passed, true, phase1.errors.join('\n'));

  const meta = JSON.parse(await readFile(path.join(dir, '99-technik', 'video.json'), 'utf8'));
  const mapping = JSON.parse(await readFile(path.join(dir, '99-technik', 'BILD_AUDIO_ZUORDNUNG.json'), 'utf8'));
  const whole = JSON.parse(await readFile(path.join(dir, '99-technik', 'WHOLE_VIDEO_QC.json'), 'utf8'));
  const script = await readFile(path.join(dir, '01-voice-script', 'voice-script.txt'), 'utf8');
  const prompt = await readFile(path.join(dir, '00-bildprompts', 'google-flow-prompt.txt'), 'utf8');

  assert.equal(meta.plannedImageCount, 32);
  assert.equal(meta.narrationAlignmentGateVersion, 1);
  assert.equal(meta.chronologyPolicy.mode, 'strict-chronological');
  assert.equal(meta.chronologyPolicy.flashbacksAllowed, false);
  assert.equal(mapping.images.length, 32);
  assert.ok(mapping.images.every((image) => image.narrationMatchScore >= 9));
  assert.ok(mapping.images.every((image) => image.clarityScore >= 8));
  assert.equal(whole.everyVisualMatchesCurrentNarration, true);
  assert.equal(whole.futureEventLeakageAbsent, true);
  assert.match(script, /Aus Kanälen, Schleusen und Poldern wird eine Verteidigungsanlage/);
  assert.match(prompt, /CHRONOLOGY AND NARRATION ALIGNMENT — HARD/);
  assert.match(prompt, /SIE FLUTETEN HOLLAND/);
  assert.match(prompt, /Alte Hollandse Waterlinie/);
  assert.match(prompt, /BILD 32/);
});
