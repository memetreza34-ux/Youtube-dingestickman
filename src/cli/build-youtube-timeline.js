#!/usr/bin/env node

import path from 'node:path';
import { arg, probeDuration, projectPaths, readJson, writeJson } from '../lib/pipeline.js';
import { buildMotionFromScene } from '../lib/direction-quality.js';

export async function buildTimeline(projectDirectory) {
  const p = projectPaths(projectDirectory);
  const [meta, mapping, renderPlan, pipeline] = await Promise.all([
    readJson(p.meta), readJson(p.mapping), readJson(p.renderPlan), readJson(path.resolve('config/pipeline.json'))
  ]);
  const audioDuration = await probeDuration(p.optimizedAudio);
  const hold = Number(meta.renderPolicy?.endHoldSeconds ?? pipeline.endHoldPolicy?.targetSeconds ?? 1.3);
  const images = mapping.images ?? [];
  if (!images.length) throw new Error('Mapping enthält keine Bilder.');
  if (images.some((image) => !Number.isFinite(Number(image.actualStartSeconds)))) throw new Error('Nicht alle Bilder besitzen gemessene Startzeiten.');

  let directionPolicy = null;
  if (Number(meta.motionDirectorVersion ?? 0) >= 1) {
    directionPolicy = await readJson(path.resolve(meta.directionPolicyFile || 'config/direction-policy.json'));
  }

  const overrideByImage = new Map((renderPlan.motionOverrides ?? []).map((item) => [Number(item.imageNumber), item]));
  const timelineImages = images.map((image, index) => {
    const start = index === 0 ? 0 : Number(image.actualStartSeconds);
    const next = images[index + 1];
    const contentEnd = next ? Number(next.actualStartSeconds) : audioDuration;
    const end = next ? contentEnd : audioDuration + hold;
    if (!(contentEnd > start)) throw new Error(`Ungültige Inhaltsdauer bei Bild ${image.imageNumber}: ${start} → ${contentEnd}`);
    const contentDuration = contentEnd - start;
    const baseMotion = directionPolicy
      ? buildMotionFromScene(image, contentDuration, directionPolicy.motionDirector)
      : { type: 'static', direction: 'none', intensity: 'none', focus: 'center', originX: 50, originY: 50, scaleFrom: 1.015, scaleTo: 1.015, xFrom: 0, xTo: 0, yFrom: 0, yTo: 0 };
    const motion = { ...baseMotion, ...(overrideByImage.get(Number(image.imageNumber)) ?? {}) };
    return {
      imageNumber: image.imageNumber,
      file: `__render/${meta.videoId}/images/${image.imageFile}`,
      startSeconds: Number(start.toFixed(3)),
      contentEndSeconds: Number(contentEnd.toFixed(3)),
      endSeconds: Number(end.toFixed(3)),
      contentDurationSeconds: Number(contentDuration.toFixed(3)),
      durationSeconds: Number((end - start).toFixed(3)),
      plannedHoldSeconds: Number(image.plannedHoldSeconds ?? 0),
      beatImportance: image.beatImportance ?? '',
      holdReason: image.holdReason ?? '',
      visualPurpose: image.visualPurpose ?? '',
      topicAnchor: image.topicAnchor ?? '',
      visualForm: image.visualForm ?? '',
      motionReason: image.motionReason ?? '',
      motion
    };
  });

  const sounds = (renderPlan.soundEffects ?? []).map((sound) => ({
    ...sound,
    file: sound.file ?? null
  }));

  const timeline = {
    schemaVersion: 2,
    createdAt: new Date().toISOString(),
    fps: Number(meta.renderPolicy?.fps ?? pipeline.fps ?? 30),
    width: Number(meta.renderPolicy?.width ?? pipeline.resolution.width),
    height: Number(meta.renderPolicy?.height ?? pipeline.resolution.height),
    audioDurationSeconds: audioDuration,
    endHoldSeconds: hold,
    durationSeconds: Number((audioDuration + hold).toFixed(3)),
    audioFile: `__render/${meta.videoId}/audio/YOUTUBE_AUDIO_OPTIMIZED.wav`,
    motionDirectorVersion: Number(meta.motionDirectorVersion ?? 0),
    images: timelineImages,
    sounds
  };
  await writeJson(p.timeline, timeline);
  console.log(`Timeline gebaut: ${timelineImages.length} Bilder, ${timeline.durationSeconds}s`);
  return timeline;
}

async function main() {
  const dir = arg('--dir');
  if (!dir) throw new Error('Nutzung: npm run build:youtube-timeline -- --dir "youtube/<week>/<slug>"');
  await buildTimeline(dir);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(`Timeline: FEHLER — ${error.message}`);
    process.exitCode = 1;
  });
}
