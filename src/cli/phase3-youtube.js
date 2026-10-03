#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { arg } from '../lib/pipeline.js';

function run(script, args = []) {
  console.log(`\n=== ${script} ===`);
  const result = spawnSync(process.execPath, [script, ...args], { stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${script} fehlgeschlagen (Exit ${result.status}).`);
}

function verifyImages(common) {
  run('src/cli/phase3-image-lock.js', [...common, '--verify']);
}

async function main() {
  const dir = arg('--dir');
  if (!dir) throw new Error('Nutzung: npm run phase3:youtube -- --dir "youtube/<week>/<slug>" [--prepare-only] [--model small]');
  const common = ['--dir', dir];
  const model = arg('--model') ?? 'small';

  console.log('\nPHASE-3-ASSET-POLICY: Nur bereits vorhandene Bilder aus 00-bildprompts/images dürfen verwendet werden.');
  console.log('Phase 3 erzeugt, ersetzt, bearbeitet oder ergänzt KEINE Bilder. Bei fehlenden/fehlerhaften Bildern wird sofort abgebrochen.');

  run('src/cli/preflight-youtube.js');
  run('src/cli/validate-youtube-phase1-full.js', common);
  run('src/cli/validate-youtube-phase2.js', common);

  // Ab hier ist der Bildbestand unveränderlich. Fehlende Bilder dürfen niemals automatisch erzeugt werden.
  run('src/cli/phase3-image-lock.js', common);
  verifyImages(common);

  run('src/cli/optimize-youtube-audio.js', common);
  verifyImages(common);

  run('src/cli/auto-align-youtube.js', [...common, '--model', model]);
  verifyImages(common);

  run('src/cli/build-youtube-timeline.js', common);
  verifyImages(common);

  run('src/cli/validate-youtube-pacing.js', common);
  verifyImages(common);

  run('src/cli/validate-youtube-phase3.js', common);
  verifyImages(common);

  if (process.argv.includes('--prepare-only')) {
    console.log('\nYouTube Phase 3 vorbereitet: Gates, vorhandene Bilder, Audio, Alignment, Timeline und Pacing bestanden.');
    return;
  }

  run('src/cli/render-youtube.js', common);
  verifyImages(common);

  run('src/cli/finalize-youtube-export.js', common);
  verifyImages(common);

  run('src/cli/validate-youtube-phase3.js', [...common, '--post-render']);
  verifyImages(common);
  console.log('\nYouTube Phase 3: BESTANDEN');
}

main().catch((error) => {
  console.error(`YouTube Phase 3: FEHLER — ${error.message}`);
  console.error('Abbruchregel: Keine Bilder selbst erzeugen oder reparieren. Fehler melden und auf korrigierte vorhandene Assets warten.');
  process.exitCode = 1;
});
