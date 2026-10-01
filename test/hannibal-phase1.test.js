import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { validatePhase1 } from '../src/cli/validate-youtube-phase1.js';

const DIR = 'youtube/2026-KW40_28-09_bis_04-10/hannibal-feuertrick';

test('Hannibals Feuertrick bleibt Phase-1-kompatibel mit Pipeline V4', async () => {
  const result = await validatePhase1(DIR);
  assert.equal(result.passed, true, result.errors.join('\n'));

  const mapping = JSON.parse(await readFile(path.join(DIR, '99-technik', 'BILD_AUDIO_ZUORDNUNG.json'), 'utf8'));
  const meta = JSON.parse(await readFile(path.join(DIR, '99-technik', 'video.json'), 'utf8'));
  const prompt = await readFile(path.join(DIR, '00-bildprompts', 'google-flow-prompt.txt'), 'utf8');
  const script = await readFile(path.join(DIR, '01-voice-script', 'voice-script.txt'), 'utf8');
  const caption = await readFile(path.join(DIR, '03-export', 'CAPTION.txt'), 'utf8');

  assert.equal(meta.pipelineVersion, 4);
  assert.equal(mapping.images.length, 21);
  assert.equal(meta.plannedImageCount, 21);
  assert.deepEqual(meta.imageDensityPolicy.targetAverageHoldSeconds, [2.5, 4.2]);
  assert.equal(meta.imageDensityPolicy.visualMustSupportCurrentNarration, true);
  assert.equal(meta.imageDensityPolicy.figuresMustNotBeDefaultFallback, true);
  assert.ok(mapping.images.filter((image) => image.visualForm === 'multi-moment-illustration').length >= 2);
  assert.ok(mapping.images.every((image) => Number(image.promptQcScore) >= 8));
  assert.match(prompt, /HANNIBALS FEUERTRICK/);
  assert.match(prompt, /BILD 21/);
  assert.match(prompt, /dense collage/i);
  assert.match(script, /Doch da ist es zu spät\./);
  assert.match(script, /bevor der eigentliche Kampf überhaupt begann\./);
  assert.match(meta.youtubeUpload.description, /zweitausend Ochsen/i);
  assert.match(caption, /TITLE:/);
  assert.match(caption, /DESCRIPTION:/);
  assert.match(caption, /HANNIBALS FEUERTRICK/);
});
