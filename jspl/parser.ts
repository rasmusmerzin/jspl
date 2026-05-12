import { Language, Parser } from "web-tree-sitter";

export interface LanguageExt extends Language {
  parser: Parser;
}

export type LanguageName = keyof typeof LANGUAGES;

await Parser.init();

export const LANGUAGES = {
  JavaScript: await loadLanguageExt("tree-sitter-javascript.wasm"),
  Python: await loadLanguageExt("tree-sitter-python.wasm"),
  Lua: await loadLanguageExt("tree-sitter-lua.wasm"),
};
export const LANGUAGE_NAMES = Object.keys(LANGUAGES) as LanguageName[];

async function loadLanguageExt(path: string): Promise<LanguageExt> {
  // TODO: if (!isNode()) path = `/${path}`;
  const language = (await Language.load(path)) as LanguageExt;
  language.parser = new Parser();
  language.parser.setLanguage(language);
  return language;
}
