import { CommonNode, DeriveContext, PrintContext } from ".";
import { resolveNamedChild } from "./util";

export class CommonAssignment extends CommonNode {
  type = "assignment";
  targets: CommonNode[] = [];
  values: CommonNode[] = [];

  getCount(): number {
    return Math.min(this.targets.length, this.values.length);
  }

  static derive(context: DeriveContext): CommonAssignment {
    const stmt = new CommonAssignment();
    if (
      ["sequence_expression", "variable_declaration", "lexical_declaration"].includes(
        context.node.type,
      )
    ) {
      // TODO: flatten assignments
    } else if (["assignment_expression", "variable_declarator"].includes(context.node.type)) {
      const [targetNode, valueNode] = context.node.namedChildren;
      stmt.targets = [CommonNode.deriveUnknown(context.derive({ node: targetNode }))];
      stmt.values = [CommonNode.deriveUnknown(context.derive({ node: valueNode }))];
    } else if (context.node.type === "assignment") {
      const [targetNode, valueNode] = context.node.namedChildren;
      if (targetNode.type === "pattern_list" || valueNode.type === "expression_list") {
        stmt.targets = (targetNode?.namedChildren || []).map((child) => {
          return CommonNode.deriveUnknown(context.derive({ node: child }));
        });
        stmt.values = (valueNode?.namedChildren || []).map((child) => {
          return CommonNode.deriveUnknown(context.derive({ node: child }));
        });
      } else {
        stmt.targets = [CommonNode.deriveUnknown(context.derive({ node: targetNode }))];
        stmt.values = [CommonNode.deriveUnknown(context.derive({ node: valueNode }))];
      }
    } else if (context.node.type === "assignment_statement") {
      const variableList = resolveNamedChild(context.node, "variable_list");
      const expressionList = resolveNamedChild(context.node, "expression_list");
      stmt.targets = (variableList?.namedChildren || []).map((child) => {
        return CommonNode.deriveUnknown(context.derive({ node: child }));
      });
      stmt.values = (expressionList?.namedChildren || []).map((child) => {
        return CommonNode.deriveUnknown(context.derive({ node: child }));
      });
    } else {
      throw new Error(`Invalid Node.type for CommonAssignment: ${context.node.type}`);
    }
    return stmt;
  }

  print(context: PrintContext): string {
    if (!this.getCount()) return "";
    if (context.languageName === "JavaScript") return this.printJavaScript(context);
    else return this.printPythonLua(context);
  }

  private printJavaScript(context: PrintContext): string {
    const padding = context.getPadding();
    let result = padding;
    const entries: [CommonNode, CommonNode][] = [];
    for (let i = 0; i < this.getCount(); i++) entries.push([this.targets[i], this.values[i]]);
    const childContext = context.derive({ inline: true });
    result += entries
      .map(([name, value]) => `${name.print(childContext)} = ${value.print(childContext)}`)
      .join(", ");
    result += ";\n";
    return result;
  }

  private printPythonLua(context: PrintContext): string {
    const padding = context.getPadding();
    const childContext = context.derive({ inline: true });
    let result = padding;
    result += this.targets.map((t) => t.print(childContext)).join(", ");
    result += " = ";
    result += this.values.map((v) => v.print(childContext)).join(", ");
    result += "\n";
    return result;
  }
}
