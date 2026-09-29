# History Image Prompt Template — Google Flow V1.3

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

Diese Informationen helfen beim Denken und Prüfen. Sie dürfen nicht 1:1 in den finalen `google-flow-prompt.txt` kopiert werden.

## 2. Finaler Flow-Prompt

Der finale Prompt soll wie eine klare Regieanweisung für einen Illustrator klingen.

### Grundformat

```text
COVER TEXT:
Use exactly this German cover text: "[2–5 Wörter]".

BILD 01
[ein natürlicher direkter Cover-Prompt als Fließtext; exakten Cover-Text integrieren]

BILD 02
[ein natürlicher direkter Bildprompt als Fließtext; kein sichtbarer Text]
```

## 3. Cover-Text — Pflicht

BILD 01 ist Cover + erste Szene und bekommt **immer** einen passenden kurzen deutschen Text.

Der Text:

- passt zum Thema/Hook des Videos
- ist idealerweise 2–5 Wörter lang
- wird exakt im Flow-Prompt angegeben
- bleibt bei allen drei Cover-Kandidaten identisch
- muss korrekt geschrieben sein
- ist groß und sofort lesbar
- verdeckt kein wichtiges Hauptmotiv
- erhält je nach Hintergrund automatisch starken Kontrast: hell auf dunkel oder dunkel auf hell
- darf bei Bedarf einen dezenten Rand/Schatten besitzen

Keine zweite Textzeile mit Zusatzinformationen, keine englischen Labels, keine Bildnummern, kein Logo und keine Pseudo-Schrift.

## 4. Was nicht in den finalen Prompt gehört

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

## 5. Gemeinsamer Style-Block

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

## 6. Video World Lock

Ebenfalls nur einmal pro Video/Batch definieren:

- wiederkehrende Orte
- Architektur/Silhouetten
- wiederkehrende Räume
- wiederkehrende Figurenmerkmale
- wichtige Props
- Grundfarbigkeit, Wetter und Zeitlogik

Danach in Einzelprompts einfach auf `the same ...` verweisen.

## 7. Einzelbild-Regeln

Intern gilt weiterhin:

- genau eine Kernaussage
- genau ein dominantes Hauptmotiv
- maximal 1–3 unterstützende Elemente
- Hauptmotiv groß genug für YouTube
- keine Wimmelbilder
- keine Museumstafel-/Schulbuchposter-Ästhetik
- keine unnötigen Querschnitte oder Collagen
- bei zwei gleich wichtigen Aussagen lieber zwei Bilder

## 8. Textregel

```text
BILD 01: exact short German cover text REQUIRED.
BILD 02–NN: no visible text by default.
```

Außerhalb des Covers darf sichtbarer Text nur bei ausdrücklicher Notwendigkeit vorkommen und muss dann exakt auf Deutsch vorgegeben sein.

## 9. Freigabe

Der finale `google-flow-prompt.txt` ist erst fertig, wenn:

1. er direkt in Google Flow kopiert werden kann,
2. keine internen Planungslabels mehr sichtbar sind,
3. Style und World Lock einmalig definiert sind,
4. BILD 01 einen passenden 2–5-Wort-Covertext auf Deutsch besitzt,
5. der Covertext kontrastreich und fehlerfrei ist,
6. jeder Bildblock natürlich und direkt formuliert ist,
7. wiederkehrende Elemente konsistent bleiben,
8. BILD 02–NN keinen unnötigen sichtbaren Text enthalten.
