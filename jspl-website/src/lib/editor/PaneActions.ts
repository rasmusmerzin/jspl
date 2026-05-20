import { activePrints, codeStates, languages } from "$lib/state";
import { derived, get } from "svelte/store";
import { formatActive, submitActive } from "./Pane";
import type { LanguageName } from "jspl";

export const transpileDisabled = derived(
  [languages, codeStates.JavaScript, codeStates.Python, codeStates.Lua, activePrints],
  ([[lang], JavaScript, Python, Lua, prints]) => {
    const codeState = { JavaScript, Python, Lua };
    for (const key of Object.keys(codeState) as LanguageName[]) {
      if (key === lang) continue;
      if (codeState[key] !== prints[key]) return false;
    }
    return true;
  },
);

export const formatDisabled = derived(
  [languages, codeStates.JavaScript, codeStates.Python, codeStates.Lua, activePrints],
  ([[lang], JavaScript, Python, Lua, prints]) =>
    ({ JavaScript, Python, Lua })[lang] === prints[lang],
);

export function onTranspileClick(_event: MouseEvent) {
  submitActive();
}

export function onFormatClick(_event: MouseEvent) {
  formatActive();
}

export function onCopyClickFn(languageName: LanguageName) {
  return function onCopyClick(_event: MouseEvent) {
    const code = get(codeStates[languageName]);
    navigator.clipboard.writeText(code);
  };
}
