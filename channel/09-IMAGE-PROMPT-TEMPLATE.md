# History Image Prompt Template — Google Flow

Dieses Template ist verbindlich für neue History-Bildprompts. Es übernimmt die starke Prompt-Logik des eigenen Erklärkanals, aber angepasst an die History-Bildwelt.

## Ziel

Jedes Bild muss **eine Aussage in weniger als einer Sekunde verständlich machen**. Ein Bild ist kein Sammelplatz für alle Fakten des Satzes.

## Prompt-Struktur pro Bild

```text
VIEWER MUST IMMEDIATELY UNDERSTAND:
[genau eine historische Aussage]

SHOW:
[ein dominantes Hauptmotiv in einer konkreten Szene]

DOMINANT VISUAL ACTION / STATE:
[eine klare Handlung, Veränderung oder Zustand]

SUPPORTING ELEMENTS:
[maximal 1–3 wirklich notwendige unterstützende Elemente]

CAMERA / COMPOSITION:
[klarer Bildausschnitt, große Hauptmotive, verständliche Tiefenstaffelung]

CONTINUITY LOCK:
[falls Ort, Figur oder Objekt bereits vorkam: exakt dieselbe visuelle Ausführung weiterverwenden]

VISIBLE TEXT:
None by default. If absolutely required, use only the exact short German text explicitly provided in the prompt.
```

Der gemeinsame `CHANNEL STYLE` wird pro Flow-Batch nur einmal angegeben und nicht in jedem Einzelbild wiederholt.

## Harte Kompositionsregeln

- genau **ein dominantes Hauptmotiv**
- höchstens **1–3 unterstützende Elemente**
- Hauptmotiv groß genug für YouTube; keine winzige zentrale Szene
- kein Wimmelbild
- keine Museumstafel-, Schulbuchposter- oder Lexikonästhetik
- keine unnötigen Schnittbilder oder komplexen Querschnitte
- keine vielen Mini-Figuren, Mini-Objekte, Pfeile, Labels oder Dekoelemente gleichzeitig
- keine visuelle Information hinzufügen, nur weil im Skript noch weitere Fakten stehen
- wenn zwei Aussagen gleich wichtig sind, lieber zwei Bilder planen

## Video-Continuity-Lock

Innerhalb eines Videos gilt Kontinuität stärker als Variation.

Wenn ein Ort wiederkehrt, z. B. Kenilworth Castle, müssen wiederkehren:

- gleiche Silhouette und Architektur
- gleiche Mauer-/Steinlogik
- gleiche Torform
- gleiche Innenhof- und Lagerraumlogik, soweit sichtbar
- gleiche Grundfarbigkeit

Wenn Figuren wiederkehren:

- gleiche Haare/Bärte/Kopfbedeckungen
- gleiche Kleidung/Rüstung
- gleiche Stickman-Grundkonstruktion

Wenn ein Raum oder Objektzustand eine Entwicklung zeigt, möglichst **denselben Blickwinkel** wiederverwenden. Beispiel: volles Lager → halb leeres Lager → fast leeres Lager.

## Textregel

Standard: **kein sichtbarer KI-Text im Bild**.

Wenn Beschriftung ausnahmsweise zwingend nötig ist:

- nur auf Deutsch
- maximal 1–3 kurze Begriffe
- exakt vorgeben
- keine englischen Labels
- keine Überschrift, Unterzeile, Bildnummer, Wasserzeichen oder Fake-Typenschilder

Wenn die Aussage ohne Text verständlich ist, wird **kein Text** erzeugt.

## Negativprompt / zu vermeiden

```text
overcrowded scene, busy crowd, wimmelbild, museum infographic, textbook poster, encyclopedia plate, tiny central subject, dozens of small figures, many labels, arrows everywhere, pseudo-text, English labels, fake handwriting, collage, multi-panel layout, split-screen border, unnecessary cutaway, excessive micro-detail, photorealism, realistic portrait, 3D render, Pixar, anime, painterly realism, graphic-novel realism, fantasy armor, modern objects, logo, watermark, image number
```

## Freigabe

Ein Bild ist erst gut, wenn alle Fragen mit JA beantwortet werden:

1. Versteht man die Kernaussage sofort?
2. Gibt es ein einziges dominantes Hauptmotiv?
3. Ist das Bild auch in kleiner YouTube-Größe klar lesbar?
4. Sind unnötige Details entfernt?
5. Passt der Stil zu den vorherigen Bildern?
6. Bleiben wiederkehrende Orte/Figuren visuell gleich?
7. Ist sichtbarer Text entweder komplett vermieden oder korrektes, ausdrücklich verlangtes Deutsch?
8. Wirkt das Bild wie eine starke Szene und nicht wie eine Lehrbuchtafel?
