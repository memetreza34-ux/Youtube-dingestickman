# Decision Log — Geschichts-Kanal

Chronologisches Register ausdrücklicher Kanalentscheidungen. **Neuere Entscheidungen ersetzen ältere**, wenn sie sich widersprechen.

## 2026-09-28 — Repo und Kanal

- `memetreza34-ux/Youtube-dingestickman` ist der konkrete Geschichts-Kanal.
- Positionierung: **History × Storytelling × Curiosity**.
- Geschichte wird über spannende Fragen, Entwicklungen und konkrete menschliche Situationen erzählt, nicht wie trockener Unterricht.
- Skripte starten direkt, erklären Ursache/Wirkung und beantworten die Ausgangsfrage.

## 2026-09-28 — Grundbildwelt V1

- Verbindlicher Grundstil: `history-stickman-adaptive-v1`.
- Handgezeichnete 2D-History-Explainer-Welt.
- Historische Stickman-Figuren mit individuellen Haaren, Bärten, Kleidung, Rüstung, Props, Haltung und einfacher Mimik.
- Nicht jedes Bild braucht Figuren; Karten, Architektur, Landschaften, Objekte, Systeme, Vergleiche und Symbolbilder sind gleichwertig.
- Historische Plausibilität vor dekorativer Coolness.
- Der Zeichenstil bleibt konstant; Epoche, Stimmung, Licht, Kamera und Komposition dürfen sich anpassen.

## 2026-09-29 — Bildprompt-Qualität

- Ein Bild = eine Kernaussage + ein dominantes Hauptmotiv.
- Maximal 1–3 notwendige unterstützende Elemente.
- Keine Wimmelbilder, Museumstafeln oder überfüllten Schulbuchposter als Standard.
- Wiederkehrende Orte, Figuren, Räume und Props werden innerhalb eines Videos über Continuity/World Lock konstant gehalten.
- Gleiche Blickwinkel werden bewusst für Vorher/Nachher oder Zustandsänderungen genutzt, nicht automatisch.

## 2026-09-29 — Cover-Gate

- Bild 01 ist Cover + erste Szene.
- Cover-Text ist deutsch, kurz, exakt vorgegeben und gut lesbar.
- Flow erzeugt zuerst genau drei Cover-Kandidaten und stoppt danach.
- Flow wählt keinen Gewinner selbst.
- Erst nach ausdrücklicher Nutzerwahl dürfen Bild 02–NN erzeugt werden.

## 2026-09-30 — Visual Director V2

Die Kenilworth-/Pompeji-Tests zeigten: Die Bildwelt wurde verstanden, aber Einzelprompts waren zu oft mechanisch und inventarartig. Deshalb gilt:

- Pflichtpfad: `Script → Aussage → Visual Concept → Visual Form → Composition → Camera → Mood/Light → Continuity → Prompt QC`.
- Scene Card V2 nach `channel/11-VISUAL-DIRECTOR.md` ist Pflicht.
- Viewer Takeaway, Visual Concept, Dominant Subject, Action/State, Composition, Camera, Depth, Lighting/Mood, Continuity und historische Plausibilität werden vor dem Prompt festgelegt.
- Visual Form darf beim Schreiben nicht verloren gehen.
- `comparison` zeigt beide Pole, `cause-effect` Ursache und Folge, `process-sequence` die Zustandsänderung, `system-hierarchy` eine räumliche Struktur.
- Prompt-QC nach `channel/12-PROMPT-QC.md`; Mindestscore **8/10**.

## 2026-09-30 — Flow Compiler V3

- Prompt-System: `flow-compiler-v3`.
- `config/flow-style-lock.json` ist die maschinenlesbare Channel-Zeichen-DNA.
- Jedes Video besitzt `99-technik/FLOW_WORLD_LOCK.json` für videospezifische Kontinuität.
- Der finale `google-flow-prompt.txt` wird aus Style Lock, World Lock, `video.json` und Scene Cards kompiliert, nicht frei improvisiert.
- Jeder Bildblock enthält einen kompakten Style Anchor, der nur die Rendering-DNA sichert.
- Generische Drift-Wörter wie `cinematic`, `epic`, `ultra detailed`, `photographic`, `realistic lighting`, `depth of field` und `bokeh` werden vermieden/blockiert.
- Kamera, Licht, Raum und Stimmung werden konkret beschrieben.
- Der kompilierte Flow-Prompt ist ein Build-Artefakt; Änderungen erfolgen an den Quelldaten und werden neu gebaut.

## 2026-09-30 — KEINE globalen Master-Referenzbilder

Diese Entscheidung ersetzt die frühere Planung eines Packs aus neun Style-Referenzbildern vollständig.

