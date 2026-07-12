# /assets — video for themonifamethod.com

All clips were re-encoded for the web: **158 MB → 26 MB**, no visible quality loss
(H.264, CRF 27, faststart, mono 96k audio). Every file is well under GitHub's 50 MB
warning and 100 MB hard limit.

## Live now

| File | Where it appears |
|---|---|
| `lesson-p03-pricing.mp4` | Sales page → "Watch A Lesson" (Pillar 03) |
| `lesson-p05-faceless.mp4` | Sales page → "Watch A Lesson" (Pillar 05) |
| `lesson-p06-funnel.mp4` | Sales page → "Watch A Lesson" (Pillar 06) |
| `lesson-p07-discipline.mp4` | Homepage → "The Teaching" |
| `lesson-p04-what-to-sell.mp4` | **Not yet placed** — spare, ready to use |

Each has a matching `.jpg` poster (the frame shown before play).

## Still to record — the Generate demo clips

The "See It Happen" section on the sales page stays hidden until these exist:

| File | What to record |
|---|---|
| `muse-generate-pricing.mp4` | Screen capture: answer Muse's pricing questions → hit Generate → the filled-in worksheet appears |
| `muse-generate-landing.mp4` | Screen capture: hit Generate on Pillar 05 → landing page copy appears → click Download PDF |

Optional posters: `muse-generate-pricing.jpg`, `muse-generate-landing.jpg`

20–40 seconds each. Silent is fine. **End the clip ON the finished artefact** — that
frame is the whole argument.

## Every video section is self-healing

No file → the section does not render, and the page reads as if it was never
written. Some files → only those clips show, and the grid re-centres itself.
All files → everything shows. Nothing to switch on, no code to change.

Tested both states.

## If you add more video later

Keep the repo lean. Re-encode before committing:

```
ffmpeg -i input.mp4 -c:v libx264 -crf 27 -preset slow \
  -c:a aac -b:a 96k -ac 1 -movflags +faststart -pix_fmt yuv420p output.mp4
```

If total video ever approaches ~100 MB, move it off GitHub (Cloudflare R2, Bunny,
or YouTube unlisted embeds) rather than paying for it in every clone.
