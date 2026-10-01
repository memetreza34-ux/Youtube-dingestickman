# History YouTube Production System

Kanalspezifische Produktionsbasis für einen deutschen **History × Storytelling × Curiosity**-Kanal.

## Aktueller Status

- History Storytelling: **V3 READY**
- Visual System: **V2 / Narration-first READY**
- Flow Compiler: **V3 READY**
- Pipeline: **V4 READY**
- Prompt-QC: **>= 8/10**
- Phase-3-Bildlock: **READY**
- Export mit `CAPTION.txt`: **READY**
- globale feste Master-Referenzbilder: **NICHT VERWENDET**

Der technische Style-ID bleibt `history-stickman-adaptive-v1`, bedeutet aber **keine generischen Stickman-Klone**. Menschen sind stilisierte, individuell gestaltete historische Figuren in einer konsistenten handgezeichneten 2D-Illustrationswelt.

## Zuerst lesen

1. `channel/00-BRAIN-INDEX.md`
2. `channel/03-SCRIPT-BIBLE.md`
3. `channel/04-RESEARCH-POLICY.md`
4. `channel/06-VISUAL-SYSTEM.md`
5. `channel/07-VISUAL-GRAMMAR.md`
6. `channel/08-FLOW-PROMPTING.md`
7. `channel/10-STYLE-DNA-V2.md`
8. `channel/11-VISUAL-DIRECTOR.md`
9. `channel/12-PROMPT-QC.md`
10. `channel/14-PHASE3-ASSET-LOCK.md`
11. `channel/99-DECISION-LOG.md`

Maschinenlesbar:

- `config/channel-policy.json`
- `config/visual-policy.json`
- `config/flow-style-lock.json`
- `config/pipeline.json`

## Produktionspfad

```text
Thema
→ Recherche
→ Story Outline
→ Script V3
→ Story Beats
→ Viewer Takeaway
→ bestes visuelles Mittel
→ Visual Concept / Visual Form
→ Composition / Camera / Mood
→ Prompt QC >= 8/10
→ World Lock
→ Flow Compiler V3
→ Phase 1
→ Google Flow
→ Phase 2
→ Phase-3-Bildlock
→ Audio / Alignment / Timeline / Pacing
→ Remotion
→ FINAL_VIDEO + THUMBNAIL + CAPTION
```

## Script V3

Geschichte vor Erklärung.

```text
Moment
→ Problem
→ Entscheidung
→ Folge
→ neue Komplikation
→ Reveal / Wendepunkt
→ Auflösung
→ historische Bedeutung
```

Kontext wird just in time geliefert. Gegner behalten nachvollziehbare Logik. Das Ende braucht einen Payoff statt einer bloßen Wiederholung.

## Narration-first Visuals

Vor jedem Bild lautet die Frage:

> **Welches visuelle Mittel erklärt genau diesen gesprochenen Beat am besten?**

Erlaubt sind unter anderem:

- Character Scene
- Environment
- Map / Geography
- Object Focus
- Architecture
- System / Hierarchy
- Cause → Effect
- Process / Sequence
- Comparison
- Battle / City Overview
- Multi-Moment Illustration
- Detail Inset
- Cutaway Section
- Evidence Reconstruction

Figuren sind nie der automatische Fallback.

## Figuren

- stilisiert, aber menschlich lesbar
- keine identischen generischen Figuren-Klone
- prominente nicht wiederkehrende Personen möglichst in mindestens drei sichtbaren Merkmalen unterscheiden
- wiederkehrende Hauptfiguren konsistent halten
- gleicher Illustrator ≠ gleiche Person

## Bilddichte

Pipeline V4:

- Ziel durchschnittlich etwa **2,5–4,2 s pro Visual**
- ab 5,5 s Split prüfen
- ab 7 s Split stark bevorzugen
- 9 s Hard-Max ohne klare Begründung

Orientierung:

- ca. 60 s → 18–26 Visuals
- ca. 90 s → 24–34 Visuals
- ca. 120 s → 32–44 Visuals

Keine Füllbilder; Inhalt entscheidet.

## Flow Compiler V3

```text
CHANNEL STYLE LOCK
= Rendering-DNA

VIDEO WORLD LOCK
= videospezifische Kontinuität

SCENE CARD
= Aussage und Regie des einzelnen Visuals
```

Build:

```bash
npm run build:youtube-flow -- --dir "youtube/<week>/<slug>"
npm run validate:youtube-phase1 -- --dir "youtube/<week>/<slug>"
```

Cover-Gate bleibt zweistufig: zuerst drei Covervarianten, dann STOP bis zur Nutzerauswahl.

## Phase 3

Phase 3 verwendet **nur vorhandene Bilder**. Keine Generierung, Regeneration, Bearbeitung oder automatische Reparatur.

`PHASE3_IMAGE_LOCK.json` sichert Dateiname, Größe und SHA-256.

Fehler = abbrechen und melden.

## Export

`video.json` enthält:

```json
"youtubeUpload": {
  "title": "...",
  "description": "...",
  "hashtags": ["#Geschichte"],
  "keywords": ["..."]
}
```

Finaler Ordner:

```text
03-export/
├── FINAL_VIDEO.mp4
├── THUMBNAIL.png
└── CAPTION.txt
```

`CAPTION.txt` enthält YouTube-Titel, Beschreibung, optionale Hashtags/Keywords und den Thumbnail-Text.
