# Video Blueprint — Geschichts-Kanal V2

Diese Datei verbindet Themen-, Recherche-, Skript- und Visual-System mit der bestehenden Produktionspipeline.

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
12. `Lighting / Mood` definieren
13. maximal 1–3 notwendige `Supporting Elements` wählen
14. `Continuity Note` und `Historical Accuracy Note` ergänzen
15. eindeutigen Audio-Anker setzen
16. Bilddauer planen
17. finalen natürlichen Bildprompt kompilieren
18. Prompt nach `12-PROMPT-QC.md` bewerten
19. nur Prompt-QC >= 8/10 freigeben
20. **für Bild 01 einen passenden deutschen Cover-Text festlegen**

Verbindliche Scene-Card-Felder stehen in `11-VISUAL-DIRECTOR.md` und `config/visual-policy.json`.

### Harte Übersetzungsregel

Die Visual Form darf beim Übergang zum finalen Prompt nicht verloren gehen.

Beispiele:

- `comparison` → beide Seiten müssen sichtbar bleiben
- `cause-effect` → Ursache und Folge müssen verbunden bleiben
- `process-sequence` → Zustandsänderung muss lesbar bleiben
- `system-hierarchy` → Hierarchie muss räumlich verständlich bleiben

### Cover-Text-Regel

- Bild 01 ist Cover + erste Szene
- Cover-Text ist Pflicht
- idealerweise 2–5 Wörter
- passend zum konkreten Hook/Thema, nicht automatisch voller Videotitel
- exakt vorgeben und korrekt schreiben
- stark kontrastreich zum tatsächlichen Hintergrund
- darf Hauptmotiv nicht verdecken

Verbindliche Bildwelt: `history-stickman-adaptive-v1` nach `06-VISUAL-SYSTEM.md`, präzisiert durch `10-STYLE-DNA-V2.md`.

**Wichtig:** Figuren sind nur eine Visual-Form. Karten, Architektur, Objekte, Systeme, Vergleiche, Übersichten und Symbolbilder sind gleichwertig, wenn sie den Satz besser erklären.

## Phase F — Google Flow / Assets

Google-Flow-Aufträge nach `08-FLOW-PROMPTING.md` und `09-IMAGE-PROMPT-TEMPLATE.md` bauen:

- gemeinsamer Channel Style einmal pro Batch
- Video World Lock einmal pro Batch
- einzelne Bildblöcke natürlich und direkt formulieren
- keine Inventarlisten-Prompts
- geplante Visual Form und Viewer Takeaway erhalten
- Komposition/Kamera/Tiefe/Stimmung konkret genug beschreiben
- Bild 01 enthält immer den exakt vorgegebenen deutschen Cover-Text
- alle drei Bild-01-Kandidaten verwenden denselben Cover-Text
- Bild 02–NN standardmäßig ohne sichtbaren Text
- keine Bildnummern im generierten Bild
- alle Bilder müssen wie derselbe Kanal aussehen
- Bild 01 ist Cover + erste Szene und erhält drei Kandidaten
- Bild 02–NN jeweils ein finaler Kandidat

Nach Generierung Bilder visuell prüfen, bevor Phase 2 als fertig gilt. Ein Cover mit falsch geschriebenem, schlecht lesbarem oder kontrastarmem Text wird verworfen.

## Phase G — Nutzer-Voice / Render

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

Die textliche Bildwelt ist produktionsfähig. Zusätzlich wird nach `13-STYLE-REFERENCE-PACK.md` ein Satz von neun freigegebenen Master-Referenzen aufgebaut.

Bis dieses Pack `READY` ist, gilt `10-STYLE-DNA-V2.md` als stärkste textliche Style-Autorität.

## Produktionsprinzip

Jede Phase soll den Fehler möglichst **vor** der nächsten Phase erkennen.

Ein schwaches Thema nicht durch ein langes Skript retten.
Ein schwaches Skript nicht durch mehr Bilder retten.
Eine schwache Bildidee nicht durch einen längeren Prompt retten.
Einen schlechten Prompt nicht an Google Flow weitergeben.
Ein schlechtes Bild nicht durch stärkere Animation retten.
