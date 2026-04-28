import { activePrints, codeStates, languages } from "$lib/state";
import { get } from "svelte/store";
import type { LanguageName } from "./parser";
import { getTabPadding } from "./CommonTree";

export function onEditableSubmit(event: SubmitEvent) {
  const element = event.target as HTMLElement;
  const parent = element.parentElement!;
  const languageName = parent.id.slice(0, parent.id.length - "-Pane".length);
  reorderLanguages(languageName);
  const prints = get(activePrints);
  const [focused] = get(languages);
  for (const language of get(languages)) codeStates[language].set(prints[language]);
  updateTextContent(element, prints[focused]);
}

export function onEditableFocus(event: FocusEvent) {
  const element = event.target as HTMLElement;
  setTimeout(afterUpdate, 0, element);
  const parent = element.parentElement!;
  const languageName = parent.id.slice(0, parent.id.length - "-Pane".length);
  reorderLanguages(languageName);
}

export function onEditableMouseDown(event: FocusEvent) {
  const element = event.target as HTMLElement;
  setTimeout(afterUpdate, 0, element);
}

export function onEditableKeyDown(event: KeyboardEvent) {
  const element = event.target as HTMLElement;
  const parent = element.parentElement!;
  const languageName = parent.id.slice(0, parent.id.length - "-Pane".length) as LanguageName;
  setTimeout(afterUpdate, 0, element);
  if (event.key === "Escape") {
    element.blur();
    return;
  } else if (event.key === "Tab") {
    event.preventDefault();
    insertText(getTabPadding(languageName));
  } else if (event.key === "Enter") {
    event.preventDefault();
    if (event.ctrlKey) element.dispatchEvent(new SubmitEvent("submit"));
    else insertText("\n");
  } else if (event.key.toUpperCase() === "Z" && event.ctrlKey) {
    event.preventDefault();
  } else if (event.key === "F" && event.ctrlKey) {
    event.preventDefault();
    const [focused] = get(languages);
    const state = codeStates[focused];
    const print = get(activePrints)[focused];
    state.set(print);
    updateTextContent(element, print);
  }
}

function afterUpdate(element: HTMLElement) {
  handleLastNewLine(element);
  keepCaretBeforeLastChar(element);
}

function reorderLanguages(name: string) {
  const languageName = name as LanguageName;
  languages.update((list) => {
    if (!list.includes(languageName)) return list;
    while (list[0] !== languageName) list.push(list.shift()!);
    return list;
  });
}

function handleLastNewLine(element: HTMLElement) {
  if (!element.textContent) return;
  if (element.textContent[element.textContent.length - 1] === "\n") {
    if (/^\n*$/.test(element.textContent)) element.textContent = "";
  } else {
    const position = getCaretPosition(element);
    element.textContent += "\n";
    setCaretPosition(element, position);
  }
}

function keepCaretBeforeLastChar(element: HTMLElement) {
  const position = getCaretPosition(element);
  if (!position || position < element.textContent.length) return;
  setCaretPosition(element, position - 1);
}

function updateTextContent(element: HTMLElement, content: string) {
  const pos = getCaretPosition(element);
  element.textContent = content;
  setCaretPosition(element, pos);
}

// Generated with Brave Ask
function getCaretPosition(element: HTMLElement) {
  const selection = getSelection();
  if (!selection?.rangeCount) return 0;
  const range = selection.getRangeAt(0);
  const clone = range.cloneRange();
  // Select all content from the start of the element to the current cursor
  clone.selectNodeContents(element);
  clone.setEnd(range.startContainer, range.startOffset);
  // The length of the text in this cloned range is the cursor index
  return clone.toString().length;
}

// Generated with Brave Ask
function setCaretPosition(element: HTMLElement, position: number) {
  element.focus(); // Ensure the element is focused
  const contentLength = element.textContent.length;
  if (position >= contentLength) position = contentLength - 1;
  if (position < 0) position = 0;
  const range = document.createRange();
  const selection = getSelection();
  if (!selection || !element.firstChild) return;
  // Set the range start to the specified character index
  // Note: This assumes a single text node. For nested HTML, see Method 2.
  range.setStart(element.firstChild, position);
  range.collapse(true); // Collapse the range to a point cursor
  selection.removeAllRanges();
  selection.addRange(range);
}

// Generated with Brave Ask
function insertText(text: string) {
  // alternative: document.execCommand("insertText", false, text);
  const selection = getSelection();
  if (!selection?.rangeCount) return;
  const range = selection.getRangeAt(0);
  range.deleteContents(); // Remove selected content if any
  const textNode = document.createTextNode(text);
  range.insertNode(textNode);
  range.setStartAfter(textNode); // Move cursor after the newline
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
}
