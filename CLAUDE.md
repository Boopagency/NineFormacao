# Nine Academia de Influência: site da formação

Site de uma página da formação da Nine (antes vivia em `/academia/` no repositório `nineacademia`, junto com o site da Faculdade, que foi deixado de lado em nov/2026).

**Objetivo:** quem chega precisa entender o que a Nine é, o que vai aprender, como é o ano e a semana, e ter sempre um caminho claro para falar com a equipe.
**Não mostrar o preço da formação.** Valores são apresentados pela equipe; a pergunta "Qual é o investimento?" no FAQ só leva à pré-inscrição. Os valores do curso de IA (R$ 3.000) e do Legacy (R$ 99/mês) aparecem porque vieram no material enviado pela Nine.

## Arquivos
- `index.html`: a página. Mantida à mão. O CSS fica embutido em `<style id="css">`.
- `style.css`: fonte do CSS. Depois de editar, rode `python3 build.py` (minifica e embute na página).
- `main.js`: todo o comportamento. No topo fica a lista `GALERIA` do mural.
- `cursos/index.html` (área de cursos, com tags de status e filtro), `cursos/ia-para-empresarios/index.html` e `legacy/index.html` (menu "Já foi aluno?"): páginas à mão, mesmo cabeçalho `.fnav` e rodapé mínimo. O `build.py` embute o CSS em todas as páginas listadas nele.
- `pre-inscricao/index.html` + `pagina.js` (ano do rodapé e filtro de /cursos/): página com o formulário da Ummense em iframe (mesmo visual, CSS embutido pelo `build.py`). Todos os botões "Quero conhecer" do site levam para `/pre-inscricao/`. O site não tem mais formulário em HTML.
- `assets/img/galeria/` (mural, `<id>-320.webp`, `<id>-600.webp`, `<id>.webp`), `assets/img/curso/` (fotos do Drive da Nine e recortes da apresentação 2026), `assets/img/pilares/` (colagens), `assets/video/`, `assets/vendor/` (GSAP, ScrollTrigger, SplitText, Lenis), `assets/logo/nine-wordmark.svg` (NINE + coroa, do SVG oficial; no site o logo é o `<symbol id="nine-logo">` do `index.html`, que herda a cor do texto).

- `material/Nine-formacao-pendencias-do-site.pdf` (fonte: `material/pendencias-do-site.html`): documento de pendências com a identidade da Nine, para enviar ao cliente. A lista da seção "Pendências" abaixo é a mesma; ao fechar um item, atualize os dois e gere o PDF de novo com o Chromium (`page.pdf`, `preferCSSPageSize`, `printBackground`).

- `material/Nine-formacao-o-que-precisamos-de-voces.pdf` (fonte: `material/o-que-precisamos-de-voces.html`): versão curta e simples da lista, só com o que a Nine precisa nos enviar, sem as perguntas sobre o Legacy, que já foram respondidas pela proposta.

Sem framework e sem build além do `build.py`. Para ver localmente: `python3 -m http.server` na raiz (os caminhos são absolutos).

## Ordem da página
Faixa azul do topo (só ícone e texto; a faixa inteira leva a /cursos/) → Nav (Programa, Cursos, Já foi aluno?; igual em todas as páginas) → Hero (frase + CTA dentro do card; lema e ficha abaixo) → Para quem é (manifesto) → O que é a Nine (números) → Vida na Nine (zoom "Imagine você aqui.") → Três pilares (pinado) → Grade completa (abas por pilar) → Intensivos (portas) → O ano (calendário pinado, mês a mês) → A semana (grade horária com filtro por pilar) → Certificações → Equipe → Depoimentos → Mural e Reels → Faixa de CTA → Onde acontece → Dúvidas → Por que Nine (o 9) → Contato (botão para a pré-inscrição) → Rodapé. Fora da página principal: /cursos/, /cursos/ia-para-empresarios/, /legacy/ e /pre-inscricao/. O menu é mínimo de propósito (3 itens); as outras seções ficam no rodapé. Vira hambúrguer abaixo de 1024px.

