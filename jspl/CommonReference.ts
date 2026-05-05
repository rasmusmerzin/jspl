import { CommonNode, DeriveContext, PrintContext } from ".";
import { resolveSource } from "./util";

export class CommonReference extends CommonNode {
  type = "reference";
  path: string[] = [];

  static derive(context: DeriveContext): CommonReference {
    const ref = new CommonReference();
    if (context.node.type === "identifier") {
      ref.path = [resolveSource(context.node, context.source)];
    } else {
      throw new Error(`Invalid Node.type for CommonReference: ${context.node.type}`);
    }
    return ref;
  }

  print(_context: PrintContext): string {
    return this.path.join(".");
  }
}
