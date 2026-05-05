import { CommonNode, DeriveContext, PrintContext } from ".";
import { getTabWidth, resolveNamedChild } from "./util";

export class CommonReturn extends CommonNode {
  type = "return";
  value?: CommonNode;

  static derive(context: DeriveContext): CommonReturn {
    const stmt = new CommonReturn();
    if (context.node.type === "return_statement") {
      if (context.languageName === "Lua") {
        const list = resolveNamedChild(context.node, "expression_list");
        const child = list?.children[0];
        if (child) {
          const commonNode = CommonNode.derive(context.derive({ node: child }));
          if (commonNode) stmt.value = commonNode;
        }
      } else if (["JavaScript", "Python"].includes(context.languageName)) {
        const [child] = context.node.namedChildren;
        if (child) {
          const commonNode = CommonNode.derive(context.derive({ node: child }));
          if (commonNode) stmt.value = commonNode;
        }
      }
    } else {
      throw new Error(`Invalid Node.type for CommonReturn: ${context.node.type}`);
    }
    return stmt;
  }

  print(context: PrintContext): string {
    const padding = context.getPadding(getTabWidth(context.languageName));
    let result = `${padding}return`;
    if (this.value) result += " " + this.value.print(context);
    if (context.languageName === "JavaScript") result += ";";
    result += "\n";
    return result;
  }
}
