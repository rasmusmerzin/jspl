import { LANGUAGES, type LanguageName, type Node, type Tree } from "jspl";

export function highlight(tree: Tree | LanguageName, source: string) {
  if (typeof tree === "string") {
    tree = LANGUAGES[tree].parser.parse(source)!;
    if (!tree) return escapeHTML(source);
  }
  const highlights = tree.rootNode.children.map(getHighlights).flat();
  let html = "";
  let offset = source.length;
  for (const node of highlights.sort((a, b) => b.startIndex - a.startIndex)) {
    const highlighted = escapeHTML(source.slice(node.startIndex, node.endIndex));
    const normal = escapeHTML(source.slice(node.endIndex, offset));
    if (isKeyword(node)) html = `<b>${highlighted}</b>${normal}${html}`;
    else html = `<span>${highlighted}</span>${normal}${html}`;
    offset = node.startIndex;
  }
  html = escapeHTML(source.slice(0, offset)) + html;
  return html;
}

function isKeyword(node: Node) {
  return !node.isNamed && /^[A-Za-z]+$/.test(node.type);
}

function getHighlights(node: Node): Node[] {
  if (!node.isNamed || ["string_start", "string_end"].includes(node.type)) return [node];
  return node.children.map(getHighlights).flat();
}

const div = document.createElement("div");
function escapeHTML(text: string) {
  div.textContent = text;
  return div.innerHTML;
}
