# Kanal-Gehirn / Brain Index

Diese Dateien sind die dauerhafte Wissensbasis für den Geschichts-Kanal.

## Allgemeine Autorität / Priorität

Bei Widersprüchen gilt:

1. neueste ausdrückliche Nutzerentscheidung
2. `channel/99-DECISION-LOG.md`
3. kanalspezifische Dateien unter `channel/`
4. `config/channel-policy.json`
5. `config/visual-policy.json`
6. `config/pipeline.json`
7. alte Beispiele

## Spezielle Autorität für die Bildwelt

```text
config/flow-style-lock.json
→ channel/10-STYLE-DNA-V2.md
→ channel/06-VISUAL-SYSTEM.md
→ channel/07-VISUAL-GRAMMAR.md
→ Scene Card / videospezifische Regie
```

Keine globalen festen Master-Referenzbilder. Stil wird über Rendering-DNA gesichert, nicht über identische Kompositionen oder Figuren-Schablonen.

Wichtig:

**Der technische Style-ID `history-stickman-adaptive-v1` bedeutet heute keine generischen Stickman-Klone. Menschen sind stilisierte, individuell gestaltete historische Figuren.**

## Zentrale Dateien

### `03-SCRIPT-BIBLE.md`
History Storytelling V3: konkrete Lage, Problem, Entscheidung, Folge, neue Komplikation, Reveal/Wendepunkt, Auflösung, Bedeutung.

### `06-VISUAL-SYSTEM.md`
Narration-first Bildwelt, individuelle Figuren, höhere Story-Beat-Dichte, flexible Visual Forms.

### `07-VISUAL-GRAMMAR.md`
Wählt das beste visuelle Mittel pro Story-Beat: Figur, Karte, Objekt, Architektur, Prozess, Cause/Effect, Comparison, Multi-Moment, Detail-Inset, Cutaway, Evidence-Reconstruction usw.

### `08-FLOW-PROMPTING.md`
Google Flow V3: Style Lock, World Lock, Compiler und Cover-Gate.

### `09-IMAGE-PROMPT-TEMPLATE.md`
Wie Scene Cards in finale Flow-Prompts übersetzt werden.

### `10-STYLE-DNA-V2.md`
Aktuelle menschlich lesbare Style DNA V3 trotz historischem Dateinamen.

### `11-VISUAL-DIRECTOR.md`
Viewer Takeaway, Visual Concept, Composition, Camera, Depth, Mood und Continuity.

### `12-PROMPT-QC.md`
Prompt-Freigabe ab 8/10.

### `14-PHASE3-ASSET-LOCK.md`
Phase 3 darf nur vorhandene Bilder verwenden.

### `99-DECISION-LOG.md`
Chronologisches Register fester Kanalentscheidungen.

## Maschinenlesbare Kernquellen

### `config/channel-policy.json`
History Storytelling, Upload- und Kanalregeln.

### `config/visual-policy.json`
Visual Forms, Narration-first-Regel, Figuren-Individualität und Prompt-QC.

### `config/flow-style-lock.json`
Maschinenlesbare Illustrations-DNA inklusive Verbot generischer Figuren-Klone.

### `config/pipeline.json`
Pacing, Bilddichte, Phase-3-Asset-Sperre und Export-Policy.

### `99-technik/FLOW_WORLD_LOCK.json`
Videospezifische Orte, Figuren, Props und Kontinuität.

### `99-technik/PHASE3_IMAGE_LOCK.json`
Hash-Lock der finalen Bilder während Phase 3.

## Pflicht für Agenten vor Script + Bildplanung

Mindestens lesen:

- `channel/03-SCRIPT-BIBLE.md`
- `channel/06-VISUAL-SYSTEM.md`
- `channel/07-VISUAL-GRAMMAR.md`
- `channel/08-FLOW-PROMPTING.md`
- `channel/09-IMAGE-PROMPT-TEMPLATE.md`
- `channel/10-STYLE-DNA-V2.md`
- `channel/11-VISUAL-DIRECTOR.md`
- `channel/12-PROMPT-QC.md`
- `config/channel-policy.json`
- `config/visual-policy.json`
- `config/flow-style-lock.json`
- `config/pipeline.json`

## Verbindlicher Produktionspfad

```text
Thema
→ Recherche
→ Script V3
→ Story Beats
→ Viewer Takeaway
→ bestes visuelles Mittel
→ Visual Concept
→ Visual Form
→ Composition / Camera / Depth / Mood
→ Prompt QC >= 8/10
→ READY FLOW_WORLD_LOCK
→ Flow Compiler V3
→ Phase-1-Validator
→ Google Flow
→ Phase 2
→ PHASE3_IMAGE_LOCK
→ Audio / Alignment / Timeline / Pacing
→ Render
→ FINAL_VIDEO + THUMBNAIL + CAPTION
```

## Bilddichte aktuell

Richtwerte:

- 60 s → häufig 18–26 Visuals
- 90 s → häufig 24–34 Visuals
- 120 s → häufig 32–44 Visuals

Ziel durchschnittlich etwa 2,5–4,2 Sekunden pro Visual. Keine Füllbilder.

## Export

`03-export/` soll am Ende enthalten:

```text
FINAL_VIDEO.mp4
THUMBNAIL.png
CAPTION.txt
```

`CAPTION.txt` enthält mindestens YouTube-Titel und Beschreibung.

## Phase 3

Ab `PHASE3_IMAGE_LOCK` ist `00-bildprompts/images/` read-only. Bei einem Asset-Fehler: **abbrechen und melden, niemals automatisch ein Bild erzeugen.**

Keine alten Kanalregeln aus anderen Repositories übernehmen. Den kompilierten `google-flow-prompt.txt` nicht manuell umschreiben; Änderungen erfolgen an den Quelldaten und werden neu gebaut.
