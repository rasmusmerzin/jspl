import { derived, writable } from "svelte/store";
import { LANGUAGES, type LanguageName } from "./parser";

export const codeState = writable<Record<LanguageName, string>>({
  JavaScript: `function main() {\n  abc = 1;\n  return abc;\n}\n`,
  Lua: "",
  Python: "",
});

export const ast = derived(codeState, (code) => {
  const { JavaScript } = LANGUAGES;
  return JavaScript.parser.parse(code.JavaScript);
});

export const astPrint = derived(ast, (tree) => {
  return tree?.rootNode.toString();
});
