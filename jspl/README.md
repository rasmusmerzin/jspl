## Development

Install dependencies.

```sh
npm install
```

Download grammar `.wasm` files. `.wasm` files are not checked into Git.

```sh
curl -LO https://github.com/tree-sitter/tree-sitter-javascript/releases/download/v0.25.0/tree-sitter-javascript.wasm
curl -LO https://github.com/tree-sitter/tree-sitter-python/releases/download/v0.25.0/tree-sitter-python.wasm
curl -LO https://github.com/tree-sitter-grammars/tree-sitter-lua/releases/download/v0.5.0/tree-sitter-lua.wasm
```

Run unit tests.

```sh
npm test -- --run
```
