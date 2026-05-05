import type { Node } from "web-tree-sitter";
import { CommonNode, LanguageName, PrintContext } from ".";
import { getTabWidth, resolveArgsNode, resolveCommonNode } from "./util";

export class CommonCall extends CommonNode {
  type = "call";
  callable?: CommonNode;
  arguments: CommonNode[] = [];

  static from(languageName: LanguageName, node: Node, source: string): CommonCall {
    if (!["call_expression", "call", "function_call"].includes(node.type)) {
      throw new Error(`Invalid Node.type for CommonCall: ${node.type}`);
    }
    const call = new CommonCall();
    const callable = CommonNode.from(languageName, node.namedChildren[0], source);
    if (callable) call.callable = callable;
    const argsNode = resolveArgsNode(languageName, node);
    call.arguments = (argsNode?.namedChildren || []).map(resolveCommonNode(languageName, source));
    return call;
  }

  print(language: LanguageName, context = new PrintContext()): string {
    if (!this.callable) return "";
    const padding = context.getPadding(getTabWidth(language));
    let result = `${padding}${this.callable.print(language, context)}(`;
    result += this.arguments.map((arg) => arg.print(language, context)).join(", ");
    result += ")";
    if (language === "JavaScript") result += ";";
    result += "\n";
    return result;
  }
}
