# History Image Prompt Template — Flow Compiler V3 / Pipeline V4

## Zweck

Beschreibt, wie eine geprüfte Scene Card in den finalen Google-Flow-Prompt übersetzt wird.

Der finale Prompt wird nicht manuell geschrieben.

```bash
npm run build:youtube-flow -- --dir "youtube/<week>/<slug>"
```

## Eingaben

```text
99-technik/video.json
99-technik/BILD_AUDIO_ZUORDNUNG.json
99-technik/FLOW_WORLD_LOCK.json
config/flow-style-lock.json
```

## Narration-first vor Prompting

Bevor ein Prompt kompiliert wird, muss bereits entschieden sein:

```text
Was sagt der Sprecher genau jetzt?
→ Was muss der Zuschauer verstehen?
→ Welches visuelle Mittel zeigt das am besten?
→ erst dann Visual Concept + Visual Form
```

Ein generisches Figurenbild ist kein zulässiger Ersatz für eine bessere Karte, Objektansicht, Prozessdarstellung, Übersicht oder andere passendere Form.

## Scene Card V2

```text
viewerTakeaway
visualPurpose
topicAnchor
visualForm
visualConcept
dominantSubject
actionState
composition
camera
depthPlan
lightingMood
supportingElements
continuityNote
historicalAccuracyNote
promptQcScore
```

## Compiler-Reihenfolge pro Bild

```text
1. Style Anchor
2. Visual Concept
3. Dominant Subject + Action/State
4. Composition
5. Camera
6. Depth Plan
7. Lighting / Mood
8. Supporting Elements
9. Visual-Form-Guard
10. Continuity
11. Historical Accuracy
12. Cover-Text oder No-Text-Regel
```

Der natürliche Prompt enthält keine Formularüberschriften.

## Figuren

Der aktuelle Style Anchor verlangt:

- stilisierte, menschlich lesbare historische Menschen
- keine generischen identischen Stickman-Klone
- wiederkehrende Figuren konsistent
- prominente unterschiedliche Personen sichtbar individualisiert

Individualität kann entstehen über:

- Alterseindruck
- Gesicht
- Haare/Bart
- Kopfbedeckung
- Größe/Statur
- Kleidungssilhouette
- Ausrüstung
- Haltung/Geste

## Visual-Form-Guards

### `comparison`
Beide Vergleichspole sichtbar.

### `cause-effect`
Ursache und Folge sichtbar verbunden.

### `process-sequence`
Ablauf/Zustandsänderung sofort lesbar.

### `system-hierarchy`
Struktur räumlich statt Corporate-Diagramm.

### `battle-city-overview`
Räumliche Lage bleibt Hauptaussage.

### `object-focus`
Objekt trägt den Beat; Hintergrund sekundär.

### `character-scene`
Handlung/Haltung/Beziehung trägt die Aussage; prominente unrelated characters nicht klonen.

### `multi-moment-illustration`
Nur 2–3 eng zusammenhängende Momente, ein Takeaway, eindeutige Leserichtung.

### `detail-inset`
Eine dominante Hauptszene + genau ein untergeordnetes vergrößertes Detail. Keine Beschriftungstafel.

### `cutaway-section`
Verborgene räumliche Struktur über einen einfachen Schnitt sichtbar machen. Außenkontext erhalten.

### `evidence-reconstruction`
Ein historisches Indiz/Objekt/Fragment mit einer stilisierten Rekonstruktion verbinden; Unsicherheit nicht verschleiern.

## Style Anchor

Der lange Channel Style steht einmal im Master-Prompt. Vor jedem BILD wird derselbe kompakte Style Anchor wiederholt.

Er fixiert Rendering-DNA, **nicht** konkrete Kamera, Komposition oder identische Personendesigns.

## Style-Drift-Sperre

Vermeiden/blockiert:

```text
cinematic
epic
ultra detailed
hyper detailed
photographic
realistic lighting
depth of field
bokeh
```

Konkrete Regie verwenden.

## Supporting Elements

Bei normalen Einzelmomenten maximal drei. Jedes Element braucht eine Funktion:

- Ursache
- Folge
- Maßstab
- Epoche/Ort
- Blickführung
- Kontinuität

## Cover

BILD 01:

- 2–5 deutsche Wörter ideal
- exakt aus `video.json`
- gut lesbar
- hoher Kontrast
- Hauptmotiv frei
- keine zweite Textzeile / Bildnummer / Logo

## BILD 02–NN

Explizite No-Text-Regel:

```text
No visible text, labels, letters, numbers, logos, watermarks or pseudo-writing anywhere in the image.
```

Auch Detail-Inset, Cutaway und Evidence-Reconstruction standardmäßig ohne Labels.

## World Lock

Mindestens:

```text
status: READY
settingName
settingDescription
```

Wiederkehrende Figuren müssen ihre individuellen Identitätsmerkmale behalten. Nicht wiederkehrende Personen dürfen und sollen variieren.

## Prompt-QC

Nur Scene Cards mit:

```text
8 <= promptQcScore <= 10
```

Ein schwaches Visual Concept wird nicht durch mehr Promptwörter repariert.

## Finaler Master-Prompt

Enthält automatisch:

```text
ACTIVE_STYLE_ID
PROMPT_SYSTEM
NARRATION-FIRST RULE
CHANNEL STYLE — IMMUTABLE
STYLE CONSISTENCY RULE
VIDEO WORLD LOCK
COVER TEXT
BILD 01 ... BILD NN
GLOBAL NEGATIVE STYLE RULE
GLOBAL COMPOSITION RULES
TEXT RULE
TWO-STAGE COVER GATE
```

## Nachträgliche Änderungen

Nicht `google-flow-prompt.txt` direkt editieren.

```text
Scene Card / World Lock / Cover / Style Lock ändern
→ Prompt-QC
→ build:youtube-flow
→ validate:youtube-phase1
```
