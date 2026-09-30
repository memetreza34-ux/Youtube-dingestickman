# Google Flow Prompting — History Visual System V2

## Ziel

Google Flow bekommt einen sauberen Copy-Paste-Prompt. Interne Planung und tatsächlicher Flow-Prompt bleiben strikt getrennt.

Vor dem finalen Flow-Prompt müssen `10-STYLE-DNA-V2.md`, `11-VISUAL-DIRECTOR.md` und `12-PROMPT-QC.md` angewendet worden sein.

## Goldene Regel

**Google Flow arbeitet in zwei getrennten Generierungsstufen.**

### STUFE 1 — nur Cover

1. `CHANNEL STYLE` einmal laden.
2. `VIDEO WORLD LOCK` einmal laden.
3. Exakten deutschen `COVER TEXT` laden.
4. **Nur drei Varianten von BILD 01 erzeugen.**
5. Alle drei Varianten müssen exakt denselben korrekt geschriebenen Cover-Text enthalten.
6. Danach **STOPPEN**.
7. Keine Bilder 02–NN erzeugen.
8. Google Flow darf keinen Cover-Gewinner selbst auswählen.
9. Auf die ausdrückliche Auswahl des Nutzers warten.

Der Nutzer entscheidet, welcher der drei Cover-Kandidaten verwendet wird.

### MANUELLER COVER-GATE

Nach den drei Cover-Kandidaten lautet der Status:

```text
WAITING_FOR_USER_COVER_SELECTION
```

Bis der Nutzer einen Kandidaten ausgewählt hat, ist jede weitere Bildgenerierung verboten.

Erst nach einer ausdrücklichen Nachricht wie `Cover 2 nehmen`, `das mittlere nehmen` oder einer gleichwertigen Auswahl darf Flow fortfahren.

Der ausgewählte Kandidat wird zu `Bild 01.png` und ist die visuelle Referenz für die weitere Produktion.

### STUFE 2 — restliche Bilder

Erst nach Nutzerfreigabe:

- ausgewählten Cover-Kandidaten als BILD 01 festhalten
- dessen Stil-/World-Lock als visuelle Referenz beibehalten
- BILD 02 bis BILD NN erzeugen
- Nicht-Cover-Bilder jeweils nur einmal erzeugen
- maximal fünf aktive Generierungen gleichzeitig

## Vorbedingung: Scene Card V2

Jeder Bildblock im Flow-Prompt muss vorher intern geplant worden sein mit mindestens:

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

Der finale Flow-Prompt zeigt diese Felder nicht als Formular.

## Prompt-Übersetzung

Beim Übersetzen der Scene Card in den natürlichen Prompt darf keine Kerninformation verloren gehen.

Besonders kritisch:

- `comparison` → beide Vergleichsseiten sichtbar
- `cause-effect` → Ursache und Folge sichtbar verbunden
- `process-sequence` → Zustandsänderung sofort lesbar
- `system-hierarchy` → Struktur räumlich verständlich
- `battle-city-overview` → räumliche Lage bleibt die Hauptidee

Ein Prompt ist nicht gut genug, wenn er nur Inventar aufzählt.

Unzureichendes Muster:

```text
Show X. Add Y. Keep X large. No visible text.
```

Ein guter Prompt regelt zusätzlich genug von:

- räumlicher Anordnung
- Handlung/Zustand
- Kamera
- Tiefe
- Blickführung
- Negativfläche
- Licht/Stimmung
- visueller Beziehung von Ursache/Folge oder Vergleich

## Cover-Regel

**BILD 01 ist immer Cover + erste Szene und enthält immer passenden deutschen Text.**

- ideal 2–5 Wörter
- passend zu Thema/Hook
- exakter Wortlaut im Prompt
- groß und sofort lesbar
- Hintergrund hell → dunkle Schrift
- Hintergrund dunkel → helle Schrift
- Hauptmotiv nicht verdecken
- kein zusätzlicher englischer Text
- keine Pseudo-Schrift
- Schreibfehler/unlesbarer Text = Kandidat verwerfen und neu erzeugen

## Finaler Flow-Prompt

Der echte Flow-Prompt enthält nur:

1. `ACTIVE_STYLE_ID`
2. `PROMPT_SYSTEM: visual-director-v2`
3. kurze Aufgabe
4. `CHANNEL STYLE`
5. `VIDEO WORLD LOCK`
6. `COVER TEXT`
7. `BILD 01` bis `BILD NN` als natürliche direkte Fließtext-Prompts
8. globale Regeln
9. Visual-Form-Fidelity-Regeln
10. zweistufige Generation Rules mit manuellem Cover-Gate

Interne Scene-Card-Felder bleiben außerhalb des finalen Flow-Prompts.

## Bildhierarchie

Intern weiterhin sicherstellen:

- ein Bild = eine Kernaussage
- ein dominantes Hauptmotiv
- höchstens 1–3 notwendige Nebenelemente
- keine Wimmelbilder
- keine Lehrbuch-/Museumstafeln
- große, YouTube-taugliche Formen
- wenige Elemente sind kein Ersatz für starke Komposition

## Text in Bildern

- **BILD 01:** deutscher Cover-Text ist Pflicht
- **BILD 02–NN:** standardmäßig kein sichtbarer Text
- außerhalb des Covers nur bei ausdrücklicher Notwendigkeit und exakt auf Deutsch

## Prompt-QC

Jeder Bildprompt muss vor Einbau in den Flow-Batch `12-PROMPT-QC.md` bestehen.

```text
Minimum: 8/10
```

Aussage-Treue, Visual-Form-Treue und Komposition dürfen nicht 0 Punkte haben.

## Qualitätscheck

1. Hat jedes Bild eine vollständige Scene Card V2?
2. Ist der Viewer Takeaway im finalen Prompt erhalten?
3. Ist die Visual Form erhalten?
4. Hat der Prompt konkrete Kompositions-/Kamerasprache?
5. Hat jeder Prompt mindestens 8/10 erreicht?
6. Sind genau drei Cover-Kandidaten vorgesehen?
7. Haben alle drei exakt denselben deutschen Cover-Text?
8. Muss Flow nach BILD 01 ausdrücklich stoppen?
9. Ist Nutzerwahl vor BILD 02 zwingend?
10. Bleibt der ausgewählte Cover-Look Referenz für die restlichen Bilder?
