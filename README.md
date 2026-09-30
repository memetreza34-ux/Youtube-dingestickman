# History YouTube Production System

Dieses Repository ist die **kanalspezifische Produktionsbasis für den Geschichts-Kanal**.

Die allgemeine technische Pipeline bleibt erhalten, ist hier aber um feste Kanal-DNA, Themenlogik, Recherche-, Skript-, Visual-Director- und Google-Flow-Regeln ergänzt.

## Wichtig: zuerst lesen

Das dauerhafte Kanal-Gehirn liegt unter `channel/`.

Empfohlene Reihenfolge für Menschen und KI-Agenten:

1. `channel/00-BRAIN-INDEX.md`
2. `channel/01-CHANNEL-DNA.md`
3. `channel/02-TOPIC-SYSTEM.md`
4. `channel/03-SCRIPT-BIBLE.md`
5. `channel/04-RESEARCH-POLICY.md`
6. `channel/05-VIDEO-BLUEPRINT.md`
7. `channel/06-VISUAL-SYSTEM.md`
8. `channel/07-VISUAL-GRAMMAR.md`
9. `channel/08-FLOW-PROMPTING.md`
10. `channel/09-IMAGE-PROMPT-TEMPLATE.md`
11. `channel/10-STYLE-DNA-V2.md`
12. `channel/11-VISUAL-DIRECTOR.md`
13. `channel/12-PROMPT-QC.md`
14. `channel/99-DECISION-LOG.md`

Maschinenlesbare Visual-Kernregeln:

- `config/visual-policy.json`
- `config/flow-style-lock.json`

## Technische Pipeline

```text
Thema
→ Recherche
→ Story Outline
→ Voice-over-Skript
→ Viewer Takeaway
→ Visual Concept
→ Visual Form
→ Composition / Camera / Mood
→ Anti-Gleichförmigkeitscheck
→ Prompt QC >= 8/10
→ READY Flow World Lock
→ Flow Compiler V3
→ Phase-1-Validator
→ Google-Flow-Bildgenerierung
→ finale Nutzer-Voice
→ Audio-Optimierung
→ Wort-/Anchor-Alignment
→ Timeline
→ Pacing-QC
→ Remotion-Render
→ Export-QC
```

Die technische Dokumentation liegt in `youtube/WORKFLOW.md`.

## Aktueller Kanalstatus

- Nische: Geschichte / Weltgeschichte
- Sprache: Deutsch
- Positionierung: **History × Storytelling × Curiosity**
- Erzählweise: spannende historische Fragen und Entwicklungen statt trockener Lexikon-Zusammenfassungen
- Themen-System: **V1 READY**
- Recherche-System: **V1 READY**
- Skript-System: **V1 READY**
- Grundbildwelt: **V1 READY**
- Visual Director: **V2 READY**
- Prompt-QC: **READY — Mindestscore 8/10**
- Google-Flow-Prompt-System: **Flow Compiler V3 READY**
- maschinenlesbarer Style Lock: **READY**
- kontrollierte Szenenvariation: **READY**
- feste globale Master-Referenzbilder: **NICHT VERWENDET**
- aktive Style-ID: `history-stickman-adaptive-v1`

## Bildwelt in einem Satz

Konsistente handgezeichnete 2D-History-Explainer-Welt mit ausdrucksstarken historischen Stickman-Figuren und gleichwertigen Nicht-Figuren-Visuals wie Karten, Architektur, Objekten, Systemen und Symbolbildern.

**Stil bleibt konstant; Inszenierung, Epoche, Stimmung, Perspektive und Visual-Form dürfen sich an den Inhalt anpassen.**

## Was Flow Compiler V3 löst

Früher konnte ein Agent die Bildwelt zwar lesen, den finalen Google-Flow-Prompt aber trotzdem frei interpretieren. Dadurch waren formal korrekte, aber stilistisch schwache oder driftende Prompts möglich.

V3 trennt deshalb strikt:

```text
CHANNEL STYLE LOCK
= wie der Kanal gezeichnet wird

VIDEO WORLD LOCK
= was innerhalb dieses Videos gleich bleiben muss

SCENE CARD
= was dieses einzelne Bild aussagen und zeigen soll
```

