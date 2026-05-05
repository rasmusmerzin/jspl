import type { Node } from "web-tree-sitter";
import { CommonNode, LanguageName, PrintContext } from ".";
import { resolveAllIdentifiers, resolveCommonNode, resolveNamedChild, resolveSource } from "./util";

export class CommonAssignment extends CommonNode {
  type = "assignment";
  names: string[] = [];
  values: CommonNode[] = [];
  declaration = false;

  getCount(): number {
    return Math.min(this.names.length, this.values.length);
  }

  static from(languageName: LanguageName, node: Node, source: string): CommonAssignment {
    const stmt = new CommonAssignment();
    const commonResolver = resolveCommonNode(languageName, source);
    if (node.type === "assignment_statement") {
      const variableList = resolveNamedChild(node, "variable_list");
      stmt.names = variableList ? resolveAllIdentifiers(variableList, source) : [];
      const expressionList = resolveNamedChild(node, "expression_list");
      stmt.values = (expressionList?.namedChildren || []).map(commonResolver);
    } else if (["assignment_expression", "assignment", "variable_declarator"].includes(node.type)) {
      const [nameNode, valueNode] = node.namedChildren;
      stmt.names = [resolveSource(nameNode, source)];
      stmt.values = [commonResolver(valueNode)];
    } else {
      throw new Error(`Invalid Node.type for CommonAssignment: ${node.type}`);
    }
    return stmt;
  }

  print(language: LanguageName, context = new PrintContext()): string {
    if (!this.getCount()) return "";
    if (language === "JavaScript") return this.printJavaScript(context);
    else if (language === "Python") return this.printPython(context);
    else if (language === "Lua") return this.printLua(context);
    else return "";
  }

  private printJavaScript(context: PrintContext): string {
    const padding = context.getPaddingByLanguage("JavaScript");
    let result = padding;
    if (this.declaration) result += "let ";
    const entries: [string, CommonNode][] = [];
    for (let i = 0; i < this.getCount(); i++) entries.push([this.names[i], this.values[i]]);
    result += entries
      .map(([name, value]) => `${name} = ${value.print("JavaScript", context)}`)
      .join(", ");
    result += ";\n";
    return result;
  }

  private printPython(context: PrintContext): string {
    const padding = context.getPaddingByLanguage("Python");
    let result = padding;
    result += this.names.join(", ");
    result += " = ";
    result += this.values.map((v) => v.print("Python", context)).join(", ");
    result += "\n";
    return result;
  }

  private printLua(context: PrintContext): string {
    const padding = context.getPaddingByLanguage("Lua");
    let result = padding;
    if (this.declaration) result += "local ";
    result += this.names.join(", ");
    result += " = ";
    result += this.values.map((v) => v.print("Lua", context)).join(", ");
    result += "\n";
    return result;
  }
}
