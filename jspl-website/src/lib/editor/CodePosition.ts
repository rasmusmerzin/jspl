export class CodePosition {
  constructor(
    readonly line = 1,
    readonly column = 1,
  ) {}

  static from(source: string, position: number) {
    let line = 1;
    let column = 1;
    for (let i = 0; i < position; i++) {
      if (source[i] === "\n") {
        line++;
        column = 1;
      } else column++;
    }
    return new CodePosition(line, column);
  }

  toNumber(source: string) {
    let line = 1;
    let column = 1;
    for (let i = 0; i < source.length; i++) {
      if (line === this.line && column === this.column) return i;
      if (source[i] === "\n") {
        if (line === this.line) return i;
        line++;
        column = 1;
      } else column++;
    }
    return source.length;
  }

  toString() {
    return `${this.line},${this.column}`;
  }
}
