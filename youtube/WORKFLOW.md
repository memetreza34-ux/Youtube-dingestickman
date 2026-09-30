# YouTube Workflow — Geschichts-Kanal

Dieses Repository enthält die kanalspezifische Produktionspipeline für den Geschichts-Kanal.

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
→ Prompt QC >= 8/10
→ READY Flow World Lock
→ Flow Compiler V3
→ Phase-1-Validator
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
- `config/flow-style-lock.json` → `READY`
- Style-ID: `history-stickman-adaptive-v1`
- Prompt-System: `flow-compiler-v3`
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
│   ├── google-flow-prompt.txt   # zuerst NOT_BUILT, später Compiler-Artefakt
│   └── images/
├── 01-voice-script/
│   └── voice-script.txt
├── 02-audio/
├── 03-export/
└── 99-technik/
    ├── video.json
    ├── BILD_AUDIO_ZUORDNUNG.json
    ├── FLOW_WORLD_LOCK.json
    ├── YOUTUBE_RENDER_PLAN.json
    └── status.json
```

Die Projekterstellung übernimmt automatisch Style-ID, Prompt-System-Version, Scene-Planning-Schema und Prompt-QC-Grenze aus `config/visual-policy.json`.

## 3. Phase 1 — Inhalt und Visual Planning

Phase 1 erstellt bzw. füllt:

- Recherche
- Story Outline
- Voice-over-Skript
- Bildplan
- Audio-Anker pro Bild
- vollständige Scene Card V2 pro Bild
- videospezifischen `FLOW_WORLD_LOCK.json`
- deutschen Cover-Text
- Prompt-QC-Score pro Bild
- Render-/SFX-Plan
- Metadaten

### Verbindlicher Visual-Pfad

```text
Script
→ Viewer Takeaway
→ Visual Concept
→ Visual Function
→ Visual Form
→ Dominant Subject / Action State
→ Composition
→ Camera
→ Depth / Mood
→ Continuity / Historical Accuracy
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
- `channel/13-STYLE-REFERENCE-PACK.md`
- `config/visual-policy.json`
- `config/flow-style-lock.json`

### Scene Card V2

`BILD_AUDIO_ZUORDNUNG.json` verwendet Schema V2.

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

### Style-Drift vermeiden

Scene Cards beschreiben Kamera und Stimmung konkret statt mit generischen Render-Wörtern.

V3 blockiert unter anderem:

```text
cinematic
epic
ultra detailed
hyper detailed
photographic
realistic lighting
depth of field
bokeh
```

Stattdessen z. B.:

```text
slightly elevated wide view
cool overcast daylight
large empty middle ground
small warm fire as the only warm accent
```

### Visual-Form-Treue

- `comparison` → beide Seiten sichtbar
- `cause-effect` → Ursache und Folge sichtbar verbunden
- `process-sequence` → Zustandsänderung klar lesbar
- `system-hierarchy` → räumliche Hierarchie verständlich
- `battle-city-overview` → räumliche Lage bleibt Hauptidee
- `object-focus` → Objekt trägt Aussage
- `character-scene` → Handlung/Haltung/Beziehung trägt Aussage

## 4. Flow World Lock fertigstellen

Vor dem Prompt-Build:

```text
99-technik/FLOW_WORLD_LOCK.json
```

Pflicht:

```json
{
  "status": "READY",
  "settingName": "...",
  "settingDescription": "..."
}
```

Bei wiederkehrenden Inhalten zusätzlich ausfüllen:

- recurringPlaces
- recurringCharacters
- recurringProps
- basePalette
- timeWeatherLogic
- continuityRules

Keine Platzhalter stehen lassen.

## 5. Google-Flow-Prompt bauen

Der finale Prompt wird nicht manuell geschrieben.

```bash
npm run build:youtube-flow -- --dir "youtube/<week>/<slug>"
```

Der Compiler liest:

```text
config/flow-style-lock.json
99-technik/video.json
99-technik/BILD_AUDIO_ZUORDNUNG.json
99-technik/FLOW_WORLD_LOCK.json
```

und ersetzt:

```text
00-bildprompts/google-flow-prompt.txt
```

Der Compiler:

