import { CommonNode, DeriveContext, PrintContext } from ".";

export class CommonWhile extends CommonNode {
  type = "while";
  expression!: CommonNode;
  procedure!: CommonNode[];

  static derive(context: DeriveContext): CommonWhile {
    if (context.node.type !== "while_statement") {
      throw new Error(`Invalid Node.type for CommonWhile: ${context.node.type}`);
    }
    const stmt = new CommonWhile();
    const [conditionNode, procedureNode] = context.node.namedChildren;
    stmt.expression = CommonNode.deriveUnknown(context.derive({ node: conditionNode }));
    stmt.procedure = (procedureNode?.namedChildren || [])
      .map((child) => CommonNode.derive(context.derive({ node: child }))!)
      .filter(Boolean);
    return stmt;
  }

  print(context: PrintContext): string {
    if (context.languageName === "JavaScript") return this.printJavaScript(context);
    else if (context.languageName === "Python") return this.printPython(context);
    else if (context.languageName === "Lua") return this.printLua(context);
    else return "";
  }

  printJavaScript(context: PrintContext) {
    const padding = context.getPadding();
    let result = `${padding}while (${this.expression.print(context)}) {`;
    if (this.procedure.length) result += "\n";
    const childContext = context.derive({ indent: context.indent + 1 });
    for (const child of this.procedure) {
      result += child.print(childContext);
    }
    if (this.procedure.length) result += padding;
    result += "}\n";
    return result;
  }

  printPython(context: PrintContext) {
    const padding = context.getPadding();
    let result = `${padding}while ${this.expression.print(context)}:`;
    if (this.procedure.length) result += "\n";
    else result += " pass\n";
    const childContext = context.derive({ indent: context.indent + 1 });
    for (const child of this.procedure) {
      result += child.print(childContext);
    }
    return result;
  }

  printLua(context: PrintContext) {
    const padding = context.getPadding();
    let result = `${padding}while ${this.expression.print(context)} do\n`;
    const childContext = context.derive({ indent: context.indent + 1 });
    for (const child of this.procedure) {
      result += child.print(childContext);
    }
    result += `${padding}end\n`;
    return result;
  }
}
