# Visual Director V2 — vom Skript zur starken Bildidee

## Zweck

Der Visual Director ist die verpflichtende Zwischenstufe zwischen Skript und finalem Google-Flow-Prompt.

Die alte Abkürzung

```text
Skript → kurze Szenenbeschreibung → Prompt
```

ist nicht mehr zulässig.

Verbindlich ist:

```text
Skript
→ Aussage
→ Visual Concept
→ Visual Form
→ Composition Design
→ Camera
→ Mood / Light
→ Continuity
→ Prompt
→ Prompt QC
```

## 1. Viewer Takeaway

Vor jeder Bildidee wird intern ein Satz formuliert:

> Was muss ein Zuschauer in weniger als einer Sekunde aus diesem Bild verstehen?

Wenn diese Aussage unklar ist, darf noch kein Prompt geschrieben werden.

## 2. Visual Concept

Das Visual Concept beschreibt **die Bildidee**, nicht nur die sichtbaren Gegenstände.

Schwach:

> Vorratskeller mit wenig Essen.

Stark:

> Derselbe zuvor volle Keller ist aus fast identischem Blickwinkel nun größtenteils leer; die Leerräume werden zum eigentlichen Motiv und machen den schleichenden Verlust sofort sichtbar.

Schwach:

> Soldat wartet vor Burg.

Stark:

> Ein einzelner wartender Soldat im Vordergrund und eine unbeschädigte Burg weit hinter einer großen leeren Distanz visualisieren, dass Geduld statt Angriff die eigentliche Waffe ist.

## 3. Pflichtfelder der internen Scene Card

Jedes geplante Bild besitzt intern mindestens:

```text
Viewer Takeaway
Visual Purpose
Topic Anchor
Visual Form
Visual Concept
Dominant Subject
Action / State
Composition
Camera
Depth Plan
Lighting / Mood
Supporting Elements
Continuity Note
Historical Accuracy Note
Prompt QC Score
```

Diese Felder gehören **nicht** als Formular in den finalen Google-Flow-Prompt. Sie sind Denk- und Prüfstruktur.

## 4. Dominant Subject

Es muss genau ein dominantes Hauptmotiv geben.

Dominanz entsteht durch mindestens zwei der folgenden Faktoren:

- Größe
- Position
- Kontrast
- Helligkeit
- Farbe
- Schärfe/Detailgrad
- Blickrichtung anderer Figuren
- Leading Lines

Nur zu schreiben `make X dominant` reicht nicht. Die Komposition muss erklären, **wie** X dominant wird.

## 5. Action / State

Das Hauptmotiv braucht einen klaren Zustand oder eine klare Handlung.

Beispiele:

- intakte Burg, aber vollständig abgeschnitten
- Vorratsregale halb leer
- Dach sichtbar unter Last durchgebogen
- König sitzt erhöht, Adelige stehen tiefer
- Wagen wird an einer Sperre gestoppt

Vermeiden:

- Figuren stehen einfach herum
- Objekte sind nur nebeneinander arrangiert
- historische Szene ohne erkennbare Aussage

## 6. Composition Design

Die Komposition muss die Aussage tragen.

Intern festlegen:

- Position des Hauptmotivs
- Vordergrund / Mittelgrund / Hintergrund
- Negativfläche
- Blickführung
- Größenverhältnisse
- räumliche Beziehung von Ursache und Wirkung

Bei `comparison` müssen beide Vergleichsseiten tatsächlich sichtbar oder eindeutig räumlich gegeneinandergestellt sein.

Bei `cause-effect` muss die Ursache visuell mit der Folge verbunden sein.

Bei `process-sequence` muss der aktuelle Zustand deutlich aus einer bekannten Ausgangssituation hervorgehen.

Bei `system-hierarchy` muss die Hierarchie durch Raum, Höhe, Wege oder Beziehungen verständlich werden — nicht durch Business-Pfeile.

## 7. Camera

Kamera ist Pflichtfeld.

Sie wird nach Aussage gewählt, nicht zur künstlichen Abwechslung.

Beispiele:

- niedriger Blickwinkel für Monumentalität einer Mauer
- erhöhter Blickwinkel für Belagerungsring oder Handelswege
- enger Medium Shot für Erschöpfung
- fast identischer Blickwinkel für Vorher/Nachher
- Over-the-Shoulder für Beobachtung und Distanz

## 8. Depth Plan

Mindestens intern beschreiben:

```text
Foreground: ...
Midground: ...
Background: ...
```

Nicht jede Ebene muss voll sein. Leere ist erlaubt und oft wichtig.

## 9. Lighting / Mood

Stimmung wird konkret formuliert.

Nicht:

> cinematic lighting

Sondern beispielsweise:

> kaltes bedecktes Nachmittagslicht; kleines Lagerfeuer als einziger warmer Akzent.

oder:

> staubiges gelb-graues Licht, das den Himmel abdunkelt, während die hellen Bimssteine auf der Straße klar lesbar bleiben.

## 10. Supporting Elements

Maximal 1–3 unterstützende Elemente bleiben Standard.

Sie müssen mindestens eine Funktion besitzen:

- Ursache zeigen
- Folge zeigen
- Maßstab geben
- Epoche/Ort verankern
- Blick führen
- Kontinuität sichern

Dekoration ohne Funktion wird entfernt.

## 11. Continuity

Bei wiederkehrenden Motiven muss die Scene Card ausdrücklich sagen, was gleich bleibt:

- Ort/Silhouette
- Kamera, falls für Vorher/Nachher wichtig
- Figurmerkmale
- Props
- Tageszeit/Wetterlogik

Und was sich absichtlich verändert:

- Füllstand
- Beschädigung
- Menschenmenge
- Wetter
- Licht
- körperlicher Zustand

## 12. Visual-Form-Treue

Der finale Prompt darf die intern gewählte Visual Form nicht verlieren.

Beispiele:

- `comparison` darf nicht zu einem normalen Einzelmotiv werden
- `cause-effect` darf nicht nur die Ursache zeigen
- `system-hierarchy` darf nicht zu einem Objektstillleben werden
- `battle-city-overview` darf nicht zu einer Nahaufnahme einer Person werden

Wenn die Übersetzung die Visual Form verliert, wird der Prompt neu geschrieben.

## 13. Anti-Template-Regel

Die Formulierung

> Show X. Keep X large. Add Y. No visible text.

ist als alleinige Promptlogik nicht ausreichend.

Mindestens drei dieser Punkte müssen im finalen Prompt konkret sichtbar geregelt sein:

- räumliche Anordnung
- Handlung/Zustand
- Kamera
- Blickführung
- Vorder-/Mittel-/Hintergrund
- Licht/Stimmung
- bewusste Negativfläche
- Ursache-Wirkungs-Beziehung

## 14. Freigabe

Eine Scene Card ist erst freigegeben, wenn:

1. Viewer Takeaway eindeutig ist,
2. Visual Concept mehr ist als eine Objektliste,
3. Visual Form vollständig erhalten bleibt,
4. Dominant Subject und Komposition zusammenpassen,
5. Kamera die Aussage unterstützt,
6. Continuity geklärt ist,
7. der Prompt-QC-Score mindestens 8/10 erreicht.
