# Produktionsplan — Hollandse Waterlinie 1672

Status: **PHASE 1 READY**

## Ziel

Etwa 2-minütiger Praxistest des neuen Narration-Alignment- und Chronologie-Systems mit einer vollständig linearen historischen Geschichte.

## Reihenfolge

1. Google Flow erhält `00-bildprompts/google-flow-prompt.txt`.
2. Flow erzeugt ausschließlich drei Varianten für Bild 01.
3. Nutzer wählt genau ein Cover.
4. Gewähltes Cover als `Bild 01.png` speichern.
5. Erst danach Bild 02–32 erzeugen.
6. Jedes Bild gegen `narrationBeat`, `timeContext`, `visualAnswer`, Chronologie, Klarheit, Textregel und World Lock prüfen.
7. Bei falschem historischen Zustand oder späterem Ereignis im falschen Bild: in Phase 2 verwerfen und neu erzeugen.
8. `PHASE2_VISUAL_QC.json` mit Dateiname und SHA-256 jedes freigegebenen Bildes befüllen.
9. Erst nach bestandenem Phase-2-QC Audio/Phase 3 starten.

## Qualitätsziele

- vollständig chronologische Bildfolge ohne Rückblende
- jedes Bild passt exakt zum aktuell gesprochenen Beat
- kein überflutetes Land vor der Schleusenentscheidung
- kein französischer Stillstand, bevor die Waterlinie fertig erzählt wurde
- Karten nur für Orientierung
- menschliche Kosten der Inundation sichtbar
- Waterlinie nicht als magische oder lückenlose Wand darstellen
- jedes Bild in ungefähr einer Sekunde verständlich
- kein interner Text im Artwork
