import type { Node } from "web-tree-sitter";
import { CommonNode, LanguageName, PrintContext } from ".";
import { resolveSource } from "./util";

export class CommonReference extends CommonNode {
  type = "reference";
  path: string[] = [];

  static from(_languageName: LanguageName, node: Node, source: string): CommonReference {
    const ref = new CommonReference();
    if (node.type === "identifier") {
      ref.path = [resolveSource(node, source)];
    } else {
      throw new Error(`Invalid Node.type for CommonReference: ${node.type}`);
    }
    return ref;
  }

  print(_language: LanguageName, _context?: PrintContext): string {
    return this.path.join(".");
  }
}
