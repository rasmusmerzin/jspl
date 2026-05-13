import { CommonNode, DeriveContext, PrintContext } from ".";
import { resolveSource } from "./util";

export class CommonIdentifier extends CommonNode {
  type = "identifier";
  value = "";

  static derive(context: DeriveContext): CommonIdentifier {
    if (!["identifier", "property_identifier"].includes(context.node.type)) {
      throw new Error(`Invalid Node.type for CommonIdentifier: ${context.node.type}`);
    }
    const id = new CommonIdentifier();
    id.value = resolveSource(context.node, context.source);
    return id;
  }

  print(_context: PrintContext): string {
    return this.value;
  }
}
