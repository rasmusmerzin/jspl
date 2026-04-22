import { get, writable } from "svelte/store";
import { Language, Parser } from "web-tree-sitter";

export const LANGUAGES = ["javascript", "lua", "python"];
export const codeState = writable<Record<string, string>>({
  javascript: `function main() {\n  abc = 1;\n  return abc;\n}\n`,
  lua: "",
  python: "",
});

await Parser.init();
const JavaScript = await Language.load("/tree-sitter-javascript.wasm");
const parser = new Parser();
parser.setLanguage(JavaScript);
const code = get(codeState).javascript;
const tree = parser.parse(code);
console.log(tree?.rootNode);
