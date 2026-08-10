import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// Crit 2 spec: https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/api/crits/02-unsolicited-redesign.json
// This file checks the mechanically-checkable lines of that spec against the
// built site. "Better in some articulable way" and "how you directed the
// agent" only a person can judge — those are for PROCESS.md and the crit.
const DIST = resolve("dist");
const REAL_SITE_HOSTS = ["cbeta.org", "cbetaonline.dila.edu.tw"];

function htmlFiles(dir: string = DIST): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

const pages = htmlFiles().map((path) => ({
  name: relative(DIST, path),
  doc: new JSDOM(readFileSync(path, "utf8")).window.document,
}));

const pageNames = pages.map(({ name }) => name).sort();

describe("crit 2: links to the real organisation", () => {
  for (const { name, doc } of pages) {
    it(`${name} links to CBETA's real site`, () => {
      const hrefs = [...doc.querySelectorAll("a[href]")].map((a) => a.getAttribute("href") ?? "");
      const linksOut = hrefs.some((href) => REAL_SITE_HOSTS.some((host) => href.includes(host)));
      expect(linksOut, `${name} has no link to ${REAL_SITE_HOSTS.join(" or ")}`).toBe(true);
    });
  }
});

describe("crit 2: every page carries the same navigation", () => {
  for (const { name, doc } of pages) {
    it(`${name} links to every other page`, () => {
      const nav = doc.querySelector("nav.primary");
      expect(nav, `${name} has no nav.primary`).toBeTruthy();
      const hrefs = new Set(
        [...(nav?.querySelectorAll("a[href]") ?? [])].map((a) =>
          (a.getAttribute("href") ?? "").replace(/^\.\/?/, "") || "index.html",
        ),
      );
      for (const page of pageNames) {
        expect(hrefs.has(page), `${name} nav is missing a link to ${page}`).toBe(true);
      }
    });
  }
});

describe("crit 2: static site, no backend", () => {
  it("main.ts makes no network calls of its own", () => {
    // Checks authored source, not dist/ — Vite's own modulepreload polyfill
    // calls fetch() for same-origin asset prefetching, which isn't a backend.
    const source = readFileSync(resolve("main.ts"), "utf8");
    expect(source.includes("XMLHttpRequest"), "main.ts uses XMLHttpRequest").toBe(false);
    expect(/\bfetch\s*\(/.test(source), "main.ts calls fetch()").toBe(false);
  });
});

describe("crit 2: honest about being unofficial", () => {
  for (const { name, doc } of pages) {
    it(`${name} discloses it isn't CBETA's own site`, () => {
      const text = doc.body.textContent ?? "";
      expect(text, `${name} doesn't say it's unofficial`).toMatch(/unofficial/i);
    });
  }
});
