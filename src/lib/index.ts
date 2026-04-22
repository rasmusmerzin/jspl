import { writable } from "svelte/store";

export const LANGUAGES = ["javascript", "lua", "python"];
export const code = writable<Record<string, string>>({
  javascript: `function main() {\n  abc = 1;\n  return abc;\n}\n`,
  lua: "",
  python: "",
});
