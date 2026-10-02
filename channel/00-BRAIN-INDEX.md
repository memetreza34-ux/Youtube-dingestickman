# Kanal-Gehirn / Brain Index

Diese Dateien sind die dauerhafte Wissensbasis für den Geschichts-Kanal.

## Autorität

Bei Widersprüchen gilt:

1. neueste ausdrückliche Nutzerentscheidung
2. `channel/99-DECISION-LOG.md`
3. kanalspezifische Dateien unter `channel/`
4. `config/channel-policy.json`
5. `config/topic-policy.json`
6. `config/visual-policy.json`
7. `config/pipeline.json`
8. alte Beispiele

Für die Bildwelt zusätzlich:

```text
config/flow-style-lock.json
→ channel/10-STYLE-DNA-V2.md
→ channel/06-VISUAL-SYSTEM.md
→ channel/07-VISUAL-GRAMMAR.md
→ channel/15-VISUAL-INTEREST-QC.md
→ Scene Card
```

Der technische Style-ID `history-stickman-adaptive-v1` ist ein Legacy-Name. Er bedeutet keine generischen Stickman-Klone.

## Preproduction ist jetzt ein technisches Gate

Neue Projekte starten als `preproduction-review`.

Pflichtdateien:

```text
99-technik/TOPIC_SCORECARD.json
99-technik/STORY_QC.json
```

Details: `channel/13-PREPRODUCTION-QUALITY-GATE.md`.

### `TOPIC_SCORECARD.json`

Verbindet Topic Director V2 mit der Pipeline. Erfordert:

- 30+ Rohideen
- 12er Shortlist
- Duplicate Check
- Story Engine
- größere historische Bedeutung
- Quellenbasis
- mindestens 3 Titelrichtungen
- mindestens 5 Visual Forms
- Diversity Gate
- Score >= 7,6/10

Tests, Paused-, Rejected-, Archived- und Legacy-Themen blockieren den Duplicate Check nicht hart. Aktive/reservierte Produktionen dürfen blockieren.

### `STORY_QC.json`

Technische Freigabe nach Script V3 und `16-STORY-QUALITY-GATE.md`:

- zentrale Frage
- Story-Spine
- historische Bedeutung
- Hook / Progression / Meaning / Payoff >= 8/10
- zentraler Story-Anteil >= 70 %
- Personality-/Curiosity-Anteil <= 30 %
- höchstens 2 reine Personality-/Curiosity-Beats hintereinander
- Ende beantwortet Ausgangsfrage

Validator:

```bash
npm run validate:youtube-preproduction -- --dir "youtube/<week>/<slug>"
```

Phase 1 führt dieses Gate bei neuen Projekten erneut aus.

## Zentrale Dateien

- `02-TOPIC-SYSTEM.md` — Topic Director V2
- `03-SCRIPT-BIBLE.md` — History Storytelling V3
- `04-RESEARCH-POLICY.md` — Quellen / Unsicherheit
- `05-VIDEO-BLUEPRINT.md` — kompletter Produktionspfad V5
- `06-VISUAL-SYSTEM.md` — Narration-first Bildwelt
- `07-VISUAL-GRAMMAR.md` — Visual Form pro Story Beat
- `08-FLOW-PROMPTING.md` — Google Flow / Cover Gate
- `09-IMAGE-PROMPT-TEMPLATE.md` — Promptstruktur
- `10-STYLE-DNA-V2.md` — aktuelle Style DNA trotz Legacy-Dateiname
- `11-VISUAL-DIRECTOR.md` — Scene Cards
- `12-PROMPT-QC.md` — Prompt-QC >= 8/10
- `13-PREPRODUCTION-QUALITY-GATE.md` — Topic Scorecard + Story QC als technische Gates
- `14-PHASE3-ASSET-LOCK.md` — read-only Bilder in Phase 3
- `15-VISUAL-INTEREST-QC.md` — Anti-Monotonie / Textsperre / Bild-QC
- `16-STORY-QUALITY-GATE.md` — Story statt Anekdoten-Kette
- `99-DECISION-LOG.md` — chronologische Entscheidungen

## Maschinenlesbare Kernquellen

```text
config/channel-policy.json
config/topic-policy.json
config/visual-policy.json
config/flow-style-lock.json
config/pipeline.json
```

Numerische Pacing-Werte werden ausschließlich aus `config/pipeline.json` abgeleitet. Topic-Schwellen aus `config/topic-policy.json`. Visual-QC-Schwellen aus `config/visual-policy.json` bzw. `config/channel-policy.json`.

## Verbindlicher Produktionspfad

```text
30+ Themenideen
→ 12er Shortlist
→ Duplicate Check
→ TOPIC_SCORECARD APPROVED
→ Recherche
→ Script V3
→ STORY_QC APPROVED
→ Story Beats
→ Viewer Takeaway
→ Visual Form
→ Shot Scale / Visual Energy / Change From Previous
→ Prompt QC >= 8
→ Visual Interest >= 8
→ FLOW_WORLD_LOCK READY
→ Flow Compiler V3
→ Phase 1
→ Google Flow
→ finale Bilder prüfen
→ PHASE2_VISUAL_QC APPROVED + SHA-256
→ Phase 2
→ PHASE3_IMAGE_LOCK
→ Audio / Alignment / Timeline / Pacing
→ Remotion
→ FINAL_VIDEO + THUMBNAIL + CAPTION
```

## Bildregeln

Neue Produktionen:

- max. 2 gleiche Visual Forms hintereinander
- max. 2 Character Scenes hintereinander
- max. 2 gleiche Shot Scales hintereinander
- 10-Bilder-Fenster normalerweise mindestens 3 Visual Forms
- jedes Bild braucht `visualEnergyDevice`
- jedes Bild braucht `visualInterestScore >= 8`

### Bild 01
Nur exakter Covertext. Keine Bildnummer, Zusatzüberschrift oder Labels.

### Bild 02–NN
Absolut kein sichtbarer Text. `BILD`, `IMAGE`, `SCENE`, Nummern, Labels, Wasserzeichen und Pseudo-Schrift sind harte Fehler.

## Phase-2-Visual-QC

Bei neuen Projekten verwendet `PHASE2_VISUAL_QC.json` Schema 2 und speichert pro Bild:

```text
fileName
sha256
```

Damit ist die visuelle Freigabe an exakt die geprüfte Datei gebunden. Wird das Bild danach ersetzt, fällt Phase 2 durch.

## Phase 3

Ab `PHASE3_IMAGE_LOCK` ist `00-bildprompts/images/` read-only. Bei Asset-Fehlern: abbrechen und melden, niemals automatisch reparieren oder Bilder erzeugen.

## Export

```text
03-export/
FINAL_VIDEO.mp4
THUMBNAIL.png
CAPTION.txt
```

Den kompilierten `google-flow-prompt.txt` nicht manuell pflegen; Quelldaten ändern und neu bauen.
