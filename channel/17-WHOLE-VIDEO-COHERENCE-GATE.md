# Whole-Video Coherence Gate — V2

## Zweck

Ein Video darf nicht nur aus vielen einzeln „guten“ Teilen bestehen. Skript, Bildfolge, Chronologie und Erkläranteil müssen als **ein zusammenhängendes Geschichtsvideo** funktionieren.

Dieses Gate wird vor Phase 1 geprüft und verhindert insbesondere:

- stakkatoartiges Voice-over aus Einzelsätzen
- Visuals, die wie eine lose Sammlung verschiedener Illustrationen wirken
- zu lange Ketten aus Diagrammen / Prozessen / abstrakten Erklärbildern
- Bilder, die zwar zum Thema passen, aber nicht zum aktuellen Satz
- Orientierungslosigkeit bei Zeit- und Ortswechseln
- unnötige Rückblenden oder Vorgriffe
- unnötiges Verbot hilfreicher Jahreszahlen, Daten oder Ortsnamen

---

## 1. Script-first

Pflicht:

- vollständiger Voice-over-Fließtext wurde **vor** der Bildplanung fertiggestellt
- Script wurde einmal als Ganzes laut gelesen / auf Sprachfluss geprüft
- Visual-Beats wurden danach aus dem Skript abgeleitet

Nicht erlaubt:

```text
32 Bilder planen
→ 32 einzelne Sätze schreiben
→ als Voice-over zusammensetzen
```

---

## 2. Fließtext-QC

Das Skript muss als zusammenhängender Text funktionieren.

Hard Fail, wenn:

- lange Ketten aus sehr kurzen Einzelsätzen dominieren
- fast jeder Satz einen neuen Absatz bildet
- Übergänge zwischen Ursache, Zeit, Ort oder Folge fehlen
- der Text wie Stichpunkte klingt
- das Skript nur deshalb so geschnitten ist, weil für jeden Satz ein neues Bild vorgesehen wurde

Einzelne kurze Sätze bleiben als bewusstes Stilmittel erlaubt.

---

## 3. Chronologie ist der Standard

Für historische Ereignisse gilt standardmäßig:

```text
Ausgangslage
→ frühestes relevantes Ereignis
→ nächste Veränderung
→ Folge
→ nächster Zeitpunkt
→ Wendepunkt
→ Ende
```

Ein Einstieg mit einem späteren Höhepunkt und anschließender Rückblende ist **nicht automatisch spannender**. Er ist nur erlaubt, wenn er das Verständnis verbessert und die Story dadurch klarer statt komplizierter wird.

Neue Produktionen müssen prüfen:

- `chronologyReviewed = true`
- `visualOrderMatchesNarrationOrder = true`
- `temporalJumpsExplicitlySignposted = true`
- `unnecessaryFlashbacksAbsent = true`

Zeitwechsel werden durch Voice-over und bei Bedarf einen kurzen redaktionellen Datums-/Zeittext klar markiert.

Hard Fail:

- Finalkampf zeigen und direkt danach ohne klaren Grund Wochen zurückspringen
- spätere Schäden oder Zustände in frühere Bilder mischen
- Schiffe, Personen oder Fronten zeigen, bevor sie in der Geschichte auftauchen
- ein Bild chronologisch korrekt erzeugen, aber an einer falschen Stelle im Voice-over verwenden

---

## 4. Historische Welt bleibt Hauptbühne

Erklärgrafiken sind Werkzeuge, nicht die Hauptfigur.

Richtwert für neue Geschichtsvideos:

- `explanationOnlyVisualShare` normalerweise höchstens **0.35**
- maximal **2 explanation-only Visuals** direkt hintereinander

Nach einem kurzen Erklärblock soll das Video wieder zu mindestens einem konkreten historischen Anker zurückkehren:

- Mensch / Gruppe
- Ort
- Objekt
- Gebäude / Landschaft
- Ereignis
- sichtbare gesellschaftliche Folge

---

## 5. Visual Sequence statt Bilder-Sammlung

Die Bildfolge wird als Sequenz geprüft.

Starke Folge:

