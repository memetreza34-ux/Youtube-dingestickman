import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { calculateTopicWeightedScore, validateTopicScorecard } from '../src/lib/topic-quality.js';

function baseScorecard(schemaVersion = 3) {
  return {
    schemaVersion,
    status: 'APPROVED',
    candidate: 'Warum mittelalterliche Städte nachts ihre Tore schlossen',
    proposedTitle: 'Warum mittelalterliche Stadttore nachts geschlossen wurden',
    topicFamily: 'daily_life_with_real_question',
    discovery: { rawCandidateCount: 30, shortlistSize: 12, selectedRank: 1, selectedFromShortlist: true },
    duplicateCheckDecision: 'APPROVED_NEW',
    storyEnginePresent: true,
    isolatedAnecdoteOnly: false,
    diversityGatePassed: true,
    largerHistoricalPoint: 'Stadttore regelten Sicherheit, Handel und Bewegungsfreiheit im Alltag.',
    sourceabilityEvidence: 'Stadtordnungen, Forschung zu Stadtbefestigungen und Alltagsgeschichte sind verfügbar.',
    historicalStoryCorePresent: true,
    mechanismOnlyTopic: false,
    concreteHumanStakes: 'Händler, Reisende, Wachen und Bewohner sind direkt von Schließzeiten und Zugang betroffen.',
    eventProgression: 'Tagbetrieb → Abend → Tore schließen → Menschen bleiben draußen oder werden kontrolliert → Stadt verändert ihren Rhythmus → Morgenöffnung.',
    expectedExplanationMechanismShare: 0.2,
    titleDirections: ['Warum die Tore nachts zugingen', 'Nachts war die Stadt zu', 'Was nach Sonnenuntergang am Stadttor geschah'],
    visualForms: ['character-scene', 'architecture-city', 'object-focus', 'process-sequence', 'environment-only', 'map-geography'],
    scores: { curiosityGap: 9, stakes: 8.3, storyEngine: 8.8, visualPotential: 9.2, historicalSignificance: 8, freshnessDistinctiveness: 9, titlePotential: 9, sourceability: 9 },
    approvedByTopicDirector: true
  };
}

function finalize(scorecard, policy) {
  scorecard.weightedScore = calculateTopicWeightedScore(scorecard, policy);
  scorecard.qualityBand = scorecard.weightedScore >= 8.3 ? 'PRIORITY' : 'STRONG';
  return scorecard;
}

test('world-led funktioniert ohne Hauptfigur und mit repräsentativen historischen Menschen', async () => {
  const policy = JSON.parse(await readFile('config/topic-policy.json', 'utf8'));
  const scorecard = finalize({
    ...baseScorecard(3),
    storyMode: 'world-led',
    mainCharacterRequired: false,
    humanRepresentationPlan: 'Wechselnde historisch plausible Händler, Wachen, Reisende und Bewohner tragen einzelne Szenen; keine erfundene wiederkehrende Hauptfigur.'
  }, policy);
  const result = validateTopicScorecard(scorecard, policy);
  assert.equal(result.passed, true, result.errors.join('\n'));
});

test('event-led funktioniert ohne Hauptfigur', async () => {
  const policy = JSON.parse(await readFile('config/topic-policy.json', 'utf8'));
  const scorecard = finalize({
    ...baseScorecard(3),
    candidate: 'Wie ein Stadtbrand eine Stadt veränderte',
    proposedTitle: 'Die Nacht, in der die Stadt brannte',
    storyMode: 'event-led',
    mainCharacterRequired: false,
    humanRepresentationPlan: 'Feuerwehrähnliche historische Helfer, Bewohner, Händler und Wachen wechseln je nach Beat; das Ereignis ist der Story-Anker.'
  }, policy);
  const result = validateTopicScorecard(scorecard, policy);
  assert.equal(result.passed, true, result.errors.join('\n'));
});

test('character-led verlangt weiterhin eine Hauptfigur', async () => {
  const policy = JSON.parse(await readFile('config/topic-policy.json', 'utf8'));
  const scorecard = finalize({
    ...baseScorecard(3),
    storyMode: 'character-led',
    mainCharacterRequired: false,
    humanRepresentationPlan: 'Eine reale Hauptfigur soll die Handlung tragen.'
  }, policy);
  const result = validateTopicScorecard(scorecard, policy);
  assert.equal(result.passed, false);
  assert.match(result.errors.join('\n'), /character-led.*mainCharacterRequired=true/i);
});

test('alte Schema-V2-Scorecards bleiben rückwärtskompatibel', async () => {
  const policy = JSON.parse(await readFile('config/topic-policy.json', 'utf8'));
  const scorecard = finalize(baseScorecard(2), policy);
  const result = validateTopicScorecard(scorecard, policy);
  assert.equal(result.passed, true, result.errors.join('\n'));
});

test('neues Template fordert Story-Modus, ohne andere Produktionsgates zu entfernen', async () => {
  const topic = JSON.parse(await readFile('youtube/templates/video-template/99-technik/TOPIC_SCORECARD.json', 'utf8'));
  const meta = JSON.parse(await readFile('youtube/templates/video-template/99-technik/video.json', 'utf8'));
  const channel = JSON.parse(await readFile('config/channel-policy.json', 'utf8'));
  assert.equal(topic.schemaVersion, 3);
  assert.ok(Object.hasOwn(topic, 'storyMode'));
  assert.ok(Object.hasOwn(topic, 'mainCharacterRequired'));
  assert.ok(Object.hasOwn(topic, 'humanRepresentationPlan'));
  assert.ok(Object.hasOwn(meta, 'storyMode'));
  assert.equal(meta.narrationAlignmentGateVersion, 1);
  assert.equal(meta.directingGateVersion, 1);
  assert.equal(meta.phase2VisualQcHashVersion, 1);
  assert.deepEqual(channel.topicSystem.allowedStoryModes, ['character-led', 'event-led', 'world-led']);
  assert.equal(channel.topicSystem.namedMainCharacterRequired, false);
  assert.equal(channel.visualSystem.representativeHistoricalHumansAllowed, true);
});
