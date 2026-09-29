# Google Flow Prompting — History Visual System V1.2

## Ziel

Google Flow bekommt am Ende **einen sauberen Copy-Paste-Prompt**. Interne Planung und der tatsächliche Flow-Prompt werden strikt getrennt.

## Goldene Regel

**Interne Bildplanung darf technisch und ausführlich sein. Der finale Google-Flow-Prompt nicht.**

### Ebene A — intern, NICHT an Google Flow

Diese Informationen helfen der Pipeline beim Planen und Prüfen:

- Audio Anchor
- Visual Purpose
- Visual Function
- Visual Form
- Kernaussage
- Dominant Subject
- Supporting Elements
- Kamera / Komposition
- Continuity-Hinweise
- geplante Dauer
- QC

Diese Felder gehören in technische Planungsdateien, Mapping-Dateien und QC — **nicht** in `google-flow-prompt.txt`.

### Ebene B — finaler Google-Flow-Prompt

Der tatsächliche Flow-Prompt besteht nur aus:

1. einer kurzen Aufgabe
2. **einem** gemeinsamen `CHANNEL STYLE`
3. **einem** `VIDEO WORLD LOCK` für wiederkehrende Orte/Figuren/Props
4. pro Bild einer Überschrift `BILD NN`
5. darunter einem **natürlichen direkten Bildprompt als Fließtext**
6. einer kurzen globalen Negativ-/Textregel

Keine internen Analysefelder im finalen Prompt.

## Verboten im finalen Flow-Prompt

Diese Labels dürfen dort nicht mehr auftauchen:

```text
Audio Anchor:
VIEWER MUST IMMEDIATELY UNDERSTAND:
SHOW:
DOMINANT VISUAL ACTION / STATE:
SUPPORTING ELEMENTS:
CAMERA / COMPOSITION:
CONTINUITY LOCK:
Visual Purpose:
Visual Form:
Topic Anchor:
Planned Hold:
```

Sie können intern weiterhin verwendet werden.

## Empfohlenes finales Format

```text
Create 5 separate 16:9 historical explainer illustrations for one coherent YouTube video.

CHANNEL STYLE:
[gemeinsamer kurzer Stilblock]

VIDEO WORLD LOCK:
[gleiche Burg / gleiche Figur / gleiche Räume / gleiche Props]

BILD 01
A wide historical illustration of ... Keep the castle large in frame ...

BILD 02
Inside the same castle courtyard ...

BILD 03
Inside the same stone storage cellar ...

GLOBAL RULES:
No visible text unless explicitly requested. If text is required, it must be exact German text. No watermarks, image numbers or pseudo-text.
```

## Prompt-Stil pro Bild

Ein guter Einzelprompt klingt wie eine klare Regieanweisung an einen Illustrator, nicht wie ein Formular.

Gut:

> Inside the same stone storage cellar at Kenilworth Castle. Large grain sacks and wooden barrels fill most of the room. A rough wooden shelf with bread and one clay water jug sits against the back wall. Keep the room simple, the supplies large and clearly readable. Establish this exact room and camera angle because it will return later with fewer supplies.

Nicht gut:

> VIEWER MUST IMMEDIATELY UNDERSTAND: Strong reserves. SHOW: grain sacks. SUPPORTING ELEMENTS: barrels. CAMERA: medium-wide.

## Stil- und World-Lock

Der `CHANNEL STYLE` wird pro Batch nur einmal geschrieben.

Der `VIDEO WORLD LOCK` legt innerhalb eines Videos fest:

- wiederkehrende Architektur und Silhouette
- wiederkehrende Räume und Blickwinkel
- wiederkehrende Figurenmerkmale
- zentrale Props
- Grundfarbigkeit / Wetter / Zeitlogik

Danach genügt in Einzelprompts Formulierung wie:

- `the same castle`
- `the same gatehouse`
- `the same defender`
- `return to exactly the same cellar and camera angle`

## Bildhierarchie

Die interne Planung stellt weiterhin sicher:

- ein Bild = eine Kernaussage
- ein dominantes Hauptmotiv
- höchstens 1–3 wirklich notwendige Nebenelemente
- keine Wimmelbilder
- keine Lehrbuch-/Museumstafeln
- große, YouTube-taugliche Formen

Diese Regeln werden im finalen Prompt **natürlich beschrieben**, nicht als technische Formularfelder ausgegeben.

## Text im Bild

Standard für den gesamten Batch:

```text
No visible text in any image unless explicitly requested.
```

Falls Text zwingend nötig ist:

- exakten Wortlaut nennen
- nur Deutsch bei deutschen Videos
- kurz halten
- keine englischen Labels
- keine Bildnummern im eigentlichen Bild
- keine Pseudo-Schrift

## Figuren nicht erzwingen

Einzelprompts dürfen vollständig ohne Figuren auskommen. Karten, Architektur, Räume, Gegenstände, Landschaften und Systemdarstellungen bleiben gleichwertige Visuals, solange sie dieselbe Channel-Bildwelt verwenden.

## Qualitätscheck vor Übergabe an Flow

1. Ist `google-flow-prompt.txt` direkt kopierbar?
2. Stehen dort keine internen Analysefelder mehr?
3. Ist der Channel-Style nur einmal definiert?
4. Ist der Video-World-Lock nur einmal definiert?
5. Ist jeder `BILD NN`-Prompt ein natürlicher direkter Bildprompt?
6. Bleiben wiederkehrende Orte/Figuren/Props konsistent?
7. Ist jedes Bild klar statt überladen?
8. Ist sichtbarer Text vermieden oder exakt auf Deutsch vorgegeben?
