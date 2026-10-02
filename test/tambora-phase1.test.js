import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { validatePreproduction } from '../src/cli/validate-youtube-preproduction.js';
import { validatePhase1 } from '../src/cli/validate-youtube-phase1.js';

const dir = 'youtube/2026-KW40_28-09_bis_04-10/tambora-jahr-ohne-sommer';

test('Tambora-Neuproduktion besteht Preproduction und Phase 1', async () => {
  const pre = await validatePreproduction(dir);
  assert.equal(pre.passed, true, pre.errors.join('\n'));
  assert.equal(pre.topicBand, 'PRIORITY');
  assert.ok(pre.topicScore >= 9);

  const phase1 = await validatePhase1(dir);
  assert.equal(phase1.passed, true, phase1.errors.join('\n'));

  const mapping = JSON.parse(await readFile(path.join(dir, '99-technik', 'BILD_AUDIO_ZUORDNUNG.json'), 'utf8'));
  const prompt = await readFile(path.join(dir, '00-bildprompts', 'google-flow-prompt.txt'), 'utf8');
  const story = JSON.parse(await readFile(path.join(dir, '99-technik', 'STORY_QC.json'), 'utf8'));

  assert.equal(mapping.images.length, 32);
  assert.equal(story.status, 'APPROVED');
  assert.doesNotMatch(prompt, /STATUS:\s*NOT_BUILT/i);
  assert.match(prompt, /KEIN SOMMER 1816/);
  assert.match(prompt, /BILD 32/);
  assert.match(prompt, /After three acceptable candidates exist, STOP/);
});
