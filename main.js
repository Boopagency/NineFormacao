/* Nine Academia de Influência · site da formação
   Tudo que é comportamento da página está aqui. As bibliotecas de animação (GSAP, Lenis)
   só entram depois do carregamento; sem elas o site continua completo. */

// ---------- Configuração ----------
// Destino do formulário: URL que recebe POST em JSON (webhook de planilha, n8n, Make…).
// Enquanto estiver vazio, o envio abre o e-mail do visitante com a mensagem pronta para FORM_EMAIL.
const FORM_ENDPOINT = "";
const FORM_EMAIL = "contato@9ai.com.br";

// Acervo do mural. Para trocar conteúdo: coloque os arquivos em assets/img/galeria/
// (<id>-320.webp, <id>-600.webp e <id>.webp ampliada) e edite esta lista. A ordem é a de exibição.
const GALERIA = [
  { id: "06", cat: "oficinas", legenda: "Oficina de joalheria", alt: "Turma em volta da mesa de ferramentas na oficina de joalheria", w: 600, h: 817 },
  { id: "22", cat: "jantares", legenda: "Jantar da turma", alt: "Dois alunos às gargalhadas durante o jantar", w: 600, h: 398 },
  { id: "24", cat: "aulas", legenda: "Aula no laboratório de ciências", alt: "Turma de jaleco reunida para foto no laboratório", w: 600, h: 438 },
  { id: "v05-39", cat: "servico", legenda: "Visita ao Pequeno Cotolengo", alt: "Turma reunida em roda durante a visita ao Complexo de Saúde Pequeno Cotolengo", w: 600, h: 1067 },
  { id: "13", cat: "oficinas", legenda: "Oficina de panificação", alt: "Aluna sorrindo para a câmera com a massa na mão", w: 600, h: 394 },
  { id: "17", cat: "oficinas", legenda: "Oficina de perfumaria", alt: "Aluno de olhos fechados sentindo uma fragrância na fita de papel", w: 600, h: 420 },
  { id: "v04-3", cat: "aulas", legenda: "Aula geral", alt: "Professora dando aula para a turma no auditório", w: 600, h: 1067 },
  { id: "23", cat: "jantares", legenda: "Jantar da turma", alt: "Duas alunas sorrindo para a câmera à mesa do jantar", w: 600, h: 420 },
  { id: "v07-12", cat: "servico", legenda: "Reforma da residência dos niners", alt: "Aluna pintando a grade de uma janela durante a reforma", w: 600, h: 1067 },
  { id: "27", cat: "oficinas", legenda: "Oficina de realidade virtual", alt: "Turma sentada experimentando óculos de realidade virtual", w: 600, h: 417 },
  { id: "11", cat: "oficinas", legenda: "Oficina de panificação", alt: "Instrutor polvilhando farinha enquanto a turma de avental observa", w: 600, h: 383 },
  { id: "25", cat: "aulas", legenda: "Aula no laboratório de ciências", alt: "Alunos de jaleco fazendo um experimento no laboratório", w: 600, h: 566 },
  { id: "04", cat: "jantares", legenda: "Refeição ao ar livre", alt: "Turma almoçando numa mesa longa ao ar livre", w: 600, h: 791 },
  { id: "v02-9", cat: "oficinas", legenda: "Oficina de pintura", alt: "Aluna de óculos pintando uma tela", w: 600, h: 1067 },
  { id: "v05-55", cat: "servico", legenda: "Visita ao Pequeno Cotolengo", alt: "Aluna entregando presentes da Nine durante a visita", w: 600, h: 1067 },
  { id: "30", cat: "jantares", legenda: "Degustação", alt: "Alunas se servindo numa tábua de degustação", w: 600, h: 824 },
  { id: "v01-21", cat: "oficinas", legenda: "Oficina de pizza", alt: "Aluna sorrindo enquanto abre a massa de pizza", w: 600, h: 1067 },
  { id: "v04-12", cat: "aulas", legenda: "Aula geral", alt: "Professora explicando um tema em sala de aula", w: 600, h: 1067 },
  { id: "21", cat: "jantares", legenda: "Jantar da turma", alt: "Turma jantando sob um pergolado iluminado à noite", w: 600, h: 391 },
  { id: "v07-43", cat: "servico", legenda: "Reforma da residência dos niners", alt: "Aluna lixando o teto durante a reforma da casa", w: 600, h: 1067 },
  { id: "12", cat: "oficinas", legenda: "Oficina de panificação", alt: "Turma sentada ouvindo o instrutor", w: 600, h: 397 },
  { id: "16", cat: "oficinas", legenda: "Oficina de perfumaria", alt: "Instrutora sorrindo diante da mesa de fragrâncias", w: 600, h: 409 },
  { id: "29", cat: "oficinas", legenda: "Oficina de realidade virtual", alt: "Aluno explorando um ambiente com óculos de realidade virtual", w: 600, h: 393 },
  { id: "v04-40", cat: "jantares", legenda: "Jantar da turma", alt: "Aluno de terno sorrindo durante o jantar", w: 600, h: 1067 },
  { id: "01", cat: "oficinas", legenda: "Oficina de café", alt: "Turma acompanhando uma degustação de café", w: 572, h: 846 },
  { id: "03", cat: "jantares", legenda: "Café da manhã da turma", alt: "Aluna sorrindo com um waffle na mão", w: 577, h: 788 },
  { id: "05", cat: "oficinas", legenda: "Oficina de joalheria", alt: "Professora testando uma pedra com um aparelho", w: 600, h: 800 },
  { id: "26", cat: "oficinas", legenda: "Oficina de realidade virtual", alt: "Aluno usando óculos de realidade virtual", w: 600, h: 398 },
  { id: "15", cat: "oficinas", legenda: "Oficina de panificação", alt: "Pão de fermentação natural recém-saído do forno", w: 600, h: 398 },
  { id: "20", cat: "oficinas", legenda: "Oficina de joalheria", alt: "Duas barrinhas de ouro na palma da mão", w: 600, h: 391 },
  { id: "28", cat: "oficinas", legenda: "Oficina de realidade virtual", alt: "Mãos segurando os controles de realidade virtual", w: 600, h: 402 },
];
const CATEGORIAS = { aulas: "Aulas", oficinas: "Oficinas", grupos: "Grupos", intercambio: "Intercâmbio", jantares: "Jantares", servico: "Serviço", formatura: "Formatura" };
const MURAL_INICIAL = 12;

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const refreshScroll = () => window.ScrollTrigger && ScrollTrigger.refresh();
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const root = document.documentElement;
let lenis = null;
function afterLoad(fn) { document.readyState === "complete" ? fn() : addEventListener("load", fn, { once: true }); }
function scrollToY(y) { lenis ? lenis.scrollTo(y) : scrollTo({ top: y, behavior: reduceMotion.matches ? "auto" : "smooth" }); }

