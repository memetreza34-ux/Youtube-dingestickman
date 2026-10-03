# Kanal-Gehirn / Brain Index

Diese Dateien sind die dauerhafte Wissensbasis für den Geschichts-Kanal.

## Autorität

Bei Widersprüchen gilt:

1. neueste ausdrückliche Nutzerentscheidung
2. `channel/99-DECISION-LOG.md`
3. kanalspezifische Dateien unter `channel/`
4. `config/channel-policy.json`
5. `config/topic-policy.json`
6. `config/visual-policy.json`
7. `config/narration-alignment-policy.json`
8. `config/direction-policy.json`
9. `config/pipeline.json`
10. alte Beispiele

Für die Bildwelt zusätzlich:

```text
config/flow-style-lock.json
→ channel/10-STYLE-DNA-V2.md
→ channel/06-VISUAL-SYSTEM.md
→ channel/07-VISUAL-GRAMMAR.md
→ channel/15-VISUAL-INTEREST-QC.md
→ channel/17-WHOLE-VIDEO-COHERENCE-GATE.md
→ channel/18-NARRATION-ALIGNMENT-GATE.md
→ channel/19-DIRECTION-PACING-MOTION-GATE.md
→ Scene Card
```

Der technische Style-ID `history-stickman-adaptive-v1` ist ein Legacy-Name. Er bedeutet keine generischen Stickman-Klone.

## Preproduction

Neue Projekte starten als `preproduction-review` und brauchen `TOPIC_SCORECARD.json` + `STORY_QC.json`.
Topic Director V3 verlangt konkrete Story Core, Stakes, Ereignisverlauf, Quellen und verbietet mechanism-only Themen als automatische Produktionswahl.

## Script-first

```text
Recherche
→ vollständiger natürlicher Voice-over-Fließtext
→ Read-aloud-QC
→ STORY_QC
→ erst danach Story-Beats und Visuals
```

Nicht zulässig: erst Bilder planen und danach pro Bild einen Satz schreiben.

## Whole-Video-Coherence

Neue Projekte führen `99-technik/WHOLE_VIDEO_QC.json`.
Pflicht sind u. a. Fließtext, Script-first, kohärente Bildfolge, begrenzter Erklärbild-Anteil, sinnvolle Übergänge und Gesamt-Kohärenz >= 8/10.

WHOLE_VIDEO_QC Schema V4 prüft zusätzlich:

- Color/World Arc als Gesamtentwicklung
- benachbarte Farb-/Lichtabschnitte sind sichtbar verschieden
- historische Welt wirkt bewohnt statt steril
- Semantic-Pacing-Plan wurde geprüft
- Motion-Plan wurde geprüft
- Motion unterstützt Narration und wiederholt sich nicht mechanisch

## Narration Alignment & Chronology

Maßgeblich: `channel/18-NARRATION-ALIGNMENT-GATE.md` und `config/narration-alignment-policy.json`.

Jede Scene Card benötigt:

```text
narrationBeat
timeContext
chronologyStep
visualAnswer
narrationMatchScore >= 9
clarityScore >= 8
```

Neue Projekte sind standardmäßig streng chronologisch. Spätere Ereignisse dürfen nicht vorzeitig im Bild auftauchen.

## Direction / Color / Pacing / Motion

Maßgeblich: `channel/19-DIRECTION-PACING-MOTION-GATE.md` und `config/direction-policy.json`.

Neue Projekte aktivieren automatisch:

```text
directionQualityGateVersion = 1
colorWorldArcGateVersion = 1
semanticPacingGateVersion = 1
motionDirectorVersion = 1
```

Pflichtdatei:

```text
99-technik/COLOR_WORLD_ARC.json
```

Jede neue Scene Card plant zusätzlich:

```text
colorArcSection
worldLifeDetail
beatImportance
plannedHoldSeconds
holdReason
motionType
motionDirection
motionIntensity
motionFocus
motionReason
```

Pacing nach echtem Audio-Alignment:

- Hard-Minimum Inhalt: 2,2 s
- bevorzugt: 2,7–4,5 s
- wichtige Beats bis 5,5 s
- absolutes Maximum: 6,0 s
- End-Hold wird getrennt vom Story-Hold behandelt
- starke Abweichung zwischen geplantem und echtem Hold blockiert Phase 3

Motion:

