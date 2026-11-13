"""Embute o CSS (style.css, minificado) dentro de index.html.
Rodar na raiz do repositório depois de editar o style.css:  python3 build.py"""
import re

def minifica(css):
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    css = re.sub(r"\s+", " ", css)
    css = re.sub(r"\s*([{};,>])\s*", r"\1", css)
    css = re.sub(r":\s+", ":", css)  # só depois do ":" (antes dele o espaço muda o seletor)
    return css.replace(";}", "}").strip()

css = minifica(open("style.css", encoding="utf-8").read())
for pagina in ("index.html", "pre-inscricao/index.html", "cursos/index.html", "cursos/ia-para-empresarios/index.html", "legacy/index.html"):
    html = open(pagina, encoding="utf-8").read()
    html, n = re.subn(r'<style id="css">.*?</style>', lambda m: f'<style id="css">{css}</style>', html, count=1, flags=re.S)
    assert n == 1, f"{pagina} precisa ter <style id=\"css\">"
    assert ' style="' not in html, "sem style= no HTML (regra de acessibilidade do projeto)"
    assert 'target="_blank"' not in html
    open(pagina, "w", encoding="utf-8").write(html)
print(f"CSS embutido: {len(css) // 1024} KB")


def minifica_js(src):
    """Minificação conservadora: tira comentários de linha inteira e a indentação. Não mexe em nada dentro de strings."""
    out = []
    em_bloco = False
    for linha in src.split("\n"):
        t = linha.strip()
        if em_bloco:
            if "*/" in t:
                em_bloco = False
            continue
        if t.startswith("/*") and not t.startswith("/*!"):
            if "*/" not in t:
                em_bloco = True
            continue
        if not t or t.startswith("//"):
            continue
        out.append(t)
    return "\n".join(out) + "\n"


for fonte in ("main.js", "pagina.js", "formulario.js"):
    js = open(fonte, encoding="utf-8").read()
    mini = minifica_js(js)
    open(fonte.replace(".js", ".min.js"), "w", encoding="utf-8").write(mini)
    print(f"{fonte}: {len(js) // 1024} KB -> {len(mini) // 1024} KB")
