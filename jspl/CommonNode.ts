import type { Node } from "web-tree-sitter";
import {
  LanguageName,
  PrintContext,
  CommonFunction,
  CommonCall,
  CommonAssignment,
  CommonReturn,
  CommonReference,
  CommonPrimitive,
} from ".";

export class CommonNode {
  type = "unknown";

  static from(languageName: LanguageName, node: Node, source: string): CommonNode | null {
    if (["function_declaration", "function_definition"].includes(node.type)) {
      return CommonFunction.from(languageName, node, source);
    } else if (["call_expression", "call", "function_call"].includes(node.type)) {
      return CommonCall.from(languageName, node, source);
    } else if (
      [
        "assignment_statement",
        "assignment_expression",
        "assignment",
        "variable_declarator",
      ].includes(node.type)
    ) {
      return CommonAssignment.from(languageName, node, source);
    } else if (node.type === "return_statement") {
      return CommonReturn.from(languageName, node, source);
    } else if (
      ["expression_statement", "variable_declaration", "lexical_declaration"].includes(node.type)
    ) {
      const child = node.namedChildren[0];
      if (child) {
        const commonNode = CommonNode.from(languageName, child, source) as any;
        if ("declaration" in commonNode && /declaration/.test(node.type))
          commonNode.declaration = true;
        return commonNode;
      } else return null;
    } else if (node.type === "identifier") {
      return CommonReference.from(languageName, node, source);
    } else if (["false", "true", "number", "integer", "float", "string"].includes(node.type)) {
      return CommonPrimitive.from(languageName, node, source);
    } else if (node.isNamed) {
      return new CommonNode();
    } else return null;
  }

  print(_language: LanguageName, _context?: PrintContext): string {
    return "";
  }
}
