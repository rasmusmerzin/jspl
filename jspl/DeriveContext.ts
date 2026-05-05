import { Node } from "web-tree-sitter";
import { LanguageName } from "./parser";

export class DeriveContext {
  constructor(
    readonly languageName: LanguageName,
    readonly source: string,
    public node: Node,
  ) {}

  // clone and assign
  derive(...patches: Partial<DeriveContext>[]): DeriveContext {
    const fresh = new DeriveContext(this.languageName, this.source, this.node);
    return Object.assign(fresh, this, ...patches);
  }
}
