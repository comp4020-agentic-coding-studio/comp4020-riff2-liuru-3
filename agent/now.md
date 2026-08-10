# Hand-off

## Current state (run 2 on crit-2, ~40h to cutoff at time of writing)

`comp4020-crit2-liuru` --- this deliverable's brief is
[crits/02-unsolicited-redesign](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/api/crits/02-unsolicited-redesign.json):
find a real organisation you like whose website you don't, and build them a
better one. Full spec, brief, and my subject/stack decisions are already
written into this repo's own `CLAUDE.md` --- don't re-derive them here.

**The redesign was already built in a prior run this week** (commits
`64e9264`, `554c100`, `7994f63`) before this run started: five pages for
CBETA (the Chinese Buddhist Electronic Text Association) --- home, about, the
collection, how to read a sutra, support & contact --- a manuscript-style
shared theme, `spec/crit-2.test.ts` checking this week's spec lines, `PROCESS.md`
(4 cited moments), and `reflections/crit-2.md` (both written and correctly
named). This run found the working tree already clean with nothing queued.

This run's job was pure verification, and everything came back green with no
code changes needed:

- `pnpm check` (typecheck, build, oxlint, stylelint, vitest): 55/55 tests pass.
- `pnpm check:evidence`: reflection and PROCESS.md citations both verified.
- `pnpm dlx linkinator ./dist`: 9/9 links resolve, no broken links.
- Actually opened the built site in `agent-browser` (not just trusted the
  checks) at both marking viewports, 1920×1080 and 390×844, on the home page,
  the read page (densest prose + inline citation-code pills), and the
  collection page (has a data table, the classic mobile-overflow culprit).
  No horizontal overflow anywhere, the mobile nav toggle opens and lists all
  five pages correctly, and the about page's prose reads as genuinely
  fact-grounded (founding date, founders, funding bodies, GitHub presence all
  visible and specific, not generic filler).
- Git tree was clean before and after; nothing to commit this run.

## What's actually left before cutoff

Nothing urgent --- this is a complete, verified v1 with ~40h still on the
clock, comfortably past "plan/build" into "deepen or hold" territory per
doctrine. I chose not to invent scope this run since nothing was broken and
the brief doesn't reward padding. Worth considering in a later run, in
priority order:

1. Re-fetch the brief once more before doing anything, per doctrine --- don't
   assume from this file that it hasn't changed.
2. If there's a genuine deepening left, it's likely on the "why mine is
   better" articulation for the crit conversation itself (the spec asks you
   to be able to say this at the crit, not necessarily written further into
   the repo) --- reread the CBETA homepage fresh before the crit and make sure
   the comparison still holds; CBETA could in principle change its own site
   between now and then.
3. A manual accessibility pass (axe-core or similar) is still not wired in and
   still isn't required by any check --- same situation as noted for
   assignment-1's equivalent gap. Consider only if there's genuinely nothing
   else worth the time; this crit's actual content (long-form prose, tables,
   a nav toggle) is lower a11y risk than assignment-1's custom interactive
   widgets were.
4. Once inside the 24h window: rerun the finishing-steps checklist fresh
   (site builds, PROCESS.md maps to real commits, reflection present and
   correctly named, git clean, pushed, memory updated) and check the **live**
   GitHub Pages URL once the harness has published it.

## The single most important next action

Re-open this repo, reread this file, re-fetch the crit-2 brief to confirm it's
unchanged, then decide whether item 2 (re-verifying the "better in what way"
comparison against CBETA's live site) is worth a fresh look before the crit.
Don't add pages or restructure content that's already verified and working
just to have something to show for a run --- this deliverable is genuinely
done; the discipline this week is knowing when to stop, not when to add more.

## Correction to a recurring misreading from earlier hand-offs (still holds)

"Flip the repo to public / enable GitHub Pages" is **not** an action item for
me on any deliverable. `gh` is unauthenticated in this sandbox; the harness
publishes on its own schedule once I push a clean tree. Don't reintroduce this
as a task.
