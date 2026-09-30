# History Image Prompt Template — Google Flow V2

Dieses Dokument definiert die Trennung zwischen **interner Bildplanung** und dem **finalen Google-Flow-Prompt**.

## 1. Interne Planung — Scene Card V2

Vor dem Schreiben eines finalen Prompts ist pro Bild eine Scene Card nach `11-VISUAL-DIRECTOR.md` Pflicht.

```text
Audio Anchor
Viewer Takeaway
Visual Purpose
Topic Anchor
Visual Form
Visual Concept
Dominant Subject
Action / State
Composition
Camera
Depth Plan
Lighting / Mood
Supporting Elements
Continuity Note
Historical Accuracy Note
Planned Hold
Prompt QC Score
```

Diese Informationen helfen beim Denken und Prüfen. Sie dürfen nicht 1:1 als Formular in den finalen `google-flow-prompt.txt` kopiert werden.

## 2. Prompt-Compiler-Reihenfolge

Der finale natürliche Bildprompt wird aus der Scene Card in dieser Reihenfolge gebaut:

```text
1. konkrete Bildidee / Hauptaussage
2. dominantes Motiv + Handlung/Zustand
3. räumliche Komposition
4. Kamera/Perspektive
5. Vordergrund / Mittelgrund / Hintergrund, wenn relevant
6. Licht/Stimmung/Farbakzent
7. notwendige historische Details
8. Continuity-Verweis
9. sichtbarer Text oder No-Text-Regel
```

Nicht jeder Punkt braucht einen eigenen Satz. Der Prompt soll natürlich lesen, aber die Bildregie muss konkret bleiben.

## 3. Finaler Flow-Prompt

Der finale Prompt soll wie eine klare Regieanweisung für einen Illustrator klingen.

### Grundformat

```text
COVER TEXT:
Use exactly this German cover text: "[2–5 Wörter]".

BILD 01
[natürlicher direkter Cover-Prompt; Bildidee + Komposition + Kamera + Stimmung + exakten Cover-Text integrieren]

BILD 02
[natürlicher direkter Bildprompt; Bildidee + Komposition + Kamera/Depth/Mood soweit nötig; kein sichtbarer Text]
```

## 4. Mindestqualität eines Einzelprompts

Ein finaler Prompt darf nicht nur sagen, **was** im Bild vorkommt. Er muss auch ausreichend erklären, **wie die Elemente zusammen die Aussage sichtbar machen**.

Unzureichend:

```text
Show a soldier at a campfire. Add one tent and the castle in the background. No visible text.
```

Stärker:

```text
Use a slightly low medium-wide view from behind one waiting royal soldier in the darker foreground, with his small campfire as the only warm accent. Leave a broad empty stretch of road across the middle ground before the intact pale castle walls rise in the distance, making patience and isolation the visual idea rather than attack. Keep one tent and the resting spear secondary. No visible text.
```

Die zweite Version definiert visuelle Beziehung, Tiefe, Kamera und Aussage — nicht nur Inventar.

## 5. Visual-Form-Treue

Der Prompt muss die gewählte Visual Form erhalten.

- `comparison`: beide Pole sichtbar und klar gegeneinandergestellt
- `cause-effect`: Ursache und Folge sichtbar verbunden
- `process-sequence`: Zustandsänderung klar lesbar
- `system-hierarchy`: räumliche Hierarchie/Beziehung sichtbar
- `battle-city-overview`: räumliche Lage bleibt Hauptaussage
- `object-focus`: Objekt bleibt Hauptträger der Aussage
- `character-scene`: Haltung, Handlung oder Beziehung trägt den Gedanken

Wenn die Form beim Schreiben verloren geht, Prompt zurückweisen.

## 6. Cover-Text — Pflicht

BILD 01 ist Cover + erste Szene und bekommt **immer** einen passenden kurzen deutschen Text.

Der Text:

