# Visual Interest QC — Hard Gate V1

## Zweck

Ein Bild darf nicht nur historisch korrekt und zum Satz passend sein. Es muss den gesprochenen Beat **visuell interessant, klar und sofort lesbar** unterstützen.

Der Standard lautet nicht:

> Passt das Motiv irgendwie zum Text?

Sondern:

> Ist das die stärkste, klarste und interessanteste visuelle Umsetzung dieses Story-Beats?

---

## 1. Visual-Interest-Pflicht pro Bild

Jede neue Scene Card braucht für neue Produktionen zusätzlich:

- `shotScale`
- `visualEnergyDevice`
- `visualChangeFromPrevious`
- `visualInterestScore`
- `visibleTextPolicy`

`visualInterestScore` muss mindestens **8/10** betragen.

Ein Bild mit korrektem Inhalt, aber langweiliger Standardinszenierung, besteht die Prüfung nicht.

---

## 2. Was ein Bild interessant machen darf

Mindestens ein bewusstes visuelles Mittel soll den Beat tragen. Beispiele:

- klare Bewegungsrichtung
- starke Tiefenstaffelung Vordergrund → Mittelgrund → Hintergrund
- Größenkontrast
- räumliche Falle / Blockade
- asymmetrische Komposition
- starke Silhouette
- Nahdetail statt erneutem Figurenbild
- extreme Übersicht statt erneutem Medium Shot
- Vorher/Nachher
- Ursache/Folge im selben Bild
- Objekt-Makro
- Cutaway
- Detail-Inset
- sichtbare Reaktion
- Enthüllung / Reveal
- Negativraum mit klarer Funktion
- Blickrichtung, die durch das Bild führt
- bewusstes Hell/Dunkel- oder Warm/Kalt-Gefälle innerhalb der gedeckten Kanalpalette

Das Mittel muss zum Inhalt passen. Keine zufällige Effekthascherei.

---

## 3. Verbotene Langeweile-Muster

Für neue Produktionen gelten als Warn- bzw. Ablehnungsmuster:

- drei ähnliche Character Scenes hintereinander
- drei gleiche Shot-Größen hintereinander
- wiederholt frontale Figuren auf Augenhöhe
- wiederholt Person links + Person rechts + neutraler Hintergrund
- wiederholt stehende Person ohne sichtbare Handlung
- mehrere Bilder hintereinander, die nur andere Dialogsituationen darstellen
- Karte als Füllbild ohne geografische Aussage
- Objektbild ohne erklärende Funktion
- dekorative Menschen, die nichts zum Beat beitragen
- gleiche Hauptfigur in fast identischer Pose und Bildgröße ohne Continuity-Grund

### Harte Sequenzrichtwerte für neue Projekte

- maximal **2 gleiche Visual Forms hintereinander**
- maximal **2 Character Scenes hintereinander**
- maximal **2 gleiche Shot Scales hintereinander**
- in einem Fenster von 10 Bildern normalerweise mindestens **3 verschiedene Visual Forms**

Bewusste Vorher/Nachher- oder Continuity-Paare dürfen ähnlich sein. Die Ähnlichkeit muss dann in `visualChangeFromPrevious` ausdrücklich begründet werden.

---

## 4. Shot Scale

Erlaubte Standardwerte:

- `extreme-wide`
- `wide`
- `medium-wide`
- `medium`
- `close`
- `detail`
- `top-down`
- `elevated-overview`
- `sectional`

Die Kamera darf zusätzlich konkret beschrieben werden. `shotScale` existiert nur, damit die Sequenz als Ganzes auf Monotonie geprüft werden kann.

---

## 5. Figurenbilder

Character Scenes sind erlaubt und wichtig, aber nicht der Default.

Ein Figurenbild braucht mindestens eines:

- konkrete Handlung
- klare Machtbeziehung
- sichtbare Reaktion
- räumliches Problem
- Entscheidung
- körperliche Arbeit
- Interaktion mit einem zentralen Objekt

Nur „Person steht da und schaut“ reicht normalerweise nicht.

Bei Gesprächen darf nicht jede Aussage als neues Medium-Two-Shot umgesetzt werden. Stattdessen prüfen:

- Reaktion als Close-up?
- wichtiges Objekt?
- räumliche Folge?
- Vergleich?
- Ursache/Wirkung?
- Übersicht?
- Detail?

---

## 6. Weirdness-/Plausibilitätscheck

Vor Freigabe eines generierten Bildes prüfen:

- wirken Gesicht oder Pose unbeabsichtigt albern?
- wirken Hände, Körper oder Interaktion unverständlich?
- ist die historische Situation glaubwürdig?
- erzeugt die Komposition einen unfreiwillig komischen Eindruck?
- sehen Nebenfiguren wie Klone aus?
- ist das Hauptmotiv sofort erkennbar?
- wirkt das Bild wie ein Poster, Meme oder eine Infografik statt wie eine History-Illustration?

Bei JA zu einem negativen Punkt: Bild neu generieren, **bevor Phase 2 freigegeben wird**.

---

## 7. Harte Text-Sperre

### Bild 01

Erlaubt ist **nur** der exakt vorgegebene Cover-Text.

Verboten sind zusätzlich:

- `Bild 01`
- `BILD 01`
- `Image 01`
- `Scene 01`
- Untertitel
- Überschrift zusätzlich zum Cover
- Labels
- Bildunterschriften
- Logo
- Wasserzeichen
- Pseudo-Schrift

### Bild 02 bis Bild NN

**Null sichtbarer Text.**

Das umfasst ausdrücklich:

- Bildnummern
- interne Prompt-IDs
- Überschriften
- Kartenlabels
- Erklärtexte
- Zahlen
- Logos
- Wasserzeichen
- Pseudo-Schrift

Die Bezeichnungen `BILD 01`, `BILD 02` usw. sind **nur interne Prompt-Metadaten** und dürfen niemals Teil des erzeugten Bildes werden.

---

## 8. Phase-2-Visual-QC

Neue Produktionen müssen vor Phase 3 eine Datei besitzen:

`99-technik/PHASE2_VISUAL_QC.json`

Jedes finale Bild wird dort einzeln freigegeben.

Pflicht pro Bild:

- Narration passt zum Bild
- Visual Interest mindestens 8/10
- Style Consistency mindestens 8/10
- keine unbeabsichtigte Weirdness
- keine sichtbare Bildnummer
- kein unerwarteter Text
- keine Pseudo-Schrift
- Bild freigegeben

Für Bild 01 wird zusätzlich geprüft, dass der sichtbare Text exakt dem Cover-Text entspricht.

Für Bild 02–NN muss `visibleTextDetected=false` gelten.

Ohne vollständig freigegebenes Visual-QC darf Phase 3 nicht starten.

---

## Kurzformel

```text
Beat verstehen
→ bestes visuelles Mittel wählen
→ interessanten visuellen Mechanismus festlegen
→ klar andere Einstellung zum vorherigen Bild planen
→ generieren
→ Weirdness/Text/Passung prüfen
→ erst dann freigeben
```
