# YouTube Workflow — Geschichts-Kanal

Dieses Repository enthält die **kanalspezifische Produktionspipeline für den Geschichts-Kanal**.

Kanalregeln stehen unter `channel/`, maschinenlesbare Kernregeln unter `config/`.

## Grundprinzip

```text
Thema
→ Recherche
→ Story Outline
→ Voice-over-Skript
→ Viewer Takeaway
→ Visual Concept
→ Visual Grammar / Visual Form
→ Composition / Camera / Mood
→ Prompt Compiler
→ Prompt QC >= 8/10
→ Google-Flow-Bildgenerierung
→ finale Nutzer-Voice-over-Datei
→ Audio-Optimierung
→ Wort-/Anchor-Alignment
→ Timeline
→ Pacing-QC
→ Remotion-Render
→ Export-QC
```

## 0. Einmalige Einrichtung

Aktive Bildwelt:

- `config/visual-policy.json` → `READY`
- Style-ID: `history-stickman-adaptive-v1`
- Prompt-System: `visual-director-v2`
- Scene-Planning-Schema: `2`
- Prompt-QC-Mindestscore: `8/10`

Lokal benötigt:

- Node.js >= 24
- FFmpeg / FFprobe
- Whisper CLI (`whisper`)

## 1. Thema prüfen

```bash
npm run topic:youtube -- --topic "THEMA"
```

Der Check verwendet nur die Themenregistry dieses Repositories und hier erzeugte Projekte.

## 2. Projekt anlegen

```bash
npm run create:youtube -- \
  --topic "THEMA" \
  --title "TITEL" \
  --week "YYYY-KWNN_DD-MM_bis_DD-MM" \
  --slug "themen-slug"
```

Ergebnis:

```text
youtube/<week>/<slug>/
├── 00-bildprompts/
│   ├── google-flow-prompt.txt
│   └── images/
├── 01-voice-script/
│   └── voice-script.txt
├── 02-audio/
├── 03-export/
└── 99-technik/
    ├── video.json
    ├── BILD_AUDIO_ZUORDNUNG.json
    ├── YOUTUBE_RENDER_PLAN.json
    └── status.json
```

Die Projekterstellung übernimmt automatisch die aktuell aktive `styleId` aus `config/visual-policy.json`.

## 3. Phase 1 — Inhalt und Bildplanung

Phase 1 erstellt bzw. füllt:

- Recherche
- Story Outline
- Voice-over-Skript
- Bildplan
- Audio-Anker pro Bild
- vollständige Scene Card V2
- Google-Flow-Prompt
- Prompt-QC-Score pro Bild
- Render-/SFX-Plan
- Metadaten

Verbindliche Reihenfolge für Visuals:

```text
Script
→ Viewer Takeaway
→ Visual Concept
→ Visual Function
→ Visual Form
→ Composition
→ Camera
→ Depth / Mood
→ Prompt
→ Prompt QC >= 8/10
```

Dafür gelten:

- `channel/06-VISUAL-SYSTEM.md`
- `channel/07-VISUAL-GRAMMAR.md`
- `channel/08-FLOW-PROMPTING.md`
- `channel/09-IMAGE-PROMPT-TEMPLATE.md`
- `channel/10-STYLE-DNA-V2.md`
- `channel/11-VISUAL-DIRECTOR.md`
- `channel/12-PROMPT-QC.md`
- `config/visual-policy.json`

### Scene Card V2

Neue Projekte verwenden `BILD_AUDIO_ZUORDNUNG.json` Schema V2.

Pflichtfelder pro Bild:

- viewerTakeaway
- visualPurpose
- topicAnchor
- visualForm
- visualConcept
- dominantSubject
- actionState
- composition
- camera
- depthPlan
- lightingMood
- supportingElements
- continuityNote
- historicalAccuracyNote
- promptQcScore

### Bildplan-Regeln

- keine starre Bildzahl
- 1 Bild = 1 klare visuelle Funktion
- Figuren nur, wenn sie die Aussage besser erklären
- Karten, Architektur, Objekte, Systeme, Vergleiche und Symbolbilder sind gleichwertig
- durchschnittlich ca. 4,5–7,5 s pro Bild
- ab 9 s Split prüfen
- ab 11 s Split stark bevorzugen
- 16 s Hard-Max
- keine Füllbilder
- maximal 1–3 notwendige Supporting Elements
- wenige Elemente allein sind kein Ersatz für starke Komposition
- Bild 01 = Cover + erste Videoszene
- Bild 01 wird 3× als Cover-Kandidat erzeugt; genau 1 Gewinner bleibt
- Bild 02–NN jeweils nur 1×
- standardmäßig kein sichtbarer Text im Bild
- keine Bildnummern, Pseudo-Texte oder Wasserzeichen im Bild

