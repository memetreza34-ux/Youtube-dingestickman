# Produktionsplan — Medieval City Gates Night

## Format

- Story Mode: `world-led`
- keine Hauptfigur
- ca. 60–80 Sekunden
- 19 geplante Visuals
- Bild 01 = Cover + erste Szene
- Covertext: `NACHTS WAR DAS TOR ZU`

## Erzählbogen

```text
belebter Nachmittag
→ Tor als kontrollierter Engpass
→ Dämmerung
→ Händler räumen
→ Wachen übernehmen
→ Tor schließt
→ Nacht / blockierter Zugang
→ Bewachung konzentriert sich auf wenige Tore
→ Morgen / Wiederöffnung
→ Alltag kehrt zurück
→ historische Bedeutung
```

## World-led Regel

Die Stadtwelt trägt die Geschichte. Händler, Reisende und Wachen sind wechselnde repräsentative Figuren und werden nicht als erfundene Hauptcharaktere behandelt.

## Color Arc

1. `late-afternoon-gold`
2. `dusk-rust`
3. `night-blue`
4. `dawn-amber`

Architektur bleibt gleich; Tageszeit, Aktivität und Farbwirkung entwickeln sich.

## Motion

Content-aware. Statische Frames bleiben bewusst stehen; stärkere Bewegung nur an Rollenwechsel, Schließmoment und Wiederöffnung. Keine Preset-Rotation.

## Flow

1. Nur BILD 01 erzeugen: exakt drei Varianten.
2. Nutzer wählt das Cover.
3. Erst danach BILD 02–19 einzeln erzeugen.
4. Nicht-Cover standardmäßig ohne sichtbaren Text.
5. Danach Phase-2-Vision-QC + SHA-256.

## Stop-Bedingung

Phase 3 bleibt blockiert, bis alle 19 Bilder real vorliegen und `PHASE2_VISUAL_QC.json` vollständig freigegeben ist.