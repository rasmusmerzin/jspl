import { CommonNode, DeriveContext, type LanguageName, LANGUAGES, PrintContext } from ".";

export class CommonTree {
  type = "tree";
  children: CommonNode[] = [];

  static parse(languageName: LanguageName, source: string): CommonTree {
    const commonTree = new CommonTree();
    const tree = LANGUAGES[languageName].parser.parse(source);
    if (!tree) return commonTree;
    for (const child of tree.rootNode.children) {
      const context = new DeriveContext(languageName, source, child);
      try {
        const commonNode = CommonNode.derive(context);
        if (commonNode) commonTree.children.push(commonNode);
      } catch (e) {
        console.error(e);
      }
    }
    return commonTree;
  }

  print(context: PrintContext | LanguageName): string {
    if (typeof context === "string") context = new PrintContext(context);
    return this.children
      .map((c) => c.print(context))
      .filter((c) => c)
      .join("\n");
  }
}
