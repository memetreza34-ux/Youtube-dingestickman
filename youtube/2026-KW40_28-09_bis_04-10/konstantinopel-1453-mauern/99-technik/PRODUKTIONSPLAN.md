# Produktionsplan — Konstantinopel 1453

Status: **PHASE 1 READY**

## Ziel
Etwa 2-minütiger Praxistest der Script-first-, Chronologie- und Whole-Video-Coherence-Regeln.

## Reihenfolge
1. Drei Covervarianten für Bild 01 in Google Flow generieren.
2. Nutzer wählt genau ein Cover.
3. Gewähltes Cover als `Bild 01.png` speichern.
4. Erst danach Bild 02–32 generieren.
5. Jedes Bild gegen Scene Card, Chronologie, Textregel, Weirdness und Narrationspassung prüfen.
6. `PHASE2_VISUAL_QC.json` mit exakten SHA-256-Werten befüllen.
7. Erst nach bestandenem Phase-2-QC Audio/Phase 3 starten.

## Chronologie
Die Bildfolge ist verbindlich:

`Ausgangslage → 6. April → Artillerie/Reparaturen → 20. April → 22. April → Ende Mai → 29. Mai → Durchbruch → Fall → Erklärung`

Keine Rückblende zum 6. April nach einem Einstieg am 29. Mai. Spätere Schäden, Schiffe im Goldenen Horn oder Finalangriff dürfen nicht vor ihrem chronologischen Zeitpunkt auftauchen.

## Besondere Qualitätsziele
- Historische Welt muss zusammenhängend wirken, nicht wie eine Sammlung beliebiger Illustrationen.
- Jedes Bild muss den gerade gesprochenen Satz direkt tragen, nicht nur allgemein zum Thema passen.
- Pro Bild ein sofort verständlicher Hauptgedanke; keine unübersichtlichen Massenszenen ohne Funktion.
- Erklärung dient der Geschichte; keine lange Diagrammsequenz.
- Redaktionstext nur dort, wo Datum oder Ort Orientierung verbessert.
- Menschen tragen die Folgen der Entscheidungen sichtbar.
- Keine Bildnummer oder interne Prompt-ID darf im Artwork erscheinen.
