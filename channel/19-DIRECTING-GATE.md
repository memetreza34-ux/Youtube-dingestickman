# Directing Gate V1 — Color, Pacing, Motion

## Zweck

Ein Video kann inhaltlich korrekt sein und trotzdem monoton oder hektisch wirken. Dieses Gate prüft deshalb die audiovisuelle Regie über das gesamte Video.

Es schützt vor drei typischen Fehlern:

1. gleiche beige-blaue Bildwelt über fast das ganze Video
2. extrem kurze Bilder neben sehr langen Standbildern
3. mechanisch wiederholte Zooms und Pans ohne Bezug zum Bildinhalt

---

## 1. Color & World Arc

Neue Projekte brauchen mindestens drei geplante Farbphasen.

Beispiel:

```text
Ausgangslage → warm / trocken / ruhig
Krise → kühler / dunkler / höherer Kontrast
Folge → neue Licht- und Farbstimmung, passend zum Ergebnis
```

Gleicher Kanalstil bleibt erhalten. Variieren dürfen und sollen:

- Licht
- Wetter
- Farbtemperatur
- Sättigung innerhalb der gedämpften Kanalpalette
- Akzentfarben
- Tageszeit
- Spiegelungen
- Rauch / Staub / Schlamm / Vegetation
- Aktivität in der historischen Welt

Scene-Card-Pflichtfelder:

```text
colorPhase
colorIntent
worldLifeDetail
```

`worldLifeDetail` ist kein Dekorationszwang. Es nennt ein konkretes glaubwürdiges Detail, das die Welt belebt, sofern der Beat es erlaubt: Arbeiter, Tiere, Wagen, Wind, Wasserbewegung, Werkzeuge, Rauch, Schlamm, Boote, Vegetation usw.

Keine zufällige Überladung. Ein Hauptmotiv bleibt dominant.

---

## 2. Semantic Pacing

Ein guter Durchschnitt reicht nicht. Einzelbild-Dauern müssen ebenfalls funktionieren.

Für neue Projekte:

```text
Normalbereich: 2.7–4.5 s
Hard Minimum: 2.0 s
Review unter: 2.4 s
Review über: 5.5 s
Hard Maximum: 6.5 s
letztes Bild Hard Maximum: 5.5 s
max. Verhältnis zweier Nachbarbilder: 2.2x
```

Damit sind Folgen wie

```text
0.8 s → 1.2 s → 5.6 s → 7.8 s → 11 s
```

nicht mehr freigabefähig.

Lange Holds sind nur sinnvoll, wenn der Sprechertext, eine komplexere Szene oder ein bewusstes Ende sie trägt. Das letzte Bild darf nicht als technischer Resthold stehen bleiben.

---

## 3. Motion Director

Bewegung wird nicht mehr nach Bildnummer rotiert.

Scene-Card-Pflichtfelder:

```text
motionType
motionDirection
motionIntensity
motionFocus
```

Erlaubte Standardtypen:

```text
static
push-in
pull-out
pan-left
pan-right
pan-up
pan-down
```

Intensität:

```text
none
subtle
medium
```

Regeln:

- kurze Szenen bekommen weniger Bewegungsweg
- lange Szenen dürfen etwas mehr Weg bekommen
- mindestens 20 % des Videos statisch oder nahezu statisch
- höchstens 25 % `medium`
- höchstens 2 gleiche Motion Types direkt hintereinander
- Karten nur bewegen, wenn der Blick wirklich geführt werden muss
- Landschaften dürfen bewusst ruhig sein
- Bewegung folgt der Handlungsrichtung oder dem Fokus
- Motion darf das Hauptmotiv nie aus dem Bild drücken

---

## 4. Flow

Der Flow-Prompt erhält bei neuen Projekten zusätzlich:

- globalen Color-&-World-Arc
- `colorPhase`
- `colorIntent`
- `worldLifeDetail`

Damit bedeutet Stilkontinuität nicht mehr, dass jedes Bild dieselbe Licht- und Farbwelt besitzt.

---

## 5. Technische Gates

`config/directing-policy.json` ist die Maschinenquelle.

Phase 1 blockiert neue Projekte, wenn Color-/Motion-Regie fehlt oder zu monoton geplant ist.

Beim Timeline-Build wird die Kamera aus der Scene Card und der tatsächlich gemessenen Bilddauer berechnet. Die alte indexbasierte Preset-Rotation ist verboten.

`validate:youtube-pacing` blockiert zu kurze, zu lange oder extrem ungleichmäßige Bildfolgen.

## Kurzformel

```text
Story-Beat
→ passendes Bild
→ Color Phase + lebendige Welt
→ semantisch sinnvolle Bilddauer
→ szenenspezifische Motion oder bewusst statisch
→ Gesamtsequenz prüfen
```