// ---------- Topo: barra do curso de IA + navegação ----------
$$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

// Esconde ao descer, volta ao subir. Depois de 80px a barra do curso de IA sai e a navegação ganha fundo.
const topo = $("[data-top]");
let lastY = scrollY;
const onScrollTopo = () => {
  const y = scrollY;
  topo.classList.toggle("is-compact", y > 80);
  topo.classList.toggle("is-hidden", y > lastY && y > 200);
  lastY = y;
};
addEventListener("scroll", onScrollTopo, { passive: true });
topo.addEventListener("focusin", () => topo.classList.remove("is-hidden"));
onScrollTopo();

// Fechar a barra vale até o fim da visita (a classe no-bar já entra no <head> ao recarregar)
$("[data-ia-close]").addEventListener("click", () => {
  root.classList.add("no-bar");
  try { sessionStorage.setItem("nine-ia", "0"); } catch (e) {}
  $(".logo").focus();
});
// Links do curso de IA já chegam no formulário com a opção marcada
$$('[data-interesse="ia"]').forEach((a) => a.addEventListener("click", () => ($("[data-interesse-ia]").checked = true)));

// Menu mobile em tela cheia
const menu = $("[data-menu]"), burger = $(".nav__burger");
const setMenu = (open) => {
  menu.hidden = !open;
  burger.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
  (open ? $("a", menu) : burger).focus();
};
$$("[data-menu-toggle]").forEach((b) => b.addEventListener("click", () => setMenu(menu.hidden)));
menu.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
addEventListener("keydown", (e) => e.key === "Escape" && !menu.hidden && setMenu(false));

// Ponto dourado no item do menu da seção que está na tela
const spyLinks = $$("[data-spy-link]");
const spyIO = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  spyLinks.forEach((a) => a.dataset.spyLink === e.target.dataset.spy ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"));
}), { rootMargin: "-45% 0px -50% 0px" });
$$("[data-spy]").forEach((s) => spyIO.observe(s));
new IntersectionObserver(([e]) => e.isIntersecting && spyLinks.forEach((a) => a.removeAttribute("aria-current")), { threshold: .5 }).observe($(".hero__card"));

