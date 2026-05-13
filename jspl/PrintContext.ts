import { type LanguageName } from ".";
import { getTabWidth } from "./util";

export class PrintContext {
  indent = 0;
  inline = false;
  callable = false;

  constructor(readonly languageName: LanguageName) {}

  getPadding() {
    return " ".repeat(getTabWidth(this.languageName) * this.indent);
  }

  // clone and assign
  derive(...patches: Partial<PrintContext>[]): PrintContext {
    return Object.assign(new PrintContext(this.languageName), this, ...patches);
  }
}
