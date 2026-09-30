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

Gleichwertige Visuals sind historische Karten, Architektur, Städte, Burgen, Landschaften, Objekte, Münzen, Waffen, Werkzeuge, Schiffe, Handelsgüter, Symbolbilder, Ursache-Wirkungs-Bilder, Versorgungssysteme, Hierarchien, Reichsausbreitung, Vorher/Nachher, Aufstieg/Fall, Mehrmoment-Illustrationen sowie Stadt- oder Schlachtübersichten.

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

## 4. Bildhierarchie und Mehrmoment-Regel

Jedes Bild muss schnell verständlich sein.

Die zentrale Regel lautet jetzt:

**Ein Bild = ein klarer erzählerischer Takeaway.**

Das bedeutet nicht mehr zwingend „ein Bild = nur ein einzelner Moment“.

Erlaubt sind:

- ein dominanter Einzelmoment
- Ursache und Folge in einem Bild
- Vorher/Nachher
- zwei oder höchstens drei eng zusammengehörige Momente in einer integrierten Illustration
- Vordergrund → Mittelgrund → Hintergrund als zeitliche oder kausale Erzählung
- klare Links→Rechts-Entwicklung

Bei einer Mehrmoment-Illustration müssen alle Momente dieselbe Zuschauerfrage beantworten. Ein Moment bleibt dominant oder die Leserichtung ist eindeutig.

Verbindlich:

- genau ein klarer Takeaway
- bei normalen Szenen genau ein dominantes Hauptmotiv
- bei Mehrmoment-Szenen höchstens 2–3 verbundene Story-Momente
- Hauptinformation groß und YouTube-tauglich
- klare Blickführung
- wichtige Information nicht in vielen kleinen Details verstecken

Weiterhin vermeiden:

- Wimmelbilder
- überfüllte Menschenmengen
- Museumstafeln
- Schulbuchposter
- Lexikonplatten
- neun kleine Panels
- dichte Fotocollagen
- viele Labels/Pfeile
- extrem kleinteilige Erklärbilder

Wenn zwei Aussagen **nicht** eng zusammengehören, lieber zwei Bilder planen. Wenn sie gemeinsam einen Ablauf, Vergleich oder Ursache→Folge verständlicher machen, darf eine Mehrmoment-Illustration verwendet werden.

---

## 5. Story-Beat-Dichte

Die Bildplanung folgt dem gesprochenen Story-Fortschritt.

Wenn sich Handlung, Ursache, Ort, Zeit, Zustand oder Zuschauer-Erkenntnis deutlich ändert, wird ein neuer visueller Beat geprüft.

Für kurze History-Videos ist eine höhere Dichte gewünscht. Ein ungefähr 60-sekündiger Test landet häufig bei etwa **14–20 visuellen Beats**. Das ist keine starre Quote; Inhalt und Lesbarkeit entscheiden.

Lange Holds auf demselben Bild vermeiden, wenn der Sprecher bereits über einen neuen Gedanken spricht.

---

## 6. Video World / Continuity Lock

**Innerhalb eines Videos ist Kontinuität wichtiger als künstliche Variation.**

Wiederkehrende Orte behalten Silhouette, Architektur, Tor-/Fenster-/Mauerlogik, Grundfarbigkeit und zentrale Props.

Wiederkehrende Figuren behalten Haare/Bart, Kopfbedeckung, Kleidung/Rüstung, Farbgebung und Stickman-Grundkonstruktion.

Wiederkehrende Räume und Zustandsänderungen sollen möglichst denselben Blickwinkel benutzen, wenn das Verständnis dadurch stärker wird.

Für neue Produktionen wird diese videospezifische Kontinuität in `99-technik/FLOW_WORLD_LOCK.json` festgehalten und vor dem Prompt-Build auf `READY` gesetzt.

---

## 7. Adaptive Stimmung

Die Kunsttechnik bleibt gleich, die Stimmung darf sich anpassen.

