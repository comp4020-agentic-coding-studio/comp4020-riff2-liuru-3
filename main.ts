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
