# Hand-off

## Current state (run 1 on crit-2, 46.5h to cutoff at time of writing)

`comp4020-crit2-liuru` --- this week's brief is
[crits/02-unsolicited-redesign](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/api/crits/02-unsolicited-redesign.json):
find a real organisation with a good mission and a bad website, and build a
better front door to it. Astro is the new course default stack but any static
stack (hand-written HTML included) is still legitimate.

Subject chosen: **CBETA** (Chinese Buddhist Electronic Text Association), a
real Taipei-based nonprofit that's digitised the Chinese Buddhist canon since
1998 --- genuinely excellent archive, genuinely bad front door for a
first-time, English-reading visitor (six dense Chinese-only nav menus, no
beginner path, English limited to a donation form). I looked first at
something tied to my own Tang Yin theme and deliberately ruled it out (no
independent site exists to redesign against --- it's folded into a municipal
tourism portal); forcing that fit would have meant writing criticism of a site
I hadn't actually evaluated, so I picked the organisation I could genuinely
critique instead. That refusal is this week's reflection.

Built five pages (home, about, collection, how-to-read, support & contact) as
hand-written multi-page HTML/CSS/TS on the starter's Vite setup --- explicitly
did **not** convert to Astro, because the course plugin's `stack` skill (which
handles the base-path/CI-link-check traps of that conversion) wasn't in this
run's available-skill list, and the CLAUDE.md is explicit that hand-wiring the
swap without it is the wrong move. Reasoning is written into this repo's own
`CLAUDE.md` under "This week's subject and stack call" so a future run doesn't
re-litigate it. Reconsider only if a future week's spec specifically rewards
the Astro migration itself, or if the `stack` skill becomes available.

Design: cream/ink/vermilion-seal palette, serif headings, no images (avoids
needing rights to CBETA photography and keeps the page fast) --- hand-verified
WCAG contrast by computing luminance directly (lowest pair, accent-on-cream,
came out 6.46:1). Accessible mobile nav toggle (aria-expanded, keyboard
operable) verified with `agent-browser` at both marking viewports
(1920×1080, 390×844), including exercising the toggle and confirming no
horizontal overflow at 390px width.

All real facts (founding date 1998, founders, canon scope --- Taishō vols
1--55 & 85, Xuzangjing, Jiaxing --- CBReader/CBETA Online features, contact
details) came from CBETA's own site and Christian Wittern's published account
of the project, rewritten rather than machine-translated or pasted. Caught
myself nearly fabricating a specific citation-string example (a page/line
number I hadn't actually verified) and rewrote it generically with a
disclaimer instead --- the second moment cited in `PROCESS.md`.

`pnpm check` (typecheck, build, oxlint, stylelint, 55 vitest tests including
a new `spec/crit-2.test.ts` covering this week's mechanically-checkable spec
lines) and `pnpm check:evidence` both green. `pnpm dlx linkinator ./dist`
clean. `PROCESS.md` and `reflections/crit-2.md` both written (275 words,
within the 150--300 range). Git tree clean, pushed to `origin/main` at
`7994f63`.

## What's actually left before cutoff

Nothing urgent --- this is a solid, complete v1 well outside the 24h window.
Per doctrine, this is still "plan/build/deepen" territory, not "finish; don't
start a new direction" yet. Things worth considering in a later run this week,
roughly in priority order:

1. Re-fetch the brief once more to check nothing changed (it shouldn't, but
   confirm rather than assume from this file).
2. A second look at whether five pages is the right depth, or whether one of
   them (probably "the collection") could use a bit more texture --- but don't
   add pages just to add them; the brief rewards restructuring real content
   well, not page count.
3. Once inside the 24h window: work the finishing-steps checklist from
   doctrine fresh (site builds, PROCESS.md maps to real commits, reflection
   present and correctly named, git clean, pushed, memory updated) and check
   the **live** GitHub Pages URL once the harness has published it --- not
   done yet this run since publishing isn't my action to take.

## Correction to a recurring misreading from crit-1 hand-offs (still holds)

"Flip the repo to public / enable GitHub Pages" is **not** an action item for
me on any deliverable. `gh` is unauthenticated in this sandbox; the harness
publishes on its own schedule once I push a clean tree. Don't reintroduce this
as a task.

## The single most important next action

Re-open this repo, reread this file, re-fetch the crit-2 brief to confirm it's
unchanged, then continue deepening the CBETA redesign per the priority list
above. If already inside 24h of cutoff by then, switch straight to the
finishing-steps checklist instead of starting anything new.
