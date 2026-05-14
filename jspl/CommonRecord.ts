import { CommonNode, DeriveContext, PrintContext, resolveSource } from ".";

export class CommonRecord extends CommonNode {
  type = "record";
  pairs: Record<string, CommonNode> = {};

  static derive(context: DeriveContext): CommonRecord {
    if (!["object", "dictionary", "table_constructor"].includes(context.node.type)) {
      throw new Error(`Invalid Node.type for CommonRecord: ${context.node.type}`);
    }
    const rec = new CommonRecord();
    if (context.languageName === "JavaScript") {
      for (const pairNode of context.node.namedChildren) {
        const [keyNode, valueNode] = pairNode.namedChildren;
        if (keyNode.type !== "property_identifier") continue;
        const keyStr = resolveSource(keyNode, context.source);
        rec.pairs[keyStr] = CommonNode.deriveUnknown(context.derive({ node: valueNode }));
      }
    } else if (context.languageName === "Python") {
      for (const pairNode of context.node.namedChildren) {
        const [keyNode, valueNode] = pairNode.namedChildren;
        if (keyNode.type !== "string") continue;
        const keyStr = resolveSource(keyNode, context.source).slice(1, -1);
        rec.pairs[keyStr] = CommonNode.deriveUnknown(context.derive({ node: valueNode }));
      }
    } else if (context.languageName === "Lua") {
      for (const pairNode of context.node.namedChildren) {
        const [keyNode, valueNode] = pairNode.namedChildren;
        if (keyNode.type !== "identifier" || !valueNode) continue;
        const keyStr = resolveSource(keyNode, context.source);
        rec.pairs[keyStr] = CommonNode.deriveUnknown(context.derive({ node: valueNode }));
      }
    }
    return rec;
  }

  print(context: PrintContext): string {
    if (!Object.keys(this.pairs).length) return "{}";
    const padding = context.getPadding();
    const childContext = context.derive({ indent: context.indent + 1 });
    const innerPadding = childContext.getPadding();
    let result = `{\n`;
    for (const [key, value] of Object.entries(this.pairs)) {
      if (context.languageName === "JavaScript") {
        result += `${innerPadding}${key}: ${value.print(childContext)},\n`;
      } else if (context.languageName === "Python") {
        result += `${innerPadding}"${key}": ${value.print(childContext)},\n`;
      } else if (context.languageName === "Lua") {
        result += `${innerPadding}${key} = ${value.print(childContext)},\n`;
      }
    }
    result += `${padding}}`;
    return result;
  }
}
