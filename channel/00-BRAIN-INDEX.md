# Kanal-Gehirn / Brain Index

Diese Dateien sind die dauerhafte Wissensbasis für den Geschichts-Kanal. Sie sollen verhindern, dass Entscheidungen zwischen Chats, Agenten oder Produktionsphasen verloren gehen.

## Autorität / Priorität

Bei Widersprüchen gilt folgende Reihenfolge:

1. Neueste ausdrückliche Nutzerentscheidung
2. `channel/99-DECISION-LOG.md`
3. Kanalspezifische Dateien unter `channel/`
4. `config/channel-policy.json`
5. `config/visual-policy.json`
6. Allgemeine Pipeline-Regeln
7. Alte Beispiele oder externe Referenzkanäle

Externe Kanäle dienen nur als **Inspiration/Analyse**, niemals als automatisch zu kopierende Identität.

## Dateien

### `01-CHANNEL-DNA.md`
Wofür der Kanal steht, Ziel, Ton, Zielgruppe, Abgrenzung.

### `02-TOPIC-SYSTEM.md`
Welche Themen erlaubt sind, welche nicht, wie ein Thema formuliert werden soll und welche Themenfamilien existieren.

### `03-SCRIPT-BIBLE.md`
Verbindliche Schreibregeln: Einstieg, Storytelling, Satzstil, Mini-Hooks, Wendepunkt und Schluss.

### `04-RESEARCH-POLICY.md`
Wie historische Aussagen geprüft, Unsicherheiten behandelt und Quellen dokumentiert werden.

### `05-VIDEO-BLUEPRINT.md`
Produktionslogik eines Videos von Thema bis Übergabe an die Bildplanung.

### `06-VISUAL-SYSTEM.md`
Verbindliche Grundbildwelt: `history-stickman-adaptive-v1`. Definiert Figuren, Rendering, Farbwelt, Textregeln, historische Lesbarkeit, adaptive Stimmung und Nicht-Figuren-Visuals.

### `07-VISUAL-GRAMMAR.md`
Entscheidet, **welche Bildform** einen Skriptsatz am besten erklärt: Figur, Karte, Objekt, Architektur, System, Vergleich, Symbolbild, Übersicht usw.

### `08-FLOW-PROMPTING.md`
Verbindliche Google-Flow-Batchlogik und Kontinuitätsregeln.

### `09-IMAGE-PROMPT-TEMPLATE.md`
Verbindliche Struktur des finalen natürlichen Google-Flow-Prompts.

### `10-STYLE-DNA-V2.md`
Präzisiert Figurenproportionen, Linien, Flächen, Detailhierarchie, Raum, Kamera, Komposition, Licht und Farbe. Verhindert, dass `historical stickman` von Bild zu Bild beliebig interpretiert wird.

### `11-VISUAL-DIRECTOR.md`
Verpflichtende Zwischenstufe zwischen Skript und Prompt. Erzwingt Viewer Takeaway, Visual Concept, Dominant Subject, Action/State, Composition, Camera, Depth, Mood und Continuity.

### `12-PROMPT-QC.md`
Prüft jeden finalen Bildprompt gegen die interne Scene Card. Mindestscore: **8/10**. Aussage-, Visual-Form- oder Kompositionsverlust mit 0 Punkten ist immer ein Fail.

### `99-DECISION-LOG.md`
Chronologisches Register fester Kanalentscheidungen.

## Pflicht für Agenten

Vor einer größeren Aufgabe für diesen Kanal zuerst die relevanten Kanaldateien lesen.

Für Bildplanung oder Bildgenerierung immer mindestens lesen:

- `channel/06-VISUAL-SYSTEM.md`
- `channel/07-VISUAL-GRAMMAR.md`
- `channel/08-FLOW-PROMPTING.md`
- `channel/09-IMAGE-PROMPT-TEMPLATE.md`
- `channel/10-STYLE-DNA-V2.md`
- `channel/11-VISUAL-DIRECTOR.md`
- `channel/12-PROMPT-QC.md`
- `config/visual-policy.json`

## Verbindlicher Visual-Pfad

```text
Script
→ Aussage
→ Visual Concept
→ Visual Form
→ Composition Design
→ Camera
→ Mood / Light
→ Continuity
→ Prompt
→ Prompt QC >= 8/10
```

Keine alten Kanalregeln aus anderen Repositories übernehmen. Keine fehlenden Kanalentscheidungen stillschweigend erfinden.
