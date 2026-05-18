import { CommonNode, DeriveContext, PrintContext } from ".";
import {
  resolveAllIdentifiers,
  resolveBlockNode,
  resolveIdentifier,
  resolveParamsNode,
} from "./util";

export class CommonFunction extends CommonNode {
  type = "function";
  name = "";
  parameters!: string[];
  procedure!: CommonNode[];

  static derive(context: DeriveContext): CommonFunction {
    if (!["function_declaration", "function_definition"].includes(context.node.type)) {
      throw new Error(`Invalid Node.type for CommonFunction: ${context.node.type}`);
    }
    const fn = new CommonFunction();
    fn.name = resolveIdentifier(context.node, context.source);
    const paramsNode = resolveParamsNode(context.languageName, context.node);
    if (paramsNode) fn.parameters = resolveAllIdentifiers(paramsNode, context.source);
    const blockNode = resolveBlockNode(context.languageName, context.node);
    fn.procedure = (blockNode?.namedChildren || [])
      .map((child) => CommonNode.derive(context.derive({ node: child }))!)
      .filter(Boolean);
    return fn;
  }

  print(context: PrintContext): string {
    context.lexicon.add(this.name);
    context = context.derive();
    this.parameters.forEach((param) => context.lexicon.add(param));
    if (context.languageName === "JavaScript") return this.printJavaScript(context);
    else if (context.languageName === "Python") return this.printPython(context);
    else if (context.languageName === "Lua") return this.printLua(context);
    else return "";
  }

  private printJavaScript(context: PrintContext): string {
    const padding = context.getPadding();
    let result = `${padding}function ${this.name || ""}(${this.parameters.join(", ")}) {`;
    if (this.procedure.length) result += "\n";
    const childContext = context.derive({ indent: context.indent + 1 });
    for (const child of this.procedure) {
      result += child.print(childContext);
    }
    if (this.procedure.length) result += padding;
    result += "}\n";
    return result;
  }

  private printPython(context: PrintContext): string {
    const padding = context.getPadding();
    let result = `${padding}def ${this.name || ""}(${this.parameters.join(", ")}):`;
    if (this.procedure.length) result += "\n";
    else result += " pass\n";
    const childContext = context.derive({ indent: context.indent + 1 });
    for (const child of this.procedure) {
      result += child.print(childContext);
    }
    return result;
  }

  private printLua(context: PrintContext): string {
    const padding = context.getPadding();
    let result = `${padding}function ${this.name || ""}(${this.parameters.join(", ")})`;
    if (this.procedure.length) result += "\n";
    else result += " ";
    const childContext = context.derive({ indent: context.indent + 1 });
    for (const child of this.procedure) {
      result += child.print(childContext);
    }
    if (this.procedure.length) result += padding;
    result += "end\n";
    return result;
  }
}
