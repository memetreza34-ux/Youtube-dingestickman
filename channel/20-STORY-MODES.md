# Story Modes V1 — Hauptfigur optional

## Grundsatz

**Das Thema entscheidet über die Erzählform. Die Pipeline darf keine Hauptfigur erzwingen.**

Alle neuen Produktionen wählen genau einen Story-Modus:

- `character-led`
- `event-led`
- `world-led`

Menschliche oder gesellschaftliche Stakes bleiben Pflicht. Das bedeutet aber ausdrücklich **nicht**, dass jedes Video eine benannte Hauptfigur braucht.

---

## 1. character-led

Eine wiederkehrende historische Person trägt die zentrale Handlung.

Geeignet für:

- politische Entscheidungen
- Fluchten
- Intrigen
- Feldzüge
- Entdeckungen
- Biografisch eng begrenzte Wendepunkte

Regeln:

- `mainCharacterRequired = true`
- Hauptfigur bleibt visuell wiedererkennbar
- keine erfundenen Gedanken oder Dialoge
- Nebenfiguren bleiben individuell
- die historische Bedeutung muss über reine Persönlichkeit hinausgehen

---

## 2. event-led

Ein konkretes Ereignis, eine Krise, ein Konflikt oder ein Ablauf trägt die Geschichte.

Beispiele:

- Belagerung
- Stadtbrand
- Aufstand
- Evakuierung
- Schiffskatastrophe
- Versorgungskrise
- militärischer Rückzug

Regeln:

- `mainCharacterRequired = false`
- verschiedene reale Gruppen oder wechselnde historische Menschen dürfen einzelne Beats tragen
- keine künstlich erfundene Hauptperson zur Emotionalisierung
- wiederkehrende reale Personen sind erlaubt, wenn sie historisch wichtig sind, aber nicht zwingend der Story-Anker
- die Chronologie des Ereignisses bleibt die Hauptachse

---

## 3. world-led

Eine historische Welt, ein Ort, System, Alltag, Infrastruktur, Technik oder Institution trägt das Video.

Beispiele:

- warum mittelalterliche Stadttore nachts geschlossen wurden
- wie ein römisches Marschlager funktionierte
- wie eine historische Stadt mit Wasser versorgt wurde
- wie Nachrichten ohne moderne Technik reisten
- wie Armeen versorgt wurden
- wie Menschen im Winter heizten
- wie Handel, Straßen, Grenzen oder Häfen funktionierten

Regeln:

- `mainCharacterRequired = false`
- stilisierte historische Menschen dürfen als **repräsentative Darsteller** eingesetzt werden
- diese Darsteller müssen nicht von Szene zu Szene dieselbe Person sein
- keine künstliche Figur wie „Hans der Händler“ erfinden, nur damit das Video persönlicher wirkt
- Menschen zeigen konkrete Nutzung, Arbeit, Risiko, Folgen und Maßstab
- Architektur, Karte, Objekt, Prozess, Ort und Menschen dürfen sich gleichberechtigt abwechseln
- das Video braucht trotzdem Entwicklung: Ausgangslage → Problem/Frage → Funktionsweise im historischen Kontext → sichtbare Folge/Bedeutung

---

## 4. Repräsentative historische Menschen

Bei `event-led` und `world-led` sind anonyme bzw. nicht benannte Figuren ausdrücklich erlaubt, wenn sie eine historische Rolle sichtbar machen.

Beispiele:

- Händler am Stadttor
- Wache auf der Mauer
- Arbeiter an einer Schleuse
- Soldaten beim Lagerbau
- Familie vor einem leeren Marktstand
- Seeleute beim Segelsetzen

Diese Menschen sind keine generischen Klone. Es gelten weiterhin alle Style-Regeln:

- historisch plausible Kleidung
- unterschiedliche Gesichter, Haare, Körperformen und Posen
- konkrete Tätigkeit statt dekoratives Herumstehen
- keine moderne Symbolik
- keine identischen Stock-Figuren

## 5. Human Stakes ohne Hauptfigur

`concreteHumanStakes` darf z. B. beziehen auf:

- eine Gruppe
- Stadtbevölkerung
- Bauern
- Händler
- Soldaten
- Arbeiter
- Reisende
- Familien
- eine Institution oder Gemeinschaft

Gültig:

> Wenn die Tore schließen, bleiben Händler und Reisende außerhalb der Stadt und müssen bis zum Morgen warten oder Schutz suchen.

Nicht nötig:

> Wir brauchen dafür einen erfundenen Händler namens Hans, der das ganze Video begleitet.

---

## 6. Auswahlregel

Vor dem Skript wird gefragt:

1. Trägt eine reale Person die Handlung wirklich? → `character-led`
2. Trägt ein konkretes Ereignis die Handlung? → `event-led`
3. Trägt eine historische Welt, Praxis, Infrastruktur oder ein System die Erklärung und Geschichte? → `world-led`

**Nie den Modus an das Template anpassen. Das Template passt sich dem Thema an.**

## 7. Visual-Regel

Bei `event-led` und `world-led` darf die Bildfolge stärker mit hochwertigen stilisierten Menschenillustrationen arbeiten, ohne eine globale Figurenkontinuität zu erzwingen.

Zum Beispiel:

```text
Ort / Übersicht
→ repräsentative Person bei konkreter Handlung
→ Objekt-Detail
→ Prozess
→ andere repräsentative Gruppe
→ Karte
→ sichtbare Folge im Alltag
```

Das ist erwünscht, solange jedes Bild exakt zur Narration passt und der Kanalstil konsistent bleibt.

## Definition of Done

Vor Produktion gilt:

- `storyMode` gewählt
- `mainCharacterRequired` passend zum Modus gesetzt
- `humanRepresentationPlan` beschrieben
- keine Hauptfigur künstlich erfunden
- menschliche / gesellschaftliche Stakes sichtbar
- Story Engine und Historical Story Core weiterhin vorhanden
- alle bisherigen Story-, Visual-, Chronologie-, Pacing-, Motion- und Asset-Gates bleiben gültig
