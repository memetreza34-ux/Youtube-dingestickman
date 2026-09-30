# Repository Agent Rules

## Phase 3 — HARTE ASSET-SPERRE

Diese Regel gilt insbesondere für Antigravity/Gemini-Agenten und hat Vorrang vor Komfort-Automationen.

Wenn der Nutzer sinngemäß sagt `fang an`, `start`, `mach Phase 3`, `render das Video` oder eine andere Anweisung zum Start der Phase 3 gibt:

1. Verwende ausschließlich die bereits vorhandenen finalen Bilder aus `00-bildprompts/images/`.
2. Erzeuge in Phase 3 niemals selbst neue Bilder.
3. Regeneriere, bearbeite, ersetze, lösche, verschiebe oder ergänze in Phase 3 niemals Bilder.
4. Rufe in Phase 3 kein Bildgenerierungsmodell, keine Bild-API und kein externes Bildtool auf.
5. Fehlt `Bild NN.png`, stimmt die Bildzahl nicht oder ist eine Bilddatei ungültig, dann sofort ABBRECHEN.
6. Bei einem Fehler nicht selbst reparieren oder Ersatz erzeugen. Dem Nutzer exakt mitteilen, welches Bild bzw. welcher Asset-Fehler den Abbruch verursacht hat.
7. `npm run phase3:youtube -- --dir "..."` legt nach bestandenem Phase-2-Gate einen Hash-Lock in `99-technik/PHASE3_IMAGE_LOCK.json` an. Jede spätere Änderung am Bilderordner ist ein harter Fehler.
8. Phase 3 darf Audio, Alignment, Timeline, Remotion-Render und Export bearbeiten, aber der Ordner `00-bildprompts/images/` ist read-only.

Kurzform: **Phase 3 montiert vorhandene Assets. Phase 3 erzeugt keine Bilder. Fehler = abbrechen + melden.**
