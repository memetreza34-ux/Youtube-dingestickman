# Visual Grammar — Wie ein Skriptsatz in ein Bild übersetzt wird

## Zweck

Die Bildwelt ist nicht nur ein Stil, sondern ein Auswahl-System. Für jeden gesprochenen Gedanken wird zuerst entschieden, **welche Visual-Form die Aussage am klarsten erklärt**.

Keine Regel verlangt automatisch eine Figur.

Wichtig: Eine Visual Form ist nur die Kategorie. Vor dem finalen Prompt muss zusätzlich ein **Visual Concept** und eine konkrete **Composition** nach `11-VISUAL-DIRECTOR.md` entstehen.

## Visual-Formen

### 1. Character Scene
Nutzen, wenn Menschen, Entscheidungen, Emotionen, Rollen oder soziale Beziehungen zentral sind.

Beispiele:
- König verhandelt mit Adeligen
- Bauer beginnt den Arbeitstag
- Legionär marschiert

### 2. Environment Only
Nutzen, wenn Ort, Lebensbedingungen oder Atmosphäre wichtiger sind als eine Person.

Beispiele:
- leeres mittelalterliches Dorf im Winter
- zerstörte römische Straße
- Hafenstadt bei Nacht

### 3. Map / Geography
Nutzen bei:
- Expansion
- Grenzen
- Handelswegen
- Migration
- geografischen Hindernissen
- mehreren Reichen/Regionen

Karten müssen im selben handgezeichneten Kanalstil bleiben.

### 4. Object Focus
Nutzen, wenn ein Objekt die Aussage besser trägt als eine Szene.

Beispiele:
- Münzen für Inflation
- zerbrochener Schild für militärischen Verfall
- leeres Kornlager für Hunger
- Schiff für Handel

### 5. Architecture / City
Nutzen, wenn Macht, Technik, Alltag oder Entwicklung über gebaute Umwelt erklärt werden kann.

Beispiele:
- Burg und Dorf
- römisches Forum
- Stadtmauer
- Aquädukt

### 6. System / Hierarchy
Nutzen für abstraktere historische Strukturen.

Beispiele:
- Feudalsystem über Burg → Adelige → Dorf → Felder
- Versorgung einer Armee
- Machtverteilung zwischen König und Adel

Keine moderne Business-Infografik. System über historische Räume, Objekte, Wege, Höhe und Beziehungen zeigen.

### 7. Cause → Effect
Nutzen, wenn mehrere Faktoren eine Folge verursachen.

Beispiel:
Steuerausfälle + teure Armee + Grenzdruck → geschwächtes Reich.

Nicht als Textdiagramm, sondern als visuelle Beziehung. Ursache und Folge müssen beide im Bild oder in einer klar verbundenen räumlichen Situation lesbar sein.

### 8. Process / Sequence
Nutzen, wenn ein Ablauf erklärt wird.

Beispiele:
- Belagerung schneidet Versorgung ab
- Münzentwertung
- Aufbau eines römischen Marschlagers

Bei wiederkehrenden Zuständen möglichst denselben Ort und fast denselben Blickwinkel nutzen, damit Veränderung sofort sichtbar wird.

### 9. Comparison
Nutzen bei klaren Gegensätzen.

Beispiele:
- Reich vs arm
- Rom früher vs später
- Ostrom vs Westrom

Harte Regel: Wenn `comparison` gewählt wurde, müssen **beide Vergleichspole** visuell vorkommen. Ein Einzelmotiv ist kein Vergleich.

### 10. Symbolic Metaphor
Nur nutzen, wenn eine reale Szene die abstrakte Aussage nicht gut erklärt.

Beispiele:
- rissige Säule als Symbol eines zerfallenden Reiches
- mehrere Stützen unter einem Thron als Abhängigkeit des Königs

Symbolik muss sofort verständlich und nicht kitschig sein.

### 11. Battle / City Overview
Nutzen, wenn räumliche Lage entscheidend ist.

Beispiele:
- Belagerungsring um eine Stadt
- Flottenpositionen
- Armeewege

Übersicht heißt nicht: alles klein machen. Das zentrale räumliche Verhältnis muss auch in kleiner YouTube-Darstellung klar bleiben.

### 12. Rise / Fall Lifecycle
Nutzen für zeitliche Entwicklung ohne viele Einzelbilder.

Beispiel:
Siedlung → prosperierende Stadt → Verfall.

Nur nutzen, wenn mehrere Zustände in einem Bild wirklich verständlicher sind als getrennte Bilder.

## Auswahlregel

Vor jedem Prompt:

1. Was ist die Kernaussage des Satzes?
2. Was muss der Zuschauer in weniger als einer Sekunde verstehen?
3. Muss ein Mensch sichtbar sein, um sie zu verstehen?
4. Wenn nein: Welche Nicht-Figuren-Visual-Form erklärt sie klarer?
5. Welche Epoche/Ort/Details müssen historisch erkennbar sein?
6. Welche Stimmung unterstützt den Satz?
7. Was ist das eine klare visuelle Fokusmotiv?
8. Welche **visuelle Beziehung** macht die Aussage sichtbar?

Danach wird nach `11-VISUAL-DIRECTOR.md` das Visual Concept und die Komposition gebaut.

## Anti-Monotonie

Ein längeres Video soll nicht aus einer endlosen Folge ähnlicher Figurenbilder bestehen.

Abwechslung entsteht durch **Visual-Funktion**, nicht durch Stilwechsel:

- Figuren
- Karten
- Gebäude
- Objekte
- Systeme
- Übersichten
- Symbolik
- Prozesse

Der gemeinsame Kanalstil bleibt dabei unverändert.

## Visual-Form-Treue

Die gewählte Form ist ein Vertrag zwischen Planung und Prompt.

Vor Freigabe prüfen:

- `comparison` → sind beide Seiten sichtbar?
- `cause-effect` → sind Ursache und Folge verbunden?
- `process-sequence` → ist die Zustandsänderung lesbar?
- `system-hierarchy` → ist die Struktur räumlich verständlich?
- `battle-city-overview` → ist das räumliche Verhältnis dominant?
- `object-focus` → trägt das Objekt wirklich die Aussage?
- `character-scene` → zeigt Körpersprache/Handlung den Gedanken?

Wenn nicht, Prompt neu schreiben oder Visual Form bewusst ändern und die Scene Card aktualisieren.

## Harte Regel

**Script → Viewer Takeaway → Visual Concept → Visual Function → Visual Form → Composition → Camera → Prompt → QC.**

Nicht direkt vom Satz zu einem zufälligen oder rein beschreibenden Bildprompt springen.
