import { writable } from "svelte/store";

export const LANGUAGES = ["javascript", "lua", "python"];
export const content = writable(
  `function main() {\n  abc = 1;\n  return abc;\n}\n`,
);
