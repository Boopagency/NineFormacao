# Nine Academia de Influência: site da formação

Site de uma página da formação da Nine (antes vivia em `/academia/` no repositório `nineacademia`, junto com o site da Faculdade, que foi deixado de lado em nov/2026).

**Objetivo:** quem chega precisa entender o que a Nine é, o que vai aprender, como é o ano e a semana, e ter sempre um caminho claro para falar com a equipe.
**Não mostrar o preço da formação.** Valores são apresentados pela equipe; a pergunta "Qual é o investimento?" no FAQ só leva à pré-inscrição. Os valores do curso de IA (R$ 3.000) e do Legacy (R$ 99/mês) aparecem porque vieram no material enviado pela Nine.

## Arquivos
- `index.html`: a página. Mantida à mão. O CSS fica embutido em `<style id="css">`.
- `style.css`: fonte do CSS. Depois de editar, rode `python3 build.py` (minifica e embute na página).
- `main.js`: todo o comportamento. No topo fica a lista `GALERIA` do mural. **As páginas carregam `main.min.js` e `pagina.min.js`**, gerados pelo `build.py` a partir de `main.js` e `pagina.js`; edite os arquivos sem `.min` e rode `python3 build.py`.
- `cursos/index.html` (área de cursos, com tags de status e filtro), `cursos/ia-para-empresarios/index.html` e `legacy/index.html` (menu "Legacy"): páginas à mão, mesmo cabeçalho `.fnav` e rodapé mínimo. O `build.py` embute o CSS em todas as páginas listadas nele.
- `formulario.js` (→ `formulario.min.js`, carregado em todas as páginas menos /pre-inscricao/, e no link na bio): faz os botões que levam a `/pre-inscricao/` e a `https://ummen.se/9suDkY` abrirem o formulário da Ummense numa janela (`<dialog class="fjan">`) na própria página. O iframe começa a carregar escondido no primeiro gesto da pessoa (toque, mouse, roda, teclado; **não** em `scroll`, que scripts e o Lighthouse também disparam), então o clique abre o formulário pronto. O CSS da janela vem dentro do próprio script. Sem JavaScript, os links seguem normais.
- `pre-inscricao/index.html` + `pagina.js` (ano do rodapé e filtro de /cursos/): página com o formulário da Ummense em iframe (mesmo visual, CSS embutido pelo `build.py`). Todos os botões "Quero conhecer" do site levam para `/pre-inscricao/`. O site não tem mais formulário em HTML.
- `assets/img/galeria/` (mural, `<id>-320.webp`, `<id>-600.webp`, `<id>.webp`), `assets/img/curso/` (fotos do Drive da Nine e recortes da apresentação 2026), `assets/img/pilares/` (colagens), `assets/video/`, `assets/vendor/` (GSAP, ScrollTrigger, SplitText, Lenis), `assets/logo/nine-wordmark.svg` (NINE + coroa, do SVG oficial; no site o logo é o `<symbol id="nine-logo">` do `index.html`, que herda a cor do texto).

- `material/Nine-formacao-pendencias-do-site.pdf` (fonte: `material/pendencias-do-site.html`): documento de pendências com a identidade da Nine, para enviar ao cliente. A lista da seção "Pendências" abaixo é a mesma; ao fechar um item, atualize os dois e gere o PDF de novo com o Chromium (`page.pdf`, `preferCSSPageSize`, `printBackground`).

- `links/index.html`: link na bio da Nine (`/links/`, no lugar do Linktree). Página avulsa com CSS e JS próprios embutidos (não passa pelo `build.py`). Visual de página impressa, de propósito: cor chapada, fios finos, índice numerado, botão retangular; **sem cartões arredondados, sombras, vidro ou brilho** (o cliente rejeitou isso como "cara de IA"). A única suavidade é a transição da foto para o azul: desfoque crescente + degradê (`.foto::before` e `.foto::after`), na base no celular e na lateral direita no computador, como no link na bio da Boop. Foto do Romulo no palco (`assets/img/links/`) e duas abas: "Quero entrar" e "Legacy" (`/links/#legacy` ou `/links/#ex-alunos` abrem direto no Legacy). Os botões de YouTube e Flickr estão com `hidden` e `href="#"` até a Nine mandar os endereços.

- `material/Nine-proposta-site-e-hospedagem.pdf` (fonte: `material/proposta-site-e-hospedagem.html`, imagens em `material/img/`): proposta comercial da Boop com as três formas de seguir (site entregue, site + manutenção Boop e plano completo com painel de edição e link na bio; R$ 299/mês em qualquer uma delas), a recomendação da Vercel e a transferência do projeto.