// Perguntas frequentes: abre e fecha com altura animada; com movimento reduzido, abre direto
$$(".faq details").forEach((d) => {
  const summary = $("summary", d);
  let anim = null;
  summary.addEventListener("click", (e) => {
    if (reduceMotion.matches) return;
    e.preventDefault();
    const abrindo = !d.open || anim?.reverseClose;
    const de = d.offsetHeight;
    if (abrindo) d.open = true;
    const para = abrindo ? d.scrollHeight : summary.offsetHeight;
    anim?.cancel();
    anim = d.animate({ height: [`${de}px`, `${para}px`] }, { duration: 380, easing: "cubic-bezier(.2, .7, .2, 1)" });
    anim.reverseClose = !abrindo;
    anim.onfinish = () => { if (!abrindo) d.open = false; anim = null; refreshScroll(); };
  });
});

// Abas da grade (setas do teclado, Home/End)
$$("[data-tabs]").forEach((box) => {
  const abas = $$('[role="tab"]', box), paineis = abas.map((a) => document.getElementById(a.getAttribute("aria-controls")));
  const ativar = (i, foco) => {
    abas.forEach((a, k) => {
      a.setAttribute("aria-selected", k === i);
      a.tabIndex = k === i ? 0 : -1;
      paineis[k].hidden = k !== i;
      paineis[k].classList.toggle("is-active", k === i);
    });
    if (foco) abas[i].focus();
    refreshScroll();
  };
  abas.forEach((a, i) => {
    a.addEventListener("click", () => ativar(i));
    a.addEventListener("keydown", (e) => {
      const n = abas.length, mapa = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (e.key in mapa) { e.preventDefault(); ativar((i + mapa[e.key] + n) % n, true); }
      if (e.key === "Home") { e.preventDefault(); ativar(0, true); }
      if (e.key === "End") { e.preventDefault(); ativar(n - 1, true); }
    });
  });
});

// Intensivos: abre a porta sob o mouse só quando o mouse se move (rolar a página por cima não troca)
const doors = $("[data-doors]");
const abrirPorta = (e) => {
  const d = e.target.closest(".door");
  if (d && !d.classList.contains("is-open")) [...doors.children].forEach((x) => x.classList.toggle("is-open", x === d));
};
["pointermove", "focusin", "click"].forEach((t) => doors.addEventListener(t, abrirPorta));

// A semana: destaca as atividades de um pilar
const semana = $("[data-semana]"), semanaChips = $$(".semana__legend .chip", semana);
$(".semana__legend", semana).addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  semana.dataset.on = chip.dataset.on;
  semanaChips.forEach((c) => c.setAttribute("aria-pressed", c === chip));
});

// O ano: o mês ativo desliza no calendário e troca o painel. No desktop, o scroll conduz (pinAno, mais abaixo).
const ano = $("[data-ano]"), anoMeses = $$(".mes", ano), anoBotoes = $$(".ano__months button", ano);
const anoCursor = $(".ano__cursor", ano), anoMarcas = $$("[data-s]", ano);
let mesAtivo = -1, irParaMes = null;
function setAno(pos, preencher) {
  anoCursor.style.setProperty("--pos", pos);
  anoMarcas.forEach((m) => {
    const s = +m.dataset.s, e = +m.dataset.e;
    preencher ? m.style.setProperty("--f", Math.max(0, Math.min(1, (pos + 2 - s) / (e - s + 1)))) : m.style.removeProperty("--f");
  });
  const i = Math.round(pos);
  if (i === mesAtivo) return;
  mesAtivo = i;
  anoMeses.forEach((m, k) => m.classList.toggle("is-on", k === i));
  anoBotoes.forEach((b, k) => b.setAttribute("aria-pressed", k === i));
}
ano.classList.add("is-live");
setAno(0, false);
anoBotoes.forEach((b, i) => b.addEventListener("click", () => (irParaMes ? irParaMes(i) : setAno(i, false))));

// Mural: fotos e filtros gerados a partir de GALERIA
const masonry = document.querySelector("[data-masonry]");
const moreBtn = document.querySelector("[data-more]");
masonry.innerHTML = GALERIA.map((f, i) => `<li data-cat="${f.cat}"${i >= MURAL_INICIAL ? " data-extra hidden" : ""}><figure>
  <button type="button" class="mural__open" data-i="${i}" aria-label="Ampliar: ${f.alt}"><img src="/assets/img/galeria/${f.id}-600.webp" srcset="/assets/img/galeria/${f.id}-320.webp 320w, /assets/img/galeria/${f.id}-600.webp 600w" sizes="(min-width: 1024px) 25vw, 50vw" width="${f.w}" height="${f.h}" alt="${f.alt}" loading="lazy" decoding="async"></button>
  <figcaption>${f.legenda}</figcaption></figure></li>`).join("");
