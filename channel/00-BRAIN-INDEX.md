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
Verbindliche Bildwelt: `history-stickman-adaptive-v1`. Definiert Figuren, Rendering, Farbwelt, Textregeln, historische Lesbarkeit, adaptive Stimmung und Nicht-Figuren-Visuals.

### `07-VISUAL-GRAMMAR.md`
Entscheidet, **welche Bildform** einen Skriptsatz am besten erklärt: Figur, Karte, Objekt, Architektur, System, Vergleich, Symbolbild, Übersicht usw.

### `08-FLOW-PROMPTING.md`
Verbindliche Google-Flow-Promptstruktur. Gemeinsamen Stil pro Batch einmal definieren, Einzelbilder kurz und konkret beschreiben, Figuren nicht erzwingen.

### `99-DECISION-LOG.md`
Chronologisches Register fester Kanalentscheidungen.

## Pflicht für Agenten

Vor einer größeren Aufgabe für diesen Kanal zuerst die relevanten Kanaldateien lesen.

Für Bildplanung oder Bildgenerierung immer mindestens lesen:

- `channel/06-VISUAL-SYSTEM.md`
- `channel/07-VISUAL-GRAMMAR.md`
- `channel/08-FLOW-PROMPTING.md`
- `config/visual-policy.json`

Keine alten Kanalregeln aus anderen Repositories übernehmen. Keine fehlenden Kanalentscheidungen stillschweigend erfinden.
