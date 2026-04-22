export function onEditableFocus(event: FocusEvent) {
  const element = event.target as HTMLElement;
  keepCaretBeforeLastChar(element);
}

export function onEditableMouseDown(event: FocusEvent) {
  const element = event.target as HTMLElement;
  keepCaretBeforeLastChar(element);
}

export function onEditableKeyDown(event: KeyboardEvent) {
  const element = event.target as HTMLElement;
  if (event.key === "Escape") {
    element.blur();
  } else if (event.key === "Tab") {
    event.preventDefault();
    insertText("  ");
  } else if (event.key === "Enter") {
    event.preventDefault();
    insertText("\n");
  } else if (event.key.toUpperCase() === "Z" && event.ctrlKey) {
    event.preventDefault();
  }
  keepCaretBeforeLastChar(element);
  setTimeout(keepLastNewLine, 0, element);
}

function keepLastNewLine(element: HTMLElement) {
  const position = getCaretPosition(element);
  if (element.textContent[element.textContent.length - 1] === "\n") return;
  element.textContent += "\n";
  setCaretPosition(element, position);
}

function keepCaretBeforeLastChar(element: HTMLElement) {
  const position = getCaretPosition(element);
  if (position < element.textContent.length) return;
  setCaretPosition(element, position - 1);
}

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

function setCaretPosition(element: HTMLElement, position: number) {
  element.focus(); // Ensure the element is focused
  const contentLength = element.textContent.length;
  if (position >= contentLength) position = contentLength;
  const range = document.createRange();
  const selection = getSelection();
  if (!selection) return;
  // Set the range start to the specified character index
  // Note: This assumes a single text node. For nested HTML, see Method 2.
  range.setStart(element.firstChild!, position);
  range.collapse(true); // Collapse the range to a point cursor
  selection.removeAllRanges();
  selection.addRange(range);
}

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
