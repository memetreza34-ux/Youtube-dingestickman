# Google Flow Prompting — History Visual System V1.3

## Ziel

Google Flow bekommt am Ende **einen sauberen Copy-Paste-Prompt**. Interne Planung und der tatsächliche Flow-Prompt werden strikt getrennt.

## Goldene Regel

**Interne Bildplanung darf technisch und ausführlich sein. Der finale Google-Flow-Prompt nicht.**

### Ebene A — intern, NICHT an Google Flow

Intern dürfen Audio Anchor, Visual Purpose, Visual Function, Visual Form, Kernaussage, Dominant Subject, Supporting Elements, Kamera/Komposition, Continuity-Hinweise, geplante Dauer und QC verwendet werden.

### Ebene B — finaler Google-Flow-Prompt

Der tatsächliche Flow-Prompt besteht nur aus:

1. kurzer Aufgabe
2. einem gemeinsamen `CHANNEL STYLE`
3. einem `VIDEO WORLD LOCK`
4. einem festen `COVER TEXT`
5. `BILD 01` bis `BILD NN`
6. pro Bild einem natürlichen direkten Fließtext-Prompt
7. kurzer globaler Negativ-/Textregel

Keine internen Analysefelder im finalen Prompt.

## Verboten im finalen Flow-Prompt

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

## Cover-Regel — verbindlich

**BILD 01 ist immer Cover + erste Szene und enthält immer passenden deutschen Text.**

Regeln:

- Text muss zum konkreten Video passen
- ideal 2–5 Wörter
- nicht automatisch den kompletten Videotitel übernehmen
- exakten Wortlaut im Prompt vorgeben
- alle drei Cover-Kandidaten benutzen denselben exakten Text
- Schreibfehler = Kandidat verwerfen
- Text groß und sofort lesbar
- Text darf Hauptmotiv/Gesicht/entscheidende Aktion nicht verdecken
- Hintergrund hell → dunkle Schrift
- Hintergrund dunkel → helle Schrift
- falls nötig dezenter Rand/Schatten für Kontrast
- kein zusätzlicher Untertitel, keine englische Zweitzeile, kein Logo

## Empfohlenes finales Format

```text
ACTIVE_STYLE_ID: history-stickman-adaptive-v1

Create N separate 16:9 historical explainer illustrations for one coherent German YouTube video.

CHANNEL STYLE:
[gemeinsamer Stilblock]

VIDEO WORLD LOCK:
[wiederkehrende Orte/Figuren/Props]

COVER TEXT:
Use exactly this German cover text: "[2–5 Wörter]".

BILD 01
[starker natürlicher Cover-Prompt + exakter Cover-Text + Platzierung/Kontrast]

BILD 02
[natürlicher direkter Bildprompt, kein Text]

...

GLOBAL RULES:
Bild 01 contains the exact German cover text. Bild 02 through Bild NN contain no visible text unless explicitly required later.
```

## Prompt-Stil pro Bild

Ein guter Einzelprompt klingt wie eine klare Regieanweisung an einen Illustrator, nicht wie ein Formular.

## Stil- und World-Lock

Der `CHANNEL STYLE` wird pro Batch nur einmal geschrieben. Der `VIDEO WORLD LOCK` legt wiederkehrende Architektur, Räume, Figurenmerkmale, Props, Grundfarbigkeit und Wetter-/Zeitlogik fest.

Danach genügt in Einzelprompts z. B. `the same castle`, `the same street`, `the same defender` oder `return to exactly the same room and camera angle`.

## Bildhierarchie

Intern weiterhin sicherstellen:

- ein Bild = eine Kernaussage
- ein dominantes Hauptmotiv
- höchstens 1–3 notwendige Nebenelemente
- keine Wimmelbilder
- keine Lehrbuch-/Museumstafeln
- große, YouTube-taugliche Formen

## Text in Bildern

- **BILD 01:** deutscher Cover-Text ist Pflicht
- **BILD 02–NN:** standardmäßig kein sichtbarer Text
- außerhalb des Covers nur bei ausdrücklicher Notwendigkeit und dann exakt auf Deutsch
- keine englischen Labels
- keine Bildnummern im eigentlichen Bild
- keine Pseudo-Schrift

## Qualitätscheck vor Übergabe an Flow

1. Ist `google-flow-prompt.txt` direkt kopierbar?
2. Stehen dort keine internen Analysefelder mehr?
3. Ist der Channel-Style nur einmal definiert?
4. Ist der Video-World-Lock nur einmal definiert?
5. Hat BILD 01 einen passenden kurzen deutschen Cover-Text?
6. Ist der Cover-Text exakt geschrieben, kontrastreich und frei vom Hauptmotiv platziert?
7. Ist jeder Bildprompt natürlich und direkt formuliert?
8. Bleiben wiederkehrende Orte/Figuren/Props konsistent?
9. Sind BILD 02–NN frei von unnötigem sichtbarem Text?
