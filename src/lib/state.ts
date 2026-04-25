import { LANGUAGE_NAMES, LANGUAGES } from "./parser";
import { derived, writable } from "svelte/store";
import { mapRecord } from "./util";
import { nodeToString } from "./print";

export const ctrlPressed = writable(false);

export const languages = writable(LANGUAGE_NAMES);

export const codeStates = {
  JavaScript: writable(`function main() {\n    abc = 1;\n    return abc;\n}\n`),
  Python: writable(`def main():\n    abc = 1\n    return abc\n`),
  Lua: writable(`function main()\n    abc = 1\n    return abc\nend\n`),
};

export const treeStates = mapRecord(codeStates, (state, name) =>
  derived(state, (code) => LANGUAGES[name].parser.parse(code)),
);

export const treePrintStates = mapRecord(treeStates, (state) =>
  derived(state, (tree) => (tree ? nodeToString(tree.rootNode) : "")),
);
