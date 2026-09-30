#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { arg, exists, projectPaths, readJson } from '../lib/pipeline.js';

function nonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function imageMarkerRegex(imageNumber) {
  const padded = String(imageNumber).padStart(2, '0');
  return new RegExp(`BILD\\s+0*${Number(padded)}(?:\\s|$)`, 'i');
}

function extractImagePrompt(prompt, imageNumber, totalImages) {
  const current = imageMarkerRegex(imageNumber);
  const match = current.exec(prompt);
  if (!match) return '';
  const start = match.index + match[0].length;
  if (imageNumber >= totalImages) return prompt.slice(start).trim();
  const next = imageMarkerRegex(imageNumber + 1);
  const remaining = prompt.slice(start);
  const nextMatch = next.exec(remaining);
  return (nextMatch ? remaining.slice(0, nextMatch.index) : remaining).trim();
}

function hasCompositionLanguage(text) {
  return /(foreground|midground|middle ground|background|wide view|medium-wide|medium shot|close view|close-up|low angle|high angle|elevated angle|over-the-shoulder|from behind|in frame|composition|perspective|negative space|leading line|left side|right side|centered|off-center)/i.test(text);
}

function hasComparisonLanguage(text) {
  return /(both|two sides|two opposing|opposite|contrast|compared|versus|vs\.?|on one side|on the other side|while|whereas|left side|right side)/i.test(text);
}

