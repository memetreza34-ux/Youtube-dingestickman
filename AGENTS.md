# Agent Policy

## Preproduction quality is mandatory for new projects

For every AI/coding agent working in this repository, new productions with `preproductionQualityGateVersion >= 1` must pass:

- `99-technik/TOPIC_SCORECARD.json`
- `99-technik/STORY_QC.json`

Do not treat a successful duplicate check as topic approval. New Topic Scorecards (schema >= 2) must also prove a concrete historical story core, human/societal stakes, event progression, and must reject mechanism-only framing.

## Script-first and whole-video coherence are mandatory

For new productions with `wholeVideoCoherenceGateVersion >= 1`:

- Write and approve the complete natural voice-over prose before planning visuals.
- Do not build a script by writing one sentence per planned image.
- Run/read the script as one continuous spoken text and remove staccato/list-like rhythm.
- Only after the script is approved, derive Story Beats and Scene Cards.
- Complete `99-technik/WHOLE_VIDEO_QC.json` and set it to APPROVED only after the full script and visual sequence have been reviewed as one experience.
- Normally allow at most two `explanationOnly=true` visuals in a row and keep `explanationOnlyVisualShare <= 0.35`.
- After abstract explanation, return to a concrete historical person, group, place, object, event or visible consequence.

See `channel/17-WHOLE-VIDEO-COHERENCE-GATE.md`.

## Visible text policy

- Bild 01 may contain only the exact approved cover text.
- Bild 02–NN default to `visibleTextPolicy=NO_VISIBLE_TEXT`.
- A non-cover image may contain visible text only if its Scene Card explicitly uses `visibleTextPolicy=EDITORIAL_TEXT` and defines both `editorialText` and `editorialTextPurpose`.
- Approved editorial text is limited to one short useful orientation unit such as a year, date, place, time jump or short comparison. Render exactly the approved text and nothing else.
- `BILD`, `IMAGE`, `SCENE`, image numbers, internal prompt metadata, watermarks and pseudo-writing are always hard failures.

## Phase 2 requires real visual review

For every AI/coding agent working in this repository, new productions must pass a real image review before Phase 3.

- Inspect every final image against its assigned narration and Scene Card.
- Reject images that are merely related but do not support the current sentence/beat.
- Reject visually boring repetition and sequences that feel like unrelated illustrations.
- Reject accidental weirdness, clone-like people, implausible staging or confusing compositions.
- Verify visible text against the Scene Card: cover text on Bild 01, exact approved editorial text only when explicitly allowed, otherwise no text.
- Record narration support, visual interest and style consistency at >= 8/10 per image in `99-technik/PHASE2_VISUAL_QC.json`.
- Record the exact `fileName` and SHA-256 of each reviewed image for hash-gated productions.
- Replacing an image after review invalidates Phase 2.
- Do not enter Phase 3 until `PHASE2_VISUAL_QC.json` is fully APPROVED.

## Phase 3 uses existing images only

- Phase 3 may only consume already existing final images from `00-bildprompts/images/`.
- Never generate, regenerate, edit, replace, delete, rename or add images during Phase 3.
- Never call an image-generation service as a fallback during Phase 3.
- Missing, invalid, misnamed or changed images cause an immediate abort.
- Report the exact asset error instead of repairing it automatically.
- `99-technik/PHASE3_IMAGE_LOCK.json` is authoritative. After lock creation the image folder is read-only until Phase 3 ends.

User phrases such as `fang an`, `start`, `mach Phase 3`, or `render das Video` authorize assembly/rendering from existing assets only, never image generation.
