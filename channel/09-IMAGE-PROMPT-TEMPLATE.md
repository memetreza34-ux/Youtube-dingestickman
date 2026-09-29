# History Image Prompt Template — Google Flow V1.2

Dieses Dokument definiert die Trennung zwischen **interner Bildplanung** und dem **finalen Google-Flow-Prompt**.

## 1. Interne Planung

Vor dem Schreiben eines Prompts darf die Pipeline intern mit diesen Feldern arbeiten:

```text
Audio Anchor
Visual Purpose
Visual Function
Visual Form
Kernaussage
Dominant Subject
Supporting Elements
Camera / Composition
Continuity Note
Planned Hold
QC
```

Diese Informationen helfen beim Denken und Prüfen.

**Sie dürfen nicht 1:1 in den finalen `google-flow-prompt.txt` kopiert werden.**

## 2. Finaler Flow-Prompt

Der finale Prompt soll wie eine klare Regieanweisung für einen Illustrator klingen.

### Grundformat

```text
BILD 01
[ein natürlicher direkter Bildprompt als Fließtext]

BILD 02
[ein natürlicher direkter Bildprompt als Fließtext]
```

### Beispiel

```text
BILD 03
Inside the same stone storage cellar at Kenilworth Castle. Large grain sacks and wooden barrels fill most of the room, with a rough wooden shelf holding bread and one clay water jug. Keep the composition simple and the supplies large and clearly readable. Establish this exact room layout and camera angle because the same cellar will return later with fewer supplies.
```

Später:

```text
BILD 08
Return to exactly the same storage cellar and the same camera angle as Bild 03. About half of the grain sacks and barrels are now gone, leaving clearly visible empty spaces on the floor and shelves. Keep all remaining architecture, props and lighting consistent with the earlier image.
```

## 3. Was nicht in den finalen Prompt gehört

Nicht ausgeben:

```text
VIEWER MUST IMMEDIATELY UNDERSTAND:
SHOW:
DOMINANT VISUAL ACTION / STATE:
SUPPORTING ELEMENTS:
CAMERA / COMPOSITION:
CONTINUITY LOCK:
Audio Anchor:
Visual Purpose:
Visual Form:
Topic Anchor:
Planned Hold:
```

Diese Labels sind nur Denk- und QC-Hilfen.

## 4. Gemeinsamer Style-Block

Der Channel Style wird pro Batch **nur einmal** vor den Einzelbildern angegeben.

Er enthält knapp:

- 2D hand-drawn historical explainer style
- expressive historical stickman family, falls Figuren benötigt werden
- clean dark ink outlines
- muted historical colors
- subtle cel shading
- light ink/paper texture
- mature, not childish
- gleiche Zeichenlogik für Figuren, Architektur, Karten und Objekte
- kein Photorealismus, 3D, Anime, Pixar oder painterly realism

## 5. Video World Lock

Ebenfalls nur einmal pro Video/Batch definieren:

- wiederkehrende Orte
- Architektur/Silhouetten
- wiederkehrende Räume
- wiederkehrende Figurenmerkmale
- wichtige Props
- Grundfarbigkeit, Wetter und Zeitlogik

Danach in Einzelprompts einfach auf `the same ...` verweisen.

## 6. Einzelbild-Regeln

Intern muss weiterhin gelten:

- genau eine Kernaussage
- genau ein dominantes Hauptmotiv
- maximal 1–3 unterstützende Elemente
- Hauptmotiv groß genug für YouTube
- keine Wimmelbilder
- keine Museumstafel-/Schulbuchposter-Ästhetik
- keine unnötigen Querschnitte oder Collagen
- bei zwei gleich wichtigen Aussagen lieber zwei Bilder

## 7. Textregel

Standard global:

```text
No visible text in any image unless explicitly requested.
```

Wenn Text nötig ist:

- nur exakt vorgegebener kurzer deutscher Text
- keine englischen Labels
- keine KI-Pseudo-Schrift
- keine Bildnummern oder Wasserzeichen im Bild

## 8. Freigabe

Der finale `google-flow-prompt.txt` ist erst fertig, wenn:

1. er direkt in Google Flow kopiert werden kann,
2. keine internen Planungslabels mehr sichtbar sind,
3. Style und World Lock einmalig definiert sind,
4. jeder Bildblock natürlich und direkt formuliert ist,
5. wiederkehrende Elemente konsistent bleiben,
6. die Bilder klar statt überladen geplant sind.
