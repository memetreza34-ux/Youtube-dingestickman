# Kanal-Gehirn / Brain Index

Diese Dateien sind die dauerhafte Wissensbasis für den Geschichts-Kanal. Sie verhindern, dass Entscheidungen zwischen Chats, Agenten oder Produktionsphasen verloren gehen.

## Allgemeine Autorität / Priorität

Bei Widersprüchen gilt:

1. neueste ausdrückliche Nutzerentscheidung
2. `channel/99-DECISION-LOG.md`
3. kanalspezifische Dateien unter `channel/`
4. `config/channel-policy.json`
5. `config/visual-policy.json`
6. allgemeine Pipeline-Regeln
7. alte Beispiele oder externe Referenzkanäle

Externe Kanäle dienen nur als Inspiration/Analyse, niemals als automatisch zu kopierende Identität.

## Spezielle Autorität für die Bildwelt

Für Google-Flow-Generierungen gilt zusätzlich eine klare Style-Hierarchie:

```text
freigegebene Style-Reference-Ingredients, sobald READY
→ config/flow-style-lock.json
→ channel/10-STYLE-DNA-V2.md
→ channel/06-VISUAL-SYSTEM.md
→ freie Modellinterpretation
```

`config/flow-style-lock.json` ist die maschinenlesbare Quelle für die unveränderliche Rendering-DNA.

## Dateien

### `01-CHANNEL-DNA.md`
Wofür der Kanal steht, Ziel, Ton, Zielgruppe und Abgrenzung.

### `02-TOPIC-SYSTEM.md`
Welche Themen erlaubt sind, welche nicht, wie Themen formuliert werden und welche Themenfamilien existieren.

### `03-SCRIPT-BIBLE.md`
Verbindliche Schreibregeln: Einstieg, Storytelling, Satzstil, Mini-Hooks, Wendepunkt und Schluss.

### `04-RESEARCH-POLICY.md`
Wie historische Aussagen geprüft, Unsicherheiten behandelt und Quellen dokumentiert werden.

### `05-VIDEO-BLUEPRINT.md`
Produktionslogik eines Videos von Thema bis Übergabe an die Bildplanung.

### `06-VISUAL-SYSTEM.md`
Grundbildwelt `history-stickman-adaptive-v1`: Figuren, Rendering, Farbwelt, Textregeln, historische Lesbarkeit, adaptive Stimmung und Nicht-Figuren-Visuals.

### `07-VISUAL-GRAMMAR.md`
Entscheidet, welche Bildform einen Skriptsatz am besten erklärt: Figur, Karte, Objekt, Architektur, System, Vergleich, Symbolbild, Übersicht usw.

### `08-FLOW-PROMPTING.md`
Verbindliches Google-Flow-System V3: Style Lock, World Lock, Scene Direction, Compiler, Style Anchor, Ingredients und zweistufiges Cover-Gate.

### `09-IMAGE-PROMPT-TEMPLATE.md`
Spezifikation, wie Scene Cards durch Flow Compiler V3 in den finalen natürlichen Prompt übersetzt werden. Der finale Prompt wird nicht manuell geschrieben.

### `10-STYLE-DNA-V2.md`
Menschlich lesbare Präzisierung von Figurenproportionen, Linien, Flächen, Detailhierarchie, Raum, Kamera, Komposition, Licht und Farbe.

### `11-VISUAL-DIRECTOR.md`
Verpflichtende Zwischenstufe zwischen Skript und Prompt. Erzwingt Viewer Takeaway, Visual Concept, Dominant Subject, Action/State, Composition, Camera, Depth, Mood und Continuity.

### `12-PROMPT-QC.md`
Prüft die geplante Szene vor dem Build. Mindestscore: **8/10**. Aussage-, Visual-Form- oder Kompositionsverlust mit 0 Punkten ist immer ein Fail.

### `13-STYLE-REFERENCE-PACK.md`
Spezifikation für neun vom Nutzer freizugebende Master-Referenzen. Nach `READY` werden passende Referenzen zusätzlich als Google-Flow-Ingredients genutzt.

### `99-DECISION-LOG.md`
Chronologisches Register fester Kanalentscheidungen.

## Maschinenlesbare Visual-Dateien

### `config/visual-policy.json`
Zentrale Visual-Policy und aktive Prompt-System-Version.

### `config/flow-style-lock.json`
Harter Google-Flow-Style-Lock mit Figurenkonstruktion, Detailbudget, Style Anchor, Negativregeln und Drift-Risikowörtern.

### `99-technik/FLOW_WORLD_LOCK.json`
Videospezifischer Lock für Orte, Figuren, Props, lokale Farbigkeit und Zeit-/Wetterkontinuität.

## Pflicht für Agenten

Vor Bildplanung oder Bildgenerierung mindestens lesen:

- `channel/06-VISUAL-SYSTEM.md`
- `channel/07-VISUAL-GRAMMAR.md`
- `channel/08-FLOW-PROMPTING.md`
- `channel/09-IMAGE-PROMPT-TEMPLATE.md`
- `channel/10-STYLE-DNA-V2.md`
- `channel/11-VISUAL-DIRECTOR.md`
- `channel/12-PROMPT-QC.md`
- `channel/13-STYLE-REFERENCE-PACK.md`
- `config/visual-policy.json`
- `config/flow-style-lock.json`

## Verbindlicher Visual-Pfad

```text
Script
→ Aussage / Viewer Takeaway
→ Visual Concept
→ Visual Form
→ Composition Design
→ Camera
→ Depth / Mood
→ Continuity
→ Prompt QC >= 8/10
→ READY FLOW_WORLD_LOCK
→ Flow Compiler V3
→ Phase-1-Validator
→ Google Flow
```

Keine alten Kanalregeln aus anderen Repositories übernehmen. Keine fehlenden Kanalentscheidungen stillschweigend erfinden. Den kompilierten `google-flow-prompt.txt` nicht manuell umschreiben; Änderungen erfolgen an Scene Card, World Lock, Cover-Text oder Style Lock und werden anschließend neu gebaut.
