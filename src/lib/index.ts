import { derived, writable } from "svelte/store";
import { LANGUAGES, type LanguageName } from "./parser";
import type { Node } from "web-tree-sitter";

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
  if (!tree) return;
  return nodeToString(tree.rootNode);
});

function nodeToString(node: Node, indent = 0) {
  const padding = "  ".repeat(indent);
  const { isNamed, type } = node;
  let result = `${padding}${isNamed ? type : `"${type}"`}\n`;
  for (const child of node.children) {
    result += nodeToString(child, indent + 1);
  }
  return result;
}
