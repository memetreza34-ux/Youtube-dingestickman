import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  injectNarrationAlignmentIntoPrompt,
  validateNarrationAlignmentProject,
  validateNarrationAlignmentSequence
} from '../src/lib/narration-alignment.js';
import { validateWholeVideoQc } from '../src/lib/whole-video-quality.js';

test('Narration Alignment Gate akzeptiert klare chronologische Scene Cards', async () => {
  const policy = JSON.parse(await readFile('config/narration-alignment-policy.json', 'utf8'));
  const script = 'Im April beginnt die Belagerung. Wochen später ist die Mauer beschädigt.';
  const mapping = {
    images: [
      {
        imageNumber: 1,
        narrationBeat: 'Im April beginnt die Belagerung.',
        timeContext: 'April, Beginn der Belagerung',
        chronologyStep: 1,
        visualAnswer: 'Die Belagerung beginnt vor einer noch intakten Mauer.',
        narrationMatchScore: 9.5,
        clarityScore: 9
      },
      {
        imageNumber: 2,
        narrationBeat: 'Wochen später ist die Mauer beschädigt.',
        timeContext: 'mehrere Wochen nach Beginn',
        chronologyStep: 2,
        visualAnswer: 'Dieselbe Mauer zeigt jetzt klar sichtbare Schäden.',
        narrationMatchScore: 9.4,
        clarityScore: 9
      }
    ]
  };
  const meta = {
    narrationAlignmentGateVersion: 1,
    chronologyPolicy: {
      mode: 'strict-chronological',
      flashbacksAllowed: false,
      futureEventLeakageForbidden: true
    }
  };
  const result = validateNarrationAlignmentProject({ meta, mapping, policy, script });
  assert.equal(result.passed, true, result.errors.join('\n'));
});

test('Narration Alignment Gate blockiert Rücksprünge und unpassende Bildlogik', async () => {
  const policy = JSON.parse(await readFile('config/narration-alignment-policy.json', 'utf8'));
  const images = [
    { narrationBeat: 'Später.', chronologyStep: 2 },
    { narrationBeat: 'Früher.', chronologyStep: 1 }
  ];
  const errors = validateNarrationAlignmentSequence(images, policy, 'Später. Früher.');
  assert.match(errors.join('\n'), /rückwärts|Chronologie/i);
});

test('Flow-Prompt erhält pro Bild exakten Narrations- und Zeitkontext', () => {
  const prompt = 'ACTIVE_STYLE_ID: test\n\nGOOGLE FLOW MASTER PROMPT\n\nNARRATION-FIRST RULE:\nTest\n\nBILD 01\nScene one\n\nBILD 02\nScene two';
  const mapping = {
    images: [
      {
        imageNumber: 1,
        narrationBeat: 'Die Armee erreicht die Stadt.',
        timeContext: 'Beginn der Belagerung',
        chronologyStep: 1,
        visualAnswer: 'Armee vor intakter Stadtmauer'
      },
      {
        imageNumber: 2,
        narrationBeat: 'Später entstehen erste Breschen.',
        timeContext: 'mehrere Wochen später',
        chronologyStep: 2,
        visualAnswer: 'lokale Bresche in derselben Mauer'
      }
    ]
  };
  const output = injectNarrationAlignmentIntoPrompt(prompt, mapping);
  assert.match(output, /CHRONOLOGY AND NARRATION ALIGNMENT — HARD/);
  assert.match(output, /Die Armee erreicht die Stadt/);
  assert.match(output, /Beginn der Belagerung/);
  assert.match(output, /Do not show later events/i);
  assert.match(output, /lokale Bresche/);
});

test('Neue WHOLE_VIDEO_QC-Schema-Version erzwingt Bild-Skript-Passung und Klarheit', async () => {
  const visual = JSON.parse(await readFile('config/visual-policy.json', 'utf8'));
  const base = {
    schemaVersion: 3,
    status: 'APPROVED',
    reviewMethod: 'model-review',
    scriptContinuousProse: true,
    scriptReadAloudPassed: true,
    visualsDerivedAfterScript: true,
    coherentVisualArc: true,
    chronologyMode: 'strict-chronological',
    chronologyReviewed: true,
    historicalEventOrderReviewed: true,
    visualOrderMatchesNarrationOrder: true,
    temporalJumpsExplicitlySignposted: true,
    unnecessaryFlashbacksAbsent: true,
    narrationVisualAlignmentReviewed: true,
    everyVisualMatchesCurrentNarration: true,
    visualClarityReviewed: true,
    unclearVisualsAbsent: true,
    onePrimaryTakeawayPerVisual: true,
    futureEventLeakageAbsent: true,
    explanationOnlyVisualShare: 0.2,
    maxConsecutiveExplanationOnlyVisuals: 1,
    historicalWorldReturnsAfterExplanation: true,
    editorialTextUsedOnlyWhenUseful: true,
    transitionsReviewed: true,
    overallCoherenceScore: 9,
    approved: true
  };
  assert.equal(validateWholeVideoQc(base, visual).passed, true);
  assert.equal(validateWholeVideoQc({ ...base, everyVisualMatchesCurrentNarration: false }, visual).passed, false);
  assert.equal(validateWholeVideoQc({ ...base, futureEventLeakageAbsent: false }, visual).passed, false);
});

test('Neues Projekt-Template aktiviert Narration Alignment standardmäßig', async () => {
  const meta = JSON.parse(await readFile('youtube/templates/video-template/99-technik/video.json', 'utf8'));
  const mapping = JSON.parse(await readFile('youtube/templates/video-template/99-technik/BILD_AUDIO_ZUORDNUNG.json', 'utf8'));
  const whole = JSON.parse(await readFile('youtube/templates/video-template/99-technik/WHOLE_VIDEO_QC.json', 'utf8'));
  assert.equal(meta.narrationAlignmentGateVersion, 1);
  assert.equal(meta.chronologyPolicy.mode, 'strict-chronological');
  assert.equal(meta.chronologyPolicy.flashbacksAllowed, false);
  assert.equal(mapping.schemaVersion, 3);
  assert.ok(Object.hasOwn(mapping.images[0], 'narrationBeat'));
  assert.ok(Object.hasOwn(mapping.images[0], 'visualAnswer'));
  assert.equal(whole.schemaVersion, 3);
  assert.ok(Object.hasOwn(whole, 'everyVisualMatchesCurrentNarration'));
});
