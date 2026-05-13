import { CommonNode, DeriveContext, PrintContext } from ".";

export class CommonReference extends CommonNode {
  type = "reference";
  path: CommonNode[] = [];

  static derive(context: DeriveContext): CommonReference {
    const accept = [
      "attribute",
      "dot_index_expression",
      "method_index_expression",
      "member_expression",
    ];
    if (!accept.includes(context.node.type)) {
      throw new Error(`Invalid Node.type for CommonReference: ${context.node.type}`);
    }
    const ref = new CommonReference();
    const [leftNode, rightNode] = context.node.namedChildren;
    const left = CommonNode.deriveUnknown(context.derive({ node: leftNode }));
    const right = CommonNode.deriveUnknown(context.derive({ node: rightNode }));
    if (left instanceof CommonReference) ref.path.push(...left.path);
    else ref.path.push(left);
    if (right instanceof CommonReference) ref.path.push(...right.path);
    else ref.path.push(right);
    return ref;
  }

  print(context: PrintContext): string {
    context = context.derive({ inline: true });
    let result = this.path[0].print(context);
    for (let i = 1; i < this.path.length; i++) {
      let separator = ".";
      if (context.callable && context.languageName === "Lua" && i === this.path.length - 1) {
        separator = ":";
      }
      result += `${separator}${this.path[i].print(context)}`;
    }
    return result;
  }
}
