# Visual System — STATUS: READY

## Style ID

`history-stickman-adaptive-v1`

## Ziel

Der Kanal nutzt eine **konsistente handgezeichnete 2D-History-Explainer-Welt**. Stickman-artige Figuren sind ein wichtiger Teil der Bildwelt, aber nicht jedes Bild braucht Figuren.

Die Bildwelt soll erwachsen, historisch, verständlich und lebendig wirken. Sie darf sich an Epoche, Stimmung und Inhalt anpassen, ohne den grundlegenden Illustrationsstil zu wechseln.

## Kernprinzip

**Stil bleibt konstant. Inszenierung darf sich ändern.**

Ein ruhiger Bauernalltag, der Untergang Roms, eine Belagerung und eine Reichskarte dürfen unterschiedliche Stimmung und Komposition haben. Sie müssen aber aussehen, als wären sie vom selben Illustrator für denselben Kanal gezeichnet worden.

Die präzise maschinenlesbare Umsetzung dieser Bildwelt steht in `config/flow-style-lock.json`.

---

## 1. Figuren-System

Alle menschlichen Figuren stammen aus derselben stilisierten Stickman-Familie:

- einfacher runder oder leicht ovaler Kopf
- warme/off-white Hautfläche als stilisierte Grundform
- Kopf ungefähr 1/6 bis 1/7 der sichtbaren Körperhöhe
- schlanker, vereinfachter Körper
- vereinfachte Arme, Beine, Hände und Füße
- zwei kleine dunkle Augen, einfache Augenbrauen, kleine zurückhaltende Mundform
- saubere dunkle Ink-Konturen
- überwiegend konstante mittlere Linienstärke
- flache, gedämpfte Farben
- dezente Cel-Shading-Schattierung
- leichte handgezeichnete Papier-/Tuschetextur
- keine realistische Anatomie

Figuren dürfen und sollen individuell wirken. Erlaubt und erwünscht sind historisch passende Haare, Bärte, Schnurrbärte, Augenbrauen, Helme, Kronen, Hüte, Hauben, Kapuzen, Tücher, Rüstungen, Tuniken, Mäntel, Roben, Gürtel, Schmuck, Werkzeuge, Waffen und andere Props.

Emotion wird über Augen, Augenbrauen, kleine Mundformen, Blickrichtung, Kopfhaltung, Gestik und Körperhaltung vermittelt. Keine Meme-Mimik und keine kindliche Cartoon-Komik.

---

## 2. Nicht jedes Bild braucht Figuren

Figuren dürfen niemals automatisch erzwungen werden.

Gleichwertige Visuals sind historische Karten, Architektur, Städte, Burgen, Landschaften, Objekte, Münzen, Waffen, Werkzeuge, Schiffe, Handelsgüter, Symbolbilder, Ursache-Wirkungs-Bilder, Versorgungssysteme, Hierarchien, Reichsausbreitung, Vorher/Nachher, Aufstieg/Fall sowie Stadt- oder Schlachtübersichten.

Nicht-Figuren-Visuals verwenden dieselbe Linien-, Farb-, Schattierungs- und Texturlogik wie Figurenszenen.

---

## 3. Rendering / Illustration

Verbindlich:

- 2D hand-drawn historical explainer illustration
- clean dark ink outlines
- muted historical color palette
- flat colors
- subtle cel shading
- light handmade ink-and-paper texture
- kontrollierter Detailgrad
- klare Hauptaussage
- visuell erwachsen, aber zugänglich

Die Umgebung darf detaillierter sein als die Figuren, darf aber niemals den Fokus zerstören.

Für Maschinen gelten zusätzlich die Detailbudgets aus `config/flow-style-lock.json`.

---

## 4. Bildhierarchie

Jedes Bild muss in weniger als einer Sekunde verständlich sein.

Verbindlich:

- genau eine Kernaussage
- genau ein dominantes Hauptmotiv
- maximal 1–3 unterstützende Elemente
- Hauptmotiv groß und YouTube-tauglich
- klare Vordergrund-/Mittelgrund-/Hintergrund-Hierarchie
- wichtige Information nicht in vielen kleinen Details verstecken

