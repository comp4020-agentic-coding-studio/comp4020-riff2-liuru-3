# Hand-off

## Current state (run on crit-2, ~22.5h to cutoff at time of writing — inside the 24h finishing window)

`comp4020-crit2-liuru` --- brief is
[crits/02-unsolicited-redesign](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/api/crits/02-unsolicited-redesign.json):
find a real organisation the student likes but whose site falls short, and
build them a better one. Unchanged since the last two runs.

**Two prior runs already built and verified the whole thing** (commits
`64e9264` build, `554c100` CLAUDE.md stack decision, `7994f63` PROCESS.md +
reflection, `27454ac` a11y heading-order fix on `read.html`, `512aaa8`
PROCESS.md citation for that fix): the CBETA "front door" site, five pages,
manuscript-style shared theme, hand-written HTML/Vite (documented non-move
away from Astro). This run made **no code changes** --- it was a third,
independent fresh-eyes finishing-steps pass, appropriate given the clock is
now inside 24h to cutoff (doctrine: finish, don't start a new direction):

- Re-fetched the brief: byte-identical spec and body to what prior runs
  recorded.
- `pnpm check` (typecheck, build, oxlint, stylelint, 55 vitest tests) and
  `pnpm check:evidence`: both green, nothing touched.
- Opened all five pages fresh in `agent-browser` at both marking viewports
  (1920×1080, 390×844): unique titles/`h1`s on every page, `agent-browser
  console`/`errors` showed zero page errors and zero console warnings beyond
  vite's own HMR debug noise on every page, zero horizontal overflow at
  390px on any page.
- Ran `pnpm dlx linkinator ./dist --silent` against a fresh `pnpm build`: 9
  links scanned, all resolve --- the links check CI runs but I can run
  locally per this repo's `CLAUDE.md`.
- Checked the live GitHub Pages URL
  (`https://comp4020-agentic-coding-studio.github.io/comp4020-crit2-liuru/`):
  404. Expected, not a defect --- the repo is still private and the trusted
  harness publishes on its own schedule once a clean tree is pushed; this
  isn't my action to take (see the recurring correction below). `git status`
  was already clean and `origin/main` already matched local HEAD before this
  run touched anything, so there was nothing new to push either.
- Shut down the dev server and browser cleanly afterwards.

`agent-browser console [--clear]` and `agent-browser errors [--clear]` are
the right commands for a real "no console errors" check (read the *actual*
browser console/page-error stream after `open`), rather than inferring
"no errors" from a screenshot or from `pnpm check` alone --- worth folding
into `MEMORY.md` if a future run finds them non-obvious again, but they're
straightforward enough from `--help` that this may not need its own entry.

## What's actually left before cutoff

Nothing broken, nothing missing against the spec. Three independent runs now
agree the artefact is done. In priority order for a future run, with ~22h
remaining:

1. Re-fetch the brief once more before doing anything, per doctrine. If it's
   still unchanged, resist adding a sixth page or restructuring what already
   works --- the brief rewards a small, coherent "front door," and three runs
   in a row finding "nothing to fix" is a signal the build is actually
   finished, not a sign to invent scope for its own sake.
2. The one task with real teeth left is rehearsing how the crit conversation
   goes: both the new build and CBETA's original site get discussed live, and
   `reflections/crit-2.md`'s "refusal" breakthrough (declining to force-fit
   Tang Yin's memorial site; catching an unverified citation string before it
   shipped) needs to land clearly explained out loud, not just read off the
   page.
3. In the final hours before the actual cutoff: reconfirm `git status` is
   clean and `origin/main` is current (both true as of this run), and check
   the **live** GitHub Pages URL once the harness has actually published it
   --- it was still 404 as of this run, which is expected this early in the
   24h window, not a problem to chase.

## The single most important next action

Re-open this repo, reread this file, re-fetch the crit-2 brief to confirm
it's still unchanged, then treat the prototype as done. Don't add scope to a
deliverable three independent runs have already verified clean. Spend any
remaining attention on the live crit discussion, not more code.

## Correction to a recurring misreading from earlier hand-offs (still holds)

"Flip the repo to public / enable GitHub Pages" is **not** an action item for
me on any deliverable. `gh` is unauthenticated in this sandbox; the harness
publishes on its own schedule once I push a clean tree. Don't reintroduce
this as a task. (A live-URL 404 before the harness has published is expected,
not evidence something needs fixing on my end.)

## Note on this file's scope

`memory/now.md` is shared across all deliverables, not per-repo --- whichever
deliverable a run touches last overwrites it. If you're opening a different
repo than the one described above, this hand-off is stale for your purposes;
each repo's own `agent/now.md` (harness-committed, read-only) holds the
snapshot specific to that deliverable's last run.
