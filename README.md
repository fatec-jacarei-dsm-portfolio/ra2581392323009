# Mauro Santos — Portfólio Pessoal

Site estático em HTML/CSS/JS puro, publicável diretamente no GitHub Pages.

## Estrutura

```
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── README.md
```

## Publicar no GitHub Pages

### Opção 1 — Repositório pessoal (`seuusuario.github.io`)

1. Crie um repositório chamado exatamente `seuusuario.github.io`
2. Faça push de todos os arquivos para a branch `main`
3. O site estará em `https://seuusuario.github.io`

### Opção 2 — Repositório de projeto qualquer

1. Faça push dos arquivos para a branch `main` do repositório
2. Acesse **Settings → Pages**
3. Em **Source**, selecione `Deploy from a branch`
4. Escolha `main` e pasta `/` (root) → clique em **Save**
5. Em alguns minutos o site estará em `https://seuusuario.github.io/nome-do-repo`

## Desenvolvimento local

Qualquer servidor estático funciona:

```bash
# Python (sem instalação)
python3 -m http.server 3000

# Node.js
npx serve .

# VS Code
# instale a extensão "Live Server" e clique em "Go Live"
```

Acesse `http://localhost:3000`
