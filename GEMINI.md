# Repository Agent Rules

## Phase 2 — VISUAL-QC IST PFLICHT

Diese Regel gilt insbesondere für Antigravity/Gemini-Agenten.

Bevor Phase 3 gestartet werden darf, müssen bei neuen Produktionen alle finalen Bilder in `00-bildprompts/images/` tatsächlich visuell geprüft werden.

Pflicht:

1. Jedes Bild gegen den zugehörigen Story-Beat und die Scene Card prüfen.
2. Prüfen, ob das Bild den gesprochenen Gedanken klar unterstützt und nicht nur dekorativ passt.
3. Prüfen, ob die Inszenierung interessant genug ist: klare Handlung, räumliche Spannung, Tiefenstaffelung, Größenkontrast, Detailfokus, Reveal, Ursache/Folge oder ein anderes geplantes Visual-Interest-Mittel.
4. Unbeabsichtigt alberne Gesichter, Posen, Hände, Interaktionen oder komische Kompositionen ablehnen.
5. Generische Klon-Figuren ablehnen.
6. Bild 01 darf nur den exakten Cover-Text enthalten. Keine Bildnummer, Zusatzüberschrift, Labels oder zweite Textzeile.
7. Bild 02–NN dürfen absolut keinen sichtbaren Text enthalten. Insbesondere `BILD 11`, `BILD 29`, `IMAGE`, `SCENE`, Bildnummern, Labels, Wasserzeichen und Pseudo-Schrift sind harte Fehler.
8. Fehlerhafte Bilder werden in Phase 2 neu generiert und erneut geprüft. Erst nach endgültiger Freigabe wird `99-technik/PHASE2_VISUAL_QC.json` auf `APPROVED` gesetzt.
9. Für jedes Bild müssen Narration-Support, Visual Interest und Style Consistency mindestens 8/10 erreichen.
10. Ohne vollständig freigegebene `PHASE2_VISUAL_QC.json` darf Phase 3 nicht beginnen.

Maßgeblich: `channel/15-VISUAL-INTEREST-QC.md`.

## Phase 3 — HARTE ASSET-SPERRE

Diese Regel gilt insbesondere für Antigravity/Gemini-Agenten und hat Vorrang vor Komfort-Automationen.

Wenn der Nutzer sinngemäß sagt `fang an`, `start`, `mach Phase 3`, `render das Video` oder eine andere Anweisung zum Start der Phase 3 gibt:

1. Verwende ausschließlich die bereits vorhandenen finalen Bilder aus `00-bildprompts/images/`.
2. Erzeuge in Phase 3 niemals selbst neue Bilder.
3. Regeneriere, bearbeite, ersetze, lösche, verschiebe oder ergänze in Phase 3 niemals Bilder.
4. Rufe in Phase 3 kein Bildgenerierungsmodell, keine Bild-API und kein externes Bildtool auf.
5. Fehlt `Bild NN.png`, stimmt die Bildzahl nicht oder ist eine Bilddatei ungültig, dann sofort ABBRECHEN.
6. Bei einem Fehler nicht selbst reparieren oder Ersatz erzeugen. Dem Nutzer exakt mitteilen, welches Bild bzw. welcher Asset-Fehler den Abbruch verursacht hat.
7. `npm run phase3:youtube -- --dir "..."` darf erst nach bestandenem Phase-2-Gate inklusive Visual-QC laufen und legt dann einen Hash-Lock in `99-technik/PHASE3_IMAGE_LOCK.json` an. Jede spätere Änderung am Bilderordner ist ein harter Fehler.
8. Phase 3 darf Audio, Alignment, Timeline, Remotion-Render und Export bearbeiten, aber der Ordner `00-bildprompts/images/` ist read-only.

Kurzform: **Phase 2 prüft und korrigiert Bilder. Phase 3 montiert ausschließlich freigegebene vorhandene Assets. Fehler in Phase 3 = abbrechen + melden.**
