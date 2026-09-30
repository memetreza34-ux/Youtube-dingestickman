# Google Flow Prompting — Flow Compiler V3

## Ziel

Google Flow bekommt keinen frei improvisierten Master-Prompt mehr. Neue Produktionen werden aus geprüften Scene Cards, einem festen Channel Style Lock und einem videospezifischen World Lock **deterministisch kompiliert**.

Verbindliche Quellen:

1. `config/flow-style-lock.json` — maschinenlesbare Channel-Zeichen-DNA
2. `channel/10-STYLE-DNA-V2.md` — menschlich lesbare Style-Erklärung
3. `channel/11-VISUAL-DIRECTOR.md` — Scene Card V2
4. `channel/12-PROMPT-QC.md` — Qualitätsgate
5. `99-technik/FLOW_WORLD_LOCK.json` — videospezifische Kontinuität
6. `src/lib/flow-prompt.js` — Compilerlogik

## Kernprinzip

```text
Script
→ Scene Card V2
→ Prompt QC >= 8/10
→ READY World Lock
→ Flow Compiler V3
→ finaler google-flow-prompt.txt
→ Phase-1-Validator
→ Google Flow
```

Der finale Prompt wird **nicht mehr manuell aus Markdown-Regeln zusammengesetzt**.

## Drei Locks mit klarer Verantwortung

### 1. CHANNEL STYLE LOCK — über alle Videos konstant

Quelle: `config/flow-style-lock.json`.

Fixiert insbesondere:

- 2D hand-drawn history-explainer rendering
- Figurenproportionen und Gesichtsvereinfachung
- Linienlogik
- flache gedeckte Farben
- subtile Cel-Schattierung
- Papier-/Tuschetextur
- Detailhierarchie
- verbotene Style-Drifts

Dieser Lock fixiert die **Zeichen-DNA**, nicht die Inszenierung. Epoche, Wetter, Kamera, Perspektive, Licht, Bildaufbau und emotionale Stimmung dürfen wechseln.

Es werden bewusst **keine globalen festen Master-Referenzbilder** verwendet. Die Konsistenz kommt aus dem textlichen und maschinenlesbaren Style Lock.

### 2. VIDEO WORLD LOCK — pro Video konstant

Quelle: `99-technik/FLOW_WORLD_LOCK.json`.

Fixiert:

- wiederkehrende Orte und Silhouetten
- Architektur und Raumlayout
- wiederkehrende Figuren
- wiederkehrende Props
- lokale Grundfarbigkeit
- Wetter-/Zeitlogik
- Vorher-/Nachher-Kontinuität

Vor dem Prompt-Build muss der Status `READY` sein.

### 3. SCENE DIRECTION — pro Bild individuell

Quelle: jeweilige Scene Card V2.

Fixiert:

- Viewer Takeaway
- Visual Form
- Visual Concept
- Dominant Subject
- Action / State
- Composition
- Camera
- Depth Plan
- Lighting / Mood
- Supporting Elements
- Continuity Note
- Historical Accuracy Note

Damit bleibt die **Bildidee individuell**, während die Zeichen-DNA gleich bleibt.

## Gleicher Stil ≠ gleiche Szene

Flow darf Konsistenz nicht als Aufforderung verstehen, wiederholt denselben Bildaufbau zu erzeugen.

Pro Szene dürfen bewusst variieren:

- Kameraabstand
- Blickwinkel
- Perspektive
- Hauptmotivposition
- Vordergrund/Mittelgrund/Hintergrund
- Negativraum
- Licht
- Wetter
- Tageszeit
- Stimmung
- Visual Form

Fast identische Blickwinkel sind nur sinnvoll, wenn echte Kontinuität gezeigt werden soll, etwa Vorher/Nachher oder eine sichtbare Zustandsänderung.

Der ausgewählte Cover-Kandidat darf innerhalb **dieses Videos** als Continuity-Hilfe genutzt werden. Er ist keine globale Kanalreferenz.

## Warum der Style Anchor pro Bild wiederholt wird

Ein globaler Style-Absatz allein ist bei langen Batches zu leicht zu verwässern. Flow Compiler V3 setzt deshalb vor jeden `BILD NN`-Prompt denselben kurzen `sceneStyleAnchor` aus `config/flow-style-lock.json`.

Wichtig:

- der lange Master Style steht nur einmal
- der kompakte Style Anchor wird pro Bild wiederholt
- der Anchor enthält nur die unveränderliche Rendering-DNA
- der Anchor darf keine konkrete Komposition vorgeben
- die eigentliche Szene bleibt individuell

So wird Konsistenz erhöht, ohne alle Bilder gleich aussehen zu lassen.

## Keine generischen Style-Wörter

Scene Cards sollen konkrete Regie statt unkontrollierbarer Stilwörter verwenden.

Vermeiden bzw. in V3 blockiert:

