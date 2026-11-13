# Site da Nine Academia de Influência

Site estático: só HTML, CSS, JavaScript e imagens. Não precisa de banco de dados, PHP, Node nem etapa de build para ir ao ar.

## Como publicar

1. Envie **a pasta inteira** para a hospedagem, na **raiz** do endereço (por exemplo, `9ai.com.br/`, e não `9ai.com.br/site/`). Os caminhos do site começam em `/`, então numa subpasta as imagens e páginas não abrem.
2. Ative HTTPS (certificado SSL). Quase toda hospedagem faz isso de graça.
3. Se a hospedagem permitir, deixe ligada a compressão (Brotli ou gzip). O site já é rápido sem ela, mas fica ainda mais leve.

Funciona em qualquer hospedagem de site estático: Vercel, Netlify, Cloudflare Pages, GitHub Pages, ou uma hospedagem comum com painel (cPanel, Hostinger, Locaweb e similares), enviando os arquivos para a pasta `public_html` ou equivalente.

## Páginas

| Endereço | Página |
|---|---|
| `/` | A formação (página principal) |
| `/cursos/` | Cursos da Nine, com status de cada um |
| `/cursos/ia-para-empresarios/` | IA para Empresários, Nine Lab 2026 |
| `/legacy/` | Legacy, para ex-alunos |
| `/pre-inscricao/` | Pré-inscrição (formulário da Ummense) |
| `/links/` | Link na bio do Instagram |

## Formulários

O site não guarda dados de ninguém. A pré-inscrição e o Legacy usam formulários da Ummense:

- Pré-inscrição: `https://ummen.se/BmbT6O`
- Legacy: `https://ummen.se/9suDkY`

As respostas chegam direto na conta da Ummense da Nine.

## Arquivos

- `index.html` e as pastas `cursos/`, `legacy/`, `pre-inscricao/` e `links/`: as páginas.
- `assets/`: imagens, vídeos, fonte, logo e bibliotecas de animação.
- `main.min.js` e `pagina.min.js`: o comportamento das páginas (gerados a partir de `main.js` e `pagina.js`).
- `style.css` e `build.py`: fonte do visual. O CSS já vai embutido em cada página; só é preciso rodar `python3 build.py` depois de editar `style.css`, `main.js` ou `pagina.js`.

## Ao trocar o domínio

Altere só os registros do **site** (A ou CNAME) no DNS. **Não mexa nos registros MX**, que são os do e-mail (`contato@9ai.com.br`, `secretaria@9ai.com.br`).
