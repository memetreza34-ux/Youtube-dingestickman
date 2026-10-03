# Direction, Color, Pacing & Motion Gate V1

## Zweck

Dieses Gate verhindert drei Fehler, die in fertigen Testvideos sichtbar wurden:

1. eine über das ganze Video fast identische beige-blau-grüne Bildwelt,
2. hektische 0,8–1,5-s-Bildwechsel neben 7–11-s-Standbildern,
3. mechanische Zoom-/Pan-Bewegungen, die nur nach Bildnummer rotieren.

Neue Projekte aktivieren dieses Gate über `directionQualityGateVersion=1`.

---

## 1. Color / World Arc

Pflichtdatei:

`99-technik/COLOR_WORLD_ARC.json`

Ein Video bekommt normalerweise 3–7 Story-Abschnitte. Jeder Abschnitt definiert:

- Story-Funktion
- Bildbereich
- Palette Bias
- Licht
- Atmosphäre / Wetter
- sichtbare Welt-Lebendigkeit
- Kontrastfunktion zum vorherigen Abschnitt

Gleicher Zeichenstil bedeutet ausdrücklich **nicht** gleiche Farbe, gleicher Himmel, gleicher Horizont oder gleiche Lichtstimmung in jedem Bild.

Beispiel:

```text
ruhiger trockener Anfang
→ wärmer, heller, belebter

Angriff / Krise
→ stärkere Rot-/Braun-Akzente, dichterer Himmel, höherer Kontrast

Flutung / Verlust
→ kühlere Blau-/Grauwerte, Nässe, Spiegelungen, Schlamm

Verteidigung / Stabilisierung
→ klarere Formen, Boote, Wachen, aktive Menschen
```

Die Palette folgt der Geschichte. Sie darf nicht zu zufälligem Farbwechsel werden.

---

## 2. Lived-in World

Jede Scene Card braucht `worldLifeDetail`.

Geeignete Details:

- Wind in Kleidung, Gras, Schilf oder Fahnen
- Wasserwellen oder Spiegelungen
- Schlamm, Radspuren, nasse Straßen
- Rauch, Staub, Wetter
- Werkzeuge in Benutzung
- Tiere, Wagen, Boote
- kleine Arbeits- und Alltagsdetails
- nasse Kleidung, beschädigte Felder, Waren, Gepäck

Ziel: Die Welt soll bewohnt und materiell wirken, aber nicht überladen.

`worldLifeDetail` darf nie ein Vorwand für unnötige Supporting Elements sein.

---

## 3. Semantic Pacing

Für neue Projekte gelten nach dem echten Audio-Alignment:

- Hard-Minimum Inhalts-Hold: **2,2 s**
- bevorzugt: **2,7–4,5 s**
- wichtige Beats: bis **5,5 s**
- absolutes Maximum: **6,0 s**
- End-Hold wird getrennt von der Inhaltsdauer behandelt
- echte Dauer darf normalerweise höchstens **1,6 s** vom geplanten Hold abweichen

Unter 2,2 s ist ein Hard Fail. Dann Beat/Mappings zusammenlegen oder neu koordinieren.

Über 4,5 s ist nur bei `emphasis`, `reveal` oder `payoff` sinnvoll. Sehr lange Holds brauchen `holdReason`.

Jede Scene Card plant:

```text
beatImportance
plannedHoldSeconds
holdReason
```

Der Durchschnitt allein ist kein Qualitätsnachweis.

---

## 4. Motion Director

Indexbasierte Preset-Rotation ist verboten.

Jede neue Scene Card plant:

```text
motionType
motionDirection
motionIntensity
motionFocus
motionReason
```

Erlaubte Grundtypen:

- `static`
- `push-in`
- `pull-out`
- `pan`
- `drift`

Bewegung muss aus Bildinhalt oder Narration begründet sein.

Beispiele:

- Karte → langsamer Push auf relevanten Raum
- Marschierende Armee → Pan in Bewegungsrichtung
- Schleuse → Push auf Mechanik / Aktion
- weite Landschaft → statisch oder sehr langsamer Pull-out
- Reaktion einer Person → subtiler Push-in

Der Renderer normalisiert Bewegungsstrecken an die echte Szenendauer. Ein kurzer Shot darf nicht dieselbe Strecke in halber Zeit zurücklegen wie ein langer Shot.

---

## 5. Bewegungsverteilung

Richtwert für neue Produktionen:

- **20–35 %** statisch / praktisch statisch
- Mehrheit: subtile Bewegung
- höchstens **25 %** `moderate`
- maximal 2 gleiche Motion Types hintereinander

Bewegung ist ein erzählerisches Werkzeug, kein Pflicht-Effekt.

---

## 6. Technische Gates

Vor Flow-Build:

- `COLOR_WORLD_ARC.json` muss READY sein
- alle Bilder müssen einem Arc-Abschnitt zugeordnet sein
- Motion-/Pacing-Felder müssen vollständig sein
- Motion-Verteilung muss zulässig sein
- geplante Holds müssen zulässig sein

Nach Audio-Alignment:

- `validate:youtube-pacing` prüft echte Inhaltsdauer
- letzter End-Hold wird nicht als Story-Hold fehlinterpretiert
- zu kurze/zu lange Bilder blockieren Phase 3
- große Abweichungen vom geplanten Hold blockieren

Timeline:

- Motion kommt aus der Scene Card
- Motion-Geschwindigkeit ist dauer-normalisiert
- `motionFocus` steuert den Transform-Ursprung
- keine Bildnummer-Preset-Rotation

---

## Kurzformel

```text
Story-Abschnitte definieren
→ Color/World Arc festlegen
→ pro Bild Lived-in Detail
→ pro Beat sinnvollen Hold planen
→ pro Bild Motion-Zweck/Fokus planen
→ Flow generiert die passende Bildwelt
→ Audio-Alignment misst echte Dauer
→ Semantic Pacing blockiert Fehlrhythmus
→ Motion Director rendert in passender Geschwindigkeit
```
