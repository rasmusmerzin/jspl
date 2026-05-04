<div align="center">
  <h1>JsPL</h1>
  <img alt="Logo" src="./jspl-website/static/jspl.svg" />
  <p>JavaScript-Python-Lua transpiler.</p>
  <img alt="Demo" src="./demo.gif" />
</div>

## Developing

Install dependencies.

```sh
npm install
```

Run development server.

```sh
npm run dev
```

## Static Assets

```sh
cd jspl-website/static
# icons
curl -LO https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg
curl -LO https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg
curl -LO https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg
# grammars
curl -LO https://github.com/tree-sitter/tree-sitter-javascript/releases/download/v0.25.0/tree-sitter-javascript.wasm
curl -LO https://github.com/tree-sitter/tree-sitter-python/releases/download/v0.25.0/tree-sitter-python.wasm
curl -LO https://github.com/tree-sitter-grammars/tree-sitter-lua/releases/download/v0.5.0/tree-sitter-lua.wasm
```

## Building

Create production build.

```sh
npm run build
```
