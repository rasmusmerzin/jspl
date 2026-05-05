import type { Node } from "web-tree-sitter";
import { CommonNode, LanguageName, PrintContext } from ".";
import { resolveSource } from "./util";

export class CommonPrimitive extends CommonNode {
  type = "primitive";
  subtype?: "boolean" | "number" | "string";
  value?: string;

  static from(_languageName: LanguageName, node: Node, source: string): CommonNode | null {
    const primitive = new CommonPrimitive();
    if (["false", "true"].includes(node.type)) {
      primitive.subtype = "boolean";
      primitive.value = node.type;
    } else if (["number", "integer", "float"].includes(node.type)) {
      primitive.subtype = "number";
      primitive.value = resolveSource(node, source);
    } else if (node.type === "string") {
      primitive.subtype = "string";
      primitive.value = resolveSource(node, source);
    } else {
      throw new Error(`Invalid Node.type for CommonPrimitive: ${node.type}`);
    }
    return primitive;
  }

  print(_language: LanguageName, _context?: PrintContext): string {
    return this.value || "";
  }
}