Nicht als Standard verwenden: Wimmelbilder, überfüllte Menschenmengen, Museumstafeln, Schulbuchposter, Lexikonplatten, viele Mini-Figuren, viele Labels/Pfeile, Collagen, Multi-Panel-Kompositionen, unnötige Querschnitte oder extrem kleinteilige Erklärbilder.

Wenn ein Satz zwei gleich wichtige visuelle Aussagen enthält, lieber zwei Bilder planen.

---

## 5. Video World / Continuity Lock

**Innerhalb eines Videos ist Kontinuität wichtiger als künstliche Variation.**

Wiederkehrende Orte behalten Silhouette, Architektur, Tor-/Fenster-/Mauerlogik, Grundfarbigkeit und zentrale Props.

Wiederkehrende Figuren behalten Haare/Bart, Kopfbedeckung, Kleidung/Rüstung, Farbgebung und Stickman-Grundkonstruktion.

Wiederkehrende Räume und Zustandsänderungen sollen möglichst denselben Blickwinkel benutzen, wenn das Verständnis dadurch stärker wird.

Beispiel:

```text
volles Lager
→ dasselbe Lager halb leer
→ dasselbe Lager fast leer
```

Für neue Produktionen wird diese videospezifische Kontinuität in `99-technik/FLOW_WORLD_LOCK.json` festgehalten und vor dem Prompt-Build auf `READY` gesetzt.

---

## 6. Adaptive Stimmung

Die Kunsttechnik bleibt gleich, die Stimmung darf sich anpassen.

- Alltag: ruhiger, wärmer/natürlicher, näher an Personen und Gegenständen
- Krieg/Belagerung/Krise: angespannter, stärkere Kontraste, Rauch/Enge möglich, keine unnötige Gore-Ästhetik
- Herrschaft/Politik: kontrollierte Komposition, klare Hierarchie, Körpersprache wichtiger als Action
- Reiche/Expansion/Geografie: Karten und Übersichten, aber keine moderne Corporate-Infografik
- Untergang/Zerfall: Ursache-Wirkung, beschädigte Architektur, leere Lager, gebrochene Systeme, nicht automatisch nur Schlachten

Stimmung konkret über Licht, Raum und Kontrast beschreiben. Generische Wörter wie `cinematic`, `epic` oder `realistic lighting` sind kein Ersatz für konkrete Regie und gelten im V3-System als Drift-Risiko.

---

## 7. Farbwelt

Gemeinsamer Charakter: Sand/Beige, Stein/Grau, Lederbraun, gedämpftes Rot, dunkles Grün/Oliv, Graublau, Pergamenttöne und gedecktes Gold als Akzent.

Neonfarben und extrem gesättigte Kinderfarben vermeiden.

---

## 8. Historische Lesbarkeit

Historische Kleidung, Waffen, Architektur, Karten, Werkzeuge und Symbole sollen zur behandelten Epoche passen.

**Faktenrichtigkeit vor dekorativer Coolness.**

Keine Hörnerhelme bei Wikingern, keine beliebigen Fantasy-Rüstungen, keine modernen Gegenstände und keine falschen Flaggen/Uniformen/Karten, wenn sie für die Aussage relevant sind.

Wenn die genaue Darstellung unsicher ist, lieber neutraler visualisieren als falsche Details erfinden.

---

## 9. Text im Bild

### Cover / Bild 01

**Bild 01 ist immer Cover + erste Szene und enthält immer einen passenden deutschen Cover-Text.**

Regeln:

- ideal 2–5 Wörter
- passend zum Video-Hook/Thema
- exakter Wortlaut in `video.json`
- alle drei Cover-Kandidaten benutzen denselben Text
- Schreibfehler oder unlesbarer Text = Kandidat verwerfen
- groß und sofort lesbar
- Hintergrund hell → dunkle Schrift
- Hintergrund dunkel → helle Schrift
- dezenter Rand/Schatten nur bei Bedarf
- Hauptmotiv, Gesichter und entscheidende Aktion nicht verdecken
- kein englischer Zusatztext, kein Logo, keine Bildnummer

### Bild 02–NN

Standard: **kein generierter sichtbarer Text**.

Der Flow Compiler fügt dafür automatisch eine harte No-Text-Regel in jeden Nicht-Cover-Prompt ein.

