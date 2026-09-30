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
- Jedes Bild besitzt genau **eine Kernaussage** und ein dominantes Hauptmotiv.
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
- Für das Kenilworth-Testvideo lautet der Cover-Text: `HUNGER BESIEGT BURGEN?`.

## 2026-09-29 — Manueller Cover-Gate

- Google Flow erzeugt zuerst **nur drei BILD-01-Cover-Kandidaten**.
- Danach muss Flow vollständig stoppen.
- Flow darf **keinen Gewinner selbst auswählen**.
- Der Nutzer wählt den Cover-Kandidaten persönlich aus.
- Vor dieser ausdrücklichen Nutzerwahl dürfen **BILD 02 bis BILD NN nicht generiert werden**.
- Der ausgewählte Kandidat wird `Bild 01.png`.
- Erst danach startet die restliche Bildgenerierung.
- Der ausgewählte Cover-Look dient zusätzlich als visuelle Referenz für den restlichen Video-Batch.

## 2026-09-30 — Visual Director / Prompt-System V2

Die Tests mit Kenilworth und Pompeji haben gezeigt: Die Bildwelt wurde semantisch verstanden, aber die finalen Einzelprompts waren häufig zu mechanisch und inventarartig. Deshalb gilt ab jetzt:

- Die Grund-Style-ID `history-stickman-adaptive-v1` bleibt bestehen; die Prompt- und Regielogik wird auf **Visual Director V2** angehoben.
- `channel/10-STYLE-DNA-V2.md` präzisiert Figurenproportionen, Linien, Flächen, Detailhierarchie, Raum, Kamera, Komposition, Licht und Farbe.
- Vor jedem finalen Prompt ist eine Scene Card V2 nach `channel/11-VISUAL-DIRECTOR.md` Pflicht.
- Der verbindliche Pfad lautet: `Script → Aussage → Visual Concept → Visual Form → Composition → Camera → Mood/Light → Continuity → Prompt → Prompt QC`.
- Eine reine Inventarliste wie `Show X, add Y, keep X large` reicht nicht mehr als finale Bildregie.
- Jede Scene Card benötigt Viewer Takeaway, Visual Concept, Dominant Subject, Action/State, Composition, Camera, Depth Plan, Lighting/Mood, Continuity und historische Plausibilitätsnotiz.
- Die intern gewählte Visual Form darf beim Prompt-Schreiben nicht verloren gehen.
- `comparison` muss beide Vergleichspole sichtbar machen.
- `cause-effect` muss Ursache und Folge visuell verbinden.
- `process-sequence` muss die Zustandsänderung unmittelbar lesbar machen.
- `system-hierarchy` muss seine Struktur räumlich und nicht als Corporate-Diagramm erklären.
- Jeder finale Bildprompt wird nach `channel/12-PROMPT-QC.md` mit maximal 10 Punkten bewertet.
- Mindestscore zur Freigabe: **8/10**.
- Aussage-Treue, Visual-Form-Treue und Komposition dürfen niemals 0 Punkte erhalten.
- Neue Projekte verwenden `BILD_AUDIO_ZUORDNUNG.json` Schema V2.
- Der Phase-1-Validator prüft Scene-Card-Pflichtfelder, Supporting-Element-Limit, QC-Score und konkrete Kamera-/Kompositionssprache.
- Der bisherige case-sensitive Bildmarker-Check wurde korrigiert, damit `BILD 01` zuverlässig erkannt wird.
- Zusätzlich wird nach `channel/13-STYLE-REFERENCE-PACK.md` ein Satz aus neun ausdrücklich freigegebenen Master-Referenzbildern aufgebaut.

## 2026-09-30 — Google Flow Compiler V3

Die V2-Regeln waren inhaltlich stark, aber ein Agent konnte den finalen `google-flow-prompt.txt` weiterhin frei formulieren. Damit blieb zwischen guter Scene Card und tatsächlichem Flow-Prompt eine Interpretationslücke. Diese Lücke wird mit V3 geschlossen.

