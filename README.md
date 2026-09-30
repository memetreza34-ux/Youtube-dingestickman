# History YouTube Production System

Dieses Repository ist die **kanalspezifische Produktionsbasis für den Geschichts-Kanal**.

Die allgemeine technische Pipeline bleibt erhalten, ist hier aber um eine feste Kanal-DNA, Themenlogik, Recherche-, Skript- und Bildwelt-Regeln ergänzt.

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
14. `channel/13-STYLE-REFERENCE-PACK.md`
15. `channel/99-DECISION-LOG.md`

Maschinenlesbare Kernregeln stehen zusätzlich in `config/channel-policy.json` und `config/visual-policy.json`.

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
→ Prompt Compiler
→ Prompt QC >= 8/10
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
- Visual Director / Prompt-System: **V2 READY**
- Prompt-QC: **V2 READY — Mindestscore 8/10**
- Style-Reference-Pack: **PLANNED**
- aktive Style-ID: `history-stickman-adaptive-v1`

## Bildwelt in einem Satz

Konsistente handgezeichnete 2D-History-Explainer-Welt mit ausdrucksstarken historischen Stickman-Figuren und gleichwertigen Nicht-Figuren-Visuals wie Karten, Architektur, Objekten, Systemen und Symbolbildern.

**Stil bleibt konstant; Inszenierung, Epoche, Stimmung und Visual-Form dürfen sich an den Inhalt anpassen.**

## Neue harte Bildprompt-Regel

Ein Bildprompt darf nicht nur aufzählen, was sichtbar sein soll.

Verbindlich ist:

```text
Script
→ Aussage
→ Visual Concept
→ Visual Form
→ Composition
→ Camera
→ Mood / Light
→ Continuity
→ Prompt
→ Prompt QC >= 8/10
```

Neue Projekte verwenden `BILD_AUDIO_ZUORDNUNG.json` Schema V2 mit vollständiger Scene Card. Phase 1 schlägt fehl, wenn Pflichtfelder, Kompositionssprache oder der Mindest-QC-Score fehlen.

## Testvideos

Der langfristige Arbeitsrahmen liegt bei ungefähr 8–15 Minuten, wenn ein Thema diese Länge trägt. Für Pipeline- und Qualitätsprüfungen sind bewusst **kurze Testvideos bis maximal 120 Sekunden** erlaubt.

## Wichtige Sperren

- keine Bildwelt aus anderen Repositories übernehmen
- keine Referenzkanal-Identität kopieren
- Figuren nicht in jede Szene erzwingen
- keine Inventarlisten-Prompts als finalen Google-Flow-Prompt akzeptieren
- geplante Visual Form beim Prompt-Schreiben nicht verlieren
- kein Prompt unter 8/10 Prompt-QC freigeben
- kein sichtbarer Remotion-Erklärungstext als Standard
- keine Bildnummern oder Pseudo-Texte im generierten Bild
- Nutzer-Voice bleibt die einzige finale Sprecherquelle
