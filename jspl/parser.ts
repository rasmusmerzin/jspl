import { Language, Parser } from "web-tree-sitter";
import { isBrowser } from "./isBrowser";

export interface LanguageExt extends Language {
  parser: Parser;
}

export type LanguageName = keyof typeof LANGUAGES;

await Parser.init();

const [JavaScript, Python, Lua] = await Promise.all([
  loadLanguageExt("tree-sitter-javascript.wasm"),
  loadLanguageExt("tree-sitter-python.wasm"),
  loadLanguageExt("tree-sitter-lua.wasm"),
]);
export const LANGUAGES = { JavaScript, Python, Lua };
export const LANGUAGE_NAMES = Object.keys(LANGUAGES) as LanguageName[];

async function loadLanguageExt(path: string): Promise<LanguageExt> {
  if (isBrowser) path = `/${path}`;
  const language = (await Language.load(path)) as LanguageExt;
  language.parser = new Parser();
  language.parser.setLanguage(language);
  return language;
}
