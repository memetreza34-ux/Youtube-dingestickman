# Style Reference Pack — Google Flow Ingredients

## Status

`PLANNED — noch keine final freigegebenen Referenzbilder im Repo`

## Zweck

Textregeln allein können eine visuelle Handschrift nicht vollständig fixieren. Dieses Pack ergänzt deshalb den maschinenlesbaren `config/flow-style-lock.json` um **vom Nutzer freigegebene visuelle Master-Referenzen**, die in Google Flow als Style-Ingredients verwendet werden.

Es fixiert nicht ein konkretes historisches Motiv, sondern:

- Figurenproportionen
- Gesichtslogik
- Linien
- Flächen
- Schattierung
- Textur
- Detailhierarchie
- Architekturvereinfachung
- Kamera-/Tiefenlogik
- Farbcharakter

## Referenzsatz

Es werden genau neun Master-Referenzen angelegt und vom Nutzer ausdrücklich freigegeben.

### REF 01 — Standardfigur Mann

Neutraler historischer Mann als Ganzkörperfigur, einfache Kleidung, entspannte Haltung, klare Front-/3/4-Lesbarkeit. Fokus auf Kopf-Körper-Verhältnis, Gesicht, Hände, Füße und Linien.

### REF 02 — Standardfigur Frau

Neutrale historische Frau als Ganzkörperfigur in derselben Zeichenfamilie. Fokus auf gleiche Proportionslogik und konsistente Gesichts-/Körpervereinfachung.

### REF 03 — Kleine Figurengruppe

Drei bis vier Personen mit unterschiedlichen Haaren/Kleidungsdetails, aber eindeutig derselben Figurenfamilie. Zeigt, wie Individualität ohne Stilwechsel funktioniert.

### REF 04 — Architektur / Straße

Historische Straße mit 2–3 klaren Gebäuden. Keine Figuren nötig. Zeigt Linien, Flächen, Detailgrad, Tiefe und Architekturvereinfachung.

### REF 05 — Innenraum

Historischer Innenraum mit wenigen großen Props. Zeigt Raumtiefe, Materialvereinfachung, Licht und Detailhierarchie.

### REF 06 — Objektfokus

Ein historisches Hauptobjekt mit 1–2 unterstützenden Gegenständen. Zeigt Object-Focus-Sprache und ruhigen Hintergrund.

### REF 07 — Karte / Geografie

Handgezeichnete historische Karte ohne moderne Corporate-Infografik. Zeigt Gelände, Küsten, Grenzen/Wege und reduzierte Beschriftungslogik.

### REF 08 — Helle Alltagsszene

Ruhige warme Alltagssituation. Zeigt natürliche helle Stimmung ohne Kinderbuch-Look.

### REF 09 — Dunkle Krisenszene

Bedrohliche, aber lesbare Szene mit kühlerem Licht, stärkerem Kontrast und einem gezielten warmen Akzent. Zeigt, wie dunkel die Bildwelt werden darf, ohne Stil oder Lesbarkeit zu verlieren.

## Master-Generation-Regeln

Alle neun Referenzen müssen:

- 16:9 sein
- exakt dieselbe Zeichen-DNA nach `config/flow-style-lock.json` und `10-STYLE-DNA-V2.md` verwenden
- keine Logos, Wasserzeichen oder Bildnummern enthalten
- keine Cover-Typografie enthalten
- erwachsen und dokumentarisch wirken
- keine fotorealistischen oder 3D-Elemente enthalten
- in kleiner YouTube-Darstellung lesbar bleiben
- möglichst wenige unnötige Zusatzmotive enthalten

## Freigabegate

Ein Referenzbild wird nur aufgenommen, wenn der Nutzer es ausdrücklich freigibt.

Status pro Referenz:

```text
PENDING
GENERATED
REJECTED
APPROVED
```

Erst wenn alle neun Referenzen `APPROVED` sind, kann das Pack als `READY` markiert werden.

## Nutzung als Google-Flow-Ingredients

Nach `READY` werden pro Generierung nur die **2–4 passendsten** Referenzen verwendet. Nicht alle neun gleichzeitig.

Beispiele:

- Figurenszene → REF 01/02 + REF 03 + passende helle/dunkle Stimmungsreferenz
- Architektur → REF 04 + REF 08 oder REF 09
- Innenraum → REF 05 + passende Figurenreferenz
- Objektfokus → REF 06 + passende Stimmungsreferenz
- Karte → REF 07

### Saubere Ingredients

Style-Ingredients sollen möglichst keine unnötigen Motive enthalten, die Flow versehentlich in die neue Szene übernehmen könnte.

Wenn eine Referenz nur den Figurenstil fixieren soll, sollte die Figur möglichst klar und ohne komplexe zusätzliche Handlung lesbar sein.

Wenn eine Referenz nur Architektur/Rendering fixieren soll, soll sie keine auffällige Figur oder ein einzigartiges Objekt enthalten, das nicht kopiert werden soll.

### Prompt und Ingredient dürfen sich nicht widersprechen

Der Textprompt ergänzt die Referenzbilder.

Er darf nicht gleichzeitig einen anderen Linien-, Proportions-, Farb- oder Renderingstil verlangen.

Der Compiler schreibt deshalb weiterhin den textual Style Lock. Das Reference Pack ersetzt `config/flow-style-lock.json` nicht, sondern verstärkt ihn.

## Was aus einer Referenz übernommen werden soll

Übernehmen:

- Linienlogik
- Figurenproportionen
- Gesichtsvereinfachung
- Schattierungsart
- Textur
- Detailhierarchie
- Farbcharakter
- Grad der Architekturvereinfachung

Nicht automatisch übernehmen:

- historisches Motiv
- konkrete Epoche
- konkretes Gebäude
- Kleidung einer anderen Epoche
- konkrete Komposition
- Figuridentität, außer sie ist ausdrücklich als wiederkehrende Figur gedacht

## Priorität nach Freigabe

```text
freigegebene Style-Reference-Ingredients
→ config/flow-style-lock.json
→ channel/10-STYLE-DNA-V2.md
→ channel/06-VISUAL-SYSTEM.md
→ freie Modellinterpretation
```

Die Scene Card und `FLOW_WORLD_LOCK.json` bestimmen weiterhin **was** dargestellt wird; die Style-Referenzen und der Style Lock bestimmen **wie es gezeichnet wird**.
