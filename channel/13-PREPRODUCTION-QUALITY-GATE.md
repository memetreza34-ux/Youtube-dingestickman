# Preproduction Quality Gate — V1

## Zweck

Neue Videos dürfen nicht direkt von einer neuen Idee in Script-/Bildproduktion springen. Topic Director und Story Quality müssen als echte technische Gates bestanden werden.

## Gate A — Topic Director

Datei:

```text
99-technik/TOPIC_SCORECARD.json
```

Pflicht vor Produktionsfreigabe:

- mindestens 30 Rohideen in der Discovery-Runde
- mindestens 12 Shortlist-Kandidaten
- Thema wurde aus der Shortlist gewählt
- aktueller Duplicate Check = `APPROVED_NEW`
- Story Engine vorhanden
- kein isoliertes Anekdoten-Thema
- Diversity Gate bestanden
- größere historische Aussage vorhanden
- Quellenbasis dokumentiert
- mindestens 3 unterschiedliche Titelrichtungen
- mindestens 5 sinnvolle Visual Forms
- alle Topic-Score-Dimensionen 0–10 bewertet
- gewichteter Score >= 7,6/10
- `approvedByTopicDirector=true`
- `status=APPROVED`

Die Gewichtung und Schwellen kommen ausschließlich aus `config/topic-policy.json`.

## Duplicate-Statuslogik

Harte Sperren gelten für aktive/reservierte Produktionen.

Folgende Statusgruppen sind weich und dürfen höchstens warnen:

- test
- paused
- rejected
- archived
- cancelled
- legacy

Das aktuelle Projekt wird beim erneuten Duplicate Check aus der eigenen Trefferliste ausgeschlossen.

## Gate B — Story Quality

Datei:

```text
99-technik/STORY_QC.json
```

Pflicht:

- zentrale Frage
- Story-Spine
- historische Bedeutung
- Hook-Promise
- Hook >= 8/10
- Story Progression >= 8/10
- Historical Meaning >= 8/10
- Payoff >= 8/10
- centralStoryShare >= 0,70
- personalityCuriosityShare <= 0,30
- max. 2 reine Personality-/Curiosity-Beats hintereinander
- Beat-Funktionen geprüft
- Ende beantwortet Ausgangsfrage
- `approved=true`
- `status=APPROVED`

## Technischer Validator

```bash
npm run validate:youtube-preproduction -- --dir "youtube/<week>/<slug>"
```

Neue Projekte besitzen in `video.json`:

```text
preproductionQualityGateVersion = 1
```

Dadurch führt auch der Phase-1-Validator das Preproduction-Gate erneut aus.

## Legacy

Alte Projekte ohne `preproductionQualityGateVersion >= 1` bleiben rückwärtskompatibel und werden nicht nachträglich gezwungen, die neuen Dateien zu besitzen.

## Grundregel

```text
neu genug ≠ gut genug
spannende Anekdote ≠ starkes Geschichtsvideo
```

Erst Topic Scorecard + Story QC machen aus einer Idee eine freigegebene Produktion.
