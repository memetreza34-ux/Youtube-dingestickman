# Decision Log — Geschichts-Kanal

Chronologisches Register ausdrücklicher Kanalentscheidungen. Neuere Entscheidungen ersetzen ältere, wenn sie sich widersprechen.

## 2026-09-28 — Repo-Zuordnung

- `memetreza34-ux/Youtube-dingestickman` wird ab jetzt für den **konkreten Geschichts-Kanal** verwendet.
- `memetreza34-ux/Allgemein-pipline-f-r-videos-` bleibt die **allgemeine neutrale Master-Pipeline** und soll nicht mit kanalspezifischer Identität vermischt werden.

## 2026-09-28 — Kanaltrennung

- Es sollen perspektivisch zwei getrennte Kanäle existieren.
- Kanal 1: Geschichte.
- Kanal 2: spätere große/seltsame Fragen, Philosophie, Psychologie, Gesellschaft, Curiosity/What-if etc.
- Kanal 2 wird **nicht** in diesem Repository entwickelt.

## 2026-09-28 — History-Positionierung

- Kanal 1 soll nicht wie trockener Geschichtsunterricht wirken.
- Geschichte wird bevorzugt über spannende Fragen, Entwicklungen und konkrete menschliche Situationen erzählt.
- Inspiration: moderne visuelle History-/Explainer-Kanäle; keine direkte Kopie ihrer Markenidentität.

## 2026-09-28 — Skript-Grundrichtung

- Gute Einstiege sind zentral.
- Kein langes Intro oder „Hallo und willkommen“.
- Hook startet direkt mit Situation/Fakt/Kontrast und zentraler Frage.
- Fakten nicht nur aufzählen; Ursache und Wirkung erklären.
- Konkrete Personen und Situationen nutzen, wenn historisch sinnvoll.
- natürliche Mini-Hooks statt künstlichem Clickbait.
- Ausgangsfrage am Ende tatsächlich beantworten.
- Skript muss vor Bildplanung alleine funktionieren.

## 2026-09-28 — Bildwelt V1 freigegeben

- Verbindlicher Style: `history-stickman-adaptive-v1`.
- Grundwelt: handgezeichnete 2D-History-Explainer-Illustration.
- Stickman-Figuren bleiben ein wichtiger Bestandteil, dürfen aber nicht leer, identisch oder langweilig wirken.
- Historische Figuren dürfen Haare, Bärte, Schnurrbärte, Augenbrauen, Helme, Kronen, Hüte, Hauben, Kapuzen, Tücher, Rüstung, Kleidung, Schmuck, Werkzeuge und Props besitzen.
- Persönlichkeit und Gefühl sollen über einfache Mimik, Blickrichtung, Kopfhaltung, Gestik und Körpersprache sichtbar werden.
- Der Grundstil bleibt konstant; Stimmung, Epoche, Beleuchtung, Kamera und Komposition dürfen sich an den Inhalt anpassen.
- Nicht jedes Bild braucht Figuren.
- Karten, Architektur, Landschaften, Objekte, Systeme, Symbolbilder, Vergleiche, Übersichten und Aufstieg-/Fall-Darstellungen sind gleichwertige Bildformen.
- Nicht-Figuren-Bilder müssen im selben Zeichen-, Farb-, Schattierungs- und Texturuniversum wie Figurenszenen bleiben.
- Keine Bildnummern oder Wasserzeichen im Bild.
- Remotion erzeugt standardmäßig keinen sichtbaren Erklärungstext.
- Historische Plausibilität hat Vorrang vor dekorativer Coolness.

## 2026-09-28 — Google Flow

- Mehrere Bilder sollen bevorzugt als ein sauber strukturierter Flow-Batch geplant werden.
- Der gemeinsame Channel-Style wird pro Batch **einmal** definiert.
- Einzelne Szenenprompts bleiben kurz und konkret.
- Flow darf Figuren nicht automatisch in jede Szene setzen.
- Vor dem Prompt wird die passende Visual-Form gewählt.
- Alle Bilder eines Batches müssen sichtbar wie Arbeiten desselben Illustrators für denselben Kanal wirken.

## 2026-09-29 — Bildprompt-Qualität V1.1

- Keine Wimmelbilder, überfüllten Menschenmengen, Museumstafeln, Schulbuchposter oder Lexikonplatten als Standard.
- Jedes Bild besitzt genau **eine Kernaussage** und **ein dominantes Hauptmotiv**.
- Maximal **1–3 unterstützende Elemente** pro Bild.
- Das Motiv muss groß und auch in kleiner YouTube-Darstellung sofort lesbar sein.
- Wiederkehrende Orte, Figuren, Räume und Props werden innerhalb eines Videos über einen **VIDEO WORLD / CONTINUITY LOCK** konstant gehalten.
- Bei Zustandsänderungen möglichst denselben Ort und Blickwinkel wiederverwenden.

## 2026-09-29 — Google-Flow-Ausgabe V1.2

- Interne Bildplanung und der finale Google-Flow-Prompt werden strikt getrennt.
- Audio Anchor, Visual Purpose, Visual Form, Kernaussage, Dominant Subject, Supporting Elements, Kamera, Continuity und QC dürfen intern weiter ausführlich geplant werden.
- Diese technischen Felder werden nicht mehr als Formular in `google-flow-prompt.txt` ausgegeben.
- Der finale Flow-Prompt enthält nur einen gemeinsamen `CHANNEL STYLE`, einen `VIDEO WORLD LOCK` und danach `BILD NN` mit jeweils einem natürlichen direkten Fließtext-Prompt.
- Einzelprompts sollen wie klare Regieanweisungen an einen Illustrator klingen.

## 2026-09-29 — Cover-Text ist Pflicht

- **Bild 01 ist immer Cover + erste Szene und enthält immer passenden deutschen Text.**
- Cover-Text ist idealerweise 2–5 Wörter lang.
- Er muss zum konkreten Thema/Hook passen und muss nicht identisch mit dem vollständigen Videotitel sein.
- Der exakte Wortlaut wird vor der Bildgenerierung festgelegt.
- Alle drei Cover-Kandidaten verwenden denselben exakten Text.
- Schreibfehler, unvollständiger oder schlecht lesbarer Text führen zur Ablehnung des Kandidaten.
- Text muss starken Kontrast zum Hintergrund haben: hell auf dunkel, dunkel auf hell.
- Text darf das Hauptmotiv nicht verdecken.
- Bild 02–NN bleiben standardmäßig ohne sichtbaren Text.
- Für das Pompeji-Testvideo lautet der Cover-Text: `ZU SPÄT FÜR POMPEJI?`.
