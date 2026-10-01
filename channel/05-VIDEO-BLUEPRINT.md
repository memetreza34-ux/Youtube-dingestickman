# Video Blueprint — Geschichts-Kanal V4

Diese Datei verbindet Thema, Recherche, Script V3, Visual-System und technische Pipeline.

## Phase A — Thema

1. historische Kernidee bestimmen
2. klare Zuschauerfrage formulieren
3. Themen-Säule zuordnen
4. Duplicate-/Ähnlichkeitscheck
5. belastbare Quellen prüfen

**Gate:** Ohne klare zentrale Frage kein Produktionsstart.

## Phase B — Recherche

1. Zeitrahmen und Schauplatz
2. zentrale Personen/Akteure
3. Ursache-Wirkungs-Kette
4. Wendepunkte
5. Unsicherheiten / Streitfragen
6. Quellen dokumentieren

**Gate:** Keine zentrale Behauptung nur aus Vermutung.

## Phase C — Story Outline V3

Nicht als Lexikon-Kapitel denken, sondern als Geschichte:

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

Kontext kommt just in time.

## Phase D — Voice-over-Skript

Nach `03-SCRIPT-BIBLE.md` V3 schreiben.

**Gate:** Das Skript muss ohne Bilder spannend, verständlich und historisch sauber funktionieren.

Zusätzlich vor Visual Planning:

- jeder Absatz bringt einen neuen Story-Beat
- keine lange abstrakte Vorgeschichte
- Gegner/Akteure handeln nachvollziehbar
- Ende liefert Payoff statt Wiederholung
- `youtubeUpload.title` und `youtubeUpload.description` in `video.json` vorbereiten

## Phase E — Story Beats und Visual Director

Nicht Absatz → Bild, sondern **Story Beat → bestes visuelles Mittel**.

Für jeden Beat:

1. `Viewer Takeaway`
2. `Visual Purpose`
3. `Topic Anchor`
4. prüfen, welches visuelle Mittel den gesprochenen Gedanken am besten unterstützt
5. `Visual Form`
6. `Visual Concept`
7. `Dominant Subject`
8. `Action / State`
9. `Composition`
10. `Camera`
11. `Depth Plan`
12. `Lighting / Mood`
13. 0–3 notwendige Supporting Elements
14. `Continuity Note`
15. `Historical Accuracy Note`
16. Audio-Anker
17. Bilddauer
18. Prompt-QC >= 8/10

### Erlaubte visuelle Mittel

- Character Scene
- Environment
- Map / Geography
- Object Focus
- Architecture / City
- System / Hierarchy
- Cause → Effect
- Process / Sequence
- Comparison
- Symbolic Metaphor
- Battle / City Overview
- Rise / Fall
- Multi-Moment Illustration
- Detail Inset
- Cutaway Section
- Evidence Reconstruction

**Figuren sind kein Default-Fallback.**

### Figuren

Prominente nicht wiederkehrende Personen sollen sich sichtbar unterscheiden. Generische identische Stickman-Klone sind verboten. Wiederkehrende Figuren bleiben erkennbar.

## Phase F — Bilddichte

Pipeline V4:

- Ziel Ø ca. **2,5–4,2 s pro Visual**
- ab 5,5 s Split prüfen
- ab 7 s Split stark bevorzugen
- 9 s Hard-Max ohne klare Begründung

Orientierung:

- 60 s → häufig 18–26 Visuals
- 90 s → häufig 24–34 Visuals
- 120 s → häufig 32–44 Visuals

Keine Füllbilder. Ein neuer Story-Beat muss aber aktiv auf einen neuen visuellen Beat geprüft werden.

## Phase G — Video World Lock

Vor dem Flow-Build:

```text
99-technik/FLOW_WORLD_LOCK.json
```

mindestens:

```text
status = READY
settingName
settingDescription
```

Wiederkehrende Elemente zusätzlich als Places, Characters, Props, Palette, Zeit/Wetter und Continuity Rules festhalten.

## Phase H — Flow Compiler V3

```bash
npm run build:youtube-flow -- --dir "youtube/<week>/<slug>"
```

Der Compiler verwendet:

- `config/flow-style-lock.json`
- `video.json`
- `BILD_AUDIO_ZUORDNUNG.json`
- `FLOW_WORLD_LOCK.json`

Garantien:

- Narration-first-Regel
- individueller Figurenstil statt Klone
- Style Anchor pro Bild
- Visual-Form-Guards
- World Lock
- Cover-Text
- No-Text bei BILD 02–NN
- zweistufiges Cover-Gate

## Phase I — Phase-1-Gate

```bash
npm run validate:youtube-phase1 -- --dir "youtube/<week>/<slug>"
```

Für Pipeline V4 werden zusätzlich verlangt:

- `youtubeUpload.title`
- `youtubeUpload.description`
- Narration-first Visual Planning aktiv
- Figuren nicht als Default-Fallback

## Phase J — Google Flow

### Stage 1

- genau drei Cover-Kandidaten
- danach STOP
- Nutzer wählt

### Stage 2

- Gewinner = `Bild 01.png`
- BILD 02–NN erzeugen
- maximal fünf aktive Generierungen

## Phase K — Phase 2 / Phase 3

Nach finalen Bildern und Nutzer-Voice:

```text
Phase 2
→ PHASE3_IMAGE_LOCK
→ Audiooptimierung
→ Whisper Alignment
→ Timeline
→ Pacing QC
→ Remotion
```

Phase 3 darf niemals Bilder erzeugen, ersetzen oder bearbeiten.

## Phase L — Export

Vor Finalisierung muss `video.json.youtubeUpload` gepflegt sein.

Finaler Ordner:

```text
03-export/
├── FINAL_VIDEO.mp4
├── THUMBNAIL.png
└── CAPTION.txt
```

`CAPTION.txt` enthält mindestens Titel + Beschreibung, optional Hashtags/Keywords und Thumbnail-Text.

## Produktionsprinzip

Schwaches Thema nicht mit Länge retten.  
Schwaches Skript nicht mit Bildern retten.  
Unklaren Beat nicht mit einem zufälligen Figurenbild retten.  
Unpassende Visual Form nicht mit Prompt-Länge retten.  
Fehlende Bilder in Phase 3 niemals automatisch erzeugen.
