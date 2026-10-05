import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { validatePreproduction } from '../src/cli/validate-youtube-preproduction.js';
import { validatePhase1Full } from '../src/cli/validate-youtube-phase1-full.js';

const dir = 'youtube/2026-KW41_05-10_bis_11-10/great-fire-london-1666';

function maxTrueRun(items, selector) {
  let current = 0;
  let maximum = 0;
  for (const item of items) {
    if (selector(item)) {
      current += 1;
      maximum = Math.max(maximum, current);
    } else current = 0;
  }
  return maximum;
}

test('Great-Fire-London ist ein echtes 6–7-Minuten-Longform und besteht alle Phase-1-Gates', async () => {
  const pre = await validatePreproduction(dir);
  assert.equal(pre.passed, true, pre.errors.join('\n'));
  assert.ok(pre.topicScore >= 9.4);

  const [meta, scorecard, mapping, renderPlan, wholeQc, prompt, script] = await Promise.all([
    readFile(`${dir}/99-technik/video.json`, 'utf8').then(JSON.parse),
    readFile(`${dir}/99-technik/TOPIC_SCORECARD.json`, 'utf8').then(JSON.parse),
    readFile(`${dir}/99-technik/BILD_AUDIO_ZUORDNUNG.json`, 'utf8').then(JSON.parse),
    readFile(`${dir}/99-technik/YOUTUBE_RENDER_PLAN.json`, 'utf8').then(JSON.parse),
    readFile(`${dir}/99-technik/WHOLE_VIDEO_QC.json`, 'utf8').then(JSON.parse),
    readFile(`${dir}/00-bildprompts/google-flow-prompt.txt`, 'utf8'),
    readFile(`${dir}/01-voice-script/voice-script.txt`, 'utf8')
  ]);

  assert.equal(meta.storyMode, 'event-led');
  assert.equal(scorecard.mainCharacterRequired, false);
  assert.equal(meta.targetDurationSeconds, 375);
  assert.deepEqual(meta.targetDurationRangeSeconds, [360, 420]);
  assert.equal(meta.plannedImageCount, 84);
  assert.equal(mapping.images.length, 84);
  assert.equal(meta.coverPolicy.coverText, 'LONDON BRENNT VIER TAGE');
  assert.ok(script.split(/\s+/).filter(Boolean).length >= 950);
  assert.ok(script.split(/\s+/).filter(Boolean).length <= 1150);

  assert.equal(new Set(mapping.images.map((image) => image.colorPhase)).size, 12);
  assert.ok(new Set(mapping.images.map((image) => image.visualForm)).size >= 9);
  assert.ok(new Set(mapping.images.map((image) => image.shotScale)).size >= 7);
  assert.ok(mapping.images.every((image) => image.narrationMatchScore >= 9));
  assert.ok(mapping.images.every((image) => image.clarityScore >= 8));
  assert.ok(mapping.images.filter((image) => image.explanationOnly).length / mapping.images.length <= 0.35);
  assert.ok(maxTrueRun(mapping.images, (image) => image.explanationOnly) <= 2);
  assert.equal(wholeQc.visualsDerivedAfterScript, true);
  assert.equal(wholeQc.coherentVisualArc, true);
  assert.equal(renderPlan.motionPolicy, 'content-aware-v1');

  assert.match(prompt, /The headings BILD 01 through BILD 84 are prompt metadata only\./);
  assert.equal((prompt.match(/^BILD\s+\d+\s*$/gm) ?? []).length, 84);
  assert.equal((prompt.match(/DIRECTING — HARD:/g) ?? []).length, 84);
  assert.match(prompt, /LONDON BRENNT VIER TAGE/);
  assert.match(prompt, /BILD 84/);

  const phase1 = await validatePhase1Full(dir);
  assert.equal(phase1.passed, true, phase1.errors.join('\n'));
});
