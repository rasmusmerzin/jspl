import type { Node } from "web-tree-sitter";
import { CommonNode, LanguageName, PrintContext } from ".";
import { getTabWidth, resolveNamedChild } from "./util";

export class CommonReturn extends CommonNode {
  type = "return";
  value?: CommonNode;

  static from(languageName: LanguageName, node: Node, source: string): CommonReturn {
    const stmt = new CommonReturn();
    if (node.type === "return_statement") {
      if (languageName === "Lua") {
        const list = resolveNamedChild(node, "expression_list");
        const child = list?.children[0];
        if (child) {
          const commonNode = CommonNode.from(languageName, child, source);
          if (commonNode) stmt.value = commonNode;
        }
      } else if (["JavaScript", "Python"].includes(languageName)) {
        const [child] = node.namedChildren;
        if (child) {
          const commonNode = CommonNode.from(languageName, child, source);
          if (commonNode) stmt.value = commonNode;
        }
      }
    } else {
      throw new Error(`Invalid Node.type for CommonReturn: ${node.type}`);
    }
    return stmt;
  }

  print(language: LanguageName, context = new PrintContext()): string {
    const padding = context.getPadding(getTabWidth(language));
    let result = `${padding}return`;
    if (this.value) result += " " + this.value.print(language, context);
    if (language === "JavaScript") result += ";";
    result += "\n";
    return result;
  }
}
