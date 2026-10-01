# Agent Policy

## Phase 2 requires real visual review

For every AI/coding agent working in this repository, new productions must pass a real image review before Phase 3.

- Inspect every final image against its assigned story beat and Scene Card.
- Reject images that are merely related but do not clearly support the current narration.
- Reject visually boring repetition: repeated static medium character shots, repeated shot scale, repeated character dialogue staging, or decorative figures without narrative function.
- Reject accidental weirdness: unintentionally comic faces, poses, hands, interactions, implausible historical staging, clone-like people or confusing compositions.
- Bild 01 may contain only the exact approved cover text and no image number, extra heading, caption or label.
- Bild 02 through Bild NN must contain zero visible text. `BILD`, `IMAGE`, `SCENE`, image numbers, prompt metadata, captions, labels, watermarks and pseudo-writing are hard failures.
- Record the completed review in `99-technik/PHASE2_VISUAL_QC.json` with narration support, visual interest and style consistency scores of at least 8/10 per image.
- Do not enter Phase 3 until `PHASE2_VISUAL_QC.json` is fully APPROVED.

See `channel/15-VISUAL-INTEREST-QC.md`.

## Phase 3 uses existing images only

For every AI/coding agent working in this repository:

- Phase 3 may only consume the already existing files in `00-bildprompts/images/`.
- Never generate, regenerate, edit, replace, delete, rename or add images during Phase 3.
- Never call an image-generation service or image tool as a fallback during Phase 3.
- If an expected image is missing, invalid, misnamed, the image count differs from `plannedImageCount`, or the image folder changes after Phase 3 begins: stop immediately.
- Report the exact asset error to the user. Do not repair the problem automatically and do not create a substitute image.
- `99-technik/PHASE3_IMAGE_LOCK.json` is the authoritative Phase-3 image snapshot. Once created, `00-bildprompts/images/` is read-only until Phase 3 ends.

User phrases such as `fang an`, `start`, `mach Phase 3`, or `render das Video` do not authorize image generation. They authorize assembly/rendering from existing assets only.
