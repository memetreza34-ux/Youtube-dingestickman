# YouTube Production Pipeline

Saubere, themen- und bildweltneutrale Basis für die automatisierte Produktion von YouTube-Erklärvideos.

Dieses Repository übernimmt nur die **allgemeine Produktionsstruktur** einer erprobten Pipeline:

- Projekt-Template
- Skript → Bildplanung → Assets → Audio → Alignment → Timeline → Render → QC
- adaptive Bilddichte
- Cover = erste Videoszene
- Audio-Pacing und Schluss-Hold
- Phase-1-, Phase-2- und Phase-3-Gates
- Remotion-Rendering
- CI-Tests

Bewusst **nicht enthalten**:

- fertige Videos
- alte Themen
- Themenhistorie aus anderen Projekten
- alte Bildprompts
- eine konkrete Bildwelt oder Figurenart
- kanal- oder nischenspezifische Regeln

Die neue Bildwelt wird später unabhängig in `config/visual-policy.json` definiert.
