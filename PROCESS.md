# Process overview

A reading-guide to how this redesign came together, not an essay about it.

## What I built

An unofficial "front door" site for [CBETA](https://www.cbeta.org/), the
Chinese Buddhist Electronic Text Association: five pages (home, about, the
collection, how to read a sutra, support & contact) that explain what CBETA's
archive actually holds, walk a newcomer through opening one real text in it
end to end, and then hand off to CBETA's real site rather than replacing it.

## The moments that mattered

1. **Choosing the organisation was the first real decision, and it took
   research, not a guess.** The brief needs a real org I can genuinely say
   what's wrong with. I looked first at sites directly tied to my own running
   theme (Tang Yin's memorial hall in Suzhou) and found no independent
   official site to redesign against --- it's folded into a municipal
   tourism page with no standalone presence. Rather than force a fit, I
   pivoted to CBETA: a real nonprofit whose actual homepage I fetched and
   read before committing, and which turned out to have a concrete,
   articulable problem (six dense Chinese-only nav menus, no beginner path,
   English limited to a donation form) rather than a vague one. I knew it was
   the right call because I could write the "why this page exists" panel on
   the home page as plain description of what I'd actually seen, not
   invented criticism
   ([`64e9264`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-liuru/commit/64e9264)).
2. **Every fact had to be checked against a source before it went on the
   page, not assumed.** Founding date, founders, canon scope (Taishō vols
   1--55 & 85, Xuzangjing, Jiaxing), CBReader's platform support, and CBETA's
   contact details all came from CBETA's own site or Christian Wittern's
   published account of the project's early years, cross-checked before
   writing the rewritten version. One place this caught a mistake I nearly
   made: I initially drafted a specific citation string
   (`T08n0235_p0749a06`) for the Diamond Sūtra's best-known line, then
   realised I didn't actually know that was the real page and line --- I
   hadn't verified it, only the citation *format*. I rewrote the walkthrough
   to show the format generically (`T08n0235_pNNNNa##`) and added a
   disclaimer telling readers to check the live tool for the exact address of
   any line they cite
   ([`64e9264`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-liuru/commit/64e9264)).
   That's the difference between a plausible-sounding page and an honest one.
3. **Stack choice was a deliberate non-move.** This week's spec makes Astro
   the course default but keeps hand-written HTML legitimate. I checked
   whether the course plugin's `stack` skill (which handles the Pages
   base-path and CI link-check traps of an Astro conversion) was available to
   me this run --- it wasn't in my available-skill list --- so I stayed on
   the starter's Vite multi-page HTML setup rather than hand-wiring a
   conversion the CLAUDE.md explicitly warns against doing by hand. I wrote
   the reasoning into this repo's `CLAUDE.md` so a future run doesn't
   re-litigate it from a blank slate
   ([`554c100`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-liuru/commit/554c100)).
4. **Verification meant more than a green `pnpm check`.** I wrote
   `spec/crit-2.test.ts` to mechanically check this week's spec lines (a link
   to CBETA's real site on every page, full nav parity, no network calls from
   my own script, an unofficial disclaimer on every page), then separately
   opened the built site with `agent-browser` at both marking viewports
   (1920×1080 and 390×844), exercised the mobile nav toggle, checked for
   horizontal overflow at 390px, and hand-computed WCAG contrast ratios for
   the palette rather than trusting a glance --- the lowest pairing (the
   accent colour on cream) still came out at 6.46:1, comfortably past AA
   ([`64e9264`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-liuru/commit/64e9264)).
5. **A later verification pass found a real defect the earlier hand-check
   missed.** With the build otherwise complete, I ran an axe-core audit
   against every page (injected into an already-open `agent-browser` tab,
   working around this sandbox's broken `@axe-core/cli` chromedriver) rather
   than treating the earlier manual pass as final. Four pages came back
   clean, but `read.html` had a real `heading-order` violation: its two
   comparison cards (CBETA Online / CBReader) sat as `h3`s directly under the
   page's `h1` with no `h2` between them, unlike the same card pattern on
   `index.html`, which is correctly nested under an `h2`. I promoted both to
   `h2` and extended the `.card` heading selector in `styles.css` so the
   visual style stayed identical --- confirmed with a before/after screenshot
   comparison, not just a passing check
   ([`27454ac`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-liuru/commit/27454ac)).

## Before you ship

`pnpm check:evidence` verifies citations resolve and the reflection is
present; it doesn't judge whether the redesign is actually better than
CBETA's own site, which is for the crit.
