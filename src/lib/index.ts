import { get } from "svelte/store";
import { ctrlPressed, languages } from "./state";
import { throttle } from "./util";

export function onKeyUp(event: KeyboardEvent) {
  if (event.key === "Control") {
    ctrlPressed.set(false);
  }
}

export function onKeyDown(event: KeyboardEvent) {
  if (event.key === "Control") {
    ctrlPressed.set(true);
  } else if (["1", "2", "3"].includes(event.key) && event.ctrlKey) {
    event.preventDefault();
    const languageName = get(languages)[Number(event.key) - 1];
    const element = document.getElementById(languageName + "-Pane")?.querySelector(".content");
    if (element instanceof HTMLElement) throttledFocusPane(element);
  }
}

const throttledFocusPane = throttle(function focusPane(element: HTMLElement) {
  const { activeElement } = document;
  if (activeElement instanceof HTMLElement) activeElement.blur();
  setTimeout(() => element.focus());
}, 300);
