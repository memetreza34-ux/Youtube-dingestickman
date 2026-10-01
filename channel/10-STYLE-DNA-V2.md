# Style DNA V3 — history-stickman-adaptive

## Zweck

Dieses Dokument präzisiert die bestehende Bildwelt. Der technische Style-ID `history-stickman-adaptive-v1` bleibt aus Kompatibilitätsgründen bestehen. Inhaltlich bedeutet er **keine generischen Stickman-Klone**, sondern eine wiedererkennbare handgezeichnete History-Illustrationssprache mit individuell gestalteten historischen Menschen.

Für Flow Compiler V3 ist `config/flow-style-lock.json` die maschinenlesbare Umsetzung dieses Dokuments.

Die wichtigste Regel lautet:

> Ein Bild muss die Narration sichtbar machen. Stil-Konsistenz darf niemals dazu führen, dass Figuren, Kameras oder Kompositionen mechanisch wiederholt werden.

## 1. Figurenkörper und Individualität

Alle menschlichen Figuren gehören sichtbar zur selben **Illustrationsfamilie**, aber nicht zur selben Personenschablone.

Grundkonstruktion:

- Kopf ungefähr 1/6 bis 1/7 der sichtbaren Körperhöhe, mit kontrollierter Variation
- rund, oval oder leicht kantig stilisierte Kopfform
- kleine expressive Augen und Augenbrauen
- zurückhaltende Mundform
- Nase optional als reduzierte Linie
- vereinfachte, aber menschlich lesbare Anatomie
- Torso, Arme und Beine klar proportioniert, ohne realistische Muskelstudien
- vereinfachte Hände/Füße, aber ausreichend lesbar für Gesten und Werkzeuge
- keine Chibi-Proportionen
- keine Meme-Gesichter

### Prominente nicht wiederkehrende Figuren

Sollen sich möglichst in mindestens drei Punkten unterscheiden:

- Alterseindruck
- Gesichtsform
- Haare/Bart
- Kopfbedeckung
- Körpergröße/Statur
- Kleidungssilhouette
- Ausrüstung/Prop
- Körperhaltung/Geste

**Verboten:** dieselbe generische Figur mit nur anderer Tunika immer wieder recyceln.

### Wiederkehrende Figuren

Bleiben bewusst erkennbar durch:

- Gesichtskern
- Haare/Bart
- Körperbau
- Kleidungssilhouette
- Farbgebung
- identifizierende Props

Pose, Blickrichtung, Emotion und Zustand dürfen sich natürlich ändern.

## 2. Linien und Flächen

- saubere dunkle Ink-Konturen
- überwiegend konstante mittlere Linienstärke
- Vordergrundformen dürfen minimal kräftiger sein
- keine extrem dicken Comic-Outlines
- ruhige flache Farbflächen
- dezente Cel-Shading-Flächen
- leichte Papier-/Tuschetextur
- kein fotorealistisches Rendering

## 3. Detailhierarchie

Detail folgt Bedeutung:

1. dominantes Hauptmotiv: höchste Klarheit
2. notwendige Nebenelemente: mittlerer Detailgrad
3. Hintergrund: reduziert

Menschen dürfen heute etwas mehr individuelle Details erhalten als in der ersten Style-Fassung, solange sie stilisiert bleiben.

## 4. Raum und Tiefe

Bevorzugt:

- klarer Vordergrund
- verständlicher Mittelgrund
- vereinfachter Hintergrund

Tiefe über Größenstaffelung, Überlappung, Perspektive und leichte atmosphärische Abschwächung — nicht über Bokeh.

## 5. Kamera-Sprache

Kamera wird nach Narrationsfunktion gewählt.

Erlaubte Formen:

- wide establishing shot
- medium-wide
- medium
- close/object focus
- low angle
- high/elevated angle
- over-the-shoulder/back view
- topographic overview
- near-same-angle continuity shot
- detail-inset composition
- cutaway composition

Verboten als Standard: immer derselbe frontale medium-wide Character Shot.

## 6. Kompositionssprache

Jedes Bild braucht eine sichtbare Idee.

Bevorzugt:

- Hauptmotiv groß genug für kleine YouTube-Darstellung
- klare Blickführung
- gezielter Negativraum
- Leading Lines über Straßen, Mauern, Blicke, Licht oder Gelände
- räumliche Ursache/Folge statt Objektlisten

## 7. Licht und Stimmung

Licht dient der Geschichte.

- Alltag: weich und natürlich
- Macht/Politik: kontrollierte Hierarchie
- Krieg/Krise: stärkere Kontraste bei guter Lesbarkeit
- Gefahr: klare atmosphärische Dominante
- Nacht: kalte Grundwelt + wenige warme Lichtquellen

Generische Wörter wie `cinematic` oder `realistic lighting` bleiben Drift-Risiko.

## 8. Farb-DNA

Grundpalette:

- Sand/Beige
- Stein/Grau
- Lederbraun
- Pergament/Creme
- dunkles Grün/Oliv
- Graublau
- gedämpftes Rot/Rostrot
- gedecktes Gold als Akzent

Keine Neon-/Bonbonfarben.

## 9. Historische Welt

Historische Plausibilität bleibt Pflicht:

- Epoche, Architektur, Kleidung, Waffen, Werkzeuge und Alltagsobjekte passend wählen
- unsichere Details neutral statt spektakulär erfinden
- keine Fantasy-Ästhetik ohne historischen Grund

## 10. Visuelle Aussage vor Inventarliste

Schwach:

> Soldat + Feuer + Berg + Ochse.

Stark:

> Ein römischer Wachposten steht klein im dunklen Vordergrund, während sich am gegenüberliegenden Berghang eine Kette bewegter Feuerpunkte bildet. Die Bildidee lautet: Aus seiner Perspektive sieht der Hang plötzlich wie eine marschierende Truppe aus.

Der Prompt beschreibt Beziehungen, nicht nur Gegenstände.

## 11. Narration-first Visual Form

Die Illustration darf sehr unterschiedlich aufgebaut sein, solange sie dieselbe Kanal-DNA trägt.

Erlaubt sind insbesondere:

- Character Scene
- Karte
- Objektfokus
- Architektur
- Prozess
- Cause/Effect
- Comparison
- Overview
- Multi-Moment Illustration
- Detail Inset
- Cutaway Section
- Evidence Reconstruction

Die Visual Form wird danach gewählt, **welche Aussage der Sprecher gerade macht**.

## 12. Wiedererkennung

Innerhalb eines Videos bleiben wiederkehrende Orte, Räume, Figuren und Props konstant.

Über Videos hinweg bleibt die Illustrations-DNA konstant, nicht die konkrete Figurenschablone.

`FLOW_WORLD_LOCK.json` sichert videospezifische Kontinuität.

## 13. Kontrollierte Variation statt Master-Referenzbilder

Keine festen globalen Master-Referenzbilder.

### Konstant bleiben

- Linienfamilie
- Grad der menschlichen Vereinfachung
- flache gedeckte Farbwelt
- Cel-Shading-Logik
- Papier-/Tuschetextur
- Detailhierarchie

### Bewusst variieren

- Gesicht und Körper nicht wiederkehrender Personen
- Kleidung und Silhouette
- Kameraabstand
- Blickwinkel
- Perspektive
- Subject Placement
- Vordergrund/Mittelgrund/Hintergrund
- Negativraum
- Licht
- Wetter
- Tageszeit
- Visual Form

**Gleicher Illustrator bedeutet nicht gleiche Aufnahme und nicht gleiche Person.**

## 14. Anti-Gleichförmigkeit

Vor Freigabe prüfen:

1. Wiederholt die Szene unnötig denselben Kamerawinkel?
2. Sehen verschiedene historische Personen wie Klone aus?
3. Sind Character Scenes zu häufig der Default?
4. Wäre Karte, Objekt, Detail, Cutaway oder Übersicht verständlicher?
5. Ist Kontinuität bewusst oder nur Gleichförmigkeit?
6. Unterstützt die Illustration wirklich den aktuellen gesprochenen Beat?

Wenn nicht: Scene Direction überarbeiten.
