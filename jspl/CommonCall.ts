import { CommonNode, DeriveContext, PrintContext } from ".";
import { getTabWidth, resolveArgsNode } from "./util";

export class CommonCall extends CommonNode {
  type = "call";
  callable?: CommonNode;
  arguments: CommonNode[] = [];

  static derive(context: DeriveContext): CommonCall {
    if (!["call_expression", "call", "function_call"].includes(context.node.type)) {
      throw new Error(`Invalid Node.type for CommonCall: ${context.node.type}`);
    }
    const call = new CommonCall();
    const callable = CommonNode.derive(
      context.derive({ node: context.node.namedChildren[0] }),
    );
    if (callable) call.callable = callable;
    const argsNode = resolveArgsNode(context.languageName, context.node);
    call.arguments = (argsNode?.namedChildren || []).map((child) => {
      return CommonNode.deriveUnknown(context.derive({ node: child }));
    });
    return call;
  }

  print(context: PrintContext): string {
    if (!this.callable) return "";
    const padding = context.getPadding(getTabWidth(context.languageName));
    let result = `${padding}${this.callable.print(context)}(`;
    result += this.arguments.map((arg) => arg.print(context)).join(", ");
    result += ")";
    if (context.languageName === "JavaScript") result += ";";
    result += "\n";
    return result;
  }
}
