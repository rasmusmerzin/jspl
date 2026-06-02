import { get } from "svelte/store";
import { ctrlPressed } from "$lib/state";
import { languages } from "$lib/state/editor";
import { throttle } from "$lib/utils/throttle";

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
    const element = document
      .getElementById(languageName + "-Pane")
      ?.querySelector(".content")
      ?.querySelector("[contenteditable]");
    if (element instanceof HTMLElement) throttledFocusPane(element);
  }
}

const throttledFocusPane = throttle(function focusPane(element: HTMLElement) {
  const { activeElement } = document;
  if (activeElement instanceof HTMLElement) activeElement.blur();
  setTimeout(() => element.focus());
}, 300);