Der finale `google-flow-prompt.txt` wird daraus gebaut und nicht mehr frei improvisiert.

## Konsistenz ohne Gleichförmigkeit

Der Kanal verwendet **keine festen globalen Master-Referenzbilder**. Zu starke Referenzen können unbeabsichtigt nicht nur den Stil, sondern auch Kamerawinkel, Figurenhaltung und Komposition wiederholen.

Stattdessen fixiert `config/flow-style-lock.json` nur die Zeichen-DNA:

- Figurenproportionen
- Gesichtsvereinfachung
- Linienlogik
- Farb- und Schattierungslogik
- Textur
- Detailbudget
- kompakten Style Anchor pro Bild
- globale Negativregeln

Pro Szene dürfen bewusst variieren:

- Kameraabstand
- Perspektive
- Subject Placement
- Vordergrund/Mittelgrund/Hintergrund
- Negativraum
- Licht
- Wetter
- Tageszeit
- Stimmung
- Visual Form

Fast identische Blickwinkel werden nur genutzt, wenn sie für Vorher/Nachher oder andere echte Kontinuität sinnvoll sind.

## Flow World Lock

Jedes neue Video besitzt:

```text
99-technik/FLOW_WORLD_LOCK.json
```

Darin werden wiederkehrende Orte, Figuren, Props, lokale Farbigkeit und Zeit-/Wetterlogik definiert.

Vor dem Prompt-Build muss die Datei `READY` sein.

## Flow-Prompt bauen

Nach vollständigen Scene Cards und Prompt-QC:

```bash
npm run build:youtube-flow -- --dir "youtube/<week>/<slug>"
```

Danach:

```bash
npm run validate:youtube-phase1 -- --dir "youtube/<week>/<slug>"
```

Der erzeugte `google-flow-prompt.txt` ist ein **Build-Artefakt**. Nicht direkt umschreiben. Änderungen erfolgen an Scene Card, World Lock, Cover-Text oder Style Lock und werden anschließend neu kompiliert.

## Harte Bildprompt-Regeln

Verbindlich ist:

```text
Script
→ Aussage
→ Visual Concept
→ Visual Form
→ Composition
→ Camera
→ Depth / Mood
→ Continuity
→ Anti-Gleichförmigkeitscheck
→ Prompt QC >= 8/10
→ Compiler
```

Neue Projekte verwenden `BILD_AUDIO_ZUORDNUNG.json` Schema V2 mit vollständiger Scene Card. Phase 1 schlägt unter anderem fehl, wenn Pflichtfelder, World Lock, Style Anchor, Kompositionssprache, exakter Cover-Text oder Mindest-QC fehlen.

Generische Style-Wörter wie `cinematic`, `epic`, `ultra detailed`, `photographic` oder `realistic lighting` werden in V3 als Drift-Risiko behandelt. Kamera, Licht und Raum sollen konkret beschrieben werden.

## Testvideos

Der langfristige Arbeitsrahmen liegt bei ungefähr 8–15 Minuten, wenn ein Thema die Länge trägt. Für Pipeline- und Qualitätsprüfungen sind bewusst **kurze Testvideos bis maximal 120 Sekunden** erlaubt.

## Wichtige Sperren

- keine Bildwelt aus anderen Repositories übernehmen
- keine Referenzkanal-Identität kopieren
- keine festen globalen Master-Referenzbilder erzwingen
- Figuren nicht in jede Szene erzwingen
- keine Inventarlisten-Prompts als finalen Google-Flow-Prompt akzeptieren
- geplante Visual Form beim Prompt-Schreiben nicht verlieren
- kein Prompt unter 8/10 Prompt-QC freigeben
- keine mechanisch gleiche Komposition über unabhängige Szenen hinweg
- kein manuelles Umschreiben des kompilierten Flow-Prompts
- kein Google-Flow-Einsatz vor bestandenem Phase-1-Gate
- kein sichtbarer Remotion-Erklärungstext als Standard
- keine Bildnummern oder Pseudo-Texte im generierten Bild
- Nutzer-Voice bleibt die einzige finale Sprecherquelle