### Visual-Form-Treue

- `comparison` → beide Seiten sichtbar
- `cause-effect` → Ursache und Folge sichtbar verbunden
- `process-sequence` → Zustandsänderung klar lesbar
- `system-hierarchy` → räumliche Hierarchie verständlich
- `battle-city-overview` → räumliche Lage bleibt Hauptidee

Vor Asset-Erzeugung:

```bash
npm run validate:youtube-phase1 -- --dir "youtube/<week>/<slug>"
```

Der Validator blockiert neue Projekte unter anderem bei:

- fehlenden Scene-Card-V2-Feldern
- nicht unterstützter Visual Form
- mehr als drei Supporting Elements
- Prompt-QC unter 8/10
- zu knappem finalen Prompt
- fehlender konkreter Kamera-/Kompositionssprache
- Comparison-Visual ohne erkennbare Vergleichsinszenierung

## 4. Phase 2 — Assets

Finale Bilder:

```text
00-bildprompts/images/Bild 01.png
...
00-bildprompts/images/Bild NN.png
```

Finales Nutzer-Voice-over: genau **eine** Audiodatei unter:

```text
02-audio/
```

Das Nutzeroriginal wird nie überschrieben.

Vor Phase 3 Bilder zusätzlich visuell prüfen auf:

- konsistente Kanalbildwelt
- historische Plausibilität
- klare Hauptaussage
- geplante Visual Form tatsächlich sichtbar
- starke Komposition statt bloßer Objektauflistung
- keine fehlerhafte KI-Schrift
- keine groben Anatomie-/Objektfehler
- keine unnötigen Doppelungen

Prüfung:

```bash
npm run validate:youtube-phase2 -- --dir "youtube/<week>/<slug>"
```

## 5. Phase 3

```bash
npm run phase3:youtube -- --dir "youtube/<week>/<slug>"
```

Reihenfolge:

1. Preflight
2. Phase-1-Gate
3. Phase-2-Gate
4. Audio intern optimieren
5. Whisper auf optimiertem Audio
6. Bildanker ausrichten
7. finale Timeline bauen
8. Pacing prüfen
9. Pre-Render-QC
10. Remotion rendern
11. Thumbnail aus Bild 01 kopieren
12. Post-Render-QC

Nur vorbereiten, ohne Render:

```bash
npm run phase3:youtube -- --dir "youtube/<week>/<slug>" --prepare-only
```

## Audio-Standard

- Nutzer-Voice ist die einzige finale Sprecherquelle
- Nutzeroriginal bleibt unverändert
- Standard-Playback: 1,10× bei erhaltener Tonhöhe
- lange Pausen kürzen
- Endstille entfernen
- Ziel −16 LUFS
- True Peak max. −1,5 dBTP
- 48 kHz

## Schluss-Hold

Nach dem letzten gesprochenen Wort bleibt das letzte Bild standardmäßig **1,3 s** sichtbar. Zulässig sind 1,2–1,5 s.

## Style-Reference-Pack

`channel/13-STYLE-REFERENCE-PACK.md` definiert neun Master-Referenzen. Das Pack ist aktuell `PLANNED`. Bis zur ausdrücklichen Nutzerfreigabe aller neun Referenzen gilt `channel/10-STYLE-DNA-V2.md` als stärkste textliche Style-Autorität.

## Testvideo-Modus

Langfristiger Kanalrahmen: ungefähr 8–15 Minuten, sofern der Inhalt die Länge trägt.

Für Qualitäts- und Pipeline-Tests sind bewusst Videos bis maximal **120 Sekunden** erlaubt. Diese Testvideos müssen trotzdem alle Recherche-, Skript-, Visual- und QC-Regeln erfüllen.

## Definition of Done

Ein Video ist fertig, wenn:

- Thema nicht doppelt ist
- Recherche dokumentiert ist
- Skript-QC bestanden ist
- aktive Bildwelt korrekt geladen ist
- Bildanzahl inhaltsgetrieben ist
- Scene Cards V2 vollständig sind
- Visual Forms bewusst gewählt und im Prompt erhalten wurden
- jeder Prompt mindestens 8/10 erreicht
- Bild 01 Cover + erste Szene ist
- finale Bilder sauber benannt und visuell geprüft sind
- genau eine Nutzerstimme vorliegt
- Audio-QC bestanden ist
- echte Wortzeiten für die Bildanker vorliegen
- Timeline keine Lücken oder Überlappungen enthält
- Pacing-Gate bestanden ist
- Render existiert
- Thumbnail byte-identisch aus Bild 01 stammt
- Post-Render-QC bestanden ist
