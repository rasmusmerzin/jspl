import { describe, expect, test } from "vitest";
import { CommonTree, LANGUAGE_NAMES } from ".";

function strip(text: string) {
  const lines = text.split("\n").slice(1, -1);
  const indent = lines[0].length - lines[0].trimStart().length;
  return lines.map((line) => line.slice(indent) + "\n").join("");
}

const EXAMPLES = {
  HelloWorld: {
    JavaScript: strip(`
      function main() {
        print("Hello, World!");
      }
    `),
    Python: strip(`
      def main():
          print("Hello, World!")
    `),
    Lua: strip(`
      function main()
        print("Hello, World!")
      end
    `),
  },
  DeclareAssignReturn: {
    JavaScript: strip(`
      function declareReturn(argc, argv) {
        let abc = 1.0;
        abc = 2;
        return abc;
      }
    `),
    Python: strip(`
      def declareReturn(argc, argv):
          abc = 1.0
          abc = 2
          return abc
    `),
    Lua: strip(`
      function declareReturn(argc, argv)
        local abc = 1.0
        abc = 2
        return abc
      end
    `),
  },
};

for (const [name, code] of Object.entries(EXAMPLES)) {
  describe(name, () => {
    for (const sourceLanguage of LANGUAGE_NAMES) {
      describe(`from ${sourceLanguage}`, () => {
        const source = code[sourceLanguage];
        const commonTree = CommonTree.parse(sourceLanguage, source);
        for (const targetLanguage of LANGUAGE_NAMES) {
          test(`to ${targetLanguage}`, () => {
            expect(commonTree.print(targetLanguage)).toBe(code[targetLanguage]);
          });
        }
      });
    }
  });
}
