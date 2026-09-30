import test from 'node:test';
import assert from 'node:assert/strict';
import { compileFlowPrompt, compileScenePrompt } from '../src/lib/flow-prompt.js';

const styleLock = {
  status: 'READY',
  styleId: 'history-stickman-adaptive-v1',
  masterStylePrompt: 'Use one immutable hand-drawn 2D historical explainer illustration language.',
  sceneStyleAnchor: 'Keep the exact locked channel rendering unchanged: flat hand-drawn 2D history-explainer illustration.',
  globalNegativePrompt: 'No photorealism or 3D rendering.',
  highRiskPromptWords: ['cinematic', 'epic'],
  referencePolicy: {
    instruction: 'Use attached style references only for linework and proportions.'
  }
};

const baseScene = {
  imageNumber: 1,
  viewerTakeaway: 'The castle is isolated even though its walls remain intact.',
  visualPurpose: 'Show blockade rather than direct destruction.',
  topicAnchor: 'Medieval castle under blockade.',
  visualForm: 'architecture-city',
  visualConcept: 'An intact fortress is separated from the outside world by a visibly blocked road and a large empty distance.',
  dominantSubject: 'the intact pale stone fortress',
  actionState: 'it remains physically undamaged but completely cut off',
  composition: 'the fortress fills the upper middle of frame while the blocked road leads from the foreground toward the sealed gate',
  camera: 'a slightly elevated wide establishing view',
  depthPlan: 'foreground blocked road, midground gate and barrier, simplified hills in the background',
  lightingMood: 'cool overcast daylight with restrained contrast',
  supportingElements: ['one road barrier', 'one stopped supply cart'],
  continuityNote: 'Keep the gate silhouette and stone colors identical whenever the castle returns.',
  historicalAccuracyNote: 'Use plausible 13th-century materials and no fantasy fortification details.',
  promptQcScore: 9,
  plannedHoldSeconds: 6,
  imageFile: 'Bild 01.png',
  startAnchor: 'Test anchor'
};

const worldLock = {
  status: 'READY',
  settingName: 'the test fortress in 1266',
  settingDescription: 'Pale tan-gray stone walls, one broad gatehouse and a massive central keep.',
  recurringPlaces: ['the same broad gatehouse'],
  recurringCharacters: [],
  recurringProps: ['the same wooden road barrier'],
  basePalette: ['stone gray', 'muted brown'],
  timeWeatherLogic: 'Overcast daylight unless a later scene explicitly changes the time.',
  continuityRules: ['Preserve the gate silhouette whenever the exterior returns.']
};

test('compileFlowPrompt repeats the locked style anchor per scene and preserves the cover gate', () => {
  const secondScene = {
    ...baseScene,
    imageNumber: 2,
    imageFile: 'Bild 02.png',
    startAnchor: 'Second anchor',
    visualConcept: 'The same blocked road is shown closer with the stopped cart unable to reach the gate.',
    dominantSubject: 'the stopped supply cart',
    actionState: 'it is halted in front of the barrier',
    camera: 'a medium-wide road-level view'
  };

  const prompt = compileFlowPrompt({
    meta: {
      visualStyleId: styleLock.styleId,
      title: 'Test video',
      topic: 'A historical blockade',
      aspectRatio: '16:9',
      plannedImageCount: 2,
      coverPolicy: { coverText: 'BURG OHNE NAHRUNG' }
    },
    mapping: { images: [baseScene, secondScene] },
    styleLock,
    worldLock
  });

  assert.match(prompt, /PROMPT_SYSTEM: flow-compiler-v3/);
  assert.match(prompt, /CHANNEL STYLE — IMMUTABLE:/);
  assert.match(prompt, /VIDEO WORLD LOCK — IMMUTABLE WITHIN THIS VIDEO:/);
  assert.equal(prompt.split(styleLock.sceneStyleAnchor).length - 1, 2);
  assert.match(prompt, /Integrate exactly this German cover text: "BURG OHNE NAHRUNG"/);
  assert.match(prompt, /BILD 02[\s\S]*No visible text/);
  assert.match(prompt, /After three acceptable candidates exist, STOP/);
});

test('compileScenePrompt rejects generic style-drift words', () => {
  assert.throws(
    () => compileScenePrompt({ ...baseScene, lightingMood: 'cinematic dramatic light' }, { styleLock, coverText: 'TEST COVER', isCover: true }),
    /Style-Drift-Risikowörter/
  );
});
