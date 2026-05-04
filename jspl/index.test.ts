import { describe, expect, test } from "vitest";
import { CommonTree, LANGUAGE_NAMES, LANGUAGES } from ".";

const EXAMPLES = {
  HelloWorld: {
    JavaScript: `function main() {\n  print("Hello, World!");\n}\n`,
    Python: `def main():\n    print("Hello, World!")\n`,
    Lua: `function main()\n  print("Hello, World!")\nend\n`,
  },
  DeclareAssignReturn: {
    JavaScript: plain(`
      function declareReturn(argc, argv) {
        let abc = 1.0;
        abc = 2;
        return abc;
      }
    `),
    Python: plain(`
      def declareReturn(argc, argv):
          abc = 1.0
          abc = 2
          return abc
    `),
    Lua: plain(`
      function declareReturn(argc, argv)
        local abc = 1.0
        abc = 2
        return abc
      end
    `),
  },
};

function plain(text: string) {
  const lines = text.split("\n").slice(1, -1);
  const indent = lines[0].length - lines[0].trimStart().length;
  return lines.map((line) => line.slice(indent) + "\n").join("");
}

for (const [name, code] of Object.entries(EXAMPLES)) {
  describe(name, () => {
    for (const sourceLanguage of LANGUAGE_NAMES) {
      describe(`from ${sourceLanguage}`, () => {
        const source = code[sourceLanguage];
        const tree = LANGUAGES[sourceLanguage].parser.parse(source)!;
        const commonTree = CommonTree.from(sourceLanguage, tree, source);
        for (const targetLanguage of LANGUAGE_NAMES) {
          test(`to ${targetLanguage}`, () => {
            expect(commonTree.print(targetLanguage)).toBe(code[targetLanguage]);
          });
        }
      });
    }
  });
}
