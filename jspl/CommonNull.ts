import { CommonNode, DeriveContext, PrintContext } from ".";

export class CommonNull extends CommonNode {
  type = "null";

  static derive(context: DeriveContext): CommonNull {
    if (!["undefined", "null", "none", "nil"].includes(context.node.type)) {
      throw new Error(`Invalid Node.type for CommonNull: ${context.node.type}`);
    }
    return new CommonNull();
  }

  print(context: PrintContext) {
    if (context.languageName === "JavaScript") return "null";
    else if (context.languageName === "Python") return "None";
    else if (context.languageName === "Lua") return "nil";
    else return "";
  }
}
