/* Nine · páginas internas (pré-inscrição). Só o ano do rodapé; o resto é HTML e CSS. */
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
