import { CommonNode, DeriveContext, PrintContext } from ".";
import { resolveAllIdentifiers, resolveNamedChild, resolveSource } from "./util";

export class CommonAssignment extends CommonNode {
  type = "assignment";
  names: string[] = [];
  values: CommonNode[] = [];
  declaration = false;

  getCount(): number {
    return Math.min(this.names.length, this.values.length);
  }

  static derive(context: DeriveContext): CommonAssignment {
    const stmt = new CommonAssignment();
    if (context.node.type === "assignment_statement") {
      const variableList = resolveNamedChild(context.node, "variable_list");
      stmt.names = variableList ? resolveAllIdentifiers(variableList, context.source) : [];
      const expressionList = resolveNamedChild(context.node, "expression_list");
      stmt.values = (expressionList?.namedChildren || []).map((child) => {
        return CommonNode.deriveUnknown(context.derive({ node: child }));
      });
    } else if (
      ["assignment_expression", "assignment", "variable_declarator"].includes(context.node.type)
    ) {
      const [nameNode, valueNode] = context.node.namedChildren;
      stmt.names = [resolveSource(nameNode, context.source)];
      stmt.values = [CommonNode.deriveUnknown(context.derive({ node: valueNode }))];
    } else {
      throw new Error(`Invalid Node.type for CommonAssignment: ${context.node.type}`);
    }
    return stmt;
  }

  print(context: PrintContext): string {
    if (!this.getCount()) return "";
    if (context.languageName === "JavaScript") return this.printJavaScript(context);
    else if (context.languageName === "Python") return this.printPython(context);
    else if (context.languageName === "Lua") return this.printLua(context);
    else return "";
  }

  private printJavaScript(context: PrintContext): string {
    const padding = context.getPaddingByLanguage("JavaScript");
    let result = padding;
    if (this.declaration) result += "let ";
    const entries: [string, CommonNode][] = [];
    for (let i = 0; i < this.getCount(); i++) entries.push([this.names[i], this.values[i]]);
    result += entries.map(([name, value]) => `${name} = ${value.print(context)}`).join(", ");
    result += ";\n";
    return result;
  }

  private printPython(context: PrintContext): string {
    const padding = context.getPaddingByLanguage("Python");
    let result = padding;
    result += this.names.join(", ");
    result += " = ";
    result += this.values.map((v) => v.print(context)).join(", ");
    result += "\n";
    return result;
  }

  private printLua(context: PrintContext): string {
    const padding = context.getPaddingByLanguage("Lua");
    let result = padding;
    if (this.declaration) result += "local ";
    result += this.names.join(", ");
    result += " = ";
    result += this.values.map((v) => v.print(context)).join(", ");
    result += "\n";
    return result;
  }
}
