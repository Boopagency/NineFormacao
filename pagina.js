/* Nine · páginas internas. Cabeçalho igual ao da página principal (menu, faixa azul), ano do rodapé e filtro de /cursos/. */
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

// Cursos: filtro por status (sem JavaScript todos os cursos aparecem)
const filtro = document.querySelector("[data-cursos-filtro]");
if (filtro) {
  const itens = [...document.querySelectorAll("[data-cursos] > li")], vazio = document.querySelector("[data-cursos-vazio]");
  filtro.addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    filtro.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-pressed", x === b));
    let n = 0;
    itens.forEach((li) => {
      const mostra = b.dataset.status === "todos" || li.dataset.status === b.dataset.status;
      li.hidden = !mostra;
      if (mostra) n++;
    });
    vazio.hidden = n > 0;
  });
}

// Cabeçalho: some ao descer e volta ao subir; a faixa azul sai depois de 80px (igual à página principal)
const topo = document.querySelector("[data-top]");
if (topo) {
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    topo.classList.toggle("is-compact", y > 80);
    topo.classList.toggle("is-hidden", y > lastY && y > 200);
    lastY = y;
  };
  addEventListener("scroll", onScroll, { passive: true });
  topo.addEventListener("focusin", () => topo.classList.remove("is-hidden"));
  onScroll();
  const fechar = document.querySelector("[data-ia-close]");
  if (fechar) fechar.addEventListener("click", () => {
    document.documentElement.classList.add("no-bar");
    try { sessionStorage.setItem("nine-ia", "0"); } catch (e) {}
    document.querySelector(".logo").focus();
  });
}

// Menu do celular em tela cheia
const menu = document.querySelector("[data-menu]"), burger = document.querySelector(".nav__burger");
if (menu && burger) {
  const setMenu = (open) => {
    menu.hidden = !open;
    burger.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
    (open ? menu.querySelector("a") : burger).focus();
  };
  document.querySelectorAll("[data-menu-toggle]").forEach((b) => b.addEventListener("click", () => setMenu(menu.hidden)));
  menu.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
  addEventListener("keydown", (e) => e.key === "Escape" && !menu.hidden && setMenu(false));
}
