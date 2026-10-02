# Repository Agent Rules

## Preproduction — TOPIC + STORY GATES SIND PFLICHT

Neue Produktionen mit `preproductionQualityGateVersion >= 1` dürfen Phase 1 erst erreichen, wenn beide Dateien vollständig freigegeben sind:

```text
99-technik/TOPIC_SCORECARD.json
99-technik/STORY_QC.json
```

Prüfen mit:

```bash
npm run validate:youtube-preproduction -- --dir "youtube/<week>/<slug>"
```

Wichtig:

- `APPROVED_NEW` aus dem Duplicate Check bedeutet nur: ausreichend neu.
- Es bedeutet **nicht**: Thema ist stark genug.
- Topic Scorecard braucht u. a. 30+ Rohideen, 12er Shortlist, Score >= 7,6, Story Engine, größere historische Bedeutung, Quellenbasis, Titelrichtungen und Visual-Form-Potenzial.
- Story QC braucht u. a. zentrale Frage, Story-Spine, Historical Meaning, starken Hook/Progression/Payoff und darf keine Anekdoten-Kette sein.

## Phase 2 — VISUAL-QC IST PFLICHT

Bevor Phase 3 gestartet werden darf, müssen bei neuen Produktionen alle finalen Bilder in `00-bildprompts/images/` tatsächlich visuell geprüft werden.

Pflicht:

1. Jedes Bild gegen den zugehörigen Story-Beat und die Scene Card prüfen.
2. Prüfen, ob das Bild den gesprochenen Gedanken klar unterstützt und nicht nur dekorativ passt.
3. Prüfen, ob die Inszenierung interessant genug ist: klare Handlung, räumliche Spannung, Tiefenstaffelung, Größenkontrast, Detailfokus, Reveal, Ursache/Folge oder ein anderes geplantes Visual-Interest-Mittel.
4. Unbeabsichtigt alberne Gesichter, Posen, Hände, Interaktionen oder komische Kompositionen ablehnen.
5. Generische Klon-Figuren ablehnen.
6. Bild 01 darf nur den exakten Cover-Text enthalten. Keine Bildnummer, Zusatzüberschrift, Labels oder zweite Textzeile.
7. Bild 02–NN dürfen absolut keinen sichtbaren Text enthalten. Insbesondere `BILD`, `IMAGE`, `SCENE`, Bildnummern, Labels, Wasserzeichen und Pseudo-Schrift sind harte Fehler.
8. Fehlerhafte Bilder werden in Phase 2 neu generiert und erneut geprüft.
9. Für jedes Bild müssen Narration-Support, Visual Interest und Style Consistency mindestens 8/10 erreichen.
10. Neue Hash-Gates verlangen zusätzlich `fileName` und SHA-256 der tatsächlich geprüften Datei. Wird das Bild danach ersetzt, ist die Freigabe ungültig.
11. Ohne vollständig freigegebene `PHASE2_VISUAL_QC.json` darf Phase 3 nicht beginnen.

## Phase 3 — HARTE ASSET-SPERRE

Wenn der Nutzer sinngemäß sagt `fang an`, `start`, `mach Phase 3`, `render das Video` oder eine andere Anweisung zum Start der Phase 3 gibt:

1. Verwende ausschließlich die bereits vorhandenen finalen Bilder aus `00-bildprompts/images/`.
2. Erzeuge in Phase 3 niemals selbst neue Bilder.
3. Regeneriere, bearbeite, ersetze, lösche, verschiebe oder ergänze in Phase 3 niemals Bilder.
4. Rufe in Phase 3 kein Bildgenerierungsmodell, keine Bild-API und kein externes Bildtool auf.
5. Fehlt `Bild NN.png`, stimmt die Bildzahl nicht oder ist eine Bilddatei ungültig, dann sofort ABBRECHEN.
6. Bei einem Fehler nicht selbst reparieren oder Ersatz erzeugen. Dem Nutzer exakt mitteilen, welcher Asset-Fehler den Abbruch verursacht hat.
7. `npm run phase3:youtube -- --dir "..."` darf erst nach bestandenem Phase-2-Gate inklusive Visual-QC laufen und legt dann `PHASE3_IMAGE_LOCK.json` an.
8. Phase 3 darf Audio, Alignment, Timeline, Remotion-Render und Export bearbeiten, aber der Ordner `00-bildprompts/images/` ist read-only.

Kurzform: **Preproduction entscheidet, ob Thema + Skript gut genug sind. Phase 2 prüft und korrigiert Bilder. Phase 3 montiert ausschließlich freigegebene vorhandene Assets.**
