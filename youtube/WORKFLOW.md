# YouTube Workflow — Geschichts-Kanal

Dieses Repository enthält die kanalspezifische Produktionspipeline für den Geschichts-Kanal.

## Grundprinzip

```text
Thema
→ Recherche
→ Story Outline
→ History-Voice-over-Skript
→ Story Beats
→ Viewer Takeaway
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
→ Export-QC
```

## 1. Skript zuerst als Geschichte bauen

Verbindlich ist `channel/03-SCRIPT-BIBLE.md` V2.

Bevorzugte Logik:

```text
konkreter historischer Moment
→ Problem
→ Handlung / Entscheidung
→ Folge
→ neues Problem oder neue Frage
→ größere historische Bedeutung
→ Rückkehr zur Ausgangsfrage
```

Keine Begrüßung, kein Lexikon-Einstieg, keine reine Faktenliste. Bei kurzen Testvideos soll die zentrale Spannung meist innerhalb von 6–15 Sekunden stehen.

## 2. Story Beats markieren

Bildplanung folgt **Story Beats**, nicht bloß Absätzen.

Ein neuer visueller Beat wird geprüft, sobald sich deutlich ändert:

- Handlung
- Ursache / Folge
- Person oder Gruppe
- Ort
- Zeit
- Zustand
- Größenordnung / Zoomstufe
- zentrale Zuschauer-Erkenntnis

### Dichte

Zielbereich pro normalem Bild: ungefähr **3–5 Sekunden**.

- ab 6,5 s: Split prüfen
- ab 8 s: Split stark bevorzugen
- 10 s: Hard-Max, außer bewusst begründeter Ausnahme

Für etwa 60 Sekunden sind oft ungefähr **14–20 Visuals** sinnvoll. Für etwa 120 Sekunden häufig **26–36**. Das sind Orientierungen; der Inhalt entscheidet.

## 3. Mehrmoment-Illustrationen sind erlaubt

Neue Visual Form:

```text
multi-moment-illustration
```

Sie darf zwei oder höchstens drei eng zusammengehörige Momente in einer Illustration verbinden, wenn das die Geschichte klarer macht.

Erlaubt:

- links → Mitte → rechts
- Vordergrund → Mittelgrund → Hintergrund
- vorher → Veränderung → danach
- Ursache → Reaktion → Folge

Harte Regel:

**Ein Bild = ein erzählerischer Takeaway**, nicht zwingend nur ein einzelner Zustand.

Nicht erlaubt bleiben dichte Collagen, neun kleine Panels, Wimmelbilder oder Sammlungen unabhängiger Szenen.

## 4. Scene Card V2

Pflichtfelder pro Visual:

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

Verbindlicher Pfad:

```text
Script
→ Story Beat
→ Viewer Takeaway
→ Visual Concept
→ Visual Form
→ Composition
→ Camera
→ Depth / Mood
→ Continuity / Historical Accuracy
→ Prompt QC >= 8/10
```

## 5. Google Flow

Vor Build muss `99-technik/FLOW_WORLD_LOCK.json` auf `READY` stehen.

Prompt bauen:

```bash
npm run build:youtube-flow -- --dir "youtube/<week>/<slug>"
```

Danach:

```bash
npm run validate:youtube-phase1 -- --dir "youtube/<week>/<slug>"
```

Der Flow Compiler erhält die Visual Form. Für `multi-moment-illustration` schreibt er ausdrücklich eine integrierte 2–3-Moment-Regel in den Szenenprompt.

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

## 6. Phase 2 — finale Assets

Bilder liegen ausschließlich unter:

```text
00-bildprompts/images/Bild 01.png
...
00-bildprompts/images/Bild NN.png
```

Genau eine finale Nutzer-Voice liegt unter `02-audio/`.

Prüfung:

```bash
npm run validate:youtube-phase2 -- --dir "youtube/<week>/<slug>"
```

## 7. Phase 3 — nur vorhandene Bilder

```bash
npm run phase3:youtube -- --dir "youtube/<week>/<slug>"
```

**Phase 3 darf niemals Bilder erzeugen, ersetzen, bearbeiten, löschen oder ergänzen.**

Nach bestandenem Phase-2-Gate wird `99-technik/PHASE3_IMAGE_LOCK.json` mit Dateinamen, Größen und SHA-256-Hashes angelegt. Während Phase 3 werden diese Hashes wiederholt geprüft.

Fehlt ein Bild oder verändert sich ein Bildbyte:

```text
ABBRUCH
→ keine Reparatur
→ keine Bildgenerierung
→ Fehler klar an den Nutzer melden
```

Danach folgen nur Audio-Optimierung, Whisper-Alignment, Timeline, Pacing, Remotion und Export.

## 8. Audio / Ende

- Nutzer-Voice bleibt einzige finale Sprecherquelle
- Originaldatei bleibt unverändert
- Playback standardmäßig 1,10× bei erhaltener Tonhöhe
- Ziel −16 LUFS
- True Peak max. −1,5 dBTP
- 48 kHz
- Schluss-Hold 1,2–1,5 s, Ziel 1,3 s

## Definition of Done

Ein Video ist fertig, wenn Skript und Geschichte funktionieren, Story Beats sinnvoll visualisiert sind, keine unnötig langen Holds bestehen, Mehrmoment-Bilder nur bei klarem Nutzen eingesetzt werden, Flow-/World-Locks stimmen, Phase 1 und 2 bestehen, Phase 3 ausschließlich vorhandene Assets verwendet und der finale Render alle QC-Gates besteht.
