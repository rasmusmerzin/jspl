import type { Tree } from "web-tree-sitter";
import { CommonNode, LanguageName, PrintContext } from ".";

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
    return this.children
      .map((c) => c.print(language, context))
      .filter((c) => c)
      .join("\n");
  }
}
