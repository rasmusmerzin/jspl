import { Node } from "web-tree-sitter";
import { LanguageName } from ".";

export function getTabPadding(languageName: LanguageName) {
  return " ".repeat(getTabWidth(languageName));
}

export function getTabWidth(languageName: LanguageName) {
  if (languageName === "Python") return 4;
  else return 2;
}

export function resolveSource(node: Node, source: string): string {
  return source.slice(node.startIndex, node.endIndex);
}

export function resolveIdentifier(node: Node, source: string): string {
  const identifierNode = resolveNamedChild(node, "identifier");
  return identifierNode ? source.slice(identifierNode.startIndex, identifierNode.endIndex) : "";
}

export function resolveAllIdentifiers(node: Node, source: string): string[] {
  const identifierNodes = resolveNamedChildren(node, "identifier");
  return identifierNodes.map((node) => source.slice(node.startIndex, node.endIndex));
}

export function resolveArgsNode(languageName: LanguageName, node: Node): Node | undefined {
  return resolveNamedChild(node, getArgsType(languageName));
}

export function resolveParamsNode(languageName: LanguageName, node: Node): Node | undefined {
  return resolveNamedChild(node, getParamsType(languageName));
}

export function resolveBlockNode(languageName: LanguageName, node: Node): Node | undefined {
  return resolveNamedChild(node, getBlockType(languageName));
}

export function resolveNamedChild(node: Node, type: string): Node | undefined {
  return node.namedChildren.find((child) => child.type === type);
}

export function resolveNamedChildren(node: Node, type: string): Node[] {
  return node.namedChildren.filter((child) => child.type === type);
}

export function getArgsType(languageName: LanguageName): string {
  if (languageName === "Python") return "argument_list";
  else if (["JavaScript", "Lua"].includes(languageName)) return "arguments";
  else return "";
}

export function getParamsType(languageName: LanguageName): string {
  if (languageName === "JavaScript") return "formal_parameters";
  else if (["Python", "Lua"].includes(languageName)) return "parameters";
  else return "";
}

export function getBlockType(languageName: LanguageName): string {
  if (languageName === "JavaScript") return "statement_block";
  else if (["Python", "Lua"].includes(languageName)) return "block";
  else return "";
}