export async function validatePhase1(projectDirectory) {
  const p = projectPaths(projectDirectory);
  const errors = [];

  for (const required of [p.meta, p.mapping, p.prompt, p.script, p.renderPlan]) {
    if (!(await exists(required))) errors.push(`Pflichtdatei fehlt: ${path.relative(p.projectDir, required)}`);
  }
  if (errors.length) return { passed: false, errors };

  const [meta, mapping, visual, pipeline, prompt, script] = await Promise.all([
    readJson(p.meta),
    readJson(p.mapping),
    readJson(path.resolve('config/visual-policy.json')),
    readJson(path.resolve('config/pipeline.json')),
    readFile(p.prompt, 'utf8'),
    readFile(p.script, 'utf8')
  ]);

  if (visual.status !== 'READY') errors.push('config/visual-policy.json ist noch nicht READY. Neue Bildwelt zuerst definieren.');
  if (!visual.styleId || visual.styleId === 'UNSET') errors.push('visual-policy.styleId ist UNSET.');
  if (meta.visualStyleId !== visual.styleId) errors.push('video.json.visualStyleId entspricht nicht der aktiven neuen Bildwelt.');
  if (!meta.title || !meta.topic || !meta.topicSlug) errors.push('Titel, Thema oder Slug fehlen in video.json.');
  if (!Number.isInteger(meta.plannedImageCount) || meta.plannedImageCount < 1) errors.push('plannedImageCount muss in Phase 1 auf eine inhaltsgetriebene Bildzahl gesetzt werden.');
  if (!Number.isFinite(Number(meta.targetDurationSeconds)) || Number(meta.targetDurationSeconds) <= 0) errors.push('targetDurationSeconds fehlt.');
  if (meta.imageDensityPolicy?.fixedImageCountForbidden !== true) errors.push('Adaptive Bilddichte muss aktiv sein.');

  const hold = Number(meta.renderPolicy?.endHoldSeconds);
  const minHold = Number(pipeline.endHoldPolicy?.minimumSeconds ?? 1.2);
  const maxHold = Number(pipeline.endHoldPolicy?.maximumSeconds ?? 1.5);
  if (!Number.isFinite(hold) || hold < minHold || hold > maxHold) errors.push(`endHoldSeconds muss zwischen ${minHold} und ${maxHold} liegen.`);

  const cleanScript = script.trim();
  if (!cleanScript || /VOICE-OVER-SKRIPT HIER EINFÜGEN/i.test(cleanScript)) errors.push('Voice-over-Skript ist noch Platzhalter.');
  if (!prompt.includes(`ACTIVE_STYLE_ID: ${visual.styleId}`)) errors.push('Flow-Prompt nennt nicht die aktive neue styleId.');
  if (/ACTIVE_STYLE_ID:\s*UNSET/i.test(prompt)) errors.push('Flow-Prompt enthält noch UNSET.');

  const images = Array.isArray(mapping.images) ? mapping.images : [];
  if (Number.isInteger(meta.plannedImageCount) && images.length !== meta.plannedImageCount) {
    errors.push(`Mapping enthält ${images.length} Bilder, erwartet ${meta.plannedImageCount}.`);
  }
  if (images.length && mapping.videoLastImageNumber !== images.length) errors.push('videoLastImageNumber entspricht nicht der Mapping-Länge.');

  const sceneCardV2 = Number(mapping.schemaVersion) >= 2;
  const requiredSceneFields = Array.isArray(visual.requiredScenePlanningFields) ? visual.requiredScenePlanningFields : [];
  const supportedVisualForms = new Set(Array.isArray(visual.supportedVisualForms) ? visual.supportedVisualForms : []);
  const maxSupporting = Number(visual.maxSupportingElementsPerImage ?? 3);
  const minimumPromptQc = Number(visual.promptQcMinimumScore ?? 8);

  if (visual.visualDirectorRequired === true && !sceneCardV2) {
    errors.push('Bildplanung verwendet noch Schema V1. Neue Produktionen müssen Scene Card V2 verwenden.');
  }

  let lastAnchorIndex = -1;
  for (let index = 0; index < images.length; index += 1) {
    const image = images[index];
    const expected = index + 1;
    if (Number(image.imageNumber) !== expected) errors.push(`Bildnummern müssen lückenlos sein: erwartet ${expected}.`);
    if (image.imageFile !== `Bild ${String(expected).padStart(2, '0')}.png`) errors.push(`Falscher Dateiname bei Bild ${expected}.`);
    if (!image.startAnchor || String(image.startAnchor).startsWith('[')) errors.push(`Startanker fehlt/ist Platzhalter bei Bild ${expected}.`);
    if (!image.visualPurpose) errors.push(`visualPurpose fehlt bei Bild ${expected}.`);
    if (!image.topicAnchor) errors.push(`topicAnchor fehlt bei Bild ${expected}.`);
    if (!image.visualForm) errors.push(`visualForm fehlt bei Bild ${expected}.`);
    if (!Number.isFinite(Number(image.plannedHoldSeconds))) errors.push(`plannedHoldSeconds fehlt bei Bild ${expected}.`);

    if (image.visualForm && supportedVisualForms.size && !supportedVisualForms.has(image.visualForm)) {
      errors.push(`Nicht unterstützte visualForm bei Bild ${expected}: ${image.visualForm}.`);
    }

    if (sceneCardV2) {
      for (const field of requiredSceneFields) {
        if (field === 'supportingElements') {
          if (!Array.isArray(image.supportingElements)) errors.push(`supportingElements muss ein Array sein bei Bild ${expected}.`);
          continue;
        }
        if (field === 'promptQcScore') {
          const score = Number(image.promptQcScore);
          if (!Number.isFinite(score)) errors.push(`promptQcScore fehlt bei Bild ${expected}.`);
          else if (score < minimumPromptQc || score > 10) errors.push(`promptQcScore bei Bild ${expected} muss zwischen ${minimumPromptQc} und 10 liegen.`);
          continue;
        }
        if (!nonEmpty(image[field])) errors.push(`${field} fehlt bei Bild ${expected}.`);
      }

      if (Array.isArray(image.supportingElements) && image.supportingElements.length > maxSupporting) {
        errors.push(`Bild ${expected} hat ${image.supportingElements.length} Supporting Elements; erlaubt sind maximal ${maxSupporting}.`);
      }

      const block = extractImagePrompt(prompt, expected, images.length);
      if (!block) {
        errors.push(`Finaler Promptblock für BILD ${String(expected).padStart(2, '0')} fehlt.`);
      } else {
        if (block.length < 140) errors.push(`Prompt für Bild ${expected} ist zu knapp für Visual Director V2.`);
        if (!hasCompositionLanguage(block)) errors.push(`Prompt für Bild ${expected} enthält keine konkrete Kamera-/Kompositionssprache.`);
        if (image.visualForm === 'comparison' && !hasComparisonLanguage(block)) {
          errors.push(`Comparison bei Bild ${expected} wird im finalen Prompt nicht klar als Vergleich inszeniert.`);
        }
      }
    }

    if (image.startAnchor && !String(image.startAnchor).startsWith('[')) {
      const at = cleanScript.indexOf(image.startAnchor);
      if (at < 0) errors.push(`Startanker von Bild ${expected} kommt nicht exakt im Skript vor.`);
      else if (at <= lastAnchorIndex) errors.push(`Startanker von Bild ${expected} ist nicht monoton.`);
      else lastAnchorIndex = at;
    }

    if (!imageMarkerRegex(expected).test(prompt)) errors.push(`BILD ${String(expected).padStart(2, '0')} fehlt im Flow-Prompt.`);
  }

  return { passed: errors.length === 0, errors };
}

async function main() {
  const dir = arg('--dir');
  if (!dir) throw new Error('Nutzung: npm run validate:youtube-phase1 -- --dir "youtube/<week>/<slug>"');
  const result = await validatePhase1(dir);
  if (!result.passed) {
    for (const error of result.errors) console.error(`- ${error}`);
    throw new Error(`${result.errors.length} Phase-1-Regel(n) verletzt.`);
  }
  console.log('YouTube Phase 1: BESTANDEN');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(`YouTube Phase 1: FEHLER — ${error.message}`);
    process.exitCode = 1;
  });
}
