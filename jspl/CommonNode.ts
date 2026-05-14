import {
  PrintContext,
  CommonFunction,
  CommonCall,
  CommonAssignment,
  CommonReturn,
  CommonReference,
  CommonPrimitive,
  DeriveContext,
  CommonIf,
  CommonOperator,
  CommonWhile,
  CommonIdentifier,
  CommonRecord,
  CommonIndex,
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
      case "sequence_expression":
      case "variable_declaration":
      case "lexical_declaration":
      // TODO: variable assignment
      case "expression_statement":
      case "parenthesized_expression":
        const [child] = context.node.namedChildren;
        return child ? CommonNode.derive(context.derive({ node: child })) : null;
      case "identifier":
      case "property_identifier":
        return CommonIdentifier.derive(context);
      case "attribute":
      case "dot_index_expression":
      case "method_index_expression":
      case "member_expression":
        return CommonReference.derive(context);
      case "false":
      case "true":
      case "number":
      case "integer":
      case "float":
      case "string":
        return CommonPrimitive.derive(context);
      case "if_statement":
        return CommonIf.derive(context);
      case "binary_expression":
      case "binary_operator":
      case "boolean_operator":
      case "comparison_operator":
        return CommonOperator.derive(context);
      case "while_statement":
        return CommonWhile.derive(context);
      case "object":
      case "dictionary":
      case "table_constructor":
        return CommonRecord.derive(context);
      case "subscript_expression":
      case "subscript":
      case "bracket_index_expression":
        return CommonIndex.derive(context);
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
