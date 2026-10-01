#!/usr/bin/env node

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { arg, exists, projectPaths, readJson, sha256, writeJson } from '../lib/pipeline.js';

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function arrayLine(value) {
  return Array.isArray(value) ? value.map((item) => clean(item)).filter(Boolean).join(' ') : '';
}

function commaLine(value) {
  return Array.isArray(value) ? value.map((item) => clean(item)).filter(Boolean).join(', ') : '';
}

function buildCaption(meta) {
  const upload = meta.youtubeUpload ?? {};
  const title = clean(upload.title) || clean(meta.title);
  const description = clean(upload.description) || (clean(meta.topic) ? `In diesem Video geht es um ${clean(meta.topic)}.` : '');
  const hashtags = arrayLine(upload.hashtags);
  const keywords = commaLine(upload.keywords);
  const thumbnailText = clean(meta.coverPolicy?.coverText);

  if (!title) throw new Error('YouTube-Titel fehlt in video.json (youtubeUpload.title oder title).');
  if (!description) throw new Error('YouTube-Beschreibung fehlt in video.json (youtubeUpload.description oder topic).');

  const sections = [
    'TITLE:',
    title,
    '',
    'DESCRIPTION:',
    description
  ];

  if (hashtags) sections.push('', 'HASHTAGS:', hashtags);
  if (keywords) sections.push('', 'KEYWORDS:', keywords);
  if (thumbnailText) sections.push('', 'THUMBNAIL_TEXT:', thumbnailText);

  return `${sections.join('\n')}\n`;
}

export async function finalizeYoutubeExport(projectDirectory) {
  const p = projectPaths(projectDirectory);
  const video = path.join(p.exportDir, 'FINAL_VIDEO.mp4');
  const cover = path.join(p.imagesDir, 'Bild 01.png');
  const thumbnail = path.join(p.exportDir, 'THUMBNAIL.png');
  const caption = path.join(p.exportDir, 'CAPTION.txt');

  if (!(await exists(video))) throw new Error('FINAL_VIDEO.mp4 fehlt.');
  if (!(await exists(cover))) throw new Error('Bild 01.png fehlt.');

  const meta = await readJson(p.meta);
  await mkdir(p.exportDir, { recursive: true });
  await copyFile(cover, thumbnail);
  await writeFile(caption, buildCaption(meta), 'utf8');

  const report = {
    schemaVersion: 2,
    createdAt: new Date().toISOString(),
    videoFile: '03-export/FINAL_VIDEO.mp4',
    thumbnailFile: '03-export/THUMBNAIL.png',
    captionFile: '03-export/CAPTION.txt',
    thumbnailSource: '00-bildprompts/images/Bild 01.png',
    coverSha256: await sha256(cover),
    thumbnailSha256: await sha256(thumbnail),
    captionSha256: await sha256(caption)
  };
  report.thumbnailIdenticalToCover = report.coverSha256 === report.thumbnailSha256;
  if (!report.thumbnailIdenticalToCover) throw new Error('Thumbnail ist nicht identisch zu Bild 01.');
  await writeJson(path.join(p.techDir, 'EXPORT_REPORT.json'), report);
  return report;
}

async function main() {
  const dir = arg('--dir');
  if (!dir) throw new Error('Nutzung: npm run finalize:youtube-export -- --dir "youtube/<week>/<slug>"');
  const report = await finalizeYoutubeExport(dir);
  console.log(`Export finalisiert: FINAL_VIDEO.mp4 + THUMBNAIL.png + CAPTION.txt (${report.captionFile})`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(`Export-Finalisierung: FEHLER — ${error.message}`);
    process.exitCode = 1;
  });
}
