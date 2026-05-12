import { CommonNode, DeriveContext } from ".";

export class CommonExpression extends CommonNode {
  type = "expression";

  static derive(context: DeriveContext): CommonExpression {
    const stmt = new CommonExpression();
    return stmt;
  }
}
