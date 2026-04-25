import type { Node, Tree } from "web-tree-sitter";
import type { LanguageName } from "./parser";

export class CommonTree {
  type = "tree";
  children: CommonNode[] = [];

  static from(languageName: LanguageName, tree: Tree, source: string): CommonTree {
    const commonTree = new CommonTree();
    for (const child of tree.rootNode.children) {
      commonTree.children.push(CommonNode.from(languageName, child, source));
    }
    return commonTree;
  }

  print(language: LanguageName, context?: PrintContext): string {
    let result = "";
    for (const child of this.children) {
      const printed = child.print(language, context);
      if (printed) result += printed + "\n";
    }
    return result;
  }
}

export class CommonNode {
  type = "unknown";

  static from(languageName: LanguageName, node: Node, source: string): CommonNode | null {
    if (["function_declaration", "function_definition"].includes(node.type)) {
      return CommonFunction.from(languageName, node, source);
    } else if (node.isNamed) {
      return new CommonNode();
    } else return null;
  }

  print(_language: LanguageName, _context?: PrintContext): string {
    return "";
  }
}

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
    const identifierNode = node.namedChildren.find((node) => node.type === "identifier");
    if (identifierNode) fn.name = source.slice(identifierNode.startIndex, identifierNode.endIndex);
    const blockType = getBlockType(languageName);
    const blockNode = node.namedChildren.find((node) => node.type === blockType);
    for (const child of blockNode?.children || []) {
      const commonNode = CommonNode.from(languageName, child, source);
      if (commonNode) fn.children.push(commonNode);
    }
    return fn;
  }

  print(language: LanguageName, context?: PrintContext): string {
    if (language === "Lua") return this.printLua(context);
    else return "";
  }

  printLua(context = new PrintContext()): string {
    const padding = "    ".repeat(context.indent);
    let result = `${padding}function ${this.name || ""}()\n`;
    const childContext = context.clone().assign({ indent: context.indent + 1 });
    for (const child of this.children) {
      result += child.print("Lua", childContext);
    }
    result += `${padding}end`;
    return result;
  }
}

export class CommonAssignment extends CommonNode {
  type = "assignment";
  names: string[] = [];
  values: CommonNode[] = [];

  static from(languageName: LanguageName, node: Node, source: string): CommonAssignment {
    if (!["assignment_statement"].includes(node.type)) {
      throw new Error(`Invalid Node.type for CommonFunction: ${node.type}`);
    }
    const assignment = new CommonAssignment();
    // derive names
    // derive values
    return assignment;
  }
}

export class PrintContext {
  indent = 0;

  clone(): PrintContext {
    return Object.assign(new PrintContext(), this);
  }

  assign(...updates: Partial<PrintContext>[]): this {
    return Object.assign(this, ...updates);
  }
}

function getBlockType(languageName: LanguageName): string {
  if (languageName === "JavaScript") return "statement_block";
  else if (["Python", "Lua"].includes(languageName)) return "block";
  else return "";
}
