import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { validatePreproduction } from '../src/cli/validate-youtube-preproduction.js';
import { validatePhase1Full } from '../src/cli/validate-youtube-phase1-full.js';

const dir = 'youtube/2026-KW40_28-09_bis_04-10/medieval-city-gates-night';

test('World-led Stadttor-Test besteht Preproduction, Alignment, Directing und Phase 1', async () => {
  const pre = await validatePreproduction(dir);
  assert.equal(pre.passed, true, pre.errors.join('\n'));
  assert.ok(pre.topicScore >= 8.3);

  const meta = JSON.parse(await readFile(`${dir}/99-technik/video.json`, 'utf8'));
  const scorecard = JSON.parse(await readFile(`${dir}/99-technik/TOPIC_SCORECARD.json`, 'utf8'));
  const mapping = JSON.parse(await readFile(`${dir}/99-technik/BILD_AUDIO_ZUORDNUNG.json`, 'utf8'));
  const renderPlan = JSON.parse(await readFile(`${dir}/99-technik/YOUTUBE_RENDER_PLAN.json`, 'utf8'));

  assert.equal(meta.storyMode, 'world-led');
  assert.equal(scorecard.storyMode, 'world-led');
  assert.equal(scorecard.mainCharacterRequired, false);
  assert.ok(scorecard.humanRepresentationPlan.length > 30);
  assert.equal(mapping.images.length, 19);
  assert.equal(new Set(mapping.images.map((image) => image.colorPhase)).size, 4);
  assert.ok(mapping.images.filter((image) => image.motionType === 'static' || image.motionIntensity === 'none').length >= 4);
  assert.equal(renderPlan.motionPolicy, 'content-aware-v1');

  const phase1 = await validatePhase1Full(dir);
  assert.equal(phase1.passed, true, phase1.errors.join('\n'));
});