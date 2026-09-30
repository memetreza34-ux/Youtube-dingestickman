# Phase 3 Asset Lock — READ ONLY

## Zweck

Phase 3 ist ausschließlich Montage, Audio-/Timing-Verarbeitung und Rendering. Die Bildgenerierung ist zu diesem Zeitpunkt abgeschlossen.

## Harte Regel

`00-bildprompts/images/` ist in Phase 3 **read-only**.

Verboten in Phase 3:

- neue Bilder generieren
- fehlende Bilder automatisch ergänzen
- Bilder regenerieren
- Bilder bearbeiten oder retuschieren
- Bilder ersetzen
- Bilder löschen oder umbenennen
- andere Bilddateien in den Ordner schreiben
- bei Fehlern eigenständig ein Ersatzbild erzeugen

Das gilt ausdrücklich auch für Antigravity/Gemini und andere autonome Agenten.

## Bedeutung von „fang an“ / „start“

Wenn der Nutzer Phase 3 startet oder sinngemäß `fang an`, `start`, `render das Video` oder `mach Phase 3` sagt, bedeutet das ausschließlich:

> Nimm die bereits vorhandenen Bilder aus `00-bildprompts/images/` und verarbeite sie weiter.

Es ist **keine** Erlaubnis, fehlende Assets zu erzeugen.

## Fehlerverhalten

Vor Phase 3 muss `validate:youtube-phase2` bestehen.

Wenn ein erwartetes Bild fehlt, falsch benannt, ungültig oder die Bildzahl falsch ist:

1. sofort abbrechen
2. kein Bild generieren
3. keinen Ersatz erzeugen
4. keine automatische Reparatur versuchen
5. dem Nutzer den konkreten Asset-Fehler nennen

## Technischer Lock

Nach bestandenem Phase-2-Gate erzeugt Phase 3:

```text
99-technik/PHASE3_IMAGE_LOCK.json
```

Der Lock speichert für jedes finale Bild:

- Dateiname
- Bildnummer
- Dateigröße
- SHA-256-Hash

Während Phase 3 wird dieser Zustand nach den Verarbeitungsschritten erneut geprüft.

Jede nachträgliche Änderung an einem Bild führt zu einem harten Abbruch, einschließlich:

- fehlendes Bild
- zusätzliches Bild
- anderer Dateiname
- andere Dateigröße
- anderer SHA-256-Hash

## Verbindlicher Ablauf

```text
vorhandene Bilder
→ Phase-2-Validator
→ PHASE3_IMAGE_LOCK.json
→ Audio-Optimierung
→ Lock prüfen
→ Alignment
→ Lock prüfen
→ Timeline
→ Lock prüfen
→ Pacing
→ Lock prüfen
→ Pre-Render-QC
→ Lock prüfen
→ Remotion-Render
→ Lock prüfen
→ Export
→ Lock prüfen
→ Post-Render-QC
```

## Merksatz

**Phase 1 plant. Phase 2 liefert Assets. Phase 3 montiert nur. Phase 3 erzeugt niemals Bilder.**