Verboten sind Bildnummern, unnötige Labels, pseudo-lesbarer KI-Text, englische Beschriftungen und Wasserzeichen.

Nur wenn ein späteres Bild ohne Beschriftung nicht verständlich wäre und die Produktion es ausdrücklich verlangt, darf die Policy bewusst erweitert werden.

Remotion erzeugt nicht automatisch sichtbaren Erklärungstext.

---

## 10. Verbotene Stilwechsel

Nicht verwenden: Fotorealismus, realistische menschliche Porträts, 3D Rendering, Pixar-/Animationsfilm-Look, Anime, painterly realism, Graphic-Novel-Realismus, wechselnde Cartoon-Stile, moderne Corporate-Infografik, extrem dicke Comic-Outlines oder kindliche Chibi-/Kinderbuch-Proportionen.

Die maschinenlesbaren Verbote und High-Risk-Prompt-Wörter stehen in `config/flow-style-lock.json`.

---

## 11. Google-Flow-Prinzip — Flow Compiler V3

Interne Bildplanung und finaler Google-Flow-Prompt bleiben strikt getrennt.

### Interne Ebene

Die Scene Card V2 darf ausführlich planen mit:

- Viewer Takeaway
- Visual Purpose
- Topic Anchor
- Visual Form
- Visual Concept
- Dominant Subject
- Action / State
- Composition
- Camera
- Depth Plan
- Lighting / Mood
- Supporting Elements
- Continuity Note
- Historical Accuracy Note
- Prompt QC Score

Diese Formularfelder werden nicht 1:1 in Google Flow ausgegeben.

### Build-Ebene

Neue Produktionen erzeugen den finalen Prompt mit:

```bash
npm run build:youtube-flow -- --dir "youtube/<week>/<slug>"
```

Der Compiler kombiniert:

1. `config/flow-style-lock.json`
2. `video.json`
3. `BILD_AUDIO_ZUORDNUNG.json`
4. `FLOW_WORLD_LOCK.json`

### Finaler Flow-Prompt

Der tatsächliche Prompt enthält:

1. aktive Style-ID und `PROMPT_SYSTEM: flow-compiler-v3`
2. kurze Batch-Aufgabe
3. `CHANNEL STYLE — IMMUTABLE`
4. Style-Consistency-Regel
5. optionale Style-Reference-/Ingredient-Regel
6. `VIDEO WORLD LOCK — IMMUTABLE WITHIN THIS VIDEO`
7. exakten `COVER TEXT`
8. `BILD 01` bis `BILD NN`
9. pro Bild einen natürlichen direkten Fließtext-Prompt
10. denselben kompakten Style Anchor in jedem Bildprompt
11. globale Negativ- und Kompositionsregeln
12. Textregel
13. zweistufigen manuellen Cover-Gate

Der erzeugte `google-flow-prompt.txt` ist ein Build-Artefakt und wird nicht manuell umgeschrieben.

### Style References

Sobald `13-STYLE-REFERENCE-PACK.md` `READY` ist, werden pro Generierung nur die 2–4 passendsten freigegebenen Referenzen als Google-Flow-Ingredients verwendet.

Sie ergänzen den Style Lock. Sie ersetzen ihn nicht.

---

## Qualitätsfrage vor Freigabe

Bei jedem Video prüfen:

1. Gehört alles sichtbar zum selben Kanal?
2. Ist jede historische Aussage sofort verständlich?
3. Gibt es je Bild genau ein dominantes Hauptmotiv?
4. Sind maximal 1–3 unterstützende Elemente nötig?
5. Bleiben wiederkehrende Orte/Figuren konsistent?
6. Ist `FLOW_WORLD_LOCK.json` READY und ohne Platzhalter?
7. Hat BILD 01 einen passenden, fehlerfreien, kontrastreichen deutschen Cover-Text?
8. Verdeckt der Cover-Text kein Hauptmotiv?
9. Sind BILD 02–NN frei von unnötigem sichtbarem Text?
10. Sind historische Details plausibel?
11. Wurde der Prompt mit Flow Compiler V3 gebaut?
12. Enthält jeder Einzelprompt den kompakten Style Anchor?
13. Hat jede Scene Card Prompt-QC >= 8/10?
14. Besteht `validate:youtube-phase1`?

## Status

`READY`
