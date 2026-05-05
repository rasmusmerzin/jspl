import {
  PrintContext,
  CommonFunction,
  CommonCall,
  CommonAssignment,
  CommonReturn,
  CommonReference,
  CommonPrimitive,
  DeriveContext,
} from ".";

export class CommonNode {
  type = "unknown";

  static derive(context: DeriveContext): CommonNode | null {
    switch (context.node.type) {
      case "function_declaration":
      case "function_definition":
        return CommonFunction.derive(context);
      case "call_expression":
      case "call":
      case "function_call":
        return CommonCall.derive(context);
      case "assignment_statement":
      case "assignment_expression":
      case "assignment":
      case "variable_declarator":
        return CommonAssignment.derive(context);
      case "return_statement":
        return CommonReturn.derive(context);
      case "expression_statement":
      case "variable_declaration":
      case "lexical_declaration":
        const child = context.node.namedChildren[0];
        if (!child) return null;
        const commonNode = CommonNode.derive(context.derive({ node: child })) as any;
        if ("declaration" in commonNode && /declaration/.test(context.node.type))
          commonNode.declaration = true;
        return commonNode;
      case "identifier":
        return CommonReference.derive(context);
      case "false":
      case "true":
      case "number":
      case "integer":
      case "float":
      case "string":
        return CommonPrimitive.derive(context);
      default:
        return context.node.isNamed ? new CommonNode() : null;
    }
  }

  static deriveUnknown(context: DeriveContext): CommonNode {
    return CommonNode.derive(context) || new CommonNode();
  }

  print(_context: PrintContext): string {
    return "";
  }
}