- `material/Nine-entrega-do-site.pdf` (fonte: `material/entrega-do-site.html`): documento de entrega para a Nine: o site (endereço de testes `nineformacao.vercel.app`), o resultado do teste do Google sem notas numéricas (pedido do cliente), a janela do formulário, o link na bio e como o código chega até eles (pacote `nine-site.zip` com `LEIA-ME.md`, sem `material/` nem `CLAUDE.md`), hospedagem e troca do domínio sem mexer nos registros MX do e-mail.
- `LEIA-ME.md`: guia curto de publicação para quem for hospedar o site do lado da Nine.

- `material/Nine-formacao-o-que-precisamos-de-voces.pdf` (fonte: `material/o-que-precisamos-de-voces.html`): versão curta e simples da lista, só com o que a Nine precisa nos enviar, sem as perguntas sobre o Legacy, que já foram respondidas pela proposta.

Sem framework e sem build além do `build.py`. Para ver localmente: `python3 -m http.server` na raiz (os caminhos são absolutos).

## Ordem da página
Faixa azul do topo (só ícone e texto; a faixa inteira leva a /cursos/) → Nav (Programa, Cursos, Legacy; igual em todas as páginas) → Hero (frase + CTA dentro do card; lema e ficha abaixo; no desktop três vídeos lado a lado, no celular um vídeo vertical próprio, `hero-celular.mp4`: corte do Reels do intensivo Mundo Digital sem os letreiros, o quadro preto e o slide de branding) → Para quem é (manifesto) → O que é a Nine (números) → Vida na Nine (zoom "Imagine você aqui.") → Três pilares (pinado) → Grade completa (abas por pilar) → Intensivos (portas) → O ano (calendário pinado, mês a mês) → A semana (grade horária com filtro por pilar) → Certificações → Equipe → Depoimentos → Mural e Reels → Faixa de CTA → Onde acontece → Dúvidas → Por que Nine (o 9) → Contato (botão para a pré-inscrição) → Rodapé. Fora da página principal: /cursos/, /cursos/ia-para-empresarios/, /legacy/ e /pre-inscricao/. O menu é mínimo de propósito (3 itens); as outras seções ficam no rodapé. Vira hambúrguer abaixo de 1024px.

**Celular (abaixo de 768px, o calendário abaixo de 1024px):** a página tem layout próprio, não é só o desktop empilhado. Grade: abas curtas com os verbos dos pilares (Conhecer, Treinar, Inspirar), listas de módulos e áreas de influência recolhidas em `<details data-colapsa>` (abertas no desktop e sem JavaScript), Paths em carrossel. O ano: sem o gráfico; seletor de meses fixo e cartões que se deslizam, um mês por vez. A semana: seletor de dias, um dia por vez, abrindo em hoje (o filtro por pilar só existe no desktop). Regiões que rolam para o lado recebem `tabindex` por JavaScript (exigência do axe). Carrosséis que rolam para o lado usam `scroll-padding-inline` igual à margem, para o primeiro card não colar na borda da tela.

**Cabeçalho:** o mesmo bloco (`<div class="top" data-top>`: faixa azul, menu, menu do celular) está copiado em `index.html` e nas quatro páginas internas; `pagina.js` dá a elas o comportamento do menu. Se mudar o menu, mude nas cinco páginas. Na página atual o item do menu leva `aria-current="page"`.

Seções pinadas no desktop: zoom, pilares e o ano. No máximo três, nunca duas seguidas. O zoom da galeria também roda no celular (grid 3x3 no tamanho da tela). Pilares e o ano só prendem acima de 1024px; com `prefers-reduced-motion` nada fica preso.

