# YouTube Workflow — Geschichts-Kanal

## 0. Preproduction

Neue Projekte starten als `preproduction-review`.

```text
30+ Rohideen
→ 12er Shortlist
→ Duplicate Check
→ TOPIC_SCORECARD.json APPROVED
→ Recherche
→ Script V3
→ STORY_QC.json APPROVED
```

Technische Prüfung:

```bash
npm run validate:youtube-preproduction -- --dir "youtube/<week>/<slug>"
```

Ohne bestandenes Preproduction-Gate darf Phase 1 bei neuen Projekten nicht bestehen.

## 1. Topic Director V2

`TOPIC_SCORECARD.json` ist Pflicht für neue Produktionen.

Erforderlich sind unter anderem:

- mindestens 30 Rohideen
- mindestens 12 Shortlist-Kandidaten
- Score >= 7,6/10
- Story Engine
- größere historische Bedeutung
- Quellenbasis
- mindestens 3 Titelrichtungen
- mindestens 5 sinnvolle Visual Forms
- Diversity Gate

Tests, pausierte oder verworfene Themen dürfen den Duplicate Check höchstens warnen, aber nicht hart blockieren. Aktive/reservierte Produktionen dürfen blockieren.

## 2. Story Quality Gate

Nach `channel/03-SCRIPT-BIBLE.md` schreiben und anschließend `99-technik/STORY_QC.json` ausfüllen.

Bevorzugte Logik:

```text
konkreter Moment
→ Problem
→ Entscheidung / Handlung
→ Folge
→ neue Komplikation
→ Reveal / Wendepunkt
→ Auflösung
→ historische Bedeutung
```

Pflicht:

- zentrale Frage
- klare Story-Spine
- Bedeutung über die Anekdote hinaus
- Hook / Progression / Meaning / Payoff >= 8/10
- zentraler Story-Anteil >= 70 %
- Personality-/Curiosity-Anteil <= 30 %
- max. 2 reine Personality-/Curiosity-Beats hintereinander

## 3. Story Beats und Visual Selection

Bildplanung folgt Story Beats, nicht Absätzen.

Vor jedem Visual:

> Was muss der Zuschauer genau jetzt verstehen, und welches visuelle Mittel erklärt es am besten?

Erlaubt sind u. a. Character Scene, Environment, Map, Object Focus, Architecture, System, Cause→Effect, Process, Comparison, Multi-Moment, Detail Inset, Cutaway und Evidence Reconstruction.

Figuren sind nie Default-Fallback.

## 4. Scene Card + Visual Interest

Pflichtfelder der Scene Card bleiben nach `channel/11-VISUAL-DIRECTOR.md` bestehen. Neue Produktionen benötigen zusätzlich:

- `shotScale`
- `visualEnergyDevice`
- `visualChangeFromPrevious`
- `visualInterestScore >= 8`
- `visibleTextPolicy`

Anti-Monotonie:

- max. 2 gleiche Visual Forms hintereinander
- max. 2 Character Scenes hintereinander
- max. 2 gleiche Shot Scales hintereinander
- 10-Bilder-Fenster normalerweise mindestens 3 Visual Forms

Die Pacing-Zahlen werden ausschließlich aus `config/pipeline.json` abgeleitet. Aktuell liegt der Zielbereich bei ca. 2,5–4,2 s pro Visual.

## 5. World Lock + Flow

Vor Build muss `99-technik/FLOW_WORLD_LOCK.json` READY sein.

```bash
npm run build:youtube-flow -- --dir "youtube/<week>/<slug>"
npm run validate:youtube-phase1 -- --dir "youtube/<week>/<slug>"
```

Phase 1 revalidiert bei neuen Projekten auch Topic- und Story-Gate.

### Cover Gate

Stage 1:

- genau drei Bild-01-Kandidaten
- nur exakter Covertext
- danach STOP
- Nutzer wählt

Stage 2:

- Gewinner = `Bild 01.png`
- Bild 02–NN erzeugen
- Bild 02–NN: absolut kein sichtbarer Text

## 6. Phase 2 — echte Bildprüfung

Finale Bilder liegen nur unter:

```text
00-bildprompts/images/Bild 01.png
...
00-bildprompts/images/Bild NN.png
```

Vor Phase 3 wird jedes Bild in `99-technik/PHASE2_VISUAL_QC.json` geprüft auf:

- Narrationspassung >= 8/10
- Visual Interest >= 8/10
- Style Consistency >= 8/10
- keine Weirdness
- keine sichtbare interne Bildnummer
- kein unerwarteter Text
- keine Pseudo-Schrift

Neue Projekte verwenden QC-Schema 2 mit:

```text
fileName
sha256
```

Damit ist die Freigabe an exakt die geprüfte Datei gebunden.

```bash
npm run validate:youtube-phase2 -- --dir "youtube/<week>/<slug>"
```

## 7. Phase 3 — Assets read-only

```bash
npm run phase3:youtube -- --dir "youtube/<week>/<slug>"
```

Danach gilt `00-bildprompts/images/` als read-only. `PHASE3_IMAGE_LOCK.json` schützt die finalen Bilder zusätzlich per Hash.

Fehler bedeutet:

```text
ABBRUCH
→ keine Reparatur
→ keine Bildgenerierung
→ Fehler melden
```

## 8. Export

`video.json.youtubeUpload` enthält Titel, Beschreibung und optional Hashtags/Keywords.

Final:

```text
03-export/
├── FINAL_VIDEO.mp4
├── THUMBNAIL.png
└── CAPTION.txt
```

## Definition of Done

Ein Video ist erst fertig, wenn Topic Scorecard, Story QC, Phase 1, Phase-2-Visual-QC, Phase 2, Phase 3, Render und Export-QC bestanden sind.
