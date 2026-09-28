# Google Flow Prompting — History Visual System V1

## Ziel

Google Flow soll pro Batch mehrere Bilder erzeugen, die klar zum selben Kanal gehören, ohne dass der komplette Style-Block für jedes Bild wiederholt wird.

## Grundaufbau eines Flow-Prompts

```text
Create N separate 16:9 historical explainer illustrations.

CHANNEL STYLE:
[ein gemeinsamer Style-Block für alle Bilder]

IMAGE 1 — [kurzer Name]
[kurze konkrete Szenenbeschreibung]

IMAGE 2 — [kurzer Name]
[kurze konkrete Szenenbeschreibung]

...

IMPORTANT:
All images must clearly look like they were illustrated by the same artist for the same YouTube channel.
```

## Gemeinsamer Channel-Style

Der Style-Block beschreibt einmalig:

- 2D hand-drawn historical explainer illustration
- expressive historical stickman characters, wenn Menschen benötigt werden
- einfache konsistente Stickman-Grundanatomie
- individuelle Haare, Bärte, Kopfbedeckungen, Kleidung und Props erlaubt
- simple, aber lesbare Emotionen
- clean dark ink outlines
- flat muted historical colors
- subtle cel shading
- slight handmade ink-and-paper texture
- mature, not childish
- gleiche Zeichenlogik auch bei Karten, Architektur, Objekten und Systembildern
- kein Photorealismus, 3D, Anime, Pixar, painterly realism oder wechselnde Cartoon-Stile
- standardmäßig kein sichtbarer Text

## Szenenblöcke kurz halten

Ein Szenenblock beschreibt primär:

1. Was sehen wir?
2. Was ist der visuelle Fokus?
3. Welche Stimmung?
4. Welche wichtigen historischen Details?
5. Falls Figuren vorkommen: Rolle, Kleidung, Haltung, Emotion.

Nicht denselben Style-Text erneut hineinkopieren.

## Figuren nicht erzwingen

Vor jedem Bild prüfen:

- Braucht die Aussage wirklich Menschen?
- Würde eine Karte, Architektur, ein Objekt, ein System oder eine Übersicht die Aussage klarer erklären?

Flow-Prompts dürfen ausdrücklich `No human characters in this image` enthalten, wenn das die bessere Visualisierung ist.

## Beispiel — Charakter-Batch

```text
Create 5 separate 16:9 historical explainer illustrations.

CHANNEL STYLE:
Use one consistent hand-drawn 2D historical stickman explainer style. Characters share the same simple stickman-like base construction but may differ through historically appropriate hair, beards, eyebrows, helmets, crowns, hoods, clothing, armor, props and body language. Faces remain simple but expressive. Use clean dark ink outlines, flat muted historical colors, subtle cel shading and a light handmade ink-and-paper texture. Mature historical documentary/explainer feeling, not childish or goofy. No photorealism, 3D, anime, Pixar, realistic portrait faces, painterly realism, text or watermarks.

IMAGE 1 — MEDIEVAL FARMER
Before sunrise inside a modest peasant house. A tired farmer with messy hair and light stubble pulls on his boots beside a straw bed. Cold dawn light and weak candlelight. Quiet, exhausted but determined mood.

IMAGE 2 — ROMAN LEGIONARY
A disciplined Roman legionary in helmet, armor, shield and spear stands before a marching column on a dusty road. Serious posture, distant fort, muted dry landscape.

IMAGE 3 — MEDIEVAL KING
A king with crown, dark hair, short beard and deep red cloak addresses several nobles in a stone hall. Some appear loyal, others skeptical. Political tension.

IMAGE 4 — SIEGE AND HUNGER
A family sits around an almost empty table during a siege. Tired father, worried mother with head covering, younger person with empty bowl. Enemy campfires visible beyond the walls.

IMAGE 5 — VIKING LEADER
A Viking leader with tied-back hair, full beard, wool cloak and axe speaks to his warriors beside a longship on a cold northern shore. No horned helmets.

IMPORTANT:
All five images must clearly look like they were illustrated by the same artist for the same YouTube channel.
```

## Beispiel — Batch ohne Figuren

```text
Create 5 separate 16:9 historical explainer illustrations.

CHANNEL STYLE:
Use the same hand-drawn 2D historical explainer style as the channel character scenes: clean dark ink outlines, flat muted historical colors, subtle cel shading and light handmade ink-and-paper texture. No human characters in these five images. No photorealism, 3D, modern corporate infographic style, text or watermarks.

IMAGE 1 — ROMAN DECLINE
A cracked Roman marble column surrounded by broken coins, damaged shields, abandoned trade goods and deteriorating architecture. Show multiple pressures weakening one empire.

IMAGE 2 — FEUDAL SYSTEM
A medieval landscape arranged naturally from castle to noble estates to village and fields, showing hierarchy through architecture and geography rather than labels.

IMAGE 3 — EMPIRE EXPANSION MAP
A hand-drawn historical map with one territory spreading eastward through layered muted regions, routes, mountains, rivers and coastlines. No labels.

IMAGE 4 — SIEGE SUPPLY
A fortified city surrounded by an enemy camp. Blocked supply roads and nearly empty grain storage visually explain why sieges cause hunger.

IMAGE 5 — RISE AND FALL
One continuous landscape moves from small settlement to prosperous stone city to abandoned and damaged ruins, showing a kingdom's lifecycle without text.

IMPORTANT:
All five images must clearly belong to the same visual universe as the channel's character scenes.
```

## Qualitätsregeln

- keine 5 verschiedenen Artstyles in einem Batch
- gleiche Figurenfamilie über alle Charakterbilder
- Nicht-Figuren-Bilder müssen denselben Illustrationscharakter behalten
- keine leeren Standard-Stickmans; Figuren brauchen Persönlichkeit
- keine zufällige Überladung
- keine automatisch erzeugten Beschriftungen
- keine Bildnummern im Bild
- Szene und Komposition dürfen variieren, der Artstyle nicht