## Conteúdo: de onde vem cada dado
Tudo vem do **Manual do Aluno (versão 1.2, 2026)** e da **Apresentação Nine 2026**. Não inventar dado. Se faltar, perguntar.
- **Formato:** presencial, em Curitiba (Comunhão Cristã Abba, Rua Engenheiro Niepce da Silva, 139, Portão). Intensivos no Hotel Campestre Leão de Judá (Av. Pres. Ernesto Geisel, 674, Colônia Witmarsum, Palmeira/PR).
- **Ano:** março a dezembro. Teologia (Fatemi), Jornadas e Intercâmbio Cultural de março a novembro; Paths I (mar–jul), II (ago), III (set–nov); intensivos em março, maio, julho e setembro; TCC em novembro; viagem de formatura em dezembro. O calendário é o da turma 2026.
- **Pilar 1, Conhecer sua identidade (18 módulos):** 16 de Teologia Livre (Fatemi) + mentoria em grupo + mentoria individual.
- **Pilar 2, Treinar suas habilidades (11 módulos):** 7 Jornadas (Comunicação Social, Empreendedorismo, Marketing & Venda, Dever Cívico, Tecnológica, Criativa, Corpo & Saúde), Intensivos (Seu Mundo, Mundo Digital, Mundo da Liderança com o ILI, Mundo Sofisticado) e Paths I, II e III. Bônus: 75h de serviço comunitário e até 25h de cursos extracurriculares.
- **Pilar 3, Inspirar o seu mundo (8 módulos):** Igreja; Educação e Comunicação; Governo & Política e Economia & Negócios; Arte & Cultura, Ciência & Tecnologia e Serviço Social.
- **Semana:** terça a sexta de manhã (9h–12h) em sala e à tarde (14h–18h) em Paths; segunda à tarde mentoria em grupo e Jornadas; Teologia 2º ano terça e quarta às 19h30; sábado mentoria individual e Culto AJ; domingo cultos.
- **Aprovação:** 700 de 1.100 créditos, 75% de presença por módulo, TCC com 70 pontos. Acima de 90%, conclusão com honra.
- **Certificações:** Nine Academia de Influência; Fatemi (Curso Livre de Teologia Ministerial); History Makers (treinamento do ILI). Na ficha do topo o terceiro é "History Makers", não "ILI".
- **Quem pode participar:** jovens e adultos que concluíram o ensino médio. Alunos de fora: alojamento no mesmo imóvel da sede, poucas vagas (respostas do FAQ vêm da Nine).
- **Cursos (/cursos/):** cada curso é um card com tag de status: `tag--aberto` (Pré-inscrição aberta), `tag--esgotado` (Vagas esgotadas) e `tag--comunidade` (Para ex-alunos); o atributo `data-status` do `<li>` (aberto, esgotado, comunidade) alimenta o filtro. Quando abrir uma turma nova, troque a tag, o `data-status` e o botão do card.
- **IA para Empresários | Nine Lab 2026 (/cursos/ia-para-empresarios/):** vagas esgotadas (decisão da Nine). Textos, conteúdos e dados enviados por eles: 7/out a 25/nov, toda quarta, 9h30 às 11h30, Rua Arthur Bettes, 382, Portão, R$ 3.000. O link de inscrição (Asaas, `https://www.asaas.com/c/81fd3y3vcawoylbw`) foi tirado da página por causa do esgotamento; para reabrir, recolocar o botão e trocar a tag.
- **Legacy (/legacy/, menu "Legacy"):** comunidade paga de ex-alunos, R$ 99 por mês, com 6 benefícios (conteúdos exclusivos, comunidade, mentorias, eventos, coworking, clube de benefícios). Texto da "Proposta LEGACY Nine" enviada pela Nine; o emblema (`assets/img/legacy/emblema.webp` e `emblema-560.webp`) é o arquivo transparente enviado pela Nine (1199 x 1312), sem fundo próprio; vive sobre o azul escuro. O botão "Quero ser Legacy" (na página e no link na bio) leva ao formulário da Ummense do Legacy: `https://ummen.se/9suDkY` (`app.ummense.com/form/1f1ded87-38e9-6b58-bbcb-0efff9114513`).
- **Equipe:** 20 nomes enviados (a lista tem Keli Campos duas vezes; entrou uma). Cards com iniciais até chegarem as fotos; para colocar a foto, troque o `<span class="prof__mono">` do card por `<img>` dentro de `.prof__ph`.
- **Formulário:** Ummense (iframe `https://app.ummense.com/form/1eb7f6ec-9181-68ee-8f79-0a7cd410799c?iframe=1`; link público `https://ummen.se/BmbT6O`).
- **Depoimentos:** Matheus Taborda, Hellenmarie Rafael e Carlos Eduardo Dolci, com o texto exato da apresentação.
- **Contato:** contato@9ai.com.br, secretaria@9ai.com.br, Instagram @nine.academia. **Sem telefone no site** (pedido da Nine, nov/2026): não recolocar o (41) 3333-3363 nem no JSON-LD.

