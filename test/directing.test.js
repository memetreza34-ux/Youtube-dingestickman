import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { injectDirectingIntoPrompt, motionFromScene, validateDirectingPlan } from '../src/lib/directing.js';

test('Directing Gate akzeptiert geplanten Color Arc und gemischte Motion', async () => {
  const policy = JSON.parse(await readFile('config/directing-policy.json', 'utf8'));
  const meta = { directingGateVersion: 1 };
  const mapping = { images: [
    { imageNumber: 1, colorPhase: 'warm-start', colorIntent: 'warm dry daylight', worldLifeDetail: 'workers on road', motionType: 'static', motionDirection: 'none', motionIntensity: 'none', motionFocus: 'city gate' },
    { imageNumber: 2, colorPhase: 'warm-start', colorIntent: 'rust accents', worldLifeDetail: 'wagon dust', motionType: 'push-in', motionDirection: 'center', motionIntensity: 'subtle', motionFocus: 'marching column' },
    { imageNumber: 3, colorPhase: 'crisis', colorIntent: 'cool storm light', worldLifeDetail: 'wind and smoke', motionType: 'pan-right', motionDirection: 'right', motionIntensity: 'medium', motionFocus: 'retreat route' },
    { imageNumber: 4, colorPhase: 'crisis', colorIntent: 'cold wet gray', worldLifeDetail: 'mud and rain', motionType: 'static', motionDirection: 'none', motionIntensity: 'none', motionFocus: 'floodgate' },
    { imageNumber: 5, colorPhase: 'resolution', colorIntent: 'clear cool morning', worldLifeDetail: 'boat patrol', motionType: 'pull-out', motionDirection: 'center', motionIntensity: 'subtle', motionFocus: 'water barrier' }
  ] };
  const renderPlan = { schemaVersion: 2, motionPolicy: 'content-aware-v1', colorArc: [
    { id: 'warm-start', storyFunction: 'Ausgangslage', paletteBias: 'warm earth', lighting: 'dry daylight' },
    { id: 'crisis', storyFunction: 'Krise', paletteBias: 'cool gray', lighting: 'storm light' },
    { id: 'resolution', storyFunction: 'Folge', paletteBias: 'cool green-blue', lighting: 'clear morning' }
  ] };
  const result = validateDirectingPlan({ meta, mapping, renderPlan, policy });
  assert.equal(result.passed, true, result.errors.join('\n'));
});

test('Directing Gate blockiert monotone Ein-Farbphase', async () => {
  const policy = JSON.parse(await readFile('config/directing-policy.json', 'utf8'));
  const scene = (n) => ({ imageNumber: n, colorPhase: 'same', colorIntent: 'same beige blue', worldLifeDetail: 'empty field', motionType: n % 2 ? 'static' : 'push-in', motionDirection: 'center', motionIntensity: n % 2 ? 'none' : 'subtle', motionFocus: 'field' });
  const mapping = { images: Array.from({ length: 9 }, (_, i) => scene(i + 1)) };
  const result = validateDirectingPlan({ meta: { directingGateVersion: 1 }, mapping, renderPlan: { schemaVersion: 2, motionPolicy: 'content-aware-v1', colorArc: [{}, {}, {}] }, policy });
  assert.equal(result.passed, false);
  assert.match(result.errors.join('\n'), /Color-Arc|Farbphase/i);
});

test('Motion Director skaliert Bewegung mit realer Szenendauer', () => {
  const scene = { motionType: 'pan-right', motionIntensity: 'medium', motionFocus: 'moving army' };
  const shortMotion = motionFromScene(scene, 2);
  const longMotion = motionFromScene(scene, 5);
  const shortTravel = Math.abs(shortMotion.xTo - shortMotion.xFrom);
  const longTravel = Math.abs(longMotion.xTo - longMotion.xFrom);
  assert.ok(longTravel > shortTravel);
  assert.equal(shortMotion.type, 'pan-right');
});

test('Flow-Prompt erhält Color- und World-Life-Regie', () => {
  const prompt = 'HEADER\n\nBILD 01\nScene one\n\nBILD 02\nScene two';
  const mapping = { images: [
    { imageNumber: 1, colorPhase: 'dry', colorIntent: 'warm dry earth', worldLifeDetail: 'cart wheels and workers' },
    { imageNumber: 2, colorPhase: 'crisis', colorIntent: 'cold storm gray', worldLifeDetail: 'mud and wind' }
  ] };
  const renderPlan = { colorArc: [
    { id: 'dry', storyFunction: 'Ausgangslage', paletteBias: 'warm earth', lighting: 'clear daylight' },
    { id: 'crisis', storyFunction: 'Krise', paletteBias: 'cool gray', lighting: 'storm' },
    { id: 'end', storyFunction: 'Auflösung', paletteBias: 'clear cool', lighting: 'morning' }
  ] };
  const output = injectDirectingIntoPrompt(prompt, mapping, renderPlan);
  assert.match(output, /COLOR & WORLD ARC — HARD/);
  assert.match(output, /warm dry earth/);
  assert.match(output, /mud and wind/);
});

test('Directing-Injektion verändert globale BILD-Metadatenregel nicht', () => {
  const prompt = 'INTERNAL METADATA RULE — HARD:\nThe headings BILD 01 through BILD 02 are prompt metadata only.\n\nBILD 01\nScene one\n\nBILD 02\nScene two';
  const mapping = { images: [
    { imageNumber: 1, colorPhase: 'start', colorIntent: 'night blue', worldLifeDetail: 'closed windows' },
    { imageNumber: 2, colorPhase: 'end', colorIntent: 'dawn amber', worldLifeDetail: 'market cart' }
  ] };
  const renderPlan = { colorArc: [
    { id: 'start', storyFunction: 'Start', paletteBias: 'night blue', lighting: 'night' },
    { id: 'middle', storyFunction: 'Mitte', paletteBias: 'gray', lighting: 'overcast' },
    { id: 'end', storyFunction: 'Ende', paletteBias: 'amber', lighting: 'dawn' }
  ] };
  const output = injectDirectingIntoPrompt(prompt, mapping, renderPlan);
  assert.match(output, /The headings BILD 01 through BILD 02 are prompt metadata only\./);
  assert.equal((output.match(/DIRECTING — HARD:/g) ?? []).length, 2);
  assert.match(output, /BILD 01\nDIRECTING — HARD:/);
  assert.match(output, /BILD 02\nDIRECTING — HARD:/);
});

test('Neues Template aktiviert Directing Gate und Regiefelder', async () => {
  const meta = JSON.parse(await readFile('youtube/templates/video-template/99-technik/video.json', 'utf8'));
  const mapping = JSON.parse(await readFile('youtube/templates/video-template/99-technik/BILD_AUDIO_ZUORDNUNG.json', 'utf8'));
  const renderPlan = JSON.parse(await readFile('youtube/templates/video-template/99-technik/YOUTUBE_RENDER_PLAN.json', 'utf8'));
  assert.equal(meta.directingGateVersion, 1);
  assert.equal(meta.directingPolicyFile, 'config/directing-policy.json');
  assert.ok(Object.hasOwn(mapping.images[0], 'colorPhase'));
  assert.ok(Object.hasOwn(mapping.images[0], 'worldLifeDetail'));
  assert.ok(Object.hasOwn(mapping.images[0], 'motionType'));
  assert.ok(Object.hasOwn(mapping.images[0], 'motionFocus'));
  assert.equal(renderPlan.schemaVersion, 2);
  assert.equal(renderPlan.motionPolicy, 'content-aware-v1');
  assert.equal(renderPlan.colorArc.length, 3);
});
