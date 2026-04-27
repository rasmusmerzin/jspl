import { LANGUAGE_NAMES, LANGUAGES } from "./parser";
import { derived, get, writable } from "svelte/store";
import { mapRecord } from "./util";
import { nodeToString } from "./print";
import { CommonTree } from "./CommonTree";

export const ctrlPressed = writable(false);

export const languages = writable(LANGUAGE_NAMES);

export const indentWidths = writable({
  JavaScript: 2,
  Python: 4,
  Lua: 2,
});

export const indentPaddings = derived(indentWidths, (state) => {
  return mapRecord(state, (width) => " ".repeat(width));
});

export const codeStates = {
  JavaScript: writable(``),
  Python: writable(``),
  Lua: writable(``),
};

export const treeStates = mapRecord(codeStates, (state, name) => {
  return derived(state, (code) => LANGUAGES[name].parser.parse(code));
});

export const treePrintStates = mapRecord(treeStates, (state) => {
  return derived(state, (tree) => (tree ? nodeToString(tree.rootNode) : ""));
});

export const commonTreeStates = mapRecord(treeStates, (state, name) => {
  return derived(state, (tree) => {
    if (!tree) return null;
    const source = get(codeStates[name]);
    return CommonTree.from(name, tree, source);
  });
});

export const commonTreeStateSum = derived(
  [commonTreeStates.JavaScript, commonTreeStates.Python, commonTreeStates.Lua],
  ([JavaScript, Python, Lua]) => ({ JavaScript, Python, Lua }),
);

export const activePrints = derived([languages, commonTreeStateSum], ([[language], trees]) => {
  const tree = trees[language];
  return {
    JavaScript: tree?.print("JavaScript") || "",
    Python: tree?.print("Python") || "",
    Lua: tree?.print("Lua") || "",
  };
});

setTimeout(function start() {
  const { JavaScript: jPad, Python: pPad, Lua: lPad } = get(indentPaddings);
  codeStates.JavaScript.set(`function main() {\n${jPad}abc = 1;\n${jPad}return abc;\n}\n`);
  codeStates.Python.set(`def main():\n${pPad}abc = 1\n${pPad}return abc\n`);
  codeStates.Lua.set(`function main()\n${lPad}abc = 1\n${lPad}return abc\nend\n`);
});
