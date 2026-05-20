import { LANGUAGE_NAMES, LANGUAGES, CommonTree } from "jspl";
import { derived, readable, writable } from "svelte/store";
import { EXAMPLES } from "$lib/examples";
import { mapRecord } from "$lib/utils/mapRecord";
import { nodeToString } from "$lib/utils/nodeToString";

export const examples = readable(EXAMPLES);

export const ctrlPressed = writable(false);

export const languages = writable(LANGUAGE_NAMES);

export const selectedFile = writable("");

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

export const commonTreeStates = mapRecord(codeStates, (state, name) => {
  return derived(state, (code) => CommonTree.parse(name, code));
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

export function loadFile(fileName: string) {
  selectedFile.set(fileName);
  mapRecord(codeStates, (state, name) => {
    state.set(EXAMPLES[fileName][name]);
  });
}

setTimeout(function start() {
  loadFile(Object.keys(EXAMPLES)[0]);
});
