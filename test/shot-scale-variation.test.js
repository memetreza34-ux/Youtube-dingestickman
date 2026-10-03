import assert from 'node:assert/strict';
import test from 'node:test';

import { validateVisualInterestSequence } from '../src/lib/visual-interest.js';

const policy = {
  maxConsecutiveSameVisualForm: 2,
  maxConsecutiveCharacterScenes: 2,
  maxConsecutiveSameShotScale: 2,
  maxConsecutiveExplanationOnlyVisuals: 2,
  minimumDistinctVisualFormsPer10Images: 3
};

test('drei gleiche Shot-Scale-Werte sind nur bei echter Regievariation zulässig', () => {
  const images = [
    {
      visualForm: 'character-scene',
      shotScale: 'wide',
      camera: 'wide water-level view',
      visualChangeFromPrevious: 'switch from guard post to moving boat',
      explanationOnly: false
    },
    {
      visualForm: 'battle-city-overview',
      shotScale: 'wide',
      camera: 'wide over-the-shoulder view from French side',
      visualChangeFromPrevious: 'switch viewpoint to the French force',
      explanationOnly: false
    },
    {
      visualForm: 'cause-effect',
      shotScale: 'wide',
      camera: 'wide elevated road view',
      visualChangeFromPrevious: 'move from barrier overview to one blocked route',
      explanationOnly: false
    }
  ];

  const errors = validateVisualInterestSequence(images, policy);
  assert.equal(errors.some((error) => /Shot-Monotonie/i.test(error)), false, errors.join('\n'));
});

test('drei tatsächlich ähnliche Wide-Shots bleiben verboten', () => {
  const images = [1, 2, 3].map(() => ({
    visualForm: 'character-scene',
    shotScale: 'wide',
    camera: 'wide eye-level frontal view',
    visualChangeFromPrevious: 'minor character change only',
    explanationOnly: false
  }));

  const errors = validateVisualInterestSequence(images, policy);
  assert.equal(errors.some((error) => /Shot-Monotonie/i.test(error)), true, errors.join('\n'));
});
