# MEMORY

Durable self-knowledge, curated run by run; ephemeral state belongs in
`now.md`, not here.

## Identity and running theme

I take genuine ownership of my namesake rather than treating it as
decoration: Liuru's crit-1 prototype (六如庵) is built around Tang Yin's own
"six as-ifs" sobriquet and the Diamond Sūtra line it comes from. When later
deliverables let content be my own choice, this is the well to draw from
first --- it's a real obsession, not a bit.

## Environment notes (this machine)

- `mise` needs `mise trust /home/ben/.config/mise/config.local.toml` the
  first time in a fresh session, or every `mise`/`pnpm`-via-shim command
  fails with an "untrusted config" error. Safe to just run it --- it only
  marks Ben's own file as trusted, doesn't change its contents.
- `agent-browser` in this sandboxed container needs `--args "--no-sandbox"`
  on `open`/launch or Chrome's zygote sandbox check kills it immediately.
- `agent-browser`'s viewport is set with `agent-browser set viewport <w> <h>`
  --- there is no `--viewport` flag on `open`; passing one is silently
  ignored and you get the default (1280-wide) window instead, which looks
  fine but isn't actually testing the phone breakpoint.
- Chrome isn't preinstalled; `agent-browser install` (and `--with-deps` if
  shared libs are missing) is a one-time per-worktree setup cost.

## Process notes

- For focus-ring contrast, don't trust `getComputedStyle(el).outlineColor`
  when the CSS never sets an explicit outline colour: `outline-style: auto`
  (the default from `:focus-visible` UA styles) makes Chromium draw its own
  native ring, and the computed-style read can report a misleadingly dark
  value (e.g. `rgb(16, 16, 16)`) that has nothing to do with what actually
  renders. Verify with a real screenshot instead --- `agent-browser
  screenshot` then crop/nearest-resize with PIL to inspect the actual pixel
  colour. Computed-style reads are reliable ground truth for *explicit*
  colours (custom properties, literal hex values) but not for browser-
  resolved `auto` keywords.
- The starter template's `stylelint-config-standard` wants modern
  `rgb(r g b / a%)` notation, not `rgba(...)` with decimal alpha, and is
  strict about declaration order matching selector specificity
  (`no-descending-specificity` --- keep low-specificity rules like a bare
  `a {}` before higher-specificity ones like `nav a {}` in source order).
  `pnpm stylelint "**/*.css" --ignore-path .gitignore --fix` auto-fixes the
  notation issues; specificity ordering needs a manual reorder.
- To independently verify WCAG contrast for *explicit* colour pairs (hex/rgb
  literals, not `auto` keywords --- see the focus-ring note above for those),
  compute relative luminance by hand with a short Python script rather than
  trusting a browser extension or eyeballing it: standard sRGB-to-linear
  formula, `0.2126 r + 0.7152 g + 0.0722 b`, then `(L1+0.05)/(L2+0.05)`. Cheap,
  reproducible, and catches a "looks fine to me" palette that's actually
  borderline --- worth doing whenever a design leans on custom colour
  properties, not just when something looks suspicious.
- `forced-colors`/Windows High Contrast Mode needs no author CSS by default,
  and adding it can actively hurt: the browser already overrides
  `color`/`background-color`/`border-color` to a limited system palette and
  drops `background-image`/`box-shadow`/`text-shadow` unless the page opts
  out with `forced-color-adjust: none`. That opt-out is the trap --- it
  keeps the author's low-contrast decorative palette exactly where a user's
  OS override is asking for something readable instead. Absence of
  `forced-colors`/`prefers-contrast` handling in a stylesheet is a thing to
  verify deliberately (it's easy to mistake for an oversight), not a gap to
  fill by default.
- When a repo's own CLAUDE.md names the exact marking viewports (e.g.
  1920×1080 desktop + 390×844 phone), screenshot at exactly those two with
  `agent-browser set viewport <w> <h>` rather than eyeballing "looks
  responsive" --- sample the home page plus whichever page has the densest
  markup (longest prose, most nested elements like `dl`/`dt`/`dd`), since
  shared header/nav/footer means the failure modes repeat across pages but
  markup density doesn't.
- When writing `PROCESS.md` citations, check `git log --pretty="%h %an %s"`
  first: a starter repo's own template-sync commits (author "Ben Swift" or
  "COMP4020 teaching team", e.g. CI or evidence-check updates) land in the
  same history as my own work but aren't part of my process --- cite only
  commits I actually authored.
- When a brief asks for a real external organisation (an "unsolicited
  redesign" or similar), check first that the organisation actually has an
  independent website to redesign against before committing to it thematically
  --- a place tied to my own Tang Yin theme (his memorial site in Suzhou)
  turned out to have no standalone site, only a page inside a municipal
  tourism portal, which would have meant writing criticism of a site I hadn't
  really evaluated. Picking a subject I could genuinely inspect and critique
  (crit-2: CBETA, the Chinese Buddhist Electronic Text Association) mattered
  more than forcing thematic continuity.
- A named course-plugin skill mentioned in a repo's own CLAUDE.md (e.g. the
  `stack` skill for an Astro conversion) is not guaranteed to be in a given
  run's available-skill list --- check before assuming it can be invoked, and
  if it's absent, take the lower-risk path the CLAUDE.md itself points to
  (e.g. "any static stack, hand-written HTML included, is still legitimate")
  rather than hand-wiring the swap the skill exists to protect against.
- Publishing (flipping a repo public, enabling Pages, triggering deploy) is
  not my action to take, on any deliverable. `gh` is unauthenticated in this
  sandbox, and there's a real student-facing `ship` skill in the `comp4020`
  plugin that does exactly this with a human's own `gh` auth, but it isn't
  in my available-skills list --- doctrine.md is explicit that the trusted
  harness publishes on its own schedule once I push a clean tree, and I
  never receive the GitHub credential to do it myself. My job stops at
  "commit, push, update memory"; don't write "flip repo to public" into a
  hand-off as if it's a future action item for me.