## Identidade
- Cores oficiais do manual de marca (2024): azul `#2A2D54` e amarelo `#F4B431` (tokens `--navy` e `--gold`; `--navy-90` `#353862` é o degrau mais claro), coroa, fundo `#FAFAF7`. Fonte oficial: Gilroy (Light e ExtraBold); o site usa Inter Tight (local) porque a Gilroy exige licença.
- Cor por pilar, sempre a mesma na página inteira: 01 verde, 02 coral, 03 violeta. Aparece nas colagens, na grade, no calendário do ano e na semana.
- 80% calmo (branco, navy, respiro), 20% cor nos momentos-chave. Sem estética de igreja genérica.
- **Barra do curso de IA:** degradê azul profundo → ciano com grão, marca do N com órbita dourada e estrela (tokens `--ia-*`). Texto e destino ficam no bloco `.ia-bar` do `index.html`.

## Regras
- **Contraste (com as cores oficiais):** azul sobre papel 12,5:1; dourado sobre azul 7,1:1; azul sobre dourado 7,1:1; texto secundário sobre papel 5,4:1. Texto sobre barras coral/verde usa `#17192E`. Dourado só é texto sobre navy. Sobre fundo claro, texto sempre navy ou `--ink-muted`. Sobre foto ou vídeo, sempre com degradê navy por baixo. Verde, coral e violeta são decoração; quando viram fundo usam a versão clara (`--tint-*`) com texto navy.
- **Acessibilidade (e-MAG/WCAG AA):** barra de atalhos com accesskey, `<noscript>`, foco visível, sem `style=""` no HTML, sem `target="_blank"`, decoração via CSS, `fieldset` nos formulários, tudo operável por teclado. Validar com W3C vnu e axe-core (com animação ligada e com movimento reduzido).
- **Desempenho (Lighthouse 99 a 100 em tudo, celular e desktop; medir com servidor que comprime, ex.: Brotli):** sem preloader, fonte local com preload, CSS embutido, GSAP só depois do `load`, vídeos com `preload="none"` e capa, imagens fora da tela com `lazy` e com `srcset`. No celular não se carregam o Lenis (rolagem suave, só com mouse) nem o SplitText (só no desktop); títulos e palavras do manifesto têm versão leve. A inicialização das animações roda em etapas curtas (uma tarefa por etapa) para não travar a página. O formulário da Ummense pesa cerca de 2,7 MB (comprimido); a Nine reclamou da demora. Em /pre-inscricao/ ele carrega junto com a página (com `preconnect`); nas outras páginas, `formulario.js` o pré-carrega no primeiro gesto da pessoa e abre numa janela. Por isso essa página fica com Boas práticas 73 no Lighthouse (cookies do reCAPTCHA e aviso de CSP vêm da Ummense, não do site); o desempenho continua 99 a 100. Não voltar a atrasar o carregamento. Não reintroduzir scripts no carregamento nem imagens sem `srcset`.
- **Sem "cara de IA" (pedido da Nine):** o ano e a semana no celular, os cards de /cursos/ e a página do Legacy seguem a linguagem do link na bio: abas como texto com traço embaixo da escolha, fios finos, números, sem caixas arredondadas, pílulas, brilho ou sombra. As regras ficam nos dois blocos do fim do `style.css`; o resto do site ficou como estava, por escolha da Nine.
- **Motion:** animar só `transform`, `opacity` e `clip-path`; cada coisa anima uma vez, exceto o que acompanha o scroll.
- **Texto:** PT-BR, falando com "você". Corpo mínimo de 16px. Sem travessão.

## Hospedagem
Fica a cargo da equipe da Nine: o código é entregue a eles. Site estático, sem servidor e sem build; publicar a pasta inteira na raiz do endereço (os caminhos são absolutos). `build.py` só é preciso depois de editar o `style.css`.

## Pendências (dependem da Nine)
- Link na bio: endereços do YouTube e do Flickr da Nine.
- Legacy: se existir, o emblema em vetor. Confirmar que o valor (R$ 99/mês) pode aparecer.
- Curso de IA: se haverá nova turma (datas e link de inscrição); símbolo oficial do curso (o N com órbita da faixa do topo foi redesenhado).
- Ano e datas da próxima turma da formação; se é preciso ser de alguma igreja.
- A apresentação fala em 4 certificados e lista 3; o site mostra os 3.
- Endereço final do site: a Nine informa, para preencher `og:image` com URL absoluta, canonical e sitemap.
- Política de privacidade completa (o site não coleta mais dados; quem coleta agora é o formulário da Ummense, então a política precisa cobrir isso).
- Fotos dos professores; originais em alta da estrutura e dos depoimentos.
- Logo da Academia em SVG (o recebido é o da Faculdade), padrão de coroas em vetor e decisão sobre a fonte oficial (Gilroy, com licença) no lugar da Inter Tight.
