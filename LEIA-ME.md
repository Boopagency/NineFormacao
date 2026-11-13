# Site da Nine Academia de Influência

Site estático: só HTML, CSS, JavaScript e imagens. Não precisa de banco de dados, PHP, Node nem etapa de build para ir ao ar.

## Como publicar

1. Envie **a pasta inteira** para a hospedagem, na **raiz** do endereço (por exemplo, `9ai.com.br/`, e não `9ai.com.br/site/`). Os caminhos do site começam em `/`, então numa subpasta as imagens e páginas não abrem.
2. Ative HTTPS (certificado SSL). Quase toda hospedagem faz isso de graça.
3. Se a hospedagem permitir, deixe ligada a compressão (Brotli ou gzip). O site já é rápido sem ela, mas fica ainda mais leve.

4. A pasta tem um arquivo oculto chamado `.htaccess`. Em hospedagens com painel (Hostinger, Locaweb, cPanel e similares), ele liga sozinho a compressão, o cache e a página de erro 404 da Nine. Envie ele junto (no Mac e no Windows, arquivos que começam com ponto podem ficar escondidos: ative "mostrar arquivos ocultos" ou envie o `.zip` e descompacte pelo painel). Se a hospedagem mostrar "Erro 500" depois de publicar, apague o `.htaccess`: o site funciona sem ele. Na Vercel, Netlify e Cloudflare Pages ele é ignorado e não faz falta.

Funciona em qualquer hospedagem de site estático: Vercel, Netlify, Cloudflare Pages, GitHub Pages, ou uma hospedagem comum com painel (cPanel, Hostinger, Locaweb e similares), enviando os arquivos para a pasta `public_html` ou equivalente.

## Conferir depois de publicar

Junto com esta pasta veio o arquivo `teste-no-console.js`. Abra o site já publicado no Chrome, aperte F12 (no Mac, Cmd+Option+J), vá na aba **Console**, cole o conteúdo do arquivo e aperte Enter. Se o Chrome pedir, digite `allow pasting` e cole de novo. Em menos de um minuto ele confere as páginas, todos os arquivos, a página 404, a compressão e o vídeo, e mostra um resumo com ✅, ⚠️ e ❌.

## Páginas

| Endereço | Página |
|---|---|
| `/` | A formação (página principal) |
| `/cursos/` | Cursos da Nine, com status de cada um |
| `/cursos/ia-para-empresarios/` | IA para Empresários, Nine Lab 2026 |
| `/legacy/` | Legacy, para ex-alunos |
| `/pre-inscricao/` | Pré-inscrição (formulário da Ummense) |
| `/links/` | Link na bio do Instagram |
| `/404.html` | Página para endereços que não existem (Vercel e Netlify usam sozinhas; nas hospedagens com painel, o `.htaccess` liga) |

## Formulários

O site não guarda dados de ninguém. A pré-inscrição e o Legacy usam formulários da Ummense:

- Pré-inscrição: `https://ummen.se/BmbT6O`
- Legacy: `https://ummen.se/9suDkY`

As respostas chegam direto na conta da Ummense da Nine.

## Arquivos

- `index.html` e as pastas `cursos/`, `legacy/`, `pre-inscricao/` e `links/`: as páginas.
- `assets/`: imagens, vídeos, fonte, logo e bibliotecas de animação.
- `main.min.js`, `pagina.min.js` e `formulario.min.js`: o comportamento das páginas (gerados a partir de `main.js`, `pagina.js` e `formulario.js`). O `formulario.js` faz os botões "Quero conhecer" e "Quero ser Legacy" abrirem o formulário da Ummense numa janela, já carregado.
- `style.css` e `build.py`: fonte do visual. O CSS já vai embutido em cada página; só é preciso rodar `python3 build.py` depois de editar `style.css`, `main.js`, `pagina.js` ou `formulario.js`.

## Google e assistentes de IA

O site já vem preparado para o endereço **https://9ai.com.br**: cada página informa seu endereço oficial (canonical) e a imagem que aparece ao compartilhar no WhatsApp e nas redes, e há dados estruturados para o Google (curso, perguntas frequentes, cursos, Legacy). Na raiz ficam:

- `sitemap.xml`: a lista de páginas para o Google. Depois de publicar, envie `https://9ai.com.br/sitemap.xml` no Google Search Console.
- `robots.txt`: libera o site para buscadores e para assistentes de IA (ChatGPT, Claude, Perplexity, Gemini).
- `llms.txt`: um resumo da Nine em texto simples, que assistentes de IA usam para responder sobre a formação.

**Se o site for publicado em outro endereço**, troque `https://9ai.com.br` pelo endereço novo em todos os arquivos (a função "substituir em todos os arquivos" de qualquer editor resolve). Sem isso, a imagem de compartilhamento e o Google apontam para o endereço errado.

## Ao trocar o domínio

Altere só os registros do **site** (A ou CNAME) no DNS. **Não mexa nos registros MX**, que são os do e-mail (`contato@9ai.com.br`, `secretaria@9ai.com.br`).
