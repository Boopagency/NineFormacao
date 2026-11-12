# Nine Academia de Influência: site da formação

Site de uma página da formação da Nine (antes vivia em `/academia/` no repositório `nineacademia`, junto com o site da Faculdade, que foi deixado de lado em nov/2026).

**Objetivo:** quem chega precisa entender o que a Nine é, o que vai aprender, como é o ano e a semana, e ter sempre um caminho claro para falar com a equipe.
**Não mostrar preço.** Valores são apresentados pela equipe; a pergunta "Qual é o investimento?" no FAQ só leva ao contato.

## Arquivos
- `index.html`: a página. Mantida à mão. O CSS fica embutido em `<style id="css">`.
- `style.css`: fonte do CSS. Depois de editar, rode `python3 build.py` (minifica e embute na página).
- `main.js`: todo o comportamento. No topo ficam `FORM_ENDPOINT`, `FORM_EMAIL` e a lista `GALERIA` do mural.
- `assets/img/galeria/` (mural, `<id>-320.webp`, `<id>-600.webp`, `<id>.webp`), `assets/img/curso/` (fotos tiradas da apresentação 2026), `assets/img/pilares/` (colagens), `assets/video/`, `assets/vendor/` (GSAP, ScrollTrigger, SplitText, Lenis).

- `material/Nine-formacao-pendencias-do-site.pdf` (fonte: `material/pendencias-do-site.html`): documento de pendências com a identidade da Nine, para enviar ao cliente. A lista da seção "Pendências" abaixo é a mesma; ao fechar um item, atualize os dois e gere o PDF de novo com o Chromium (`page.pdf`, `preferCSSPageSize`, `printBackground`).

Sem framework e sem build além do `build.py`. Para ver localmente: `python3 -m http.server` na raiz (os caminhos são absolutos).

## Ordem da página
Barra do curso de IA → Nav → Hero (frase + CTA dentro do card; lema e ficha abaixo) → Para quem é (manifesto) → O que é a Nine (números) → Vida na Nine (zoom "Imagine você aqui.") → Três pilares (pinado) → Grade completa (abas por pilar) → Intensivos (portas) → O ano (calendário pinado, mês a mês) → A semana (grade horária com filtro por pilar) → Certificações → Depoimentos → Mural e Reels → Faixa de CTA → Onde acontece → Dúvidas → Por que Nine (o 9) → Contato → Rodapé.

Seções pinadas no desktop: zoom, pilares e o ano. No máximo três, nunca duas seguidas. Abaixo de 1024px e com `prefers-reduced-motion` nada fica preso.

## Conteúdo: de onde vem cada dado
Tudo vem do **Manual do Aluno (versão 1.2, 2026)** e da **Apresentação Nine 2026**. Não inventar dado. Se faltar, perguntar.
- **Formato:** presencial, em Curitiba (Comunhão Cristã Abba, Rua Engenheiro Niepce da Silva, 139, Portão). Intensivos no Hotel Campestre Leão de Judá (Av. Pres. Ernesto Geisel, 674, Colônia Witmarsum, Palmeira/PR).
- **Ano:** março a dezembro. Teologia (Fatemi), Jornadas e Intercâmbio Cultural de março a novembro; Paths I (mar–jul), II (ago), III (set–nov); intensivos em março, maio, julho e setembro; TCC em novembro; viagem de formatura em dezembro. O calendário é o da turma 2026.
- **Pilar 1, Conhecer sua identidade (18 módulos):** 16 de Teologia Livre (Fatemi) + mentoria em grupo + mentoria individual.
- **Pilar 2, Treinar suas habilidades (11 módulos):** 7 Jornadas (Comunicação Social, Empreendedorismo, Marketing & Venda, Dever Cívico, Tecnológica, Criativa, Corpo & Saúde), Intensivos (Seu Mundo, Mundo Digital, Mundo da Liderança com o ILI, Mundo Sofisticado) e Paths I, II e III. Bônus: 75h de serviço comunitário e até 25h de cursos extracurriculares.
- **Pilar 3, Inspirar o seu mundo (8 módulos):** Igreja; Educação e Comunicação; Governo & Política e Economia & Negócios; Arte & Cultura, Ciência & Tecnologia e Serviço Social.
- **Semana:** terça a sexta de manhã (9h–12h) em sala e à tarde (14h–18h) em Paths; segunda à tarde mentoria em grupo e Jornadas; Teologia 2º ano terça e quarta às 19h30; sábado mentoria individual e Culto AJ; domingo cultos.
- **Aprovação:** 700 de 1.100 créditos, 75% de presença por módulo, TCC com 70 pontos. Acima de 90%, conclusão com honra.
- **Certificações:** Nine Academia de Influência; Fatemi (Curso Livre de Teologia Ministerial); History Makers (ILI).
- **Depoimentos:** Matheus Taborda, Hellenmarie Rafael e Carlos Eduardo Dolci, com o texto exato da apresentação.
- **Contato:** contato@9ai.com.br, secretaria@9ai.com.br, (41) 3333-3363, Instagram @nine.academia.

## Identidade
- Navy `#111749` + dourado `#F5B310` + coroa, fundo `#FAFAF7`, fonte Inter Tight (local).
- Cor por pilar, sempre a mesma na página inteira: 01 verde, 02 coral, 03 violeta. Aparece nas colagens, na grade, no calendário do ano e na semana.
- 80% calmo (branco, navy, respiro), 20% cor nos momentos-chave. Sem estética de igreja genérica.
- **Barra do curso de IA:** degradê azul profundo → ciano com grão, marca do N com órbita dourada e estrela (tokens `--ia-*`). Texto e destino ficam no bloco `.ia-bar` do `index.html`.

## Regras
- **Contraste:** dourado só é texto sobre navy. Sobre fundo claro, texto sempre navy ou `--ink-muted`. Sobre foto ou vídeo, sempre com degradê navy por baixo. Verde, coral e violeta são decoração; quando viram fundo usam a versão clara (`--tint-*`) com texto navy.
- **Acessibilidade (e-MAG/WCAG AA):** barra de atalhos com accesskey, `<noscript>`, foco visível, sem `style=""` no HTML, sem `target="_blank"`, decoração via CSS, `fieldset` nos formulários, tudo operável por teclado. Validar com W3C vnu e axe-core (com animação ligada e com movimento reduzido).
- **Desempenho:** sem preloader, fonte local com preload, CSS embutido, GSAP/Lenis só depois do `load`, vídeos com `preload="none"` e capa, imagens fora da tela com `lazy`.
- **Motion:** animar só `transform`, `opacity` e `clip-path`; cada coisa anima uma vez, exceto o que acompanha o scroll.
- **Texto:** PT-BR, falando com "você". Corpo mínimo de 16px. Sem travessão.

## Pendências (dependem da Nine)
- Destino do formulário (`FORM_ENDPOINT` em `main.js`). Enquanto vazio, o envio abre o e-mail do visitante.
- Nome, texto e link definitivos do curso de IA (hoje a barra leva ao formulário com "Curso de IA" marcado).
- Nine Legacy: ainda sem informação; não aparece no site.
- Ano e datas da próxima turma; idade mínima; se alunos de outras igrejas participam.
- A apresentação fala em 4 certificados e lista 3; o site mostra os 3.
- Domínio final: definir para preencher `og:image` com URL absoluta, canonical e sitemap.
- Política de privacidade completa (hoje há só o resumo "Como usamos seus dados" no formulário).
- Autorização de uso de imagem dos alunos; originais em alta das fotos da apresentação (os recortes atuais têm resolução baixa).
