#!/usr/bin/env node

import path from 'node:path';
import { arg, projectPaths, readJson } from '../lib/pipeline.js';

export async function validatePacing(projectDirectory) {
  const p = projectPaths(projectDirectory);
  const [timeline, pipeline, meta] = await Promise.all([
    readJson(p.timeline), readJson(path.resolve('config/pipeline.json')), readJson(p.meta)
  ]);
  const legacyPolicy = pipeline.imagePolicy;
  const errors = [];
  const warnings = [];
  const images = timeline.images ?? [];
  if (!images.length) errors.push('Timeline enthält keine Bilder.');

  let semantic = null;
  if (Number(meta.semanticPacingGateVersion ?? 0) >= 1) {
    const direction = await readJson(path.resolve(meta.directionPolicyFile || 'config/direction-policy.json'));
    semantic = direction.semanticPacing;
  }

  for (const image of images) {
    const duration = Number(image.durationSeconds);
    const contentDuration = Number(image.contentDurationSeconds ?? duration);
    if (!Number.isFinite(duration) || duration <= 0) errors.push(`Ungültige Dauer bei Bild ${image.imageNumber}.`);

    if (semantic) {
      const hardMin = Number(semantic.hardMinimumSeconds);
      const preferredMin = Number(semantic.preferredMinimumSeconds);
      const preferredMax = Number(semantic.preferredMaximumSeconds);
      const emphasisMax = Number(semantic.emphasisMaximumSeconds);
      const absoluteMax = Number(semantic.absoluteMaximumSeconds);
      const importance = String(image.beatImportance ?? '');
      const longAllowed = new Set(semantic.longHoldAllowedBeatImportance ?? []);
      const planned = Number(image.plannedHoldSeconds);
      if (contentDuration < hardMin) errors.push(`Bild ${image.imageNumber}: Inhalts-Hold ${contentDuration}s liegt unter Hard-Min ${hardMin}s.`);
      if (contentDuration > absoluteMax) errors.push(`Bild ${image.imageNumber}: Inhalts-Hold ${contentDuration}s überschreitet Hard-Max ${absoluteMax}s.`);
      if (contentDuration > preferredMax && !longAllowed.has(importance)) errors.push(`Bild ${image.imageNumber}: ${contentDuration}s sind für beatImportance=${importance || 'FEHLT'} zu lang.`);
      if (contentDuration > emphasisMax && !String(image.holdReason ?? '').trim()) errors.push(`Bild ${image.imageNumber}: Hold über ${emphasisMax}s braucht eine konkrete holdReason.`);
      if (contentDuration < preferredMin && contentDuration >= hardMin) warnings.push(`Bild ${image.imageNumber}: kurzer, aber zulässiger Hold (${contentDuration}s).`);
      if (Number.isFinite(planned) && planned > 0) {
        const delta = Math.abs(contentDuration - planned);
        if (delta > Number(semantic.maximumPlanVsActualDeltaSeconds ?? 1.6)) errors.push(`Bild ${image.imageNumber}: echtes Timing weicht ${delta.toFixed(2)}s vom geplanten Hold ab (${planned}s → ${contentDuration}s). Mapping/Beat neu koordinieren.`);
      }
    } else {
      if (duration > Number(legacyPolicy.hardMaximumSeconds)) errors.push(`Bild ${image.imageNumber} überschreitet Hard-Max ${legacyPolicy.hardMaximumSeconds}s (${duration}s).`);
      else if (duration > Number(legacyPolicy.preferSplitAboveSeconds)) warnings.push(`Bild ${image.imageNumber}: ${duration}s — Split stark empfohlen.`);
      else if (duration > Number(legacyPolicy.reviewAboveSeconds)) warnings.push(`Bild ${image.imageNumber}: ${duration}s — Split prüfen.`);
      if (duration < Number(legacyPolicy.minimumUsefulHoldSeconds)) warnings.push(`Bild ${image.imageNumber}: sehr kurzer Hold (${duration}s).`);
    }
  }

  for (let i = 0; i < images.length - 1; i += 1) {
    const gap = Number(images[i + 1].startSeconds) - Number(images[i].endSeconds);
    if (Math.abs(gap) > 0.002) errors.push(`Timeline-Lücke/Überlappung zwischen Bild ${images[i].imageNumber} und ${images[i + 1].imageNumber}: ${gap}s.`);
  }

  const totalContent = images.reduce((sum, image) => sum + Number(image.contentDurationSeconds ?? image.durationSeconds ?? 0), 0);
  const avg = images.length ? totalContent / images.length : 0;
  const target = semantic ? [Number(semantic.preferredMinimumSeconds), Number(semantic.preferredMaximumSeconds)] : legacyPolicy.targetAverageHoldSeconds;
  if (avg < target[0] - 0.4 || avg > target[1] + 0.4) warnings.push(`Durchschnittlicher Inhalts-Hold ${avg.toFixed(2)}s liegt außerhalb des bevorzugten Bereichs ${target[0]}–${target[1]}s.`);

  return { passed: errors.length === 0, errors, warnings, averageHoldSeconds: Number(avg.toFixed(3)) };
}

async function main() {
  const dir = arg('--dir');
  if (!dir) throw new Error('Nutzung: npm run validate:youtube-pacing -- --dir "youtube/<week>/<slug>"');
  const result = await validatePacing(dir);
  for (const warning of result.warnings) console.warn(`WARNUNG: ${warning}`);
  if (!result.passed) {
    for (const error of result.errors) console.error(`- ${error}`);
    throw new Error(`${result.errors.length} Pacing-Regel(n) verletzt.`);
  }
  console.log(`YouTube Pacing: BESTANDEN — Ø ${result.averageHoldSeconds}s/Bild`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(`YouTube Pacing: FEHLER — ${error.message}`);
    process.exitCode = 1;
  });
}
