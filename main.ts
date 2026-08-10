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