const muralItems = [...masonry.children];
const chipsEl = document.querySelector("[data-filter]");
const cats = ["tudo", ...Object.keys(CATEGORIAS).filter((k) => GALERIA.some((f) => f.cat === k))];
chipsEl.innerHTML = cats.map((k) =>
  `<button type="button" class="chip" aria-pressed="${k === "tudo"}" data-cat="${k}">${k === "tudo" ? "Tudo" : CATEGORIAS[k]}</button>`).join("");
let filtro = "tudo", expandido = false;

// Troca de filtro: o mural esmaece, é refeito e reaparece (as colunas de alvenaria não se dão bem com animar posição)
function aplicarFiltro() {
  const trocar = () => {
    muralItems.forEach((li) => (li.hidden = filtro === "tudo" ? !expandido && li.hasAttribute("data-extra") : li.dataset.cat !== filtro));
    moreBtn.hidden = expandido || filtro !== "tudo" || GALERIA.length <= MURAL_INICIAL;
    refreshScroll();
  };
  if (!window.gsap || reduceMotion.matches) return trocar();
  gsap.killTweensOf(masonry);
  gsap.to(masonry, { opacity: 0, y: 12, duration: .2, ease: "power1.in", onComplete: () => {
    trocar();
    gsap.to(masonry, { opacity: 1, y: 0, duration: .35, ease: "power2.out" });
  } });
}
chipsEl.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  filtro = chip.dataset.cat;
  chipsEl.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c === chip));
  aplicarFiltro();
});
moreBtn.addEventListener("click", () => {
  expandido = true;
  aplicarFiltro();
  masonry.querySelector("[data-extra] button").focus({ preventScroll: true });
});
moreBtn.hidden = GALERIA.length <= MURAL_INICIAL;

// Lightbox em <dialog>: setas, teclado (← → Esc), swipe e legenda
const lb = document.querySelector("[data-lightbox]");
const lbImg = lb.querySelector("[data-lb-img]"), lbCap = lb.querySelector("[data-lb-cap]");
let lbAtual = 0, lbX = null, lbSwipe = false;
const lbMostrar = (i) => {
  const f = GALERIA[(lbAtual = i)];
  lbImg.src = `/assets/img/galeria/${f.id}.webp`;
  lbImg.alt = f.alt;
  lbCap.textContent = f.legenda;
};
const lbPasso = (d) => {
  const v = muralItems.filter((li) => !li.hidden).map((li) => +li.querySelector("[data-i]").dataset.i);
  lbMostrar(v[(v.indexOf(lbAtual) + d + v.length) % v.length]);
};
masonry.addEventListener("click", (e) => {
  const b = e.target.closest("[data-i]");
  if (b) { lbMostrar(+b.dataset.i); lb.showModal(); }
});
lb.querySelector("[data-lb-close]").addEventListener("click", () => lb.close());
lb.querySelector("[data-lb-prev]").addEventListener("click", () => lbPasso(-1));
lb.querySelector("[data-lb-next]").addEventListener("click", () => lbPasso(1));
lb.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") lbPasso(-1); if (e.key === "ArrowRight") lbPasso(1); });
lb.addEventListener("pointerdown", (e) => (lbX = e.clientX));
lb.addEventListener("pointerup", (e) => {
  lbSwipe = lbX !== null && Math.abs(e.clientX - lbX) > 50;
  if (lbSwipe) lbPasso(e.clientX < lbX ? 1 : -1);
  lbX = null;
});
lb.addEventListener("click", (e) => { if (e.target === lb && !lbSwipe) lb.close(); lbSwipe = false; });

// Vídeos com data-autoplay tocam só quando visíveis (e nunca com reduced motion)
const autoplayIO = new IntersectionObserver((es) => es.forEach((e) =>
  e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause()), { threshold: .25 });
// Capas dos vídeos fora do topo só baixam quando chegam perto da tela (não disputam banda com o primeiro conteúdo)
const posterIO = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  e.target.poster = e.target.dataset.poster;
  posterIO.unobserve(e.target);
}), { rootMargin: "600px" });
document.querySelectorAll("video[data-poster]").forEach((v) => posterIO.observe(v));

// Vídeos só começam depois da página pronta. No celular (rede mais lenta), o do topo espera o primeiro toque ou rolagem.
const startVideos = () => document.querySelectorAll("[data-autoplay]").forEach((v) => autoplayIO.observe(v));
if (!reduceMotion.matches) afterLoad(() => {
  if (matchMedia("(min-width: 768px)").matches) return startVideos();
  const go = () => { ["pointerdown", "scroll", "keydown"].forEach((t) => removeEventListener(t, go)); startVideos(); };
  ["pointerdown", "scroll", "keydown"].forEach((t) => addEventListener(t, go, { once: true, passive: true }));
});