- keine indexbasierte Preset-Rotation
- 20–35 % statisch / praktisch statisch
- überwiegend subtile Bewegung
- höchstens 25 % `moderate`
- Motion-Geschwindigkeit wird an echte Szenendauer normalisiert
- Fokus kann links/rechts/oben/unten liegen

Color/World Arc:

- gleicher Zeichenstil bedeutet nicht gleiche Palette, gleichen Himmel oder gleiche Lichtstimmung
- Story-Abschnitte verändern Palette, Licht, Wetter und Welt-Lebendigkeit bewusst
- jede Szene bekommt mindestens ein konkretes `worldLifeDetail`

## Zentrale Dateien

- `02-TOPIC-SYSTEM.md` — Topic Director V3
- `03-SCRIPT-BIBLE.md` — Script-first
- `04-RESEARCH-POLICY.md` — Quellen / Unsicherheit
- `05-VIDEO-BLUEPRINT.md` — Produktionspfad
- `06-VISUAL-SYSTEM.md` — Narration-first Bildwelt
- `07-VISUAL-GRAMMAR.md` — Visual Form pro Beat
- `08-FLOW-PROMPTING.md` — Flow / Cover Gate
- `09-IMAGE-PROMPT-TEMPLATE.md` — Promptstruktur
- `10-STYLE-DNA-V2.md` — Style DNA
- `11-VISUAL-DIRECTOR.md` — Scene Cards
- `12-PROMPT-QC.md` — Prompt-QC
- `13-PREPRODUCTION-QUALITY-GATE.md` — Preproduction
- `14-PHASE3-ASSET-LOCK.md` — read-only Bilder
- `15-VISUAL-INTEREST-QC.md` — Anti-Monotonie
- `16-STORY-QUALITY-GATE.md` — Story Quality
- `17-WHOLE-VIDEO-COHERENCE-GATE.md` — Gesamtsequenz
- `18-NARRATION-ALIGNMENT-GATE.md` — Bild-Skript-Passung + Chronologie
- `19-DIRECTION-PACING-MOTION-GATE.md` — Color Arc + Semantic Pacing + Motion Director
- `99-DECISION-LOG.md` — Entscheidungen

## Maschinenlesbare Kernquellen

```text
config/channel-policy.json
config/topic-policy.json
config/visual-policy.json
config/narration-alignment-policy.json
config/direction-policy.json
config/flow-style-lock.json
config/pipeline.json
```

## Verbindlicher Produktionspfad

```text
30+ Themenideen
→ 12er Shortlist
→ Duplicate Check
→ TOPIC_SCORECARD APPROVED
→ Recherche
→ Voice-over-Fließtext
→ Read-aloud-QC
→ STORY_QC APPROVED
→ Story Beats / Narration Alignment
→ Color/World Arc
→ Scene Cards mit Pacing + Motion
→ WHOLE_VIDEO_QC V4 APPROVED
→ Prompt QC / Visual Interest
→ FLOW_WORLD_LOCK READY
→ Direction + Narration Gates
→ Flow Compiler V3
→ Phase 1 Full
→ Google Flow
→ Phase 2 Visual QC + SHA-256
→ PHASE3_IMAGE_LOCK
→ Audio / Alignment
→ Semantic Pacing
→ Motion-directed Timeline
→ Remotion
→ FINAL_VIDEO + THUMBNAIL + CAPTION
```

## Bildregeln

Neue Produktionen:

- Visuals müssen zum aktuellen Narrations-Beat passen
- keine zukünftigen Zustände vorwegnehmen
- keine monotone Folge gleicher Visual Forms / Figurenbilder / Perspektiven
- nicht mehr als zwei reine Erklärbilder am Stück
- gleiche Stil-DNA, aber bewusst variierende Story-Palette, Licht, Wetter und Atmosphäre
- historische Welt mit konkreten, aber sparsamen Lebensdetails
- kontrollierter Redaktionstext nur bei echtem Nutzen
- interne Bildnummern, Prompt-Metadaten, Wasserzeichen und Pseudo-Schrift immer verboten

## Phase 3

Ab `PHASE3_IMAGE_LOCK` bleibt `00-bildprompts/images/` read-only. Asset-Fehler werden gemeldet, nicht automatisch repariert.

Den kompilierten `google-flow-prompt.txt` nicht manuell pflegen; Quelldaten ändern und neu bauen.
