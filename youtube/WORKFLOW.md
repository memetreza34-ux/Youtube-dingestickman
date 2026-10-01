# YouTube Workflow — Geschichts-Kanal

## Grundprinzip

```text
Thema
→ Recherche
→ Story Outline
→ History-Voice-over-Skript V3
→ Story Beats
→ Viewer Takeaway
→ bestes visuelles Mittel pro Beat
→ Visual Concept / Visual Form
→ Composition / Camera / Mood
→ Prompt QC >= 8/10
→ READY Flow World Lock
→ Flow Compiler V3
→ Phase-1-Validator
→ Google Flow
→ finale Bilder + Nutzer-Voice
→ Phase 2
→ Phase-3-Bildlock
→ Audio / Alignment / Timeline / Pacing
→ Remotion-Render
→ FINAL_VIDEO + THUMBNAIL + CAPTION
```

## 1. Skript als Geschichte bauen

Verbindlich ist `channel/03-SCRIPT-BIBLE.md` **V3**.

Bevorzugte Logik:

```text
konkreter historischer Moment
→ Problem
→ Handlung / Entscheidung
→ Folge
→ neue Komplikation
→ Reveal / Wendepunkt
→ Auflösung
→ historische Bedeutung
```

Kontext kommt just in time. Keine Begrüßung, kein Lexikon-Einstieg, keine reine Faktenliste.

## 2. Story Beats markieren

Bildplanung folgt Story Beats, nicht Absätzen.

Neuen Beat prüfen bei Änderung von:

- Handlung
- Ursache / Folge
- Person / Gruppe
- Ort
- Zeit
- Zustand
- Größenordnung
- Zuschauer-Erkenntnis

### Dichte

Zielbereich durchschnittlich etwa **2,5–4,2 Sekunden pro Visual**.

- ab 5,5 s: Split prüfen
- ab 7 s: Split stark bevorzugen
- 9 s: Hard-Max ohne klare Begründung

Orientierung:

- ca. 60 s → häufig 18–26 Visuals
- ca. 90 s → häufig 24–34 Visuals
- ca. 120 s → häufig 32–44 Visuals

Keine Füllbilder. Inhalt entscheidet.

## 3. Narration-first Visual Selection

Vor jedem Visual lautet die erste Frage:

> Was muss der Zuschauer genau jetzt verstehen?

Erst danach Visual Form wählen.

Gleichwertig erlaubt:

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

**Figuren sind nie der automatische Fallback.**

## 4. Figuren

Menschen sind stilisierte historische Figuren, keine generischen Stickman-Klone.

Prominente nicht wiederkehrende Personen unterscheiden sich möglichst in mindestens drei Achsen wie Gesicht, Alterseindruck, Haar/Bart, Kopfbedeckung, Statur, Kleidung, Ausrüstung oder Haltung.

Wiederkehrende Figuren bleiben bewusst erkennbar.

## 5. Scene Card V2

Pflichtfelder:

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

Pfad:

```text
Script
→ Story Beat
→ Viewer Takeaway
→ bestes visuelles Mittel
→ Visual Concept
→ Visual Form
→ Composition
→ Camera
→ Depth / Mood
→ Continuity / Historical Accuracy
→ Prompt QC >= 8/10
```

## 6. Google Flow

Vor Build muss `99-technik/FLOW_WORLD_LOCK.json` READY sein.

```bash
npm run build:youtube-flow -- --dir "youtube/<week>/<slug>"
npm run validate:youtube-phase1 -- --dir "youtube/<week>/<slug>"
```

Flow Compiler V3 schützt Visual Form, Narration-first-Regel, Figuren-Individualität und World Lock.

### Cover Gate

Stage 1:

- nur drei BILD-01-Kandidaten
- identischer deutscher Cover-Text
- danach STOP
- Nutzer wählt

Stage 2 erst nach Nutzerwahl:

- Gewinner = `Bild 01.png`
- BILD 02–NN erzeugen
- maximal fünf aktive Generierungen

## 7. Phase 2

Finale Bilder ausschließlich unter:

```text
00-bildprompts/images/Bild 01.png
...
00-bildprompts/images/Bild NN.png
```

Genau eine finale Nutzer-Voice unter `02-audio/`.

```bash
npm run validate:youtube-phase2 -- --dir "youtube/<week>/<slug>"
```

## 8. Phase 3 — nur vorhandene Bilder

```bash
npm run phase3:youtube -- --dir "youtube/<week>/<slug>"
```

Phase 3 darf niemals Bilder erzeugen, ersetzen, bearbeiten, löschen oder ergänzen.

Nach Phase 2 wird `99-technik/PHASE3_IMAGE_LOCK.json` mit Hashes angelegt. Fehlt oder verändert sich ein Bild:

```text
ABBRUCH
→ keine Reparatur
→ keine Bildgenerierung
→ Fehler melden
```

## 9. Upload-Metadaten und Export

In `99-technik/video.json` wird gepflegt:

```json
"youtubeUpload": {
  "title": "...",
  "description": "...",
  "hashtags": ["#Geschichte"],
  "keywords": ["..."]
}
```

Beim Finalisieren entstehen automatisch:

```text
03-export/
├── FINAL_VIDEO.mp4
├── THUMBNAIL.png
└── CAPTION.txt
```

`CAPTION.txt` enthält:

- TITLE
- DESCRIPTION
- optional HASHTAGS
- optional KEYWORDS
- THUMBNAIL_TEXT

## 10. Audio / Ende

- Nutzer-Voice = einzige finale Sprecherquelle
- Original unverändert
- Playback standardmäßig 1,10×
- Ziel −16 LUFS
- True Peak max. −1,5 dBTP
- 48 kHz
- Schluss-Hold Ziel 1,3 s

## Definition of Done

Ein Video ist fertig, wenn:

- Script V3 funktioniert
- jeder Absatz einen echten Story-Schritt bringt
- Visuals die aktuelle Narration direkt unterstützen
- Visual Forms abwechslungsreich und inhaltlich gewählt sind
- keine generischen Figuren-Klone vorkommen
- Bilddichte sinnvoll hoch ist
- Flow-/World-Locks stimmen
- Phase 1 und 2 bestehen
- Phase 3 nur vorhandene Assets nutzt
- FINAL_VIDEO.mp4, THUMBNAIL.png und CAPTION.txt vorhanden sind
- Export-QC bestanden ist