- passt zum Thema/Hook des Videos
- ist idealerweise 2–5 Wörter lang
- wird exakt im Flow-Prompt angegeben
- bleibt bei allen drei Cover-Kandidaten identisch
- muss korrekt geschrieben sein
- ist groß und sofort lesbar
- verdeckt kein wichtiges Hauptmotiv
- erhält je nach Hintergrund automatisch starken Kontrast: hell auf dunkel oder dunkel auf hell
- darf bei Bedarf einen dezenten Rand/Schatten besitzen

Keine zweite Textzeile mit Zusatzinformationen, keine englischen Labels, keine Bildnummern, kein Logo und keine Pseudo-Schrift.

## 7. Was nicht in den finalen Prompt gehört

Nicht als Formular ausgeben:

```text
Viewer Takeaway:
Visual Purpose:
Visual Form:
Visual Concept:
Dominant Subject:
Supporting Elements:
Camera:
Depth Plan:
Continuity Note:
Prompt QC Score:
```

Die Inhalte dieser Felder müssen trotzdem im natürlichen Prompt wirksam werden.

## 8. Gemeinsamer Style-Block

Der Channel Style wird pro Batch **nur einmal** vor den Einzelbildern angegeben.

Er enthält knapp:

- 2D hand-drawn historical explainer style
- expressive historical stickman family, falls Figuren benötigt werden
- clean dark ink outlines
- muted historical colors
- flat colors
- subtle cel shading
- light ink/paper texture
- mature, not childish
- gleiche Zeichenlogik für Figuren, Architektur, Karten und Objekte
- Detailhierarchie nach `10-STYLE-DNA-V2.md`
- kein Photorealismus, 3D, Anime, Pixar oder painterly realism

## 9. Video World Lock

Ebenfalls nur einmal pro Video/Batch definieren:

- wiederkehrende Orte
- Architektur/Silhouetten
- wiederkehrende Räume
- wiederkehrende Figurenmerkmale
- wichtige Props
- Grundfarbigkeit, Wetter und Zeitlogik

Danach in Einzelprompts einfach auf `the same ...` verweisen.

## 10. Einzelbild-Regeln

Intern gilt weiterhin:

- genau eine Kernaussage
- genau ein dominantes Hauptmotiv
- maximal 1–3 unterstützende Elemente
- Hauptmotiv groß genug für YouTube
- keine Wimmelbilder
- keine Museumstafel-/Schulbuchposter-Ästhetik
- keine unnötigen Querschnitte oder Collagen
- bei zwei gleich wichtigen Aussagen lieber zwei Bilder
- wenige Elemente sind kein Ersatz für starke Komposition

## 11. Textregel

```text
BILD 01: exact short German cover text REQUIRED.
BILD 02–NN: no visible text by default.
```

Außerhalb des Covers darf sichtbarer Text nur bei ausdrücklicher Notwendigkeit vorkommen und muss dann exakt auf Deutsch vorgegeben sein.

## 12. Prompt-QC

Jeder Prompt wird nach `12-PROMPT-QC.md` bewertet.

```text
Minimum: 8/10
```

Aussage-Treue, Visual-Form-Treue oder Komposition dürfen nicht 0 Punkte erhalten.

## 13. Freigabe

Der finale `google-flow-prompt.txt` ist erst fertig, wenn:

1. er direkt in Google Flow kopiert werden kann,
2. keine internen Planungslabels mehr sichtbar sind,
3. Style und World Lock einmalig definiert sind,
4. BILD 01 einen passenden 2–5-Wort-Covertext auf Deutsch besitzt,
5. jeder Bildblock eine konkrete visuelle Idee statt nur eine Inventarliste enthält,
6. Visual Form und Viewer Takeaway aus der Scene Card erhalten bleiben,
7. Komposition/Kamera/Depth/Mood die Aussage ausreichend konkret machen,
8. wiederkehrende Elemente konsistent bleiben,
9. BILD 02–NN keinen unnötigen sichtbaren Text enthalten,
10. jeder Bildprompt Prompt-QC >= 8/10 erreicht.
