import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { buildMotionFromScene, validateDirectionProject } from '../src/lib/direction-quality.js';
import { validatePacing } from '../src/cli/validate-youtube-pacing.js';

function makeScene(number, section, motionType, motionDirection = 'none', motionIntensity = 'subtle') {
  const isStatic = motionType === 'static';
  return {
    imageNumber: number,
    colorArcSection: section,
    worldLifeDetail: `konkretes historisches Lebensdetail ${number}`,
    beatImportance: 'normal',
    plannedHoldSeconds: 3.5,
    holdReason: 'Der Beat braucht genug Zeit, um Motiv und Aussage sauber zu erfassen.',
    motionType,
    motionDirection: isStatic ? 'none' : motionDirection,
    motionIntensity: isStatic ? 'none' : motionIntensity,
    motionFocus: number % 2 ? 'left' : 'right',
    motionReason: isStatic ? 'Ruhe gibt dem wichtigen Bild Raum.' : 'Bewegung folgt dem sichtbaren Fokus des Beats.'
  };
}

test('Direction Gate akzeptiert Story-Color-Arc, lived-in world, Pacing und szenenbezogene Motion', async () => {
  const policy = JSON.parse(await readFile('config/direction-policy.json', 'utf8'));
  const meta = { directionQualityGateVersion: 1 };
  const colorArc = {
    status: 'READY',
    sections: [
      { id: 'a', storyFunction: 'Aufbau', startImage: 1, endImage: 3, paletteBias: 'warm dry earth', lighting: 'soft morning', atmosphere: 'clear and active', worldLife: 'workers, carts, wind', contrastPurpose: 'establish normal life' },
      { id: 'b', storyFunction: 'Krise', startImage: 4, endImage: 7, paletteBias: 'rust and gray-blue', lighting: 'hard side light', atmosphere: 'dust and pressure', worldLife: 'troops, smoke, disturbed roads', contrastPurpose: 'increase pressure' },
      { id: 'c', storyFunction: 'Folge', startImage: 8, endImage: 10, paletteBias: 'cool blue-gray', lighting: 'low wet light', atmosphere: 'wet reflective calm', worldLife: 'boats, mud, wet clothing', contrastPurpose: 'show transformed world' }
    ]
  };
  const motions = [
    ['static'], ['push-in'], ['pan', 'right'], ['static'], ['drift', 'left'],
    ['push-in'], ['static'], ['pan', 'right'], ['drift', 'left'], ['push-in']
  ];
  const mapping = { images: motions.map((entry, index) => makeScene(index + 1, index < 3 ? 'a' : index < 7 ? 'b' : 'c', entry[0], entry[1])) };
  const result = validateDirectionProject({ meta, mapping, colorArc, policy });
  assert.equal(result.passed, true, result.errors.join('\n'));
});

test('Direction Gate blockiert hektische geplante Holds', async () => {
  const policy = JSON.parse(await readFile('config/direction-policy.json', 'utf8'));
  const meta = { directionQualityGateVersion: 1 };
  const colorArc = {
    status: 'READY',
    sections: [
      { id: 'a', storyFunction: 'A', startImage: 1, endImage: 1, paletteBias: 'warm', lighting: 'soft', atmosphere: 'clear', worldLife: 'people', contrastPurpose: 'start' },
      { id: 'b', storyFunction: 'B', startImage: 2, endImage: 2, paletteBias: 'dark', lighting: 'hard', atmosphere: 'dust', worldLife: 'smoke', contrastPurpose: 'change' },
      { id: 'c', storyFunction: 'C', startImage: 3, endImage: 3, paletteBias: 'cool', lighting: 'low', atmosphere: 'wet', worldLife: 'boats', contrastPurpose: 'resolve' }
    ]
  };
  const mapping = { images: [
    makeScene(1, 'a', 'static'),
    { ...makeScene(2, 'b', 'push-in'), plannedHoldSeconds: 1.4 },
    makeScene(3, 'c', 'static')
  ] };
  const result = validateDirectionProject({ meta, mapping, colorArc, policy });
  assert.equal(result.passed, false);
  assert.match(result.errors.join('\n'), /Hard-Min 2\.2s/i);
});

