import { type LanguageName } from ".";
import { getTabWidth } from "./util";

export class PrintContext {
  indent = 0;

  constructor(readonly languageName: LanguageName) {}

  getPadding(width = 4) {
    return " ".repeat(width * this.indent);
  }

  getPaddingByLanguage(language: LanguageName) {
    return this.getPadding(getTabWidth(language));
  }

  // clone and assign
  derive(...patches: Partial<PrintContext>[]): PrintContext {
    return Object.assign(new PrintContext(this.languageName), this, ...patches);
  }
}
