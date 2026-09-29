# Google Flow Prompting — History Visual System V1.4

## Ziel

Google Flow bekommt einen sauberen Copy-Paste-Prompt. Interne Planung und tatsächlicher Flow-Prompt bleiben strikt getrennt.

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
2. kurze Aufgabe
3. `CHANNEL STYLE`
4. `VIDEO WORLD LOCK`
5. `COVER TEXT`
6. `BILD 01` bis `BILD NN` als natürliche direkte Fließtext-Prompts
7. globale Regeln
8. **zweistufige Generation Rules mit manuellem Cover-Gate**

Interne Felder wie Audio Anchor, Visual Purpose, Visual Form, Supporting Elements, Planned Hold oder QC bleiben außerhalb des finalen Flow-Prompts.

## Bildhierarchie

Intern weiterhin sicherstellen:

- ein Bild = eine Kernaussage
- ein dominantes Hauptmotiv
- höchstens 1–3 notwendige Nebenelemente
- keine Wimmelbilder
- keine Lehrbuch-/Museumstafeln
- große, YouTube-taugliche Formen

## Text in Bildern

- **BILD 01:** deutscher Cover-Text ist Pflicht
- **BILD 02–NN:** standardmäßig kein sichtbarer Text
- außerhalb des Covers nur bei ausdrücklicher Notwendigkeit und exakt auf Deutsch

## Qualitätscheck

1. Sind genau drei Cover-Kandidaten vorgesehen?
2. Haben alle drei exakt denselben deutschen Cover-Text?
3. Muss Flow nach BILD 01 ausdrücklich stoppen?
4. Ist Nutzerwahl vor BILD 02 zwingend?
5. Darf Flow niemals selbst einen Gewinner auswählen?
6. Bleibt der ausgewählte Cover-Look Referenz für die restlichen Bilder?
7. Sind die übrigen Bildprompts natürlich und direkt formuliert?