- Alltag: ruhiger, wärmer/natürlicher, näher an Personen und Gegenständen
- Krieg/Belagerung/Krise: angespannter, stärkere Kontraste, Rauch/Enge möglich, keine unnötige Gore-Ästhetik
- Herrschaft/Politik: kontrollierte Komposition, klare Hierarchie, Körpersprache wichtiger als Action
- Reiche/Expansion/Geografie: Karten und Übersichten, aber keine moderne Corporate-Infografik
- Untergang/Zerfall: Ursache-Wirkung, beschädigte Architektur, leere Lager, gebrochene Systeme, nicht automatisch nur Schlachten

Stimmung konkret über Licht, Raum und Kontrast beschreiben. Generische Wörter wie `cinematic`, `epic` oder `realistic lighting` sind kein Ersatz für konkrete Regie und gelten im V3-System als Drift-Risiko.

---

## 8. Farbwelt

Gemeinsamer Charakter: Sand/Beige, Stein/Grau, Lederbraun, gedämpftes Rot, dunkles Grün/Oliv, Graublau, Pergamenttöne und gedecktes Gold als Akzent.

Neonfarben und extrem gesättigte Kinderfarben vermeiden.

---

## 9. Historische Lesbarkeit

Historische Kleidung, Waffen, Architektur, Karten, Werkzeuge und Symbole sollen zur behandelten Epoche passen.

**Faktenrichtigkeit vor dekorativer Coolness.**

Keine Hörnerhelme bei Wikingern, keine beliebigen Fantasy-Rüstungen, keine modernen Gegenstände und keine falschen Flaggen/Uniformen/Karten, wenn sie für die Aussage relevant sind.

Wenn die genaue Darstellung unsicher ist, lieber neutraler visualisieren als falsche Details erfinden.

---

## 10. Text im Bild

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
- Hauptmotiv, Gesichter und entscheidende Aktion nicht verdecken
- kein englischer Zusatztext, kein Logo, keine Bildnummer

### Bild 02–NN

Standard: **kein generierter sichtbarer Text**.

Der Flow Compiler fügt dafür automatisch eine harte No-Text-Regel in jeden Nicht-Cover-Prompt ein.

---

## 11. Verbotene Stilwechsel

Nicht verwenden: Fotorealismus, realistische menschliche Porträts, 3D Rendering, Pixar-/Animationsfilm-Look, Anime, painterly realism, Graphic-Novel-Realismus, wechselnde Cartoon-Stile, moderne Corporate-Infografik, extrem dicke Comic-Outlines oder kindliche Chibi-/Kinderbuch-Proportionen.

---

## 12. Google-Flow-Prinzip — Flow Compiler V3

Interne Bildplanung und finaler Google-Flow-Prompt bleiben strikt getrennt.

Neue Produktionen erzeugen den finalen Prompt mit:

```bash
npm run build:youtube-flow -- --dir "youtube/<week>/<slug>"
```

Der Compiler kombiniert Style Lock, Video-Metadaten, Scene Cards und World Lock und erhält dabei die geplante Visual Form. `multi-moment-illustration` wird ausdrücklich als eigene Visual Form unterstützt.

Der erzeugte `google-flow-prompt.txt` ist ein Build-Artefakt und wird nicht manuell umgeschrieben.

---

## Qualitätsfragen vor Freigabe

1. Gehört alles sichtbar zum selben Kanal?
2. Wechselt das Bild, wenn sich der Story-Beat deutlich ändert?
3. Hat jedes Bild einen klaren Takeaway?
4. Sind Mehrmoment-Illustrationen auf höchstens 2–3 verbundene Momente begrenzt?
5. Ist die Blickführung sofort verständlich?
6. Bleiben wiederkehrende Orte/Figuren konsistent?
7. Sind historische Details plausibel?
8. Sind BILD 02–NN frei von unnötigem sichtbarem Text?
9. Wurde der Prompt mit Flow Compiler V3 gebaut?
10. Hat jede Scene Card Prompt-QC >= 8/10?
11. Besteht `validate:youtube-phase1`?

## Status

`READY`
