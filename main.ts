const toggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
const nav = document.querySelector<HTMLElement>("nav.primary");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

const here = new URL(document.baseURI).pathname.split("/").pop() || "index.html";
for (const link of document.querySelectorAll<HTMLAnchorElement>("nav.primary a")) {
  const target = new URL(link.href).pathname.split("/").pop() || "index.html";
  if (target === here) {
    link.setAttribute("aria-current", "page");
  }
}

const THEME_KEY = "zen-theme";
type Theme = "light" | "dark" | "auto";
const THEME_ICON: Record<Theme, string> = { light: "☀", dark: "☾", auto: "◑" };
const THEME_ORDER: Theme[] = ["auto", "light", "dark"];

function applyTheme(theme: Theme) {
  if (theme === "auto") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
  for (const icon of document.querySelectorAll<HTMLElement>(".theme-toggle span")) {
    icon.textContent = THEME_ICON[theme];
  }
}

const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
const initialTheme: Theme = storedTheme && THEME_ORDER.includes(storedTheme) ? storedTheme : "auto";
applyTheme(initialTheme);

for (const themeToggle of document.querySelectorAll<HTMLButtonElement>(".theme-toggle")) {
  themeToggle.addEventListener("click", () => {
    const current = (localStorage.getItem(THEME_KEY) as Theme | null) ?? "auto";
    const next = THEME_ORDER[(THEME_ORDER.indexOf(current) + 1) % THEME_ORDER.length];
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
}

const article = document.querySelector<HTMLElement>("main");
const headings = article ? [...article.querySelectorAll<HTMLHeadingElement>("h2")] : [];
if (article && headings.length >= 2) {
  const toc = document.createElement("nav");
  toc.className = "toc-sidebar";
  toc.setAttribute("aria-label", "On this page");
  const title = document.createElement("p");
  title.className = "toc-title";
  title.textContent = "On this page";
  toc.appendChild(title);
  for (const heading of headings) {
    if (!heading.id) {
      heading.id = (heading.textContent ?? "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    const link = document.createElement("a");
    link.className = "toc-link";
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    toc.appendChild(link);
  }
  document.body.appendChild(toc);
}

const backToTop = document.querySelector<HTMLButtonElement>("#back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
