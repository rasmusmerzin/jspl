import { CommonNode, DeriveContext, PrintContext } from ".";

export class CommonIndex extends CommonNode {
  type = "index";
  subject!: CommonNode;
  index!: CommonNode;

  static derive(context: DeriveContext): CommonIndex {
    const accept = ["subscript_expression", "subscript", "bracket_index_expression"];
    if (!accept.includes(context.node.type)) {
      throw new Error(`Invalid Node.type for CommonIndex: ${context.node.type}`);
    }
    const index = new CommonIndex();
    const [subjectNode, indexNode] = context.node.namedChildren;
    index.subject = CommonNode.deriveUnknown(context.derive({ node: subjectNode }));
    index.index = CommonNode.deriveUnknown(context.derive({ node: indexNode }));
    return index;
  }

  print(context: PrintContext): string {
    return `${this.subject.print(context)}[${this.index.print(context)}]`;
  }
}