// Parede de Reels: só o ativo toca (mudo); som opcional; no mobile, ativo = o centralizado
const reelsTrack = document.querySelector("[data-reels]");
const reelItems = [...reelsTrack.children];
let reelAtivo = reelsTrack.querySelector(".is-active"), reelsNaTela = false, somLigado = false;
function ativarReel(li) {
  reelAtivo = li;
  reelItems.forEach((r) => {
    const v = r.querySelector("video"), on = r === li;
    r.classList.toggle("is-active", on);
    v.muted = !(on && somLigado);
    if (on && reelsNaTela && (somLigado || !reduceMotion.matches)) v.play().catch(() => {});
    else v.pause();
    const b = r.querySelector(".reel__sound");
    b.setAttribute("aria-pressed", somLigado);
    b.setAttribute("aria-label", somLigado ? "Desativar som" : "Ativar som");
  });
}
reelsTrack.addEventListener("click", (e) => {
  const li = e.target.closest("[data-reel]");
  if (!li) return;
  if (e.target.closest(".reel__sound")) somLigado = !somLigado;
  else li.scrollIntoView({ inline: "center", block: "nearest", behavior: reduceMotion.matches ? "auto" : "smooth" });
  ativarReel(li);
});
new IntersectionObserver(([e]) => { reelsNaTela = e.isIntersecting; ativarReel(reelAtivo); }, { threshold: .3 }).observe(reelsTrack);
const centroIO = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target !== reelAtivo && ativarReel(e.target)),
  { root: reelsTrack, rootMargin: "0px -45% 0px -45%" });
afterLoad(() => (reelsTrack.scrollLeft = reelAtivo.offsetLeft - (reelsTrack.clientWidth - reelAtivo.offsetWidth) / 2));
reelItems.forEach((li) => centroIO.observe(li));

// CTA fixo: aparece depois do topo e some quando o fechamento (Por que Nine + formulário) está na tela
const ctaFloat = $("[data-cta-float]"), heroCard = $(".hero__card"), fecho = $("#porque");
const updateCta = () => ctaFloat.classList.toggle("is-on",
  heroCard.getBoundingClientRect().bottom < 0 && fecho.getBoundingClientRect().top > innerHeight);
addEventListener("scroll", updateCta, { passive: true });
afterLoad(updateCta);

// ---------- Formulário ----------
const form = $("[data-form]"), formStatus = $("[data-status]", form), formBtn = $('[type="submit"]', form);
const whats = $("#f-whats");
whats.addEventListener("input", () => {
  const d = whats.value.replace(/\D/g, "").slice(0, 11);
  whats.value = d.length > 10 ? d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3")
    : d.length > 6 ? d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
    : d.length > 2 ? d.replace(/(\d{2})(\d*)/, "($1) $2") : d;
});
const mensagemDeErro = (c) => {
  if (c.id === "f-whats" && c.value.replace(/\D/g, "").length < 10) return "Digite o WhatsApp com DDD.";
  if (c.validity.valueMissing) return c.type === "checkbox" ? "Marque esta opção para enviar." : "Preencha este campo.";
  if (c.validity.typeMismatch) return "Digite um e-mail válido.";
  if (c.validity.rangeUnderflow || c.validity.rangeOverflow || c.validity.badInput) return "Digite uma idade válida.";
  return "";
};
function validar() {
  let primeiro = null;
  $$("input[required]", form).forEach((c) => {
    const msg = mensagemDeErro(c), box = c.closest(".field");
    let err = $(".field__err", box);
    c.classList.toggle("is-invalid", !!msg);
    c.setAttribute("aria-invalid", !!msg);
    if (msg) {
      if (!err) { err = document.createElement("p"); err.className = "field__err"; err.id = `${c.id}-erro`; box.append(err); c.setAttribute("aria-describedby", err.id); }
      err.textContent = msg;
      primeiro ??= c;
    } else if (err) { err.remove(); c.removeAttribute("aria-describedby"); }
  });
  return primeiro;
}
form.addEventListener("input", (e) => e.target.classList.contains("is-invalid") && validar());
function sucesso(titulo, texto) {
  const done = $("[data-done]", form);
  if (titulo) $("h3", done).textContent = titulo;
  if (texto) $("[data-done-text]", done).textContent = texto;
  done.hidden = false;
  form.classList.add("is-sent");
  done.focus();
  refreshScroll();
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const ruim = validar();
  if (ruim) { formStatus.textContent = "Confira os campos destacados."; return ruim.focus(); }
  const dados = Object.fromEntries(new FormData(form));
  if (dados.website) return sucesso(); // armadilha anti-spam: finge sucesso e não envia
  delete dados.website;
  dados.consentimento = true;
  dados.enviado_em = new Date().toISOString();
  if (!FORM_ENDPOINT) {
    const corpo = [`Interesse: ${dados.interesse}`, `Nome: ${dados.nome}`, `WhatsApp: ${dados.whatsapp}`, `E-mail: ${dados.email}`, `Idade: ${dados.idade}`,
      `Cidade/UF: ${dados.cidade}`, dados.igreja && `Igreja: ${dados.igreja}`, dados.mensagem && `\n${dados.mensagem}`].filter(Boolean).join("\n");
    location.href = `mailto:${FORM_EMAIL}?subject=${encodeURIComponent(`Site da Nine: ${dados.interesse}`)}&body=${encodeURIComponent(corpo)}`;
    return sucesso("Falta só enviar o e-mail.", `Abrimos o seu aplicativo de e-mail com a mensagem pronta. Se ele não abriu, escreva para ${FORM_EMAIL} ou ligue para (41) 3333-3363.`);
  }
  formBtn.disabled = true;
  formStatus.textContent = "Enviando…";
  try {
    const r = await fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados) });
    if (!r.ok) throw new Error(r.status);
    sucesso();
  } catch (err) {
    formBtn.disabled = false;
    formStatus.innerHTML = `Não conseguimos enviar agora. Tente de novo ou escreva para <a href="mailto:${FORM_EMAIL}">${FORM_EMAIL}</a>.`;
  }
});

