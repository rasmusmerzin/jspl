import { LanguageName } from ".";
import { getTabWidth } from "./util";

export class PrintContext {
  indent = 0;

  getPadding(width = 4) {
    return " ".repeat(width * this.indent);
  }

  getPaddingByLanguage(language: LanguageName) {
    return this.getPadding(getTabWidth(language));
  }

  clone(): PrintContext {
    return Object.assign(new PrintContext(), this);
  }

  assign(...updates: Partial<PrintContext>[]): this {
    return Object.assign(this, ...updates);
  }
}
