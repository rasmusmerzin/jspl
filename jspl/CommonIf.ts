import { CommonNode, DeriveContext, PrintContext } from ".";

export class CommonIf extends CommonNode {
  type = "if";
  conditions: [CommonNode, CommonNode[]][] = [];
  otherwise?: CommonNode[];

  static derive(context: DeriveContext): CommonIf {
    if (!["if_statement", "elseif_statement", "elif_clause"].includes(context.node.type)) {
      throw new Error(`Invalid Node.type for CommonIf: ${context.node.type}`);
    }
    const stmt = new CommonIf();
    const [conditionNode, procedureNode, ...otherNodes] = context.node.namedChildren;
    const expression = CommonNode.deriveUnknown(context.derive({ node: conditionNode }));
    let procedure = (procedureNode?.children || []).map((child) => {
      return CommonNode.deriveUnknown(context.derive({ node: child }));
    });
    if (context.languageName === "JavaScript") {
      procedure = procedure.slice(1, -1);
    }
    stmt.conditions = [[expression, procedure]];
    if (context.languageName === "JavaScript") {
      const tailNode = otherNodes[0]?.namedChildren[0];
      if (!tailNode) return stmt;
      if (tailNode.type === "if_statement") {
        const tail = CommonIf.derive(context.derive({ node: tailNode }));
        stmt.conditions.push(...tail.conditions);
        stmt.otherwise = tail.otherwise;
      } else if (tailNode.type === "statement_block") {
        stmt.otherwise = tailNode.children.slice(1, -1).map((child) => {
          return CommonNode.deriveUnknown(context.derive({ node: child }));
        });
      }
    } else {
      for (const other of otherNodes) {
        if (["elseif_statement", "elif_clause"].includes(other.type)) {
          const [conditionNode, procedureNode] = other.namedChildren;
          const expression = CommonNode.deriveUnknown(context.derive({ node: conditionNode }));
          const procedure = (procedureNode?.children || []).map((child) => {
            return CommonNode.deriveUnknown(context.derive({ node: child }));
          });
          stmt.conditions.push([expression, procedure]);
        } else if (["else_statement", "else_clause"].includes(other.type)) {
          const [blockNode] = other.namedChildren;
          stmt.otherwise = (blockNode?.children || []).map((child) => {
            return CommonNode.deriveUnknown(context.derive({ node: child }));
          });
        }
      }
    }
    return stmt;
  }

  print(context: PrintContext): string {
    if (context.languageName === "JavaScript") return this.printJavaScript(context);
    else if (context.languageName === "Python") return this.printPython(context);
    else if (context.languageName === "Lua") return this.printLua(context);
    else return "";
  }

  private printJavaScript(context: PrintContext) {
    const padding = context.getPadding();
    const [primary, ...rest] = this.conditions;
    let result = `${padding}if (${primary[0].print(context)}) {\n`;
    const primaryChildContext = context.derive({ indent: context.indent + 1 });
    for (const child of primary[1]) {
      result += child.print(primaryChildContext);
    }
    for (const elseif of rest) {
      const childContext = context.derive({ indent: context.indent + 1 });
      result += `${padding}} else if (${elseif[0].print(context)}) {\n`;
      for (const child of elseif[1]) {
        result += child.print(childContext);
      }
    }
    if (this.otherwise) {
      const childContext = context.derive({ indent: context.indent + 1 });
      result += `${padding}} else {\n`;
      for (const child of this.otherwise) {
        result += child.print(childContext);
      }
    }
    result += `${padding}}\n`;
    return result;
  }

  private printPython(context: PrintContext) {
    const padding = context.getPadding();
    const [primary, ...rest] = this.conditions;
    let result = `${padding}if ${primary[0].print(context)}:\n`;
    const childContext = context.derive({ indent: context.indent + 1 });
    for (const child of primary[1]) {
      result += child.print(childContext);
    }
    for (const elseif of rest) {
      result += `${padding}elif ${elseif[0].print(context)}:\n`;
      for (const child of elseif[1]) {
        result += child.print(childContext);
      }
    }
    if (this.otherwise) {
      result += `${padding}else:\n`;
      for (const child of this.otherwise) {
        result += child.print(childContext);
      }
    }
    return result;
  }

  private printLua(context: PrintContext) {
    const padding = context.getPadding();
    const [primary, ...rest] = this.conditions;
    let result = `${padding}if ${primary[0].print(context)} then\n`;
    const childContext = context.derive({ indent: context.indent + 1 });
    for (const child of primary[1]) {
      result += child.print(childContext);
    }
    for (const elseif of rest) {
      result += `${padding}elseif ${elseif[0].print(context)} then\n`;
      for (const child of elseif[1]) {
        result += child.print(childContext);
      }
    }
    if (this.otherwise) {
      result += `${padding}else\n`;
      for (const child of this.otherwise) {
        result += child.print(childContext);
      }
    }
    result += `${padding}end\n`;
    return result;
  }
}
