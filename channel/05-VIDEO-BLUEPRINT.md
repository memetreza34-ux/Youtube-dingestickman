# Video Blueprint — Geschichts-Kanal V1

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

Nach `03-SCRIPT-BIBLE.md` schreiben.

Anschließend Script-QC durchführen.

**Gate:** Das Skript muss ohne Bilder interessant, verständlich und historisch belastbar funktionieren.

## Phase E — Bildplanung

Erst nach bestandenem Skript:

1. jeden Abschnitt auf seine Kernaussage prüfen
2. `Visual Purpose` bestimmen
3. `Topic Anchor` bestimmen
4. nach `07-VISUAL-GRAMMAR.md` die beste `Visual Form` wählen
5. eindeutigen Audio-Anker setzen
6. Bilddauer planen
7. kurze konkrete Szenenbeschreibung schreiben

Verbindliche Bildwelt: `history-stickman-adaptive-v1` nach `06-VISUAL-SYSTEM.md` und `config/visual-policy.json`.

**Wichtig:** Figuren sind nur eine Visual-Form. Karten, Architektur, Objekte, Systeme, Vergleiche, Übersichten und Symbolbilder sind gleichwertig, wenn sie den Satz besser erklären.

## Phase F — Google Flow / Assets

Google-Flow-Aufträge nach `08-FLOW-PROMPTING.md` bauen:

- gemeinsamer Channel Style einmal pro Batch
- einzelne Bildblöcke kurz und konkret
- keine Bildnummern im generierten Bild
- standardmäßig kein sichtbarer Text
- alle Bilder müssen wie derselbe Kanal aussehen
- Bild 01 ist Cover + erste Szene und erhält drei Kandidaten
- Bild 02–NN jeweils ein finaler Kandidat

Nach Generierung Bilder visuell prüfen, bevor Phase 2 als fertig gilt.

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

## Produktionsprinzip

Jede Phase soll den Fehler möglichst **vor** der nächsten Phase erkennen.

Ein schwaches Thema nicht durch ein langes Skript retten.
Ein schwaches Skript nicht durch mehr Bilder retten.
Ein schlechtes Bild nicht durch stärkere Animation retten.
