# Prompt QC V2 — Freigabe vor Google Flow

## Zweck

Ein formal vollständiger Prompt ist nicht automatisch ein guter Prompt. Jeder finale Bildprompt wird deshalb gegen die interne Scene Card geprüft.

## Score

Maximal 10 Punkte.

### 1. Aussage-Treue — 0 bis 2

**2:** Die geplante Viewer-Aussage ist sofort und vollständig sichtbar.

**1:** Die Aussage ist grundsätzlich vorhanden, aber abgeschwächt oder indirekt.

**0:** Der Prompt zeigt nur verwandte Motive oder verliert einen wichtigen Teil der Aussage.

### 2. Visual-Form-Treue — 0 bis 2

**2:** Die gewählte Visual Form ist klar umgesetzt.

**1:** Form ist erkennbar, aber nicht konsequent.

**0:** Die Form wurde beim Schreiben des Prompts praktisch verloren.

Beispiel: Ein geplanter `comparison` mit zwei Seiten wird zu einem einzelnen Wagenmotiv → 0 Punkte.

### 3. Komposition und Blickführung — 0 bis 2

**2:** Dominantes Motiv, räumliche Anordnung und Blickführung sind konkret geregelt.

**1:** Hauptmotiv ist genannt, aber Komposition bleibt generisch.

**0:** Reine Inventarliste ohne Bildregie.

### 4. Kamera, Tiefe und Stimmung — 0 bis 2

**2:** Kamera/Perspektive sowie räumliche Tiefe oder Licht/Stimmung unterstützen die Aussage konkret.

**1:** Nur teilweise konkret.

**0:** Keine erkennbare Regie.

### 5. Stil, Kontinuität und historische Plausibilität — 0 bis 1

**1:** Style Lock, World Lock und relevante historische Details sind sauber erhalten.

**0:** Stilbruch, Continuity-Verlust oder unnötig riskante historische Erfindung.

### 6. Modellklarheit — 0 bis 1

**1:** Prompt ist eindeutig, direkt, ohne widersprüchliche Anforderungen und ohne unnötige Prompt-Suppe.

**0:** Mehrdeutig, überladen oder widersprüchlich.

## Mindestanforderung

```text
PASS = 8/10 oder höher
```

Zusätzlich gilt:

- Aussage-Treue darf niemals 0 sein.
- Visual-Form-Treue darf niemals 0 sein.
- Komposition darf niemals 0 sein.

Ein 8/10-Prompt mit einem dieser Nullwerte wird trotzdem abgelehnt.

## Pflichtprüfung gegen Scene Card

Vor Freigabe werden mindestens diese Paare verglichen:

```text
Viewer Takeaway ↔ finaler Prompt
Visual Form ↔ finaler Prompt
Visual Concept ↔ finaler Prompt
Dominant Subject ↔ finaler Prompt
Composition ↔ finaler Prompt
Camera ↔ finaler Prompt
Continuity Note ↔ finaler Prompt
```

## Typische Ablehnungsgründe

Prompt neu schreiben, wenn:

- nur Gegenstände aufgezählt werden
- `comparison` nur eine Seite zeigt
- `cause-effect` Ursache oder Folge verliert
- ein geplanter Zustandswechsel nicht auf denselben Ort/Blickwinkel zurückgreift
- die Kamera rein generisch bleibt
- Hauptmotiv zu klein oder zu weit im Hintergrund wäre
- zu viele gleich wichtige Motive konkurrieren
- Atmosphäre die Lesbarkeit zerstört
- Stilwörter nur angehängt werden, ohne dass die Szene zur Kanalwelt passt
- historische Spektakel-Details erfunden werden

## Qualitätsziel

Der Standard ist nicht:

> Kann Google Flow daraus irgendein korrektes Bild erzeugen?

Sondern:

> Kann Google Flow daraus mit hoher Wahrscheinlichkeit genau die starke visuelle Aussage erzeugen, die für diesen Satz geplant wurde?
