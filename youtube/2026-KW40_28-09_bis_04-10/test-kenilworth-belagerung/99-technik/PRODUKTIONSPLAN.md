# Produktionsplan — Testvideo 01

## Ziel
Erster vollständiger Pipeline-Test des Geschichts-Kanals, maximal 120 Sekunden.

## Phase 1 — FERTIG UND NACH ERSTEM BILDTEST ÜBERARBEITET
- [x] Thema
- [x] Recherche
- [x] Story Outline
- [x] Voice-over-Skript
- [x] Visual Grammar / 18 Bildmomente
- [x] Google-Flow-Prompt V1.1
- [x] Audio-Anker
- [x] Phase-1-QC
- [x] erster Flow-Bildtest ausgewertet
- [x] alte Bildcharge verworfen
- [x] Bildprompt-System verschärft: 1 Kernaussage, 1 Hauptmotiv, max. 1–3 unterstützende Elemente, Continuity Lock

## Warum die erste Bildcharge verworfen wurde
- zu viele Wimmelbild-/Lehrbuchmomente
- teilweise zu viele kleine Figuren und Details
- Motive nicht dominant genug
- Kenilworth/Burg/Räume nicht konsequent gleich gehalten
- unerwünschte englische bzw. pseudo-lesbare Beschriftungen
- einige Bilder wirkten eher wie historische Tafeln als starke YouTube-Szenen

## Phase 2 — JETZT
- [ ] ALLE bisherigen Testbilder verwerfen
- [ ] ausschließlich den aktuellen Prompt `00-bildprompts/google-flow-prompt.txt` verwenden
- [ ] Bild 01 dreimal neu erzeugen und stärksten Cover-/Szenen-Kandidaten wählen
- [ ] Bild 02–18 komplett neu erzeugen
- [ ] Kontinuität prüfen: gleiche Kenilworth-Silhouette, gleiches Tor, gleicher Lagerraum, wiederkehrende Figuren gleich
- [ ] Bilder 03 / 08 / 11 müssen sichtbar derselbe Lagerraum aus möglichst gleichem Blickwinkel sein
- [ ] pro Bild genau ein dominantes Hauptmotiv prüfen
- [ ] maximal 1–3 unterstützende Elemente prüfen
- [ ] kein Wimmelbild / keine Museumstafel / kein Schulbuchposter
- [ ] kein englischer Text / keine Pseudo-Schrift; standardmäßig gar kein sichtbarer Text
- [ ] historische Plausibilität und KI-Fehler prüfen
- [ ] Gewinner sauber als `Bild 01.png` bis `Bild 18.png` in `00-bildprompts/images/` ablegen
- [ ] Nutzer erstellt finale Voice exakt aus `01-voice-script/voice-script.txt`
- [ ] genau eine finale Audiodatei in `02-audio/` ablegen

## Phase 3 — DANACH
- [ ] Phase-2-Gate
- [ ] Audiooptimierung
- [ ] Whisper Alignment
- [ ] Timeline
- [ ] Pacing-QC
- [ ] Remotion Render
- [ ] Export-QC

## Testbeobachtungen nach Render
Bewerten:
- funktioniert der Hook?
- bleiben alle Bilder klar im selben Kanalstil?
- bleiben wiederkehrende Orte und Personen wirklich konsistent?
- sind die Bilder klar genug oder noch zu kleinteilig?
- ist die Mischung aus Figuren und Nicht-Figuren abwechslungsreich?
- sind 4,5–7,5 s Bildhaltedauer passend?
- wirkt 1,10× Voice-Geschwindigkeit für History natürlich?
- reichen die sanften Remotion-Bewegungen oder wirkt das Video zu statisch?
- welche Bild-QC-Regeln müssen danach automatisiert werden?
