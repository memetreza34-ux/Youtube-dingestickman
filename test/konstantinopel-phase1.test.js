import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

import { validatePreproduction } from '../src/cli/validate-youtube-preproduction.js';
import { validatePhase1 } from '../src/cli/validate-youtube-phase1.js';

test('Konstantinopel-1453-Test besteht neue Script-first-, Whole-Video- und Phase-1-Gates', async () => {
  const dir = 'youtube/2026-KW40_28-09_bis_04-10/konstantinopel-1453-mauern';
  const pre = await validatePreproduction(dir);
  assert.equal(pre.passed, true, pre.errors.join('\n'));
  assert.ok(pre.topicScore >= 9);

  const phase1 = await validatePhase1(dir);
  assert.equal(phase1.passed, true, phase1.errors.join('\n'));

  const meta = JSON.parse(await readFile(path.join(dir, '99-technik', 'video.json'), 'utf8'));
  const mapping = JSON.parse(await readFile(path.join(dir, '99-technik', 'BILD_AUDIO_ZUORDNUNG.json'), 'utf8'));
  const whole = JSON.parse(await readFile(path.join(dir, '99-technik', 'WHOLE_VIDEO_QC.json'), 'utf8'));
  const script = await readFile(path.join(dir, '01-voice-script', 'voice-script.txt'), 'utf8');
  const prompt = await readFile(path.join(dir, '00-bildprompts', 'google-flow-prompt.txt'), 'utf8');

  assert.equal(meta.plannedImageCount, 37);
  assert.equal(mapping.images.length, 37);
  assert.equal(whole.scriptContinuousProse, true);
  assert.ok(whole.explanationOnlyVisualShare < 0.35);
  assert.equal(whole.maxConsecutiveExplanationOnlyVisuals, 2);
  assert.match(script, /Die Mauern waren also nicht plötzlich nutzlos geworden/);
  assert.match(prompt, /WARUM DIE MAUERN FIELEN/);
  assert.match(prompt, /22\. April 1453/);
  assert.match(prompt, /BILD 37/);
});
