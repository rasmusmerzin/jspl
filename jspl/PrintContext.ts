import { type LanguageName } from ".";
import { getTabWidth } from "./util";

export class PrintContext {
  indent = 0;
  inline = false;
  callable = false;
  lexicon = new Set<string>();

  constructor(readonly languageName: LanguageName) {}

  getPadding() {
    return " ".repeat(getTabWidth(this.languageName) * this.indent);
  }

  // clone and assign
  derive(...patches: Partial<PrintContext>[]): PrintContext {
    const clone = Object.assign(new PrintContext(this.languageName), this);
    clone.lexicon = new Set(this.lexicon);
    return Object.assign(clone, ...patches);
  }
}