- setzt einen langen unveränderlichen Channel Style Lock
- wiederholt pro Bild einen kompakten Style Anchor
- erhält Visual Concept, Composition, Camera, Depth und Mood
- fügt Visual-Form-Guards ein
- erzwingt Cover-Text auf BILD 01
- erzwingt No-Text auf BILD 02–NN
- schreibt das zweistufige Cover-Gate
- setzt `video.json.flowPromptBuiltAt`

### Änderungsregel

Den erzeugten Prompt nicht direkt bearbeiten.

Änderung immer an:

```text
Scene Card / World Lock / Cover-Text / Style Lock
→ Build erneut
```

## 6. Phase-1-Validator

Nach dem Build:

```bash
npm run validate:youtube-phase1 -- --dir "youtube/<week>/<slug>"
```

V3 blockiert unter anderem bei:

- fehlenden Scene-Card-Feldern
- Prompt-QC unter 8/10
- nicht unterstützter Visual Form
- mehr als drei Supporting Elements
- nicht READY gesetztem World Lock
- Platzhaltern
- fehlendem `flowPromptBuiltAt`
- falscher Style-ID
- fehlendem Immutable Style Lock
- fehlendem Immutable World Lock
- fehlendem Style Anchor in Einzelprompts
- generischen Style-Drift-Risikowörtern
- zu knappen Promptblöcken
- fehlender Kamera-/Kompositionssprache
- Comparison ohne Vergleichsinszenierung
- falschem oder fehlendem Cover-Text
- fehlender No-Text-Regel bei BILD 02–NN

Erst nach bestandenem Phase-1-Gate darf Google Flow genutzt werden.

## 7. Google Flow — Cover Gate

### Stage 1

- kompilierten Master-Prompt verwenden
- genau drei BILD-01-Kandidaten erzeugen
- identischer deutscher Cover-Text
- fehlerhafte Schriftvarianten verwerfen
- danach stoppen
- Nutzer wählt den Gewinner

### Stage 2

Erst nach Nutzerwahl:

- Gewinner wird `Bild 01.png`
- Gewinner als zusätzliche Continuity-Referenz nutzen
- BILD 02–NN erzeugen
- maximal fünf aktive Generierungen gleichzeitig

## 8. Style Reference Pack / Ingredients

`channel/13-STYLE-REFERENCE-PACK.md` definiert neun Master-Referenzen.

Aktueller Status: `PLANNED`.

Bis alle neun ausdrücklich freigegeben sind, ist `config/flow-style-lock.json` die stärkste maschinenlesbare Style-Autorität.

Nach `READY`:

- pro Generierung nur 2–4 relevante Style-Ingredients verwenden
- saubere Referenzen ohne unnötige Zusatzmotive bevorzugen
- Textprompt und Ingredients dürfen sich nicht widersprechen
- Referenzen fixieren Stil, nicht automatisch Motiv oder Epoche

## 9. Phase 2 — Assets

Finale Bilder:

```text
00-bildprompts/images/Bild 01.png
...
00-bildprompts/images/Bild NN.png
```

Finales Nutzer-Voice-over: genau eine Audiodatei unter:

```text
02-audio/
```

Das Nutzeroriginal wird nie überschrieben.

Vor Phase 3 Bilder visuell prüfen auf:

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

## 10. Phase 3

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

Nach dem letzten gesprochenen Wort bleibt das letzte Bild standardmäßig 1,3 s sichtbar. Zulässig sind 1,2–1,5 s.

## Testvideo-Modus

Langfristiger Kanalrahmen: ungefähr 8–15 Minuten, sofern der Inhalt die Länge trägt.

Für Qualitäts- und Pipeline-Tests sind bewusst Videos bis maximal 120 Sekunden erlaubt. Diese Testvideos müssen trotzdem alle Recherche-, Skript-, Visual- und QC-Regeln erfüllen.

## Definition of Done

Ein Video ist fertig, wenn:

- Thema nicht doppelt ist
- Recherche dokumentiert ist
- Skript-QC bestanden ist
- aktive Bildwelt korrekt geladen ist
- Bildanzahl inhaltsgetrieben ist
- Scene Cards V2 vollständig sind
- jeder Prompt-QC-Score mindestens 8/10 beträgt
- `FLOW_WORLD_LOCK.json` READY ist
- Flow Compiler V3 erfolgreich lief
- Phase-1-Validator bestanden ist
- Visual Forms im generierten Bild tatsächlich erhalten wurden
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
