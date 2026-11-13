// Formulários da Ummense abrindo na hora, sem trocar de página.
// O app da Ummense pesa ~2,7 MB; esperar ele carregar só depois do clique dava um atraso grande.
// Então: na primeira interação com a página (rolar, mexer o mouse, tocar), o formulário começa a carregar
// escondido; o clique em "Quero conhecer" / "Quero ser Legacy" só abre a janela, com ele já pronto.
// Sem JavaScript, os links seguem para /pre-inscricao/ e para o link público da Ummense.
(() => {
  const FORMS = {
    "/pre-inscricao/": { url: "https://app.ummense.com/form/1eb7f6ec-9181-68ee-8f79-0a7cd410799c?iframe=1", titulo: "Pré-inscrição", alt: "https://ummen.se/BmbT6O" },
    "https://ummen.se/9suDkY": { url: "https://app.ummense.com/form/1f1ded87-38e9-6b58-bbcb-0efff9114513?iframe=1", titulo: "Quero ser Legacy", alt: "https://ummen.se/9suDkY" },
  };
  // na página de pré-inscrição o formulário já está na tela
  if (location.pathname.startsWith("/pre-inscricao")) delete FORMS["/pre-inscricao/"];
  const links = [...document.querySelectorAll("a[href]")].filter((a) => FORMS[a.getAttribute("href")] && !a.closest(".fform__alt"));
  if (!links.length) return;
  const usados = [...new Set(links.map((a) => a.getAttribute("href")))];

  const css = document.createElement("style");
  css.textContent = `
.fjan { width: min(680px, calc(100% - 48px)); height: min(900px, calc(100dvh - 48px)); max-width: none; max-height: none; margin: auto; padding: 0; border: 0; border-radius: 6px; background: #fff; color: #2A2D54; overflow: hidden; }
.fjan::backdrop { background: rgba(23, 25, 46, .72); }
.fjan[open] { display: flex; flex-direction: column; animation: fjan-entra .22s cubic-bezier(.2, .7, .2, 1); }
@keyframes fjan-entra { from { opacity: 0; transform: translateY(14px); } }
.fjan__topo { flex: none; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 0 8px 0 20px; min-height: 60px; background: #2A2D54; color: #fff; }
.fjan__titulo { margin: 0; font: 600 1.125rem/1.2 "Inter Tight", system-ui, sans-serif; letter-spacing: -0.01em; }
.fjan__fechar { min-height: 44px; padding: 0 14px; border: 0; background: none; color: #fff; font: 600 .9375rem "Inter Tight", system-ui, sans-serif; cursor: pointer; text-decoration: underline; text-underline-offset: 5px; }
.fjan__fechar:focus-visible { outline: 2px solid #F4B431; outline-offset: 2px; }
.fjan__corpo { position: relative; flex: 1; min-height: 0; }
.fjan__carregando { position: absolute; inset: 0; display: grid; place-items: center; margin: 0; font: 500 1rem "Inter Tight", system-ui, sans-serif; color: #4A4F6E; }
.fjan__corpo iframe { position: relative; display: block; width: 100%; height: 100%; border: 0; background: #fff; opacity: 0; transition: opacity .2s; }
.fjan__corpo iframe.is-pronto { opacity: 1; }
.fjan__alt { flex: none; margin: 0; padding: 10px 20px; border-top: 1px solid rgba(42, 45, 84, .16); font: 400 .875rem/1.4 "Inter Tight", system-ui, sans-serif; color: #4A4F6E; }
.fjan__alt a { color: #2A2D54; font-weight: 600; }
html.is-fjan { overflow: hidden; }
@media (max-width: 767px) { .fjan { width: 100%; height: 100dvh; border-radius: 0; } }
@media (prefers-reduced-motion: reduce) { .fjan[open] { animation: none; } .fjan__corpo iframe { transition: none; } }`;
  document.head.append(css);

  const janelas = {};
  const criar = (href) => {
    if (janelas[href]) return janelas[href];
    const f = FORMS[href], id = "fjan-" + Object.keys(FORMS).indexOf(href);
    const d = document.createElement("dialog");
    d.className = "fjan";
    d.setAttribute("aria-labelledby", id);
    d.innerHTML = `<div class="fjan__topo"><h2 class="fjan__titulo" id="${id}"></h2><button type="button" class="fjan__fechar">Fechar</button></div>
<div class="fjan__corpo"><p class="fjan__carregando">Carregando o formulário…</p><iframe></iframe></div>
<p class="fjan__alt">Não abriu? <a>Abra o formulário em uma página só dele</a>.</p>`;
    d.querySelector("h2").textContent = f.titulo;
    d.querySelector(".fjan__alt a").href = f.alt;
    const fr = d.querySelector("iframe");
    fr.title = "Formulário: " + f.titulo;
    fr.addEventListener("load", () => fr.classList.add("is-pronto"), { once: true });
    fr.src = f.url;
    d.querySelector(".fjan__fechar").addEventListener("click", () => d.close());
    d.addEventListener("click", (e) => e.target === d && d.close()); // clique fora fecha
    d.addEventListener("close", () => { document.documentElement.classList.remove("is-fjan"); window.__lenis?.start(); });
    document.body.append(d);
    return (janelas[href] = d);
  };

  // pré-carrega na primeira interação (o teste de velocidade não interage, então a nota da página não muda)
  const EV = ["pointermove", "pointerdown", "touchstart", "keydown", "wheel"]; // só gestos de gente (rolagem por script também dispara "scroll")
  const preparar = () => {
    EV.forEach((t) => removeEventListener(t, preparar, true));
    const vai = () => usados.forEach(criar);
    "requestIdleCallback" in window ? requestIdleCallback(vai, { timeout: 800 }) : setTimeout(vai, 200);
  };
  EV.forEach((t) => addEventListener(t, preparar, { capture: true, passive: true }));

  links.forEach((a) => a.addEventListener("click", (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return; // abrir em nova aba continua funcionando
    e.preventDefault();
    const d = criar(a.getAttribute("href"));
    document.documentElement.classList.add("is-fjan");
    window.__lenis?.stop();
    d.showModal();
  }));
})();
