## Development

Install dependencies.

```sh
npm install
```

Download grammar `.wasm` files to the `static/` directory. `.wasm` files are not checked into Git.

```sh
cd static
curl -LO https://github.com/tree-sitter/tree-sitter-javascript/releases/download/v0.25.0/tree-sitter-javascript.wasm
curl -LO https://github.com/tree-sitter/tree-sitter-python/releases/download/v0.25.0/tree-sitter-python.wasm
curl -LO https://github.com/tree-sitter-grammars/tree-sitter-lua/releases/download/v0.5.0/tree-sitter-lua.wasm
```

Run development server.

```sh
npm run dev
```

## Assets

Vector assets are checked into Git, optimized with `svgo` and noted here for reference.

```sh
cd static
curl -LO https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg
curl -LO https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg
curl -LO https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg
curl -LO https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg
curl -LO https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-plain.svg
curl -LO https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-plain.svg
svgo *.svg
```

## Building

Create production build.

```sh
./build.sh
```
