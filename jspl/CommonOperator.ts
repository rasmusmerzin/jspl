import { CommonNode, DeriveContext, LanguageName, PrintContext } from ".";

export type OperatorSubtype =
  | "or"
  | "and"
  | "eq"
  | "neq"
  | "lt"
  | "gt"
  | "le"
  | "ge"
  | "add"
  | "sub"
  | "mul"
  | "div"
  | "unknown";

export class CommonOperator extends CommonNode {
  type = "operator";
  subtype!: OperatorSubtype;
  left!: CommonNode;
  right!: CommonNode;

  static derive(context: DeriveContext): CommonOperator {
    const accept = [
      "binary_expression",
      "binary_operator",
      "boolean_operator",
      "comparison_operator",
    ];
    if (!accept.includes(context.node.type)) {
      throw new Error(`Invalid Node.type for CommonOperator: ${context.node.type}`);
    }
    const stmt = new CommonOperator();
    const [lhs, operator, rhs] = context.node.children;
    stmt.subtype = deriveOperatorSubtype(operator.type);
    stmt.left = CommonNode.deriveUnknown(context.derive({ node: lhs }));
    stmt.right = CommonNode.deriveUnknown(context.derive({ node: rhs }));
    return stmt;
  }

  print(context: PrintContext): string {
    const operator = printOperatorSubtype(context.languageName, this.subtype);
    let lhs = this.left.print(context);
    let rhs = this.right.print(context);
    if (
      this.left instanceof CommonOperator &&
      shouldReorderOperators(this.subtype, this.left.subtype)
    ) {
      lhs = `(${lhs})`;
    }
    if (
      this.right instanceof CommonOperator &&
      shouldReorderOperators(this.subtype, this.right.subtype)
    ) {
      rhs = `(${rhs})`;
    }
    // TODO: check if parentheses are necessary
    return `${lhs} ${operator} ${rhs}`;
  }
}

function deriveOperatorSubtype(text: string): OperatorSubtype {
  if (["==", "==="].includes(text)) return "eq";
  else if (["!=", "!==", "~="].includes(text)) return "neq";
  else if (["and", "&&"].includes(text)) return "and";
  else if (["or", "||"].includes(text)) return "or";
  else if (text === "<") return "lt";
  else if (text === ">") return "gt";
  else if (text === "<=") return "le";
  else if (text === ">=") return "ge";
  else if (text === "+") return "add";
  else if (text === "-") return "sub";
  else if (text === "*") return "mul";
  else if (text === "/") return "div";
  else return "unknown";
}

function printOperatorSubtype(languageName: LanguageName, subtype: OperatorSubtype): string {
  switch (subtype) {
    case "eq":
      if (languageName === "JavaScript") return "===";
      else return "==";
    case "neq":
      if (languageName === "JavaScript") return "!==";
      else if (languageName === "Python") return "!=";
      else return "~=";
    case "and":
      if (languageName === "JavaScript") return "&&";
      else return "and";
    case "or":
      if (languageName === "JavaScript") return "||";
      else return "or";
    case "lt":
      return "<";
    case "gt":
      return ">";
    case "le":
      return "<=";
    case "ge":
      return ">=";
    case "add":
      return "+";
    case "sub":
      return "-";
    case "mul":
      return "*";
    case "div":
      return "/";
    default:
      return "?";
  }
}

function shouldReorderOperators(first: OperatorSubtype, second: OperatorSubtype): boolean {
  return operatorPrecedence(second) < operatorPrecedence(first);
}

function operatorPrecedence(subtype: OperatorSubtype): number {
  switch (subtype) {
    case "or":
    case "and":
      return 1;
    case "eq":
    case "neq":
    case "lt":
    case "gt":
    case "le":
    case "ge":
      return 2;
    case "add":
    case "sub":
      return 3;
    case "mul":
    case "div":
      return 4;
    default:
      return 0;
  }
}
