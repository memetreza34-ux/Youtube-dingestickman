# Video Blueprint — Geschichts-Kanal V3

Diese Datei verbindet Themen-, Recherche-, Skript- und Visual-System mit der technischen Produktionspipeline.

## Phase A — Thema

1. historische Kernidee bestimmen
2. klare Zuschauerfrage formulieren
3. Themen-Säule zuordnen
4. Duplicate-/Ähnlichkeitscheck
5. prüfen, ob ausreichend belastbare Quellen existieren

**Gate:** Ohne klare zentrale Frage kein Produktionsstart.

## Phase B — Recherche

1. Zeitrahmen und Schauplatz festlegen
2. zentrale Personen/Akteure identifizieren
3. Ursache-Wirkungs-Kette recherchieren
4. Wendepunkte herausarbeiten
5. unsichere oder umstrittene Punkte markieren
6. Quellen dokumentieren

**Gate:** Keine zentrale Storybehauptung nur aus Vermutung ableiten.

## Phase C — Story Outline

Vor dem Fließtext zuerst grobe Dramaturgie:

```text
Cold Open
→ notwendiger Kontext
→ Ausgangslage
→ Problem / Veränderung
→ Eskalation
→ Wendepunkt
→ Folgen
→ Antwort auf Kernfrage
→ kurzer Schlussgedanke
```

Nicht jedes Thema benötigt exakt dieselben Kapitel. Struktur folgt der Geschichte.

## Phase D — Voice-over-Skript

Nach `03-SCRIPT-BIBLE.md` schreiben. Anschließend Script-QC durchführen.

**Gate:** Das Skript muss ohne Bilder interessant, verständlich und historisch belastbar funktionieren.

## Phase E — Bildplanung / Visual Director V2

Erst nach bestandenem Skript:

1. jeden Abschnitt auf seine Kernaussage prüfen
2. `Viewer Takeaway` formulieren
3. `Visual Purpose` bestimmen
4. `Topic Anchor` bestimmen
5. nach `07-VISUAL-GRAMMAR.md` die beste `Visual Form` wählen
6. `Visual Concept` entwickeln — keine reine Objektliste
7. `Dominant Subject` festlegen
8. `Action / State` festlegen
9. konkrete `Composition` planen
10. passende `Camera` wählen
11. `Depth Plan` definieren
12. `Lighting / Mood` konkret definieren
13. maximal 1–3 notwendige `Supporting Elements` wählen
14. `Continuity Note` und `Historical Accuracy Note` ergänzen
15. eindeutigen Audio-Anker setzen
16. Bilddauer planen
17. Scene Card nach `12-PROMPT-QC.md` bewerten
18. nur Scene Cards mit Prompt-QC >= 8/10 freigeben
19. für Bild 01 einen passenden deutschen Cover-Text festlegen

Verbindliche Scene-Card-Felder stehen in `11-VISUAL-DIRECTOR.md` und `config/visual-policy.json`.

### Harte Visual-Form-Regel

Die Visual Form darf beim späteren Compiler-Schritt nicht verloren gehen.

Beispiele:

- `comparison` → beide Seiten müssen sichtbar bleiben
- `cause-effect` → Ursache und Folge müssen verbunden bleiben
- `process-sequence` → Zustandsänderung muss lesbar bleiben
- `system-hierarchy` → Hierarchie muss räumlich verständlich bleiben

### Cover-Text-Regel

- Bild 01 ist Cover + erste Szene
- Cover-Text ist Pflicht
- idealerweise 2–5 Wörter
- passend zum konkreten Hook/Thema
- exakt vorgeben und korrekt schreiben
- stark kontrastreich zum tatsächlichen Hintergrund
- darf Hauptmotiv nicht verdecken

Verbindliche Bildwelt: `history-stickman-adaptive-v1` nach `06-VISUAL-SYSTEM.md`, präzisiert durch `10-STYLE-DNA-V2.md` und maschinenlesbar fixiert in `config/flow-style-lock.json`.

**Wichtig:** Figuren sind nur eine Visual-Form. Karten, Architektur, Objekte, Systeme, Vergleiche, Übersichten und Symbolbilder sind gleichwertig, wenn sie den Satz besser erklären.

## Phase F — Video World Lock

Vor dem Google-Flow-Prompt muss `99-technik/FLOW_WORLD_LOCK.json` vollständig ausgefüllt werden.

Mindestens:

```text
status = READY
settingName
settingDescription
```

