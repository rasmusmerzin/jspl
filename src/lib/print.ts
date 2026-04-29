import type { Node } from "web-tree-sitter";

export function nodeToString(node: Node, indent = 0) {
  const padding = "│ ".repeat(indent);
  const { isNamed, type } = node;
  let result = `${padding}${isNamed ? type : `"${type}"`}\n`;
  for (const child of node.children) {
    result += nodeToString(child, indent + 1);
  }
  return result;
}