**Celular (abaixo de 768px, o calendário abaixo de 1024px):** a página tem layout próprio, não é só o desktop empilhado. Grade: abas curtas (Identidade, Habilidades, Mundo), listas de módulos e áreas de influência recolhidas em `<details data-colapsa>` (abertas no desktop e sem JavaScript), Paths em carrossel. O ano: sem o gráfico; seletor de meses fixo e cartões que se deslizam, um mês por vez. A semana: seletor de dias, um dia por vez, abrindo em hoje (o filtro por pilar só existe no desktop). Regiões que rolam para o lado recebem `tabindex` por JavaScript (exigência do axe).

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
- **Legacy (/legacy/, menu "Já foi aluno?"):** comunidade paga de ex-alunos, R$ 99 por mês, com 6 benefícios (conteúdos exclusivos, comunidade, mentorias, eventos, coworking, clube de benefícios). Texto da "Proposta LEGACY Nine" enviada pela Nine; o emblema (`assets/img/legacy/emblema.webp`) é um recorte do PDF. O botão "Quero ser Legacy" abre um e-mail para contato@9ai.com.br até a Nine passar o link de assinatura.
- **Equipe:** 20 nomes enviados (a lista tem Keli Campos duas vezes; entrou uma). Cards com iniciais até chegarem as fotos; para colocar a foto, troque o `<span class="prof__mono">` do card por `<img>` dentro de `.prof__ph`.
- **Formulário:** Ummense (iframe `https://app.ummense.com/form/1eb7f6ec-9181-68ee-8f79-0a7cd410799c?iframe=1`; link público `https://ummen.se/BmbT6O`).
- **Depoimentos:** Matheus Taborda, Hellenmarie Rafael e Carlos Eduardo Dolci, com o texto exato da apresentação.
- **Contato:** contato@9ai.com.br, secretaria@9ai.com.br, (41) 3333-3363, Instagram @nine.academia.

## Identidade
- Cores oficiais do manual de marca (2024): azul `#2A2D54` e amarelo `#F4B431` (tokens `--navy` e `--gold`; `--navy-90` `#353862` é o degrau mais claro), coroa, fundo `#FAFAF7`. Fonte oficial: Gilroy (Light e ExtraBold); o site usa Inter Tight (local) porque a Gilroy exige licença.
- Cor por pilar, sempre a mesma na página inteira: 01 verde, 02 coral, 03 violeta. Aparece nas colagens, na grade, no calendário do ano e na semana.
- 80% calmo (branco, navy, respiro), 20% cor nos momentos-chave. Sem estética de igreja genérica.
- **Barra do curso de IA:** degradê azul profundo → ciano com grão, marca do N com órbita dourada e estrela (tokens `--ia-*`). Texto e destino ficam no bloco `.ia-bar` do `index.html`.

## Regras
- **Contraste (com as cores oficiais):** azul sobre papel 12,5:1; dourado sobre azul 7,1:1; azul sobre dourado 7,1:1; texto secundário sobre papel 5,4:1. Texto sobre barras coral/verde usa `#17192E`. Dourado só é texto sobre navy. Sobre fundo claro, texto sempre navy ou `--ink-muted`. Sobre foto ou vídeo, sempre com degradê navy por baixo. Verde, coral e violeta são decoração; quando viram fundo usam a versão clara (`--tint-*`) com texto navy.
- **Acessibilidade (e-MAG/WCAG AA):** barra de atalhos com accesskey, `<noscript>`, foco visível, sem `style=""` no HTML, sem `target="_blank"`, decoração via CSS, `fieldset` nos formulários, tudo operável por teclado. Validar com W3C vnu e axe-core (com animação ligada e com movimento reduzido).
- **Desempenho:** sem preloader, fonte local com preload, CSS embutido, GSAP/Lenis só depois do `load`, vídeos com `preload="none"` e capa, imagens fora da tela com `lazy`.
- **Motion:** animar só `transform`, `opacity` e `clip-path`; cada coisa anima uma vez, exceto o que acompanha o scroll.
- **Texto:** PT-BR, falando com "você". Corpo mínimo de 16px. Sem travessão.

## Hospedagem
Fica a cargo da equipe da Nine: o código é entregue a eles. Site estático, sem servidor e sem build; publicar a pasta inteira na raiz do endereço (os caminhos são absolutos). `build.py` só é preciso depois de editar o `style.css`.

## Pendências (dependem da Nine)
- Legacy: link de assinatura (para onde "Quero ser Legacy" deve levar) e emblema em vetor. Confirmar que o valor (R$ 99/mês) pode aparecer.
- Curso de IA: se haverá nova turma (datas e link de inscrição); símbolo oficial do curso (o N com órbita da faixa do topo foi redesenhado).
- Ano e datas da próxima turma da formação; se é preciso ser de alguma igreja.
- A apresentação fala em 4 certificados e lista 3; o site mostra os 3.
- Endereço final do site: a Nine informa, para preencher `og:image` com URL absoluta, canonical e sitemap.
- Política de privacidade completa (o site não coleta mais dados; quem coleta agora é o formulário da Ummense, então a política precisa cobrir isso).
- Fotos dos professores; originais em alta da estrutura e dos depoimentos.
- Logo da Academia em SVG (o recebido é o da Faculdade), padrão de coroas em vetor e decisão sobre a fonte oficial (Gilroy, com licença) no lugar da Inter Tight.
