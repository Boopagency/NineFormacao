/* Nine · páginas internas (pré-inscrição). Só o ano do rodapé; o resto é HTML e CSS. */
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
