// TESTE DO SITE DA NINE, para colar no console do navegador (Chrome: F12 ou Cmd+Option+J > aba Console).
// Abra qualquer página do site já publicado (ex.: https://9ai.com.br/), cole tudo e aperte Enter.
// Se o Chrome pedir, digite "allow pasting" (ou "permitir colar") e cole de novo.
// Leva de 20 a 60 segundos. No fim aparece o resumo com ✅ (passou), ⚠️ (atenção) e ❌ (falhou).
(async () => {
  const PAGINAS = ["/", "/cursos/", "/cursos/ia-para-empresarios/", "/legacy/", "/pre-inscricao/", "/links/"];
  const linhas = [];
  const ok = (teste, detalhe = "") => linhas.push({ "": "✅", teste, detalhe });
  const aviso = (teste, detalhe = "") => linhas.push({ "": "⚠️", teste, detalhe });
  const falha = (teste, detalhe = "") => linhas.push({ "": "❌", teste, detalhe });
  const origem = location.origin;
  console.log("%cTestando o site da Nine em " + origem + " …", "font-weight:bold;font-size:14px");

  // 0. Endereço seguro
  location.protocol === "https:" || /localhost|127\.0\.0\.1/.test(location.hostname)
    ? ok("Endereço com HTTPS (cadeado)", location.protocol)
    : falha("Endereço com HTTPS (cadeado)", "o site está em http://; peça para a hospedagem ativar o SSL");

  // 1. Páginas: abrem, têm o conteúdo certo e nada que não deveria aparecer
  const refs = new Set();
  const PROIBIDO = [
    [/3333-?3363|\(41\)\s*3333/, "telefone (foi retirado do site)"],
    [/clube de benef/i, '"clube de benefícios" (foi retirado do Legacy)'],
    [/já foi aluno/i, '"Já foi aluno?" (o menu agora é "Legacy")'],
    [/—/, "travessão"],
    [/a confirmar|lorem ipsum/i, "texto provisório"],
  ];
  for (const p of PAGINAS) {
    let r;
    try { r = await fetch(p, { cache: "no-store" }); } catch (e) { falha("Página " + p, "não respondeu: " + e.message); continue; }
    if (!r.ok) { falha("Página " + p, "respondeu " + r.status); continue; }
    const html = await r.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const comp = r.headers.get("content-encoding");
    const titulo = doc.querySelector("h1")?.textContent.trim().replace(/\s+/g, " ").slice(0, 50) || "(sem título)";
    ok("Página " + p, `abre (200) · "${titulo}"` + (comp ? ` · comprimida (${comp})` : ""));
    if (!comp && !/localhost|127\.0\.0\.1/.test(location.hostname)) aviso("Compressão em " + p, "a página não veio comprimida: o site funciona, mas fica mais pesado; ligue gzip/Brotli na hospedagem");
    doc.querySelectorAll("script, style, noscript").forEach((e) => e.remove());
    const texto = doc.body.textContent.replace(/\s+/g, " ");
    for (const [re, nome] of PROIBIDO) { const m = texto.match(re); if (m) falha("Texto em " + p, "apareceu " + nome + ": …" + texto.slice(Math.max(0, m.index - 30), m.index + 40) + "…"); }
    if (doc.querySelector('a[target="_blank"]')) aviso("Links em " + p, 'algum link abre em nova aba (target="_blank")');
    // coleta tudo que a página usa
    const pega = (v) => { if (!v) return; v = v.trim(); if (/^(mailto:|tel:|data:|javascript:|#)/.test(v) || v === "") return; refs.add(new URL(v, origem + p).href); };
    const docOriginal = new DOMParser().parseFromString(html, "text/html");
    docOriginal.querySelectorAll("[href],[src],[poster],[data-src],[data-poster]").forEach((el) => ["href", "src", "poster", "data-src", "data-poster"].forEach((a) => el.hasAttribute(a) && pega(el.getAttribute(a))));
    docOriginal.querySelectorAll("[srcset],[imagesrcset]").forEach((el) => (el.getAttribute("srcset") || el.getAttribute("imagesrcset")).split(",").forEach((s) => pega(s.trim().split(" ")[0])));
    for (const m of html.matchAll(/url\(["']?(\/[^"')]+)["']?\)/g)) pega(m[1]);
  }

  // 2. Fotos do mural (montadas pelo JavaScript, inclusive as do "Ver mais")
  try {
    const js = await (await fetch("/main.min.js", { cache: "no-store" })).text();
    const ids = [...new Set([...js.matchAll(/id:\s*"([\w-]+)"/g)].map((m) => m[1]))];
    ids.forEach((id) => ["-320", "-600", ""].forEach((s) => refs.add(origem + `/assets/img/galeria/${id}${s}.webp`)));
    ids.length ? ok("Mural", ids.length + " fotos (3 tamanhos cada) entram na conferência") : aviso("Mural", "não achei a lista de fotos no main.min.js");
  } catch (e) { falha("Mural", "main.min.js não abriu"); }

  // 3. Todos os arquivos e links internos existem (imagens, vídeos, fonte, scripts, páginas)
  const internos = [...refs].filter((u) => u.startsWith(origem));
  const externos = [...refs].filter((u) => !u.startsWith(origem));
  const quebrados = [];
  let n = 0;
  const fila = [...internos];
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (fila.length) {
      const u = fila.shift();
      try {
        let r = await fetch(u, { method: "HEAD", cache: "no-store" });
        if (r.status === 405 || r.status === 501) r = await fetch(u, { cache: "no-store" });
        if (!r.ok) quebrados.push(r.status + " " + u.replace(origem, ""));
      } catch (e) { quebrados.push("erro " + u.replace(origem, "")); }
      if (++n % 50 === 0) console.log(`  … ${n} de ${internos.length} arquivos conferidos`);
    }
  }));
  quebrados.length
    ? falha("Arquivos do site", quebrados.length + " não abriram: " + quebrados.slice(0, 8).join(", ") + (quebrados.length > 8 ? " …" : ""))
    : ok("Arquivos do site", internos.length + " imagens, vídeos, fontes, scripts e páginas abrem");
  ok("Links externos encontrados", externos.map((u) => new URL(u).hostname).filter((v, i, a) => a.indexOf(v) === i).join(", ") + " (abra cada um para conferir)");

  // 4. Endereço sem barra no fim e página que não existe
  try { const r = await fetch("/legacy", { cache: "no-store" }); r.ok ? ok('Endereço sem barra ("/legacy")', "abre") : falha('Endereço sem barra ("/legacy")', "respondeu " + r.status); } catch (e) { falha('Endereço sem barra ("/legacy")', e.message); }
  try {
    const r = await fetch("/pagina-que-nao-existe-" + Date.now(), { cache: "no-store" });
    const t = await r.text();
    if (r.status !== 404) falha("Página que não existe", "respondeu " + r.status + " em vez de 404");
    else if (/Esta página não existe/.test(t)) ok("Página que não existe", "mostra a página 404 da Nine");
    else aviso("Página que não existe", "responde 404, mas com a página padrão da hospedagem (na Vercel/Netlify a 404.html é automática; no Apache, o .htaccess liga)");
  } catch (e) { falha("Página que não existe", e.message); }

  // 5. Vídeo: o iPhone só toca se a hospedagem entregar o vídeo em partes (Range)
  try {
    const r = await fetch("/assets/video/hero-celular.mp4", { headers: { Range: "bytes=0-1023" }, cache: "no-store" });
    r.status === 206 ? ok("Vídeos no iPhone", "a hospedagem entrega o vídeo em partes (206)") : aviso("Vídeos no iPhone", "a hospedagem respondeu " + r.status + " em vez de 206; teste o vídeo do topo num iPhone");
  } catch (e) { falha("Vídeos", e.message); }

  // 6. Arquivos que não precisam estar públicos
  try { const r = await fetch("/.htaccess", { cache: "no-store" }); r.ok && !/<html/i.test(await r.text()) ? aviso(".htaccess", "está público (não faz mal, só não é necessário)") : ok(".htaccess", "não fica visível para o público"); } catch (e) {}

  // 7. Formulário de pré-inscrição (Ummense) na página
  const ifr = document.querySelector("iframe[src*='ummense']");
  if (location.pathname.startsWith("/pre-inscricao")) {
    ifr ? ok("Formulário (Ummense)", "está na página; role até ele e veja se os campos aparecem") : falha("Formulário (Ummense)", "não achei o formulário nesta página");
  } else {
    const botoes = document.querySelectorAll('a[href="/pre-inscricao/"]').length;
    botoes ? ok("Botões de pré-inscrição nesta página", botoes + " botões; clique em um: o formulário deve abrir numa janela em até 1 segundo") : aviso("Botões de pré-inscrição", "nenhum nesta página");
  }

  // 8. Esta página: imagens quebradas e ano do rodapé
  const quebradasAqui = [...document.images].filter((i) => i.complete && i.currentSrc && i.naturalWidth === 0).map((i) => i.currentSrc.replace(origem, ""));
  quebradasAqui.length ? falha("Imagens desta página", quebradasAqui.join(", ")) : ok("Imagens desta página", "nenhuma quebrada (as de baixo carregam ao rolar)");
  const anos = [...document.querySelectorAll("span[data-year], span[data-ano]")].map((e) => e.textContent.trim());
  anos.length && anos.every((a) => a === String(new Date().getFullYear())) ? ok("Ano do rodapé", anos[0]) : aviso("Ano do rodapé", anos.join(", ") || "não encontrado nesta página");

  // Resumo
  const f = linhas.filter((l) => l[""] === "❌").length, a = linhas.filter((l) => l[""] === "⚠️").length;
  console.table(linhas);
  console.log(f ? `%c❌ ${f} falha(s) e ${a} aviso(s). Veja a tabela acima.` : a ? `%c✅ Tudo certo, com ${a} aviso(s) para olhar.` : "%c✅ Tudo certo! O site está completo.", `font-weight:bold;font-size:15px;color:${f ? "#B42318" : "#067647"}`);
  return linhas;
})();