/* ==========================================================================
   Motion (GSAP + ScrollTrigger + SplitText + Lenis)
   ========================================================================== */
const EASE = { out: "power3.out", inOut: "power2.inOut", expo: "expo.out" };
const DUR = { fast: .4, base: .8, slow: 1.2 };
const STAGGER = .06;

const loadScript = (src) => new Promise((ok, fail) => {
  const s = document.createElement("script");
  s.src = src; s.onload = ok; s.onerror = fail;
  document.head.append(s);
});
afterLoad(() => loadScript("/assets/vendor/gsap-3.15.0.min.js")
  .then(() => Promise.all(["ScrollTrigger-3.15.0", "SplitText-3.15.0", "lenis-1.3.26"].map((f) => loadScript(`/assets/vendor/${f}.min.js`))))
  .then(() => document.fonts.ready)
  .then(initMotion)
  .catch(() => {})); // sem as bibliotecas o site continua completo, só sem animação

function initMotion() {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  gsap.matchMedia().add({
    motion: "(prefers-reduced-motion: no-preference)",
    desktop: "(min-width: 1024px)",
    finePointer: "(pointer: fine)",
  }, ({ conditions: { motion, desktop, finePointer } }) => {
    if (!motion) {
      // Movimento reduzido: sem pin, sem scrub, sem Lenis. Só fades curtos.
      gsap.utils.toArray("[data-reveal]").forEach((el) =>
        gsap.from(el, { opacity: 0, duration: DUR.fast, scrollTrigger: once(el) }));
      return;
    }
    // Elementos dentro de seções pinadas são animados pela própria seção no desktop
    const free = (sel) => gsap.utils.toArray(sel)
      .filter((el) => !el.closest(".hero__head, .hero__side") && !(desktop && el.closest("[data-pin]")));

    // Pins primeiro e na ordem da página: o que vem depois já mede a posição com o espaço deles
    const cleanups = [smoothScroll(), heroScroll()];
    if (desktop) cleanups.push(pinZoom(), pinPilares(), pinAno());
    cleanups.push(reveals(free));
    if (desktop && finePointer) cleanups.push(cursor(), magnetic());
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    return () => cleanups.forEach((fn) => fn && fn());
  });
}

// O ano: a seção fica presa e o scroll percorre os dez meses (desktop)
function pinAno() {
  const stage = $(".ano__stage", ano);
  ano.classList.add("is-pinned", "is-scrub");
  const st = ScrollTrigger.create({
    trigger: stage, start: "top top", end: "+=220%", pin: true, scrub: true,
    onUpdate: (self) => setAno(self.progress * 9, true),
  });
  setAno(0, true);
  irParaMes = (i) => scrollToY(st.start + (st.end - st.start) * i / 9 + 1);
  return () => {
    irParaMes = null;
    ano.classList.remove("is-pinned", "is-scrub");
    setAno(Math.max(mesAtivo, 0), false);
  };
}

function once(trigger, start = "top 85%") { return { trigger, start, once: true }; }

