# Video Blueprint — Geschichts-Kanal V5

Diese Datei verbindet Themenfindung, Recherche, Script, Visual-System und technische Pipeline.

## Phase A — Topic Director V2

1. mindestens 30 Rohideen erzeugen
2. auf 12 Kandidaten verdichten
3. Duplicate Check ausführen
4. Story Engine, Stakes, Visual Potential, historische Bedeutung, Neuheit, Titelpotenzial und Quellenlage bewerten
5. mindestens 3 Titelrichtungen prüfen
6. mindestens 5 sinnvolle Visual Forms identifizieren
7. Diversity Gate prüfen
8. `99-technik/TOPIC_SCORECARD.json` ausfüllen

**Gate:** `TOPIC_SCORECARD.status=APPROVED`, Score >= 7,6 und `approvedByTopicDirector=true`.

Test-, Legacy-, Paused- und Rejected-Themen dürfen nur warnen. Aktive/reservierte Produktionen dürfen bei echter Ähnlichkeit blockieren.

## Phase B — Recherche

1. Zeitraum / Schauplatz
2. zentrale Akteure
3. Ursache-Wirkungs-Kette
4. Wendepunkte
5. Unsicherheiten / Streitfragen
6. Quellen dokumentieren

**Gate:** Keine zentrale Behauptung nur aus Vermutung.

## Phase C — Script V3

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

Kontext kommt just in time. Keine Anekdoten-Ketten ohne Story-Funktion.

## Phase D — Story Quality Gate V1

`99-technik/STORY_QC.json` muss prüfen:

- zentrale Frage
- Story-Spine
- größere historische Bedeutung
- Hook >= 8/10
- Story Progression >= 8/10
- Historical Meaning >= 8/10
- Payoff >= 8/10
- centralStoryShare >= 0,70
- personalityCuriosityShare <= 0,30
- höchstens 2 reine Personality-/Curiosity-Beats hintereinander
- Beat-Funktionen geprüft
- Ende beantwortet Ausgangsfrage

**Gate:** `STORY_QC.status=APPROVED` und `approved=true`.

## Phase E — Story Beats / Visual Director

Nicht Absatz → Bild, sondern **Story Beat → bestes visuelles Mittel**.

Für jeden Beat:

1. Viewer Takeaway
2. Visual Purpose
3. Topic Anchor
4. Visual Form
5. Visual Concept
6. Dominant Subject
7. Action / State
8. Composition
9. Camera
10. Shot Scale
11. Depth Plan
12. Lighting / Mood
13. Visual Energy Device
14. Visual Change From Previous
15. Visual Interest Score
16. Visible Text Policy
17. 0–3 Supporting Elements
18. Continuity Note
19. Historical Accuracy Note
20. Audio-Anker
21. Bilddauer
22. Prompt-QC

## Phase F — Visual Interest Gate

Neue Produktionen:

- Visual Interest Score >= 8/10
- max. 2 gleiche Visual Forms hintereinander
- max. 2 Character Scenes hintereinander
- max. 2 gleiche Shot Scales hintereinander
- 10-Bilder-Fenster normalerweise mindestens 3 Visual Forms
- Bild 01: nur exakter Covertext
- Bild 02–NN: absolut kein sichtbarer Text

Die Pacing-Werte werden nicht hier dupliziert. **Maschinenlesbare Autorität ist `config/pipeline.json`.**

## Phase G — World Lock

Vor Flow-Build muss `99-technik/FLOW_WORLD_LOCK.json` auf READY stehen und wiederkehrende Orte, Figuren, Props, Palette sowie Zeit-/Wetterlogik definieren.

## Phase H — Flow Compiler V3

```bash
npm run build:youtube-flow -- --dir "youtube/<week>/<slug>"
```

Der Compiler verwendet Style Lock, World Lock, `video.json` und Scene Cards.

## Phase I — Phase 1

```bash
npm run validate:youtube-preproduction -- --dir "youtube/<week>/<slug>"
npm run validate:youtube-phase1 -- --dir "youtube/<week>/<slug>"
```

Phase 1 revalidiert bei neuen Projekten das Preproduction-Gate.

## Phase J — Google Flow

Stage 1:

- genau 3 Cover-Kandidaten
- nur exakter Covertext
- STOP bis Nutzerauswahl

Stage 2:

- Gewinner = `Bild 01.png`
- Bild 02–NN erzeugen
- keine sichtbaren Nummern, Labels, Wasserzeichen oder Pseudo-Schrift

## Phase K — Phase 2 Visual QC

Jedes finale Bild erhält in `PHASE2_VISUAL_QC.json`:

- narrationSupportScore
- visualInterestScore
- styleConsistencyScore
- Weirdness-Prüfung
- Text-/Bildnummern-Prüfung
- `fileName`
- `sha256`

**Gate:** Das geprüfte Bild muss bytegenau dasselbe Bild sein, das Phase 2 freigibt.

## Phase L — Phase 3

```text
Phase 2 bestanden
→ PHASE3_IMAGE_LOCK
→ Audiooptimierung
→ Alignment
→ Timeline
→ Pacing QC
→ Remotion
```

Ab `PHASE3_IMAGE_LOCK` darf kein Bild erzeugt, ersetzt, bearbeitet, gelöscht oder ergänzt werden.

## Phase M — Export

```text
03-export/
├── FINAL_VIDEO.mp4
├── THUMBNAIL.png
└── CAPTION.txt
```

## Produktionsprinzip

Schwaches Thema nicht mit Länge retten.  
Schwaches Skript nicht mit Bildern retten.  
Langweiligen Beat nicht mit generischer Figur retten.  
Korrektes, aber visuell schwaches Bild nicht automatisch akzeptieren.  
Nach Visual-QC kein anderes Bild unterschieben.  
Fehlende Bilder in Phase 3 niemals automatisch erzeugen.
