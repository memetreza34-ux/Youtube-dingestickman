# Google Flow Prompting — History Visual System V1.1

## Ziel

Google Flow soll pro Batch mehrere Bilder erzeugen, die klar zum selben Kanal und innerhalb eines Videos zur selben Welt gehören. Die Bilder müssen stark, klar und YouTube-tauglich sein — nicht wie Wimmelbilder, Lehrbuchtafeln oder Museumsplakate.

## Wichtigste Regel

**Nicht direkt vom Skriptsatz zu einem langen Bildprompt springen.**

Immer:

```text
Skriptaussage
→ Visual Function
→ Visual Form
→ eine Kernaussage
→ ein dominantes Hauptmotiv
→ maximal 1–3 unterstützende Elemente
→ Kamera/Komposition
→ Continuity Lock
→ Prompt
```

## Grundaufbau eines Flow-Batches

```text
Create N separate 16:9 historical explainer illustrations for one coherent YouTube video.

CHANNEL STYLE:
[ein gemeinsamer Style-Block]

VIDEO CONTINUITY LOCK:
[wiederkehrende Orte, Figuren, Architektur, Räume und Props festlegen]

IMAGE 1 — [kurzer Name]
VIEWER MUST IMMEDIATELY UNDERSTAND: ...
SHOW: ...
DOMINANT VISUAL ACTION / STATE: ...
SUPPORTING ELEMENTS: ...
CAMERA / COMPOSITION: ...
CONTINUITY LOCK: ...
VISIBLE TEXT: None.

...

IMPORTANT:
All images must look like they were illustrated by the same artist for the same YouTube channel and the same historical world.
```

## Gemeinsamer Channel-Style

Der Style-Block beschreibt einmalig:

- 2D hand-drawn historical explainer illustration
- expressive historical stickman characters, wenn Menschen gebraucht werden
- konsistente Stickman-Grundanatomie
- individuelle Haare, Bärte, Kopfbedeckungen, Kleidung und Props erlaubt
- simple, aber gut lesbare Emotionen
- clean dark ink outlines
- flat muted historical colors
- subtle cel shading
- slight handmade ink-and-paper texture
- mature, not childish
- gleiche Zeichenlogik bei Karten, Architektur, Objekten und Systembildern
- kein Photorealismus, 3D, Anime, Pixar oder painterly realism

## Bildkomposition

Jedes Bild braucht:

- **ein dominantes Hauptmotiv**
- **eine Kernaussage**
- maximal **1–3 unterstützende Elemente**
- eine klare Vordergrund-/Hintergrund-Hierarchie
- große, gut lesbare Formen
- möglichst keine wichtigen Mini-Details

Verboten als Standard:

- Wimmelbild
- große Menschenmenge mit vielen gleich wichtigen Figuren
- Museumstafel
- Schulbuchposter
- Lexikonplatte
- überladene Querschnitte
- viele Mini-Labels oder Pfeile
- Collage-/Multi-Panel-Look

Wenn mehrere Aussagen nötig sind, lieber zusätzliche Bilder planen.

## Video Continuity Lock

Innerhalb eines Videos dürfen wiederkehrende Motive nicht jedes Mal neu erfunden werden.

Beispiele:

- dieselbe Burg behält Silhouette, Torform, Steinfarbe und Grundarchitektur
- derselbe Lagerraum behält Regale, Fasspositionen und Blickwinkel
- wiederkehrende Figuren behalten Haare, Bart, Kleidung und Rüstung
- wiederkehrende Orte behalten Farbtemperatur und zentrale Props

Bei Entwicklungen ist ein wiederholter Blickwinkel oft stärker als Abwechslung:

```text
volles Lager
→ dasselbe Lager halb leer
→ dasselbe Lager fast leer
```

## Text im Bild

Standard:

```text
VISIBLE TEXT: None.
```

Falls Text zwingend nötig ist:

- nur exakt vorgegebener kurzer deutscher Text
- keine englischen Labels
- keine automatisch erfundenen Beschriftungen
- keine Bildnummern
- keine Überschrift, wenn sie nicht ausdrücklich gefordert ist

## Figuren nicht erzwingen

Vor jedem Bild prüfen:

- Braucht die Aussage wirklich Menschen?
- Ist ein einzelnes Objekt, eine Architekturansicht, eine Karte oder ein Raum klarer?
- Muss eine Menschenmenge wirklich sichtbar sein oder reichen wenige repräsentative Figuren plus angedeuteter Hintergrund?

## Gute Einzelbild-Logik

Statt:

> Busy courtyard with hundreds of people, carts, food, soldiers, children, tents and many historical details.

Besser:

> VIEWER MUST IMMEDIATELY UNDERSTAND: Too many people are trapped inside limited castle space.
> SHOW: Five clearly readable foreground figures squeezed into a narrow courtyard passage, with only soft simplified silhouettes behind them.
> SUPPORTING ELEMENTS: stone wall, one supply barrel, one doorway.
> CAMERA / COMPOSITION: medium-wide, foreground figures large, background simplified.

## Negativlogik

Am Ende des gemeinsamen Style-Blocks ausdrücklich vermeiden:

```text
overcrowded scene, busy crowd, wimmelbild, museum infographic, textbook poster, encyclopedia plate, tiny central subject, dozens of small figures, many labels, arrows everywhere, pseudo-text, English labels, fake handwriting, collage, multi-panel layout, split-screen border, unnecessary cutaway, excessive micro-detail, photorealism, realistic portrait, 3D render, Pixar, anime, painterly realism, graphic-novel realism, fantasy armor, modern objects, logo, watermark, image number
```

## Qualitätsregeln

- alle Bilder eines Videos bleiben im selben Artstyle
- wiederkehrende Orte/Figuren/Objekte bleiben visuell konsistent
- ein Bild = eine Kernaussage
- ein Bild = ein dominantes Hauptmotiv
- höchstens 1–3 unterstützende Elemente
- keine Wimmelbilder
- keine Lehrbuch-/Museumstafel-Ästhetik
- keine unnötigen Querschnitte
- keine englischen Beschriftungen
- sichtbarer Text nur, wenn ausdrücklich nötig, dann Deutsch
- Figuren nur, wenn sie die Aussage verbessern
- Bild muss auch klein auf YouTube sofort verständlich sein
