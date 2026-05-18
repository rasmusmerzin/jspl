import { CommonNode, DeriveContext, PrintContext } from ".";
import { resolveSource } from "./util";

export class CommonPrimitive extends CommonNode {
  type = "primitive";
  subtype!: "boolean" | "number" | "string";
  value!: string;

  static derive(context: DeriveContext): CommonPrimitive | null {
    const primitive = new CommonPrimitive();
    if (["false", "true"].includes(context.node.type)) {
      primitive.subtype = "boolean";
      primitive.value = context.node.type;
    } else if (["number", "integer", "float"].includes(context.node.type)) {
      primitive.subtype = "number";
      primitive.value = resolveSource(context.node, context.source);
    } else if (context.node.type === "string") {
      primitive.subtype = "string";
      primitive.value = resolveSource(context.node, context.source);
    } else {
      throw new Error(`Invalid Node.type for CommonPrimitive: ${context.node.type}`);
    }
    return primitive;
  }

  print(context: PrintContext): string {
    if (this.subtype === "boolean" && context.languageName === "Python")
      return this.value.slice(0, 1).toUpperCase() + this.value.slice(1);
    return this.value || "";
  }
}
