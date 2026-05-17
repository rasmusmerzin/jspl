import {
  CommonIdentifier,
  CommonNode,
  CommonNull,
  CommonReference,
  DeriveContext,
  PrintContext,
} from ".";
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
    if (["variable_declaration", "lexical_declaration"].includes(context.node.type)) {
      for (const declaratorNode of context.node.namedChildren) {
        const assignment = CommonNode.deriveUnknown(context.derive({ node: declaratorNode }));
        if (assignment instanceof CommonAssignment) {
          stmt.targets.push(...assignment.targets);
          stmt.values.push(...assignment.values);
        }
      }
    } else if (["assignment_expression", "variable_declarator"].includes(context.node.type)) {
      const [targetNode, valueNode] = context.node.namedChildren;
      stmt.targets = [CommonNode.deriveUnknown(context.derive({ node: targetNode }))];
      if (valueNode) {
        stmt.values = [CommonNode.deriveUnknown(context.derive({ node: valueNode }))];
      } else {
        stmt.values = [new CommonNull()];
      }
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
    const declaredNames = this.getDeclaredNames(context);
    let printed = "";
    if (!declaredNames.length || declaredNames.length === this.targets.length) {
      printed = this.dryPrint(context);
    } else {
      const [declares, reassigns] = this.splitByDeclaration(context);
      printed = declares.dryPrint(context) + reassigns.dryPrint(context);
    }
    declaredNames.forEach((name) => context.lexicon.add(name));
    return printed;
  }

  private splitByDeclaration(context: PrintContext): [CommonAssignment, CommonAssignment] {
    const declares = new CommonAssignment();
    const reassigns = new CommonAssignment();
    for (let i = 0; i < this.targets.length; i++) {
      const target = this.targets[i];
      const value = this.values[i];
      if (target instanceof CommonIdentifier && !context.lexicon.has(target.value)) {
        declares.targets.push(target);
        declares.values.push(value);
      } else {
        reassigns.targets.push(target);
        reassigns.values.push(value);
      }
    }
    return [declares, reassigns];
  }

  private dryPrint(context: PrintContext) {
    if (context.languageName === "JavaScript") return this.printJavaScript(context);
    if (context.languageName === "Python") return this.printPython(context);
    if (context.languageName === "Lua") return this.printLua(context);
    else return "";
  }

  private printJavaScript(context: PrintContext) {
    const padding = context.getPadding();
    const prefix = this.getDeclaredNames(context).length ? "let " : "";
    return padding + prefix + this.printInline(context) + ";\n";
  }

  private printPython(context: PrintContext) {
    const padding = context.getPadding();
    return padding + this.printInline(context) + "\n";
  }

  private printLua(context: PrintContext) {
    const padding = context.getPadding();
    const prefix = this.getDeclaredNames(context).length ? "local " : "";
    return padding + prefix + this.printInline(context) + "\n";
  }

  private getDeclaredNames(context: PrintContext): string[] {
    return this.targets
      .filter((target) => target instanceof CommonIdentifier)
      .map((identifier) => identifier.value)
      .filter((name) => !context.lexicon.has(name));
  }

  // print without padding, lexical keyword and newline
  private printInline(context: PrintContext) {
    if (context.languageName === "JavaScript") return this.printInlineJavaScript(context);
    else return this.printInlinePythonLua(context);
  }

  private printInlineJavaScript(context: PrintContext) {
    let result = "";
    const entries: [CommonNode, CommonNode][] = [];
    for (let i = 0; i < this.getCount(); i++) entries.push([this.targets[i], this.values[i]]);
    const childContext = context.derive({ inline: true });
    result += entries
      .map(([name, value]) => `${name.print(childContext)} = ${value.print(childContext)}`)
      .join(", ");
    return result;
  }

  private printInlinePythonLua(context: PrintContext) {
    let result = "";
    const childContext = context.derive({ inline: true });
    result += this.targets.map((t) => t.print(childContext)).join(", ");
    result += " = ";
    result += this.values.map((v) => v.print(childContext)).join(", ");
    return result;
  }
}
