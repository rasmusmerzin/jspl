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
    } else if (
      [
        "assignment_statement",
        "assignment_expression",
        "assignment",
        "variable_declarator",
      ].includes(node.type)
    ) {
      return CommonAssignment.from(languageName, node, source);
    } else if (["return_statement"].includes(node.type)) {
      return CommonReturn.from(languageName, node, source);
    } else if (
      ["expression_statement", "variable_declaration", "lexical_declaration"].includes(node.type)
    ) {
      const child = node.namedChildren[0];
      if (child) {
        const commonNode = CommonNode.from(languageName, child, source) as any;
        if ("declaration" in commonNode && /declaration/.test(node.type))
          commonNode.declaration = true;
        return commonNode;
      } else return null;
    } else if (["identifier"].includes(node.type)) {
      return CommonReference.from(languageName, node, source);
    } else if (["false", "true", "number", "integer", "float", "string"].includes(node.type)) {
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

  print(language: LanguageName, context = new PrintContext()): string {
    if (language === "JavaScript") return this.printJavaScript(context);
    else if (language === "Python") return this.printPython(context);
    else if (language === "Lua") return this.printLua(context);
    else return "";
  }

  private printJavaScript(context: PrintContext): string {
    const padding = context.getPaddingByLanguage("JavaScript");
    let result = `${padding}function ${this.name || ""}() {\n`;
    const childContext = context.clone().assign({ indent: context.indent + 1 });
    for (const child of this.children) {
      result += child.print("JavaScript", childContext);
    }
    result += `${padding}}`;
    return result;
  }

  private printPython(context: PrintContext): string {
    const padding = context.getPaddingByLanguage("Python");
    let result = `${padding}def ${this.name || ""}():\n`;
    const childContext = context.clone().assign({ indent: context.indent + 1 });
    for (const child of this.children) {
      result += child.print("Python", childContext);
    }
    return result;
  }

  private printLua(context: PrintContext): string {
    const padding = context.getPaddingByLanguage("Lua");
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
  declaration = false;

  getCount(): number {
    return Math.min(this.names.length, this.values.length);
  }

  static from(languageName: LanguageName, node: Node, source: string): CommonAssignment {
    const stmt = new CommonAssignment();
    const commonResolver = resolveCommonNode(languageName, source);
    if (node.type === "assignment_statement") {
      const variableList = resolveNamedChild(node, "variable_list");
      stmt.names = variableList ? resolveIdentifiers(variableList, source) : [];
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

export class CommonReturn extends CommonNode {
  type = "return";
  value?: CommonNode;

  static from(languageName: LanguageName, node: Node, source: string): CommonReturn {
    const stmt = new CommonReturn();
    if (node.type === "return_statement") {
      if (languageName === "Lua") {
        const list = resolveNamedChild(node, "expression_list");
        const child = list?.children[0];
        if (child) {
          const commonNode = CommonNode.from(languageName, child, source);
          if (commonNode) stmt.value = commonNode;
        }
      } else if (["JavaScript", "Python"].includes(languageName)) {
        const [child] = node.namedChildren;
        if (child) {
          const commonNode = CommonNode.from(languageName, child, source);
          if (commonNode) stmt.value = commonNode;
        }
      }
    } else {
      throw new Error(`Invalid Node.type for CommonReturn: ${node.type}`);
    }
    return stmt;
  }

  print(language: LanguageName, context = new PrintContext()): string {
    const padding = context.getPadding(getTabWidth(language));
    let result = `${padding}return`;
    if (this.value) result += " " + this.value.print(language, context);
    if (language === "JavaScript") result += ";";
    result += "\n";
    return result;
  }
}

export class CommonReference extends CommonNode {
  type = "reference";
  path: string[] = [];

  static from(languageName: LanguageName, node: Node, source: string): CommonReference {
    const ref = new CommonReference();
    if (node.type === "identifier") {
      ref.path = [resolveSource(node, source)];
    } else {
      throw new Error(`Invalid Node.type for CommonReturn: ${node.type}`);
    }
    return ref;
  }

  print(language: LanguageName, context?: PrintContext): string {
    return this.path.join(".");
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
    } else if (["number", "integer", "float"].includes(node.type)) {
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

  getPaddingByLanguage(language: LanguageName) {
    return this.getPadding(getTabWidth(language));
  }

  clone(): PrintContext {
    return Object.assign(new PrintContext(), this);
  }

  assign(...updates: Partial<PrintContext>[]): this {
    return Object.assign(this, ...updates);
  }
}

export function getTabPadding(languageName: LanguageName) {
  return " ".repeat(getTabWidth(languageName));
}

export function getTabWidth(languageName: LanguageName) {
  if (languageName === "Python") return 4;
  else return 2;
}

function resolveSource(node: Node, source: string): string {
  return source.slice(node.startIndex, node.endIndex);
}

function resolveCommonNode(languageName: LanguageName, source: string) {
  return (node: Node) => CommonNode.from(languageName, node, source) || new CommonNode();
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