test('Motion Director normalisiert Bewegung an Dauer und respektiert Fokus', () => {
  const scene = { motionType: 'push-in', motionDirection: 'none', motionIntensity: 'subtle', motionFocus: 'left' };
  const short = buildMotionFromScene(scene, 3);
  const long = buildMotionFromScene(scene, 5);
  const shortRate = (short.scaleTo - short.scaleFrom) / 3;
  const longRate = (long.scaleTo - long.scaleFrom) / 5;
  assert.ok(Math.abs(shortRate - longRate) < 0.00001);
  assert.equal(short.originX, 32);
  assert.equal(short.originY, 50);
});

test('Semantic Pacing trennt Schluss-Endhold von der Inhaltsdauer und blockiert echte Kurzshots', async () => {
  const temp = await mkdtemp(path.join(tmpdir(), 'semantic-pacing-'));
  try {
    const tech = path.join(temp, '99-technik');
    await mkdir(tech, { recursive: true });
    await writeFile(path.join(tech, 'video.json'), JSON.stringify({ semanticPacingGateVersion: 1, directionPolicyFile: 'config/direction-policy.json' }));
    await writeFile(path.join(tech, 'FINAL_TIMELINE.json'), JSON.stringify({
      images: [
        { imageNumber: 1, startSeconds: 0, endSeconds: 3.5, contentDurationSeconds: 3.5, plannedHoldSeconds: 3.5, beatImportance: 'normal', holdReason: 'normal beat' },
        { imageNumber: 2, startSeconds: 3.5, endSeconds: 8.3, contentDurationSeconds: 3.5, plannedHoldSeconds: 3.5, beatImportance: 'payoff', holdReason: 'final payoff plus separate end hold' }
      ]
    }));
    const good = await validatePacing(temp);
    assert.equal(good.passed, true, good.errors.join('\n'));

    await writeFile(path.join(tech, 'FINAL_TIMELINE.json'), JSON.stringify({
      images: [
        { imageNumber: 1, startSeconds: 0, endSeconds: 1.5, contentDurationSeconds: 1.5, plannedHoldSeconds: 3, beatImportance: 'normal', holdReason: 'too short' },
        { imageNumber: 2, startSeconds: 1.5, endSeconds: 5, contentDurationSeconds: 3.5, plannedHoldSeconds: 3.5, beatImportance: 'normal', holdReason: 'normal' }
      ]
    }));
    const bad = await validatePacing(temp);
    assert.equal(bad.passed, false);
    assert.match(bad.errors.join('\n'), /Hard-Min 2\.2s/i);
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});

test('Neues Projekt-Template aktiviert Direction-, Color-, Pacing- und Motion-Gates', async () => {
  const meta = JSON.parse(await readFile('youtube/templates/video-template/99-technik/video.json', 'utf8'));
  const mapping = JSON.parse(await readFile('youtube/templates/video-template/99-technik/BILD_AUDIO_ZUORDNUNG.json', 'utf8'));
  const whole = JSON.parse(await readFile('youtube/templates/video-template/99-technik/WHOLE_VIDEO_QC.json', 'utf8'));
  const arc = JSON.parse(await readFile('youtube/templates/video-template/99-technik/COLOR_WORLD_ARC.json', 'utf8'));
  assert.equal(meta.directionQualityGateVersion, 1);
  assert.equal(meta.colorWorldArcGateVersion, 1);
  assert.equal(meta.semanticPacingGateVersion, 1);
  assert.equal(meta.motionDirectorVersion, 1);
  assert.ok(Object.hasOwn(mapping.images[0], 'worldLifeDetail'));
  assert.ok(Object.hasOwn(mapping.images[0], 'motionReason'));
  assert.ok(Object.hasOwn(mapping.images[0], 'beatImportance'));
  assert.equal(whole.schemaVersion, 4);
  assert.equal(arc.status, 'PLANNED');
});