function smoothScroll() {
  lenis = new Lenis();
  const raf = (t) => lenis.raf(t * 1000);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // Âncoras passam pelo Lenis (ele já respeita o scroll-padding-top do CSS) e levam o foco junto
  const onClick = (e) => {
    const a = e.target.closest('a[href*="#"]:not(.a11y-bar a)');
    const target = a && a.pathname === location.pathname && a.hash.length > 1 && $(a.hash);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target);
    history.pushState(null, "", a.hash);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };
  document.addEventListener("click", onClick);
  return () => {
    document.removeEventListener("click", onClick);
    gsap.ticker.remove(raf);
    gsap.ticker.lagSmoothing(500, 33);
    lenis.destroy();
    lenis = null;
  };
}

// Padrões reutilizáveis via atributo (seção 6)
function reveals(free) {
  free('[data-reveal="fade-up"]').forEach((el) =>
    gsap.from(el, { y: 40, opacity: 0, duration: DUR.base, ease: EASE.out, scrollTrigger: once(el) }));

  free('[data-reveal="lines"]').forEach((el) => SplitText.create(el, {
    type: "lines", mask: "lines", autoSplit: true, aria: "none",
    onSplit: (s) => gsap.from(s.lines, { yPercent: 100, duration: DUR.base, stagger: STAGGER * 1.5, ease: EASE.out, scrollTrigger: once(el) }),
  }));

  free('[data-reveal="image"]').forEach((el) => {
    const inner = el.querySelector("img, video") || el.firstElementChild;
    const tl = gsap.timeline({ scrollTrigger: once(el) })
      .fromTo(el, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: DUR.slow, ease: EASE.expo });
    if (inner) tl.from(inner, { scale: 1.2, duration: DUR.slow, ease: EASE.expo }, 0);
  });

  gsap.utils.toArray('[data-scrub="words"]').forEach((el) => SplitText.create(el, {
    type: "words", autoSplit: true, aria: "none",
    onSplit: (s) => gsap.fromTo(s.words.filter((w) => !w.closest(".muted")), { color: "#62667F" }, {
      color: "#111749", stagger: .1, ease: "none",
      scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
    }),
  }));

  gsap.utils.toArray("[data-count]").forEach((el) => {
    const n = { v: 0 };
    gsap.to(n, {
      v: +el.dataset.count, duration: DUR.slow, ease: EASE.out, scrollTrigger: once(el),
      onUpdate: () => (el.textContent = Math.round(n.v)),
    });
  });

  free("[data-draw]").forEach((p) => gsap.fromTo(p, undrawn(p),
    { strokeDashoffset: 0, duration: DUR.slow, ease: EASE.inOut, scrollTrigger: once(p.ownerSVGElement, "top 75%") }));
}

// Traço "apagado" sem o pontinho da ponta arredondada (gap longo + folga no offset)
function undrawn(p) {
  const len = p.getTotalLength();
  return { strokeDasharray: `${len} ${len * 2}`, strokeDashoffset: len + 10 };
}

function heroScroll() {
  const st = { trigger: ".hero__card", start: "top top", end: "bottom top", scrub: true };
  gsap.to(".hero__media", { yPercent: 10, ease: "none", scrollTrigger: st });
  gsap.to(".hero__wordmark > span", { yPercent: 10, ease: "none", scrollTrigger: { ...st } });
}

// Vida na Nine: o vídeo do centro cresce até a tela inteira e as 8 fotos se afastam (desktop)
function pinZoom() {
  const zoom = $("[data-zoom-grid]"), center = $(".zoom__center", zoom), video = $("video", center);
  const ring = gsap.utils.toArray(".zoom__item", zoom);
  const tilt = [-8, 6, -5, 9, -7, 5, -6, 8];
  zoom.classList.add("is-pinned");
  // clip inicial = a célula do meio do grid, medida dentro do quadro vertical do vídeo
  const cell = () => {
    const z = zoom.getBoundingClientRect(), c = center.getBoundingClientRect(), cs = getComputedStyle(zoom);
    const gap = parseFloat(cs.rowGap), pt = parseFloat(cs.paddingTop), pb = parseFloat(cs.paddingBottom);
    const w = (z.width - 2 * gap) / 3, h = (z.height - pt - pb - 2 * gap) / 3;
    const x = z.left + w + gap, y = z.top + pt + h + gap;
    return `inset(${y - c.top}px ${c.right - x - w}px ${c.bottom - y - h}px ${x - c.left}px round 16px)`;
  };
  const away = (axis) => (i, el) => axis === "x"
    ? (el.offsetLeft + el.offsetWidth / 2 - zoom.clientWidth / 2) * 1.3
    : (el.offsetTop + el.offsetHeight / 2 - zoom.clientHeight / 2) * 1.3;

  gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: { trigger: zoom, start: "top top", end: "+=150%", pin: true, scrub: .6, invalidateOnRefresh: true },
  })
    .fromTo(video, { clipPath: cell }, { clipPath: "inset(0px 0px 0px 0px round 0px)", duration: 1 }, 0)
    .to(ring, { x: away("x"), y: away("y"), rotation: (i) => tilt[i], opacity: 0, duration: .8, ease: "power2.in" }, 0)
    .fromTo(zoom, { "--bg": 0 }, { "--bg": 1, duration: .6 }, .3)
    .fromTo(".zoom__phrase", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .4 }, .65);
  return () => zoom.classList.remove("is-pinned");
}

