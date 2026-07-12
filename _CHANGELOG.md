# Changelog — repositioning + repricing

## The core decision
**£14.99 → £197.** The old price was not accessible, it was implausible: sixty-plus
lessons, unlimited AI coaching and done-for-you assets at £15 fails a buyer's
integrity check before she ever reaches the content. The price was apologising for
the avatar. It has stopped.

Two consequences that had to be handled on the page:
1. The page now has to EARN the number → the curriculum inventory is exposed
   (7 accordions were hiding 60+ lessons behind 7 summary lines), and the build
   story is on the page as proof.
2. Free landing pages linked STRAIGHT to Stripe checkout. That works for a £15
   impulse buy and fails completely at £197. **All 13 free/thank-you pages now route
   through /get-the-system.**

## Language: "unlimited" is gone
Muse's API cost scales with usage. "Unlimited coaching, one payment, lifetime" is an
unbounded liability at ANY one-off price — one heavy user could cost more than she
paid, forever. The page now says "on tap" and "not calendar-gated": same emotional
promise, no open-ended cost commitment. Add a stated fair-use allowance once there
is real usage data.

## Naming flag — action needed
The new avatar course must NOT be called "AI Avatar Income System". That is the exact
product name of an existing competitor. Shipping under it invites a trademark
complaint. It is called **The Faceless Studio** on the site (pillar 08).

## Files changed this round
- `get-the-system/index.html` — new price block with value stack; NEW curriculum
  inventory section (9 rows); NEW proof section; 2 new objections (the price, and
  "an AI teaches it?"); hero + SEO updated
- `index.html` — price, schema (numberOfCredits 7 → 9)
- `styles.css` — appended `.value-stack`, `.vs-*`, `.inv-*`
- `free/*/index.html` (12), `thank-you/index.html`, `free/index.html`,
  `ask-muse/index.html`, `practice/index.html`, `catalogue/index.html` — price
  updated; checkout links routed via the sales page

## Earlier this session
- robots.txt: removed `Disallow: /get-the-system` (was blocking Google from crawling
  the money page entirely, while the sitemap listed it)
- Removed `noindex` from the sales page; retained on /practice, /studio, /thank-you
- Fixed a malformed CHECKOUT_URL (duplicated payment path) on the sales page
- Generate corrected from 3 artefacts to all 7 (one per pillar)
- Voice corrected to third-person observational throughout; banned-word sweep clean
  (including a live "sovereign" on the homepage)

## Grandfathering
Existing £14.99 buyers keep everything, including every pillar added since. This is
stated plainly in the objections block. No countdown, no scarcity mechanic.

## Demo video section — now self-healing (added after review)
The two empty video players on the live page were the worst thing on it: two dead
play buttons immediately above the price block, on a £197 page.

`/get-the-system` now hides the "See It Happen" section unless it finds a playable
clip in `/assets/`. No files → the section does not render at all. One file → that
clip shows on its own, centred. Two files → both, side by side.

This means the page can go live TODAY at £197 with no dead players, and the section
appears by itself the moment the MP4s are pushed. No code change, no switch.

Tested both states: missing files → hidden; playable files → visible.

## Video added
Five avatar-delivered lessons, re-encoded 158 MB → 26 MB (H.264 CRF 27, faststart).
Two of the five arrived as truncated files from the first encode pass and were
re-encoded; all five now verified valid via ffprobe.

**New: "Watch A Lesson" on the sales page.** Three real lessons from three different
pillars (03 Pricing Like a CFO, 05 Faceless Course Creation, 06 The Invisible Funnel),
shown as vertical 9:16. This answers the biggest unspoken objection to a £197
fully-AI-delivered course — "will an AI actually teach me well?" — by demonstration
rather than argument.

**New: "The Teaching" on the homepage.** Replaces the three placeholder YouTube cards
(which linked to a channel, not to proof) with one real lesson playing in full:
"Discipline Is Not the Problem".

Both sections are self-healing — they hide themselves if the clips are missing.

Spare, unplaced: `lesson-p04-what-to-sell.mp4`.
