# Agent Policy

## Phase 3 uses existing images only

For every AI/coding agent working in this repository:

- Phase 3 may only consume the already existing files in `00-bildprompts/images/`.
- Never generate, regenerate, edit, replace, delete, rename or add images during Phase 3.
- Never call an image-generation service or image tool as a fallback during Phase 3.
- If an expected image is missing, invalid, misnamed, the image count differs from `plannedImageCount`, or the image folder changes after Phase 3 begins: stop immediately.
- Report the exact asset error to the user. Do not repair the problem automatically and do not create a substitute image.
- `99-technik/PHASE3_IMAGE_LOCK.json` is the authoritative Phase-3 image snapshot. Once created, `00-bildprompts/images/` is read-only until Phase 3 ends.

User phrases such as `fang an`, `start`, `mach Phase 3`, or `render das Video` do not authorize image generation. They authorize assembly/rendering from existing assets only.
