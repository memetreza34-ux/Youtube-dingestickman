# History Image Prompt Template — Flow Compiler V3

## Zweck

Dieses Dokument beschreibt, **wie die interne Scene Card in den finalen Google-Flow-Prompt übersetzt wird**.

Neue Produktionen schreiben `google-flow-prompt.txt` nicht mehr manuell. Die verbindliche Implementierung liegt in:

```text
src/lib/flow-prompt.js
src/cli/build-youtube-flow-prompt.js
```

Build-Befehl:

```bash
npm run build:youtube-flow -- --dir "youtube/<week>/<slug>"
```

## 1. Eingaben des Compilers

Der Compiler benötigt vier Quellen:

```text
99-technik/video.json
99-technik/BILD_AUDIO_ZUORDNUNG.json
99-technik/FLOW_WORLD_LOCK.json
config/flow-style-lock.json
```

### video.json

Liefert unter anderem:

- Titel
- Thema
- Style-ID
- Bildzahl
- Seitenverhältnis
- exakten deutschen Cover-Text

### BILD_AUDIO_ZUORDNUNG.json

Enthält die Scene Card V2 pro Bild:

```text
viewerTakeaway
visualPurpose
topicAnchor
visualForm
visualConcept
dominantSubject
actionState
composition
camera
depthPlan
lightingMood
supportingElements
continuityNote
historicalAccuracyNote
promptQcScore
```

### FLOW_WORLD_LOCK.json

Fixiert die videospezifische Welt und muss vor dem Build `READY` sein.

### flow-style-lock.json

Fixiert die kanalweite Rendering-DNA und muss `READY` sein.

## 2. Compiler-Reihenfolge pro Bild

Jeder natürliche Einzelprompt wird inhaltlich in dieser Reihenfolge zusammengesetzt:

```text
1. kompakter unveränderlicher Style Anchor
2. Visual Concept / Bildidee
3. Dominant Subject + Action/State
4. Composition
5. Camera
6. Depth Plan
7. Lighting / Mood
8. maximal 1–3 Supporting Elements
9. Visual-Form-Guard, falls nötig
10. Continuity Note
11. Historical Accuracy Note
12. Cover-Text oder No-Text-Regel
```

Die internen Feldnamen werden nicht als Formular ausgegeben. Das Ergebnis bleibt ein natürlicher direkter Prompt.

## 3. Warum der Style Anchor pro Bild Pflicht ist

Der lange `CHANNEL STYLE — IMMUTABLE` wird einmal für den gesamten Batch definiert.

Zusätzlich beginnt jeder Bildprompt mit demselben kurzen Style Anchor aus `config/flow-style-lock.json`.

Dadurch ist die Priorität eindeutig:

```text
Rendering-DNA bleibt gleich
→ Szene und Epoche dürfen wechseln
→ Kamera und Stimmung dürfen wechseln
→ Stil darf nicht wechseln
```

Der Anchor ist absichtlich kompakt. Einzelprompts dürfen nicht mit immer neuen Style-Synonymen aufgebläht werden.

## 4. Style-Drift-Sperre

Folgende generische Wörter sind in den Scene Cards für V3 unerwünscht und werden durch den Compiler/Validator blockiert:

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

Warum: Diese Wörter steuern oft einen allgemeinen Render-Look statt die konkrete Bildaussage.

Besser:

```text
slightly elevated wide view
cool overcast daylight
hard side shadow from the gate tower
large empty middle ground
small warm fire as the only warm accent
```

## 5. Visual-Form-Guards

Der Compiler schützt Visual Forms, die besonders leicht verloren gehen.

### comparison
Beide Pole bleiben sichtbar und klar räumlich gegeneinandergestellt.

### cause-effect
Ursache und Folge bleiben sichtbar verbunden.

### process-sequence
Die Zustandsänderung bleibt sofort lesbar; bei Bedarf derselbe Ort und fast derselbe Blickwinkel.

### system-hierarchy
Hierarchie entsteht über Höhe, Distanz, Wege, Gruppierung und Beziehungen statt Corporate-Pfeile.

### battle-city-overview
Die räumliche Lage bleibt Hauptidee; kein zufälliger Figuren-Close-up.

### object-focus
Das Objekt trägt die Aussage wirklich und bleibt groß; Hintergrund ruhig.

### character-scene
Haltung, Handlung, Blick oder Beziehung der Figuren trägt den Gedanken.

## 6. Cover

BILD 01 ist Cover + erste Szene.

Der Compiler verlangt einen echten Cover-Text aus `video.json`.

Regeln:

- 2–5 Wörter
- Deutsch
- exakt vorgegeben
- groß und sofort lesbar
- hoher Kontrast
- Hauptmotiv nicht verdecken
- keine zweite Textzeile
- kein Logo
- keine Bildnummer
- keine Pseudo-Schrift

## 7. Bilder 02–NN

Jeder Nicht-Cover-Prompt endet explizit mit einer No-Text-Regel.

```text
No visible text, labels, letters, numbers, logos, watermarks or pseudo-writing anywhere in the image.
```

Das ist bewusst strenger als nur `No visible text`.

## 8. World Lock

`FLOW_WORLD_LOCK.json` muss mindestens enthalten:

- `status: READY`
- `settingName`
- `settingDescription`

Optional, aber bei wiederkehrenden Elementen erwünscht:

- recurringPlaces
- recurringCharacters
- recurringProps
- basePalette
- timeWeatherLogic
- continuityRules

Platzhalter sind beim Validator verboten.

## 9. Supporting Elements

Maximal drei.

Sie dürfen nur bleiben, wenn sie eine Funktion haben:

- Ursache
- Folge
- Maßstab
- Ort/Epoche
- Blickführung
- Kontinuität

Dekoration ohne Aussage wird entfernt.

## 10. Prompt-QC vor dem Build

Der Compiler akzeptiert nur:

```text
promptQcScore >= 8
promptQcScore <= 10
```

Ein schlechter Prompt darf nicht dadurch „repariert“ werden, dass der Compiler mehr Wörter anhängt. Die Scene Card muss vorher verbessert werden.

## 11. Finaler Master-Prompt

Der Compiler erzeugt automatisch:

```text
ACTIVE_STYLE_ID
PROMPT_SYSTEM: flow-compiler-v3
CHANNEL STYLE — IMMUTABLE
STYLE CONSISTENCY RULE
STYLE REFERENCES / INGREDIENTS
VIDEO WORLD LOCK — IMMUTABLE WITHIN THIS VIDEO
COVER TEXT
BILD 01 ... BILD NN
GLOBAL NEGATIVE STYLE RULE
GLOBAL COMPOSITION RULES
TEXT RULE
TWO-STAGE COVER GATE
```

Diese Struktur ist für Google Flow direkt kopierbar.

## 12. Nachträgliche Änderungen

Der finale `google-flow-prompt.txt` ist ein **Build-Artefakt**.

Nicht direkt editieren.

Bei Änderungsbedarf:

```text
Scene Card / World Lock / Cover-Text ändern
→ Prompt-QC neu prüfen
→ build:youtube-flow erneut ausführen
→ validate:youtube-phase1 erneut ausführen
```

Damit bleibt die Produktion reproduzierbar und Agenten können die Bildwelt nicht durch freie Prompt-Improvisation verwässern.
