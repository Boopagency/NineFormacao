# Nine Academia de Influência: site da formação

Site de uma página da formação da Nine (antes vivia em `/academia/` no repositório `nineacademia`, junto com o site da Faculdade, que foi deixado de lado em nov/2026).

**Objetivo:** quem chega precisa entender o que a Nine é, o que vai aprender, como é o ano e a semana, e ter sempre um caminho claro para falar com a equipe.
**Não mostrar preço.** Valores são apresentados pela equipe; a pergunta "Qual é o investimento?" no FAQ só leva ao contato.

## Arquivos
- `index.html`: a página. Mantida à mão. O CSS fica embutido em `<style id="css">`.
- `style.css`: fonte do CSS. Depois de editar, rode `python3 build.py` (minifica e embute na página).
- `main.js`: todo o comportamento. No topo fica a lista `GALERIA` do mural.
- `pre-inscricao/index.html` + `pagina.js`: página com o formulário da Ummense em iframe (mesmo visual, CSS embutido pelo `build.py`). Todos os botões "Quero conhecer" do site levam para `/pre-inscricao/`. O site não tem mais formulário em HTML.
- `assets/img/galeria/` (mural, `<id>-320.webp`, `<id>-600.webp`, `<id>.webp`), `assets/img/curso/` (fotos do Drive da Nine e recortes da apresentação 2026), `assets/img/pilares/` (colagens), `assets/video/`, `assets/vendor/` (GSAP, ScrollTrigger, SplitText, Lenis), `assets/logo/nine-wordmark.svg` (NINE + coroa, do SVG oficial; no site o logo é o `<symbol id="nine-logo">` do `index.html`, que herda a cor do texto).

- `material/Nine-formacao-pendencias-do-site.pdf` (fonte: `material/pendencias-do-site.html`): documento de pendências com a identidade da Nine, para enviar ao cliente. A lista da seção "Pendências" abaixo é a mesma; ao fechar um item, atualize os dois e gere o PDF de novo com o Chromium (`page.pdf`, `preferCSSPageSize`, `printBackground`).

- `material/Nine-formacao-o-que-precisamos-de-voces.pdf` (fonte: `material/o-que-precisamos-de-voces.html`): versão curta e simples da lista, só com o que a Nine precisa nos enviar, incluindo as perguntas sobre o Nine Legacy.

Sem framework e sem build além do `build.py`. Para ver localmente: `python3 -m http.server` na raiz (os caminhos são absolutos).

## Ordem da página
Barra do curso de IA (leva a #ia) → Nav → Hero (frase + CTA dentro do card; lema e ficha abaixo) → Para quem é (manifesto) → O que é a Nine (números) → Vida na Nine (zoom "Imagine você aqui.") → Três pilares (pinado) → Grade completa (abas por pilar) → Intensivos (portas) → O ano (calendário pinado, mês a mês) → A semana (grade horária com filtro por pilar) → Certificações → Equipe → Depoimentos → Mural e Reels → Faixa de CTA → IA para Empresários → Onde acontece → Dúvidas → Por que Nine (o 9) → Contato (botão para a pré-inscrição) → Rodapé.

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
- **Curso IA para Empresários | Nine Lab 2026:** textos, conteúdos, dados e link de inscrição (Asaas) enviados pela Nine; o valor (R$ 3.000) aparece nessa seção. Datas enviadas: 7/out a 25/nov, toda quarta, 9h30 às 11h30, Rua Arthur Bettes, 382, Portão.
- **Equipe:** 20 nomes enviados (a lista tem Keli Campos duas vezes; entrou uma). Cards com iniciais até chegarem as fotos; para colocar a foto, troque o `<span class="prof__mono">` do card por `<img>` dentro de `.prof__ph`.
- **Formulário:** Ummense (iframe `https://app.ummense.com/form/1eb7f6ec-9181-68ee-8f79-0a7cd410799c?iframe=1`; link público `https://ummen.se/BmbT6O`).
- **Depoimentos:** Matheus Taborda, Hellenmarie Rafael e Carlos Eduardo Dolci, com o texto exato da apresentação.
- **Contato:** contato@9ai.com.br, secretaria@9ai.com.br, (41) 3333-3363, Instagram @nine.academia.

## Identidade
- Navy `#111749` + dourado `#F5B310` + coroa, fundo `#FAFAF7`, fonte Inter Tight (local). **Atenção:** o manual de marca (CorelDRAW, 2024) indica azul `#2A2D54`, amarelo `#F4B431` e fonte Gilroy (Light e ExtraBold). O site ainda usa as cores e a fonte do briefing original; trocar depende de decisão (Gilroy exige licença).
- Cor por pilar, sempre a mesma na página inteira: 01 verde, 02 coral, 03 violeta. Aparece nas colagens, na grade, no calendário do ano e na semana.
- 80% calmo (branco, navy, respiro), 20% cor nos momentos-chave. Sem estética de igreja genérica.
- **Barra do curso de IA:** degradê azul profundo → ciano com grão, marca do N com órbita dourada e estrela (tokens `--ia-*`). Texto e destino ficam no bloco `.ia-bar` do `index.html`.

## Regras
- **Contraste:** dourado só é texto sobre navy. Sobre fundo claro, texto sempre navy ou `--ink-muted`. Sobre foto ou vídeo, sempre com degradê navy por baixo. Verde, coral e violeta são decoração; quando viram fundo usam a versão clara (`--tint-*`) com texto navy.
- **Acessibilidade (e-MAG/WCAG AA):** barra de atalhos com accesskey, `<noscript>`, foco visível, sem `style=""` no HTML, sem `target="_blank"`, decoração via CSS, `fieldset` nos formulários, tudo operável por teclado. Validar com W3C vnu e axe-core (com animação ligada e com movimento reduzido).
- **Desempenho:** sem preloader, fonte local com preload, CSS embutido, GSAP/Lenis só depois do `load`, vídeos com `preload="none"` e capa, imagens fora da tela com `lazy`.
- **Motion:** animar só `transform`, `opacity` e `clip-path`; cada coisa anima uma vez, exceto o que acompanha o scroll.
- **Texto:** PT-BR, falando com "você". Corpo mínimo de 16px. Sem travessão.

## Hospedagem
Fica a cargo da equipe da Nine: o código é entregue a eles. Site estático, sem servidor e sem build; publicar a pasta inteira na raiz do endereço (os caminhos são absolutos). `build.py` só é preciso depois de editar o `style.css`.

## Pendências (dependem da Nine)
- Nine Legacy: ainda sem informação; não aparece no site. As perguntas para a Nine estão no PDF "O que precisamos de vocês".
- Curso de IA: datas já em andamento (7/out a 25/nov); saber se há nova turma. Símbolo oficial do curso (o N com órbita foi redesenhado). Confirmar que o valor pode aparecer.
- Ano e datas da próxima turma; se é preciso ser de alguma igreja.
- A apresentação fala em 4 certificados e lista 3; o site mostra os 3.
- Endereço final do site: a Nine informa, para preencher `og:image` com URL absoluta, canonical e sitemap.
- Política de privacidade completa (o site não coleta mais dados; quem coleta agora é o formulário da Ummense, então a política precisa cobrir isso).
- Fotos dos professores; originais em alta da estrutura e dos depoimentos.
- Logo da Academia em SVG (o recebido é o da Faculdade), padrão de coroas em vetor e decisão sobre as cores e a fonte oficiais.
