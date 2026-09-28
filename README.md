# History YouTube Production System

Dieses Repository ist die **kanalspezifische Produktionsbasis für den neuen Geschichts-Kanal**.

Die allgemeine technische Pipeline bleibt erhalten, wird hier aber schrittweise um die eigene Kanal-DNA, Themenlogik, Recherche-, Skript- und später Bildwelt-Regeln ergänzt.

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
8. `channel/99-DECISION-LOG.md`

Maschinenlesbare Kernregeln stehen zusätzlich in `config/channel-policy.json`.

## Technische Pipeline

```text
Thema
→ Recherche
→ Skript
→ Bildplanung
→ Assets
→ finale Voice-over-Datei
→ Audio-Optimierung
→ Wort-/Anchor-Alignment
→ Timeline
→ Pacing-QC
→ Remotion-Render
→ Export-QC
```

Die technische Dokumentation bleibt in `youtube/WORKFLOW.md`.

## Aktueller Kanalstatus

- Nische: Geschichte / Weltgeschichte
- Sprache: Deutsch
- Erzählweise: spannende historische Fragen und Geschichten statt trockener Lexikon-Zusammenfassungen
- Skript-System: V1 definiert
- Themen-System: V1 definiert
- Recherche-System: V1 definiert
- Bildwelt: **NOCH NICHT DEFINIERT**
- Visual Grammar: **NOCH NICHT DEFINIERT**

**Wichtig:** Bis `channel/06-VISUAL-SYSTEM.md` und `config/visual-policy.json` ausdrücklich finalisiert wurden, darf kein Agent aus Repo-Name, früheren Projekten oder Beispielkanälen automatisch einen Stickman-, Cartoon- oder sonstigen Stil ableiten.