- Der Kanal verwendet **keine festen globalen Master-Referenzbilder**.
- Grund: Starke Referenzbilder können unbeabsichtigt nicht nur den Zeichenstil, sondern auch Kamerawinkel, Figurenhaltung, Komposition und Szenenaufbau wiederholen. Dadurch würden Bilder zu ähnlich aussehen.
- `channel/13-STYLE-REFERENCE-PACK.md` wird nicht mehr verwendet und wurde entfernt.
- Die Wiedererkennung kommt aus `config/flow-style-lock.json`, `channel/10-STYLE-DNA-V2.md` und der Grundbildwelt.
- Konstant bleiben: Linienfamilie, Figurenkonstruktion, Gesichtsvereinfachung, flache gedeckte Farbwelt, Cel-Shading, Papier-/Tuschetextur und Detailhierarchie.
- Bewusst variieren dürfen: Kameraabstand, Blickwinkel, Perspektive, Subject Placement, Vordergrund/Mittelgrund/Hintergrund, Negativraum, Licht, Wetter, Tageszeit, Stimmung und Visual Form.
- **Gleicher Stil bedeutet nicht gleiche Komposition.**
- Fast identische Blickwinkel sind nur für echte Kontinuität wie Vorher/Nachher oder sichtbare Zustandsänderungen erwünscht.
- Der ausgewählte Cover-Kandidat darf höchstens innerhalb desselben Videos als Continuity-Hilfe verwendet werden. Er wird niemals zur globalen Kanal-Style-Referenz.
- Vor Prompt-QC wird zusätzlich geprüft, ob der Bildplan unnötig Kamera-/Kompositionsmuster wiederholt.

## 2026-09-30 — Mehr Story-Beats, höhere Bilddichte, History-Script V2

Diese Entscheidung stammt aus der Auswertung des gerenderten Marschlager-Testvideos und ersetzt ältere, langsamere Bilddichte-Regeln.

- Das Testvideo war grundsätzlich brauchbar, aber visuell noch zu ruhig.
- Neue Planung folgt **Story-Beats statt Absätzen**.
- Sobald sich Handlung, Ursache/Folge, Person, Ort, Zeit, Zustand oder zentrale Erkenntnis deutlich ändert, wird ein neuer visueller Beat geprüft.
- Zielbereich normaler Holds: ungefähr **3–5 Sekunden**.
- Ab ungefähr 6,5 Sekunden wird ein Split geprüft, ab 8 Sekunden stark bevorzugt; 10 Sekunden sind nur mit klarer Begründung zulässig.
- Ein ungefähr 60-sekündiger History-Test darf typischerweise etwa **14–20 Visuals** besitzen. Das ist keine starre Quote; Inhalt gewinnt.
- **Mehrere Momente in einer Illustration sind ausdrücklich erlaubt.**
- Neue Visual Form: `multi-moment-illustration`.
- Eine Mehrmoment-Illustration darf zwei oder höchstens drei eng zusammengehörige Story-Momente verbinden, z. B. vorher → Veränderung → danach oder Ursache → Handlung → Folge.
- Die ältere Regel „ein Bild = nur ein einzelner Zustand“ gilt nicht mehr absolut. Neue harte Regel: **ein Bild = ein klarer erzählerischer Takeaway**.
- Dichte Collagen, viele kleine Panels, Wimmelbilder und unabhängige Mini-Szenen bleiben verboten.
- `channel/03-SCRIPT-BIBLE.md` wurde auf **History-Storytelling V2** angehoben.
- Skripte sollen stärker wie ein moderner Geschichtskanal funktionieren: konkreter Moment zuerst, dann Problem, Handlung/Entscheidung, Folge, neue Frage und größere Bedeutung.
- Abstrakte Lexikon-Einstiege werden vermieden. Geschichte wird möglichst über konkrete Menschen, Orte, Handlungen und sichtbare Veränderungen erzählt.
- Jeder Absatz soll die Situation oder das Verständnis des Zuschauers weiterbewegen.
- Das Skript soll zwischen menschlicher Nahperspektive und größerem historischen Zusammenhang wechseln.
- Das Ende beantwortet die Ausgangsfrage und kehrt wenn sinnvoll zum Bild oder Problem des Einstiegs zurück, statt nur alle Punkte zu wiederholen.

## Aktuelle Style-Autorität

```text
neueste Nutzerentscheidung / dieses Decision Log
→ config/flow-style-lock.json
→ channel/10-STYLE-DNA-V2.md
→ channel/06-VISUAL-SYSTEM.md
→ videospezifische Scene Direction
```