// Pilares: 3 capítulos numa seção pinada (desktop)
function pinPilares() {
  const sec = $(".pilares"), stage = $(".pilares__stage", sec);
  const arts = gsap.utils.toArray(".pilar", stage);
  const part = (s) => arts.map((a) => $(s, a));
  const [texts, medias, arcs, bars] = [".pilar__text", ".pilar__media", ".arc", ".pilar__bar"].map(part);
  const brushes = arts.map((a) => [...a.querySelectorAll("[data-draw]")]);
  sec.classList.add("is-pinned");

  brushes.flat().forEach((p) => gsap.set(p, undrawn(p)));
  gsap.set(texts.slice(1), { autoAlpha: 0, y: 40 });
  gsap.set(arcs.slice(1), { clipPath: "inset(100% 0 0 0)" });

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: stage, start: "top top", end: () => "+=" + innerHeight * arts.length, pin: true, scrub: .6, invalidateOnRefresh: true },
  });
  arts.forEach((_, i) => {
    if (i) {
      tl.to(texts[i - 1], { autoAlpha: 0, y: -40, duration: .4, ease: EASE.inOut })
        .to(medias[i - 1], { scale: .95, autoAlpha: 0, duration: .5, ease: EASE.inOut }, "<")
        .to(arcs[i], { clipPath: "inset(0% 0 0 0)", duration: .6, ease: EASE.inOut }, "<")
        .to(texts[i], { autoAlpha: 1, y: 0, duration: .4, ease: EASE.inOut }, "<.2");
    }
    tl.to(brushes[i], { strokeDashoffset: 0, duration: .5, ease: EASE.inOut }, i ? "<" : 0)
      .fromTo(bars[i], { "--p": 0 }, { "--p": 1, duration: 1 });
  });
  return () => sec.classList.remove("is-pinned");
}

// Cursor: segue o mouse com lerp; "Ver" sobre imagens/vídeos, encolhe sobre links
function cursor() {
  const c = document.createElement("div");
  c.className = "cursor";
  c.setAttribute("aria-hidden", "true");
  c.innerHTML = "<span>Ver</span>";
  document.body.append(c);
  gsap.set(c, { x: -100, y: -100, scale: .2 });
  const xTo = gsap.quickTo(c, "x", { duration: .35, ease: "power3" });
  const yTo = gsap.quickTo(c, "y", { duration: .35, ease: "power3" });
  const move = (e) => { xTo(e.clientX); yTo(e.clientY); };
  const over = (e) => {
    const view = e.target.closest("img, video, [role=img]");
    const link = !view && e.target.closest("a, button, summary, .door, label, input, select, textarea");
    gsap.to(c, { scale: view ? 1 : link ? .1 : .2, duration: .3, ease: EASE.out });
    gsap.to(c.firstChild, { opacity: view ? 1 : 0, duration: .2 });
  };
  addEventListener("pointermove", move);
  document.addEventListener("pointerover", over);
  return () => { removeEventListener("pointermove", move); document.removeEventListener("pointerover", over); c.remove(); };
}

// Botões que atraem levemente o cursor
function magnetic() {
  const offs = gsap.utils.toArray("[data-magnetic]").map((b) => {
    const xTo = gsap.quickTo(b, "x", { duration: .4, ease: "power3" });
    const yTo = gsap.quickTo(b, "y", { duration: .4, ease: "power3" });
    const move = (e) => {
      const r = b.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * .25);
      yTo((e.clientY - r.top - r.height / 2) * .25);
    };
    const leave = () => { xTo(0); yTo(0); };
    b.addEventListener("pointermove", move);
    b.addEventListener("pointerleave", leave);
    return () => { b.removeEventListener("pointermove", move); b.removeEventListener("pointerleave", leave); };
  });
  return () => offs.forEach((off) => off());
}
