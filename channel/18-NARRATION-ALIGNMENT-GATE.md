# Narration Alignment & Chronology Gate — V1

## Zweck

Dieses Gate verhindert drei Fehler, die bei Geschichtsvideos besonders störend sind:

1. das Bild passt nur allgemein zum Thema, aber nicht zum gerade gesprochenen Satz;
2. die Bildfolge zeigt spätere Ereignisse oder Zustände zu früh und springt danach zurück;
3. ein Bild enthält zu viele gleich wichtige Dinge und ist dadurch nicht sofort verständlich.

Für neue Projekte ist die Standard-Erzählweise **strict-chronological**.

---

## 1. Chronologie ist Standard

Neue Videos erzählen historische Ereignisse normalerweise in der Reihenfolge, in der sie passieren.

Bevorzugt:

```text
Ausgangslage
→ Ereignis A
→ Reaktion
→ Ereignis B
→ Folge
→ Wendepunkt
→ Ende
```

Nicht als Standard:

```text
finaler Angriff
→ sechs Wochen zurück
→ Vorgeschichte
→ wieder finaler Angriff
```

Eine Rückblende ist nur zulässig, wenn sie für das Verständnis wirklich besser ist als eine lineare Erzählung und im Projekt ausdrücklich freigegeben wird.

---

## 2. Kein Future-Event-Leakage

Ein Bild darf keine Information vorwegnehmen, die die Narration noch nicht erreicht hat.

Beispiele für verbotene Vorgriffe:

- beschädigte Mauer, obwohl im Sprechertext gerade erst die intakte Befestigung eingeführt wird;
- Schiffe hinter einer Sperre, bevor der Transport über Land erzählt wurde;
- spätere Uniformen, Personen, politische Zustände oder Ruinen zu früh;
- Ergebnis eines Konflikts, bevor die Handlung dorthin gelangt.

---

## 3. Jede Scene Card braucht sechs Alignment-Felder

Neue Scene Cards verwenden zusätzlich:

```text
narrationBeat
 timeContext
 chronologyStep
 visualAnswer
 narrationMatchScore
 clarityScore
```

### narrationBeat

Ein exakter Ausschnitt aus dem Voice-over, der gerade gesprochen wird.

### timeContext

Der konkrete historische Zeitpunkt oder Abschnitt, z. B.:

- `Frühjahr 1453, vor Beginn der Belagerung`
- `6. April 1453`
- `mehrere Wochen nach Beginn`
- `Morgengrauen des 29. Mai`

### chronologyStep

Die historische Reihenfolge. Neue Projekte starten bei `1` und laufen nicht rückwärts.

Mehrere Bilder dürfen denselben Schritt teilen, wenn sie denselben historischen Moment aus verschiedenen sinnvollen Perspektiven zeigen.

### visualAnswer

Ein konkreter Satz:

> Was muss der Zuschauer in diesem Bild sofort sehen, um genau den aktuellen Narrations-Beat zu verstehen?

Schwach:

> Passendes Bild zur Belagerung.

Stark:

> Eine noch intakte mehrstufige Mauer trennt die kleine Verteidigung klar von der heranrückenden Armee.

### narrationMatchScore

Mindestens `9/10`.

Das Bild muss exakt zum aktuellen Beat passen, nicht nur zum Video-Thema.

### clarityScore

Mindestens `8/10`.

Die Hauptaussage muss in ungefähr einer Sekunde erfassbar sein.

---

## 4. Ein Bild = ein primärer Takeaway

Ein Visual darf Details enthalten, aber nur einen primären Gedanken.

Stark:

> Hafenkette blockiert die Einfahrt.

Schwach:

> Hafenkette + Stadtplan + Mehmed + mehrere Schiffe + Erklärungspfeile + Schlacht + fünf Labels.

Wenn mehrere Dinge gleichzeitig erklärt werden müssen, wird geprüft, ob zwei Visuals verständlicher sind.

---

## 5. Karten und Text

Karten sind nur sinnvoll, wenn räumliche Orientierung gerade Teil des Narrationsproblems ist.

Redaktionstext darf helfen:

- Datum
- Jahr
- Ort
- kurzer Zeitwechsel
- knapper Vergleich

Er darf aber nie fehlende Bildklarheit ersetzen.

---

## 6. Technische Sperren

Neue Projekte aktivieren in `video.json`:

```json
{
  "narrationAlignmentGateVersion": 1,
  "chronologyGateVersion": 1,
  "chronologyPolicy": {
    "mode": "strict-chronological",
    "flashbacksAllowed": false,
    "futureEventLeakageForbidden": true,
    "explicitTimeContextRequiredPerScene": true
  }
}
```

Der Flow-Prompt-Build wird blockiert, wenn:

- Alignment-Felder fehlen;
- `narrationBeat` nicht exakt im Voice-over vorkommt;
- `narrationMatchScore < 9`;
- `clarityScore < 8`;
- Chronologieschritte rückwärts laufen;
- das Projekt nicht auf strict-chronological steht.

Der normale Phase-1-Befehl und Phase 3 verwenden ebenfalls den vollständigen Alignment-Validator.

---

## 7. Whole-Video-QC V3

Neue Projekte müssen zusätzlich bestätigen:

- `historicalEventOrderReviewed = true`
- `narrationVisualAlignmentReviewed = true`
- `everyVisualMatchesCurrentNarration = true`
- `visualClarityReviewed = true`
- `unclearVisualsAbsent = true`
- `onePrimaryTakeawayPerVisual = true`
- `futureEventLeakageAbsent = true`

---

## Definition of Done

Ein neues Video darf erst in Phase 1, wenn:

> Sprechertext flüssig → Ereignisse chronologisch → Scene Cards folgen exakt dem Voice-over → jedes Bild beantwortet genau den aktuellen Beat → kein späterer Zustand wird vorweggenommen → jedes Visual ist sofort lesbar.