- `cinematic`
- `epic`
- `ultra detailed`
- `hyper detailed`
- `photographic`
- `realistic lighting`
- `depth of field`
- `bokeh`

Stattdessen konkret schreiben:

```text
slightly elevated wide view
cool overcast daylight
large empty middle-ground distance
small warm fire as the only warm accent
```

Das steuert das Bild, ohne Flow in eine andere Rendering-Welt zu ziehen.

## Prompt-Build

Erst wenn Scene Cards und World Lock vollständig sind:

```bash
npm run build:youtube-flow -- --dir "youtube/<week>/<slug>"
```

Der Compiler erzeugt vollständig neu:

```text
00-bildprompts/google-flow-prompt.txt
```

Danach:

```bash
npm run validate:youtube-phase1 -- --dir "youtube/<week>/<slug>"
```

### Wichtige Regel

Den kompilierten Prompt nicht manuell „schöner schreiben“.

Wenn eine Szene verbessert werden muss:

1. Scene Card ändern
2. Prompt-QC neu bewerten
3. Compiler erneut ausführen
4. Validator erneut ausführen

So bleibt die Quelle der Wahrheit die Planung und nicht eine nachträglich manipulierte Textdatei.

## Anti-Gleichförmigkeitsprüfung

Vor dem Build soll der gesamte Bildplan als Sequenz geprüft werden.

Warnzeichen:

- mehrere Character Scenes hintereinander mit derselben frontalen medium-wide Kamera
- mehrere Gebäudeansichten hintereinander immer mittig und weit
- wiederholtes Subject Placement ohne erzählerischen Grund
- dieselbe Lichtstimmung trotz klarer inhaltlicher Veränderung
- unnötige Wiederholung derselben Visual Form, obwohl eine andere Form die Aussage besser erklären würde

Kontinuität ist erwünscht. Mechanische Wiederholung ist es nicht.

## Zweistufige Generation — weiterhin Pflicht

### STAGE 1 — nur Cover

1. finalen kompilierten Prompt verwenden
2. genau drei Varianten von BILD 01 erzeugen
3. alle drei enthalten exakt denselben deutschen Cover-Text
4. fehlerhafte oder schlecht lesbare Textvarianten verwerfen
5. danach vollständig stoppen
6. keine Bilder 02–NN erzeugen
7. Flow darf keinen Gewinner auswählen
8. Nutzer wählt den Cover-Kandidaten

Status bis dahin:

```text
WAITING_FOR_USER_COVER_SELECTION
```

### STAGE 2 — erst nach Nutzerwahl

- gewähltes Cover wird `Bild 01.png`
- gewähltes Cover darf nur als zusätzliche Video-World-/Continuity-Hilfe für dieses Video verwendet werden
- Channel Style Lock bleibt unverändert
- anschließend BILD 02–NN erzeugen
- Nicht-Cover-Bilder jeweils einmal
- maximal fünf aktive Generierungen gleichzeitig

## Cover-Regel

BILD 01 ist immer Cover + erste Szene.

- ideal 2–5 deutsche Wörter
- exakt vorgegeben
- groß und sofort lesbar
- starker Kontrast zum tatsächlichen Hintergrund
- Hauptmotiv nicht verdecken
- keine zweite Textzeile
- kein englischer Zusatz
- keine Bildnummer
- kein Logo
- keine Pseudo-Schrift

## Bilder 02–NN

Standard:

```text
NO visible text.
```

Keine Labels, Zahlen, erfundene Buchstaben, Wasserzeichen oder dekorative Schrift.

## Visual-Form-Treue

Der Compiler fügt je nach Visual Form zusätzliche Schutzregeln ein.

Besonders kritisch:

- `comparison` → beide Pole sichtbar
- `cause-effect` → Ursache und Folge sichtbar verbunden
- `process-sequence` → Zustandsänderung sofort lesbar
- `system-hierarchy` → räumliche Struktur statt Corporate-Diagramm
- `battle-city-overview` → räumliche Lage bleibt Hauptidee
- `object-focus` → Objekt trägt wirklich die Aussage
- `character-scene` → Haltung/Handlung/Beziehung trägt die Aussage

## Definition of Done für einen Flow-Prompt

Ein Flow-Prompt ist erst produktionsbereit, wenn:

1. alle Scene Cards vollständig sind,
2. jeder Prompt-QC-Score mindestens 8/10 beträgt,
3. `FLOW_WORLD_LOCK.json` auf `READY` steht,
4. `npm run build:youtube-flow` erfolgreich lief,
5. `video.json.flowPromptBuiltAt` gesetzt wurde,
6. keine Platzhalter mehr vorhanden sind,
7. jeder Bildblock den kompakten Style Anchor enthält,
8. Cover-Text exakt vorkommt,
9. BILD 02–NN eine explizite No-Text-Regel enthalten,
10. der Bildplan keine unnötig mechanische Wiederholung von Kamera und Komposition aufweist,
11. `npm run validate:youtube-phase1` besteht.
