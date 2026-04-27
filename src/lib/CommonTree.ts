import type { Node, Tree } from "web-tree-sitter";
import type { LanguageName } from "./parser";

export class CommonTree {
  type = "tree";
  children: CommonNode[] = [];

  static from(languageName: LanguageName, tree: Tree, source: string): CommonTree {
    const commonTree = new CommonTree();
    for (const child of tree.rootNode.children) {
      const commonNode = CommonNode.from(languageName, child, source);
      if (commonNode) commonTree.children.push(commonNode);
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
    } else if (["assignment_statement"].includes(node.type)) {
      return CommonAssignment.from(languageName, node, source);
    } else if (["false", "true", "number", "string"].includes(node.type)) {
      return CommonPrimitive.from(languageName, node, source);
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
    [fn.name] = resolveIdentifiers(node, source);
    const blockNode = resolveBlockNode(languageName, node);
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

  private printLua(context = new PrintContext()): string {
    const padding = context.getPadding(2);
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
    const assignment = new CommonAssignment();
    // derive names
    if (node.type === "assignment_statement") {
      const variableList = resolveNamedChild(node, "variable_list");
      assignment.names = variableList ? resolveIdentifiers(variableList, source) : [];
      const expressionList = resolveNamedChild(node, "expression_list");
      for (const child of expressionList?.namedChildren || []) {
        const commonNode = CommonNode.from(languageName, child, source);
        if (commonNode) assignment.values.push(commonNode);
      }
    } else {
      throw new Error(`Invalid Node.type for CommonAssignment: ${node.type}`);
    }
    // derive values
    return assignment;
  }

  print(language: LanguageName, context?: PrintContext): string {
    if (language === "Lua") return this.printLua(context);
    else return "";
  }

  private printLua(context = new PrintContext()): string {
    const padding = context.getPadding(2);
    let result = padding;
    result += this.names.join(", ");
    result += " = ";
    result += this.values.map((v) => v.print("Lua", context)).join(", ");
    result += "\n";
    return result;
  }
}

export class CommonPrimitive extends CommonNode {
  type = "primitive";
  subtype?: "boolean" | "number" | "string";
  value?: string;

  static from(languageName: LanguageName, node: Node, source: string): CommonNode | null {
    const primitive = new CommonPrimitive();
    if (["false", "true"].includes(node.type)) {
      primitive.subtype = "boolean";
      primitive.value = node.type;
    } else if (node.type === "number") {
      primitive.subtype = "number";
      primitive.value = resolveSource(node, source);
    } else if (node.type === "string") {
      primitive.subtype = "string";
      primitive.value = resolveSource(node, source);
    } else {
      throw new Error(`Invalid Node.type for CommonPrimitive: ${node.type}`);
    }
    return primitive;
  }

  print(language: LanguageName, context?: PrintContext): string {
    return this.value || "";
  }
}

export class PrintContext {
  indent = 0;

  getPadding(width = 4) {
    return " ".repeat(width * this.indent);
  }

  clone(): PrintContext {
    return Object.assign(new PrintContext(), this);
  }

  assign(...updates: Partial<PrintContext>[]): this {
    return Object.assign(this, ...updates);
  }
}

function resolveSource(node: Node, source: string): string {
  return source.slice(node.startIndex, node.endIndex);
}

function resolveIdentifiers(node: Node, source: string): string[] {
  const identifierNodes = resolveNamedChildren(node, "identifier");
  return identifierNodes.map((node) => source.slice(node.startIndex, node.endIndex));
}

function resolveBlockNode(languageName: LanguageName, node: Node): Node | undefined {
  return resolveNamedChild(node, getBlockType(languageName));
}

function resolveNamedChild(node: Node, type: string): Node | undefined {
  return node.namedChildren.find((child) => child.type === type);
}

function resolveNamedChildren(node: Node, type: string): Node[] {
  return node.namedChildren.filter((child) => child.type === type);
}

function getBlockType(languageName: LanguageName): string {
  if (languageName === "JavaScript") return "statement_block";
  else if (["Python", "Lua"].includes(languageName)) return "block";
  else return "";
}