```text
historischer Moment
→ Detail
→ räumliche Orientierung
→ Handlung
→ kurze Erklärung
→ konkrete Folge
```

Schwächer:

```text
Figur
→ Weltkarte
→ Partikel
→ Diagramm
→ anderes Diagramm
→ Markt
→ Eiskern
→ Baumring
```

Abwechslung allein reicht nicht. Übergänge müssen **inhaltlich und zeitlich motiviert** sein.

---

## 6. Jeder Visual-Wechsel braucht einen Grund

Vor Freigabe muss für die Sequenz geprüft sein:

- neues Bild, weil der Gedanke wirklich wechselt
- Zeitpunkt/Zustand passt exakt zur Narration
- gewählte Visual Form erklärt diesen Gedanken besser als Alternativen
- Wechsel von nah ↔ weit ist nachvollziehbar
- Karte erscheint nur, wenn räumliche Orientierung nötig ist
- Cutaway / Prozess nur, wenn ein verborgener Mechanismus erklärt werden muss
- danach Rückkehr in die historische Welt, wenn die Narration weitergeht

---

## 7. Redaktioneller Text

Standard: `NO_VISIBLE_TEXT`.

Gezielt erlaubt: `EDITORIAL_TEXT`, wenn es das Verständnis verbessert.

Geeignet:

- Jahreszahl: `1816`
- Datum: `10. April 1815`
- kurzer Ort: `Sumbawa`
- Zeitwechsel: `3 Tage später`
- kurzer Vergleich: `vorher → nachher`

Regeln:

- normalerweise genau **eine** kurze Informationseinheit
- höchstens 5 Wörter
- exakt in Scene Card festlegen
- muss einen klaren Zweck besitzen
- keine unkontrollierten Kartenlabels
- keine Textwand

Immer verboten:

- `BILD 11`
- `IMAGE 04`
- `SCENE 07`
- interne Nummern
- Prompt-Metadaten
- Wasserzeichen
- Pseudo-Schrift

---

## 8. Human-/World-Return

Wenn ein Video abstrakte Zusammenhänge erklärt, muss regelmäßig gezeigt werden, **was dieser Zusammenhang in der damaligen Welt konkret bedeutete**.

Beispiel:

```text
Mechanismus kurz erklären
→ Feld / Stadt / Armee / Haushalt / Markt zeigen
→ konkrete Folge erzählen
```

Nicht:

```text
Mechanismus A
→ Mechanismus B
→ Mechanismus C
→ Mechanismus D
```

---

## 9. Übergänge prüfen

Vor Phase 1 muss die komplette Bildfolge einmal als Liste gelesen werden.

Für jeden Übergang fragen:

> Warum kommt genau dieses Bild jetzt — und ist dieser Zustand zu diesem Zeitpunkt bereits möglich?

Wenn die Antwort nur lautet:

> „damit es abwechslungsreich ist“

ist der Übergang nicht stark genug.

---

## 10. Whole-Video-QC

Neue Projekte verwenden:

```text
99-technik/WHOLE_VIDEO_QC.json
```

Schema V2 Pflichtwerte:

- `status = APPROVED`
- `scriptContinuousProse = true`
- `scriptReadAloudPassed = true`
- `visualsDerivedAfterScript = true`
- `coherentVisualArc = true`
- `chronologyReviewed = true`
- `visualOrderMatchesNarrationOrder = true`
- `temporalJumpsExplicitlySignposted = true`
- `unnecessaryFlashbacksAbsent = true`
- `explanationOnlyVisualShare <= 0.35`
- `maxConsecutiveExplanationOnlyVisuals <= 2`
- `historicalWorldReturnsAfterExplanation = true`
- `editorialTextUsedOnlyWhenUseful = true`
- `transitionsReviewed = true`
- `overallCoherenceScore >= 8`
- `approved = true`

---

## Definition of Done

Das Video ist erst bereit für Phase 1, wenn es **als Ganzes** funktioniert:

> flüssige Geschichte → verständliche Chronologie → klare visuelle Sequenz → kurze notwendige Erklärungen → regelmäßige Rückkehr zur historischen Welt → gezielte Orientierung durch Daten/Orte → sauberer Payoff.