Ab jetzt gilt für **neue Produktionen**:

- Prompt-System: `flow-compiler-v3`.
- `config/flow-style-lock.json` ist die maschinenlesbare unveränderliche Channel-Style-DNA.
- Der Style Lock enthält konkrete Figurenkonstruktion, Rendering-Regeln, Detailbudget, Palette, Negativregeln, Style Anchor und Style-Drift-Risikowörter.
- Jedes Video besitzt zusätzlich `99-technik/FLOW_WORLD_LOCK.json` für Orte, Figuren, Props, lokale Farbigkeit und Zeit-/Wetterkontinuität.
- `FLOW_WORLD_LOCK.json` muss vor dem Prompt-Build `READY` sein und darf keine Platzhalter enthalten.
- Der finale `google-flow-prompt.txt` wird nicht mehr frei geschrieben, sondern mit `npm run build:youtube-flow` aus Style Lock, World Lock, `video.json` und den Scene Cards kompiliert.
- Der lange Channel Style Lock erscheint einmal pro Master-Prompt.
- Zusätzlich wiederholt jeder `BILD NN`-Prompt denselben kompakten `sceneStyleAnchor`, damit die Rendering-DNA bei langen Batches nicht driftet.
- Der Compiler erhält Visual Concept, Dominant Subject, Action/State, Composition, Camera, Depth, Lighting/Mood, Continuity und historische Plausibilität aus der Scene Card.
- Für empfindliche Visual Forms fügt der Compiler zusätzliche Guards ein, damit `comparison`, `cause-effect`, `process-sequence`, `system-hierarchy`, `battle-city-overview`, `object-focus` und `character-scene` nicht beim Prompt-Schreiben verwässern.
- `BILD 01` erhält automatisch den exakten deutschen Cover-Text.
- `BILD 02–NN` erhalten automatisch eine explizite No-Text-Regel.
- Generische Render-Wörter wie `cinematic`, `epic`, `ultra detailed`, `hyper detailed`, `photographic`, `realistic lighting`, `depth of field` und `bokeh` gelten in Scene Cards als Style-Drift-Risiko und werden in V3 blockiert.
- Kamera, Licht und Stimmung werden stattdessen konkret beschrieben.
- Der kompilierten Datei wird `PROMPT_SYSTEM: flow-compiler-v3` mitgegeben.
- `video.json.flowPromptBuiltAt` wird beim Build gesetzt.
- Der Phase-1-Validator blockiert V3 bei fehlendem World Lock, fehlendem Build-Zeitpunkt, falscher Style-ID, Platzhaltern, fehlendem Style Anchor, fehlendem Cover-Text, fehlender No-Text-Regel oder anderen V3-Verstößen.
- Der erzeugte `google-flow-prompt.txt` ist ein Build-Artefakt und wird nicht direkt manuell editiert. Änderungen erfolgen an der Quelle und werden erneut kompiliert.

### Style-Reference-Pack nach V3

- Das Reference Pack bleibt geplant und ergänzt den textual/machine Style Lock später visuell.
- Nach `READY` werden pro Generierung nur die 2–4 passendsten freigegebenen Master-Referenzen als Google-Flow-Ingredients genutzt.
- Referenzen sollen sauber sein und möglichst keine unnötigen Motive enthalten, die Flow versehentlich übernehmen könnte.
- Textprompt und Ingredients dürfen sich nicht widersprechen.
- Referenzen fixieren Linien, Proportionen, Textur, Schattierung, Detailhierarchie und Farbcharakter; sie sollen nicht automatisch Motiv, Epoche oder Komposition kopieren.
- Visuelle Style-Priorität nach Freigabe: `approved reference ingredients → config/flow-style-lock.json → channel/10-STYLE-DNA-V2.md → channel/06-VISUAL-SYSTEM.md → freie Modellinterpretation`.