Bei wiederkehrenden Elementen zusätzlich:

- recurringPlaces
- recurringCharacters
- recurringProps
- basePalette
- timeWeatherLogic
- continuityRules

Der World Lock fixiert die Welt dieses konkreten Videos. Der Channel Style Lock fixiert dagegen die kanalweite Zeichenart.

## Phase G — Flow Compiler V3

Der finale Google-Flow-Prompt wird **nicht manuell formuliert**.

Nach freigegebenen Scene Cards und READY World Lock:

```bash
npm run build:youtube-flow -- --dir "youtube/<week>/<slug>"
```

Der Compiler verwendet:

- `config/flow-style-lock.json`
- `video.json`
- `BILD_AUDIO_ZUORDNUNG.json`
- `FLOW_WORLD_LOCK.json`

und erzeugt `00-bildprompts/google-flow-prompt.txt` vollständig neu.

### Compiler-Garantien

- langer unveränderlicher Channel Style einmal pro Batch
- kompakter identischer Style Anchor in jedem Bildprompt
- Scene-Card-Komposition bleibt erhalten
- Visual-Form-Guards bei empfindlichen Formen
- exakter Cover-Text bei Bild 01
- harte No-Text-Regel bei Bild 02–NN
- zweistufiger manueller Cover-Gate
- `flowPromptBuiltAt` in `video.json`

Der kompilierten Datei darf kein Agent anschließend frei einen anderen Stil „hinzufügen“.

### Keine generischen Render-Wörter

V3 blockiert Style-Drift-Risikowörter wie:

- `cinematic`
- `epic`
- `ultra detailed`
- `hyper detailed`
- `photographic`
- `realistic lighting`
- `depth of field`
- `bokeh`

Kamera, Licht, Tiefe und Stimmung stattdessen konkret beschreiben.

## Phase H — Phase-1-Gate

Nach dem Build:

```bash
npm run validate:youtube-phase1 -- --dir "youtube/<week>/<slug>"
```

Erst nach bestandenem Gate darf Google Flow verwendet werden.

## Phase I — Google Flow / Assets

### Stage 1 — Cover

- genau drei Bild-01-Kandidaten
- identischer deutscher Cover-Text
- fehlerhafte Schriftvarianten verwerfen
- danach stoppen
- Nutzer wählt selbst

### Stage 2 — Rest

Erst nach Nutzerwahl:

- gewähltes Cover wird `Bild 01.png`
- gewähltes Cover als zusätzliche Continuity-Referenz nutzen
- BILD 02–NN jeweils einmal erzeugen
- maximal fünf aktive Generierungen gleichzeitig

Nach Generierung Bilder visuell prüfen, bevor Phase 2 als fertig gilt.

## Phase J — Nutzer-Voice / Render

Danach greift die technische Pipeline:

```text
finale Nutzerstimme
→ Audiooptimierung
→ Whisper Alignment
→ Timeline
→ Pacing QC
→ Remotion
→ Export QC
```

## Kurze Testvideos

Der langfristige Kanalrahmen liegt bei ungefähr 8–15 Minuten, wenn der Inhalt es trägt. Für Pipeline-, Stil- und Qualitätsprüfungen sind bewusst kurze Testvideos bis maximal **120 Sekunden** erlaubt.

Bei Testvideos gelten dieselben Qualitätsregeln für Recherche, Skript und Bildwelt; nur Umfang und Zahl der Story-Schritte sind kleiner.

## Style-Reference-Pack

Nach `13-STYLE-REFERENCE-PACK.md` wird ein Satz von neun freigegebenen Master-Referenzen aufgebaut.

Bis das Pack `READY` ist, gilt `config/flow-style-lock.json` als stärkste maschinenlesbare Style-Autorität.

Nach `READY` werden pro Generierung nur die 2–4 passendsten Referenzen als Google-Flow-Ingredients genutzt. Sie ergänzen den Style Lock, ersetzen ihn nicht.

## Produktionsprinzip

Jede Phase soll den Fehler möglichst **vor** der nächsten Phase erkennen.

Ein schwaches Thema nicht durch ein langes Skript retten.
Ein schwaches Skript nicht durch mehr Bilder retten.
Eine schwache Bildidee nicht durch einen längeren Prompt retten.
Eine schwache Scene Card nicht durch den Compiler kaschieren.
Einen nicht validierten Prompt nicht an Google Flow geben.
Ein schlechtes Bild nicht durch stärkere Animation retten.
