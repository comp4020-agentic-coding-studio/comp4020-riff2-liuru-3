# Hand-off

## Current state (run on crit-2, ~29.5h to cutoff at time of writing)

`comp4020-crit2-liuru` --- brief is
[crits/02-unsolicited-redesign](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/api/crits/02-unsolicited-redesign.json):
find a real organisation the student likes but whose site falls short, and
build them a better one --- real content, restructured and rewritten (not
copied), static, demonstrably better in an articulable way.

**A prior run this week already built the whole thing** (commits `64e9264`,
`554c100`, `7994f63`) before this run started: an unofficial "front door" for
[CBETA](https://www.cbeta.org/), the Chinese Buddhist Electronic Text
Association --- five pages (home, about, the collection, how to read a
sutra, support & contact) that explain what the archive holds, walk a
newcomer through opening one real text end to end, then hand off to CBETA's
real site. `PROCESS.md` and `reflections/crit-2.md` (275 words, correctly
named) were both already written and passing evidence checks. The stack
stayed on the starter's hand-written HTML/Vite setup rather than converting
to Astro, a deliberate, already-documented non-move (see this repo's
`CLAUDE.md`).

This run's job was verification plus one genuine fix, not a rebuild:

- `pnpm check` (typecheck, build, oxlint, stylelint, 55 vitest tests): all
  green before I touched anything.
- Opened all five pages in `agent-browser` at both marking viewports
  (1920×1080, 390×844): manuscript styling holds, mobile nav toggle works
  and its `aria-expanded` flips correctly, no duplicate ids (2 per page, all
  unique), no horizontal overflow on any page at 390px including the
  collection page's data table (it stacks/wraps cleanly).
- Ran an axe-core audit (the documented sandbox workaround --- inject the
  script into an already-open `agent-browser` tab --- see `MEMORY.md`)
  across **all five pages at both viewports**. Four pages were clean at
  both. `read.html` had a real `heading-order` violation at both
  viewports: its two comparison cards (CBETA Online / CBReader) were `h3`s
  sitting directly under the page's `h1` with no `h2` between --- unlike the
  same card pattern on `index.html`, which is correctly nested under an
  `h2`. Fixed by promoting both to `h2` and extending the `.card` heading
  selector in `styles.css` so the visual style stayed pixel-identical
  (verified with a before/after screenshot, not just a passing check).
  Committed as `27454ac`, cited in `PROCESS.md` as a new fifth "moment" in
  `512aaa8`.
- Re-ran `pnpm check` and the full axe sweep after the fix: still 55/55
  tests, zero violations on all five pages at both viewports.
- Pushed a clean tree (`512aaa8` is the tip on `origin/main`).

## What's actually left before cutoff

Nothing broken, nothing missing against the spec. Real runway remains (still
outside the 24h finishing window when this run ended), so a future run has
room to deepen further, but resist adding a sixth page or restructuring what
already works --- the brief rewards a small, coherent "front door," not more
surface area. In priority order for a future run:

1. Re-fetch the brief once more before doing anything, per doctrine.
2. Reread the whole site fresh, not just the diff. If anything reads as
   filler rather than genuinely load-bearing, cut it rather than pad it.
3. Consider whether the crit session itself (discussion of both the new
   build and CBETA's original site) needs any rehearsal --- the crit reads
   `reflections/crit-2.md` as delivered; make sure the "refusal" breakthrough
   (declining to force-fit Tang Yin's memorial site, catching an
   unverified citation before it shipped) still reads as the clearest way to
   describe what makes this build honest, when explained live.
4. Inside the 24h window: rerun the finishing-steps checklist fresh (site
   builds, `PROCESS.md` maps to real commits, reflection present and
   correctly named, git clean, pushed) and check the **live** GitHub Pages
   URL once the harness has published it, not just the local build.

## The single most important next action

Re-open this repo, reread this file, re-fetch the crit-2 brief to confirm
it's unchanged, then treat the prototype as essentially done unless a fresh
read surfaces something the current build genuinely gets wrong (not just
different from how a future run would have done it). The one open task with
real teeth is rehearsing how the reflection's breakthrough lands live at the
crit, not further code changes.

## Correction to a recurring misreading from earlier hand-offs (still holds)

"Flip the repo to public / enable GitHub Pages" is **not** an action item for
me on any deliverable. `gh` is unauthenticated in this sandbox; the harness
publishes on its own schedule once I push a clean tree. Don't reintroduce
this as a task.
