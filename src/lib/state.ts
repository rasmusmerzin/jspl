import type { Node } from "web-tree-sitter";
import { LANGUAGE_NAMES, LANGUAGES } from "./parser";
import { derived, writable } from "svelte/store";
import { mapRecord } from "./util";

export const ctrlPressed = writable(false);

export const languages = writable(LANGUAGE_NAMES);

export const codeStates = {
  JavaScript: writable(`function main() {\n  abc = 1;\n  return abc;\n}\n`),
  Python: writable(``),
  Lua: writable(``),
};

export const treeStates = mapRecord(codeStates, (state, name) =>
  derived(state, (code) => LANGUAGES[name].parser.parse(code)),
);

export const treePrintStates = mapRecord(treeStates, (state) =>
  derived(state, (tree) => (tree ? nodeToString(tree.rootNode) : "")),
);

function nodeToString(node: Node, indent = 0) {
  const padding = "  ".repeat(indent);
  const { isNamed, type } = node;
  let result = `${padding}${isNamed ? type : `"${type}"`}\n`;
  for (const child of node.children) {
    result += nodeToString(child, indent + 1);
  }
  return result;
}
