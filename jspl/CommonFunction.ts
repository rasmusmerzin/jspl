import type { Node } from "web-tree-sitter";
import { CommonNode, LanguageName, PrintContext } from ".";
import {
  resolveAllIdentifiers,
  resolveBlockNode,
  resolveIdentifier,
  resolveParamsNode,
} from "./util";

export class CommonFunction extends CommonNode {
  type = "function";
  name?: string;
  parameters: string[] = [];
  children: CommonNode[] = [];

  static from(languageName: LanguageName, node: Node, source: string): CommonFunction {
    if (!["function_declaration", "function_definition"].includes(node.type)) {
      throw new Error(`Invalid Node.type for CommonFunction: ${node.type}`);
    }
    const fn = new CommonFunction();
    fn.name = resolveIdentifier(node, source);
    const paramsNode = resolveParamsNode(languageName, node);
    if (paramsNode) fn.parameters = resolveAllIdentifiers(paramsNode, source);
    const blockNode = resolveBlockNode(languageName, node);
    for (const child of blockNode?.children || []) {
      const commonNode = CommonNode.from(languageName, child, source);
      if (commonNode) fn.children.push(commonNode);
    }
    return fn;
  }

  print(language: LanguageName, context = new PrintContext()): string {
    if (language === "JavaScript") return this.printJavaScript(context);
    else if (language === "Python") return this.printPython(context);
    else if (language === "Lua") return this.printLua(context);
    else return "";
  }

  private printJavaScript(context: PrintContext): string {
    const padding = context.getPaddingByLanguage("JavaScript");
    let result = `${padding}function ${this.name || ""}(${this.parameters.join(", ")}) {\n`;
    const childContext = context.clone().assign({ indent: context.indent + 1 });
    for (const child of this.children) {
      result += child.print("JavaScript", childContext);
    }
    result += `${padding}}\n`;
    return result;
  }

  private printPython(context: PrintContext): string {
    const padding = context.getPaddingByLanguage("Python");
    let result = `${padding}def ${this.name || ""}(${this.parameters.join(", ")}):\n`;
    const childContext = context.clone().assign({ indent: context.indent + 1 });
    for (const child of this.children) {
      result += child.print("Python", childContext);
    }
    return result;
  }

  private printLua(context: PrintContext): string {
    const padding = context.getPaddingByLanguage("Lua");
    let result = `${padding}function ${this.name || ""}(${this.parameters.join(", ")})\n`;
    const childContext = context.clone().assign({ indent: context.indent + 1 });
    for (const child of this.children) {
      result += child.print("Lua", childContext);
    }
    result += `${padding}end\n`;
    return result;
  }
}
