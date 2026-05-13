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
        print("Hello, World!\\n");
      }
    `),
    Python: strip(`
      def main():
          print("Hello, World!\\n")
    `),
    Lua: strip(`
      function main()
        print("Hello, World!\\n")
      end
    `),
  },
  DeclareAssignReturn: {
    JavaScript: strip(`
      function declareReturn(argc, argv) {
        abc = 1.0;
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
        abc = 1.0
        abc = 2
        return abc
      end
    `),
  },
  ConditionaryReturn: {
    JavaScript: strip(`
      function condReturn(item) {
        if (item === 1 || item < 0) {
          return "one";
        } else if (item === 2) {
          return "two";
        } else {
          return "other";
        }
      }
    `),
    Python: strip(`
      def condReturn(item):
          if item == 1 or item < 0:
              return "one"
          elif item == 2:
              return "two"
          else:
              return "other"
    `),
    Lua: strip(`
      function condReturn(item)
        if item == 1 or item < 0 then
          return "one"
        elseif item == 2 then
          return "two"
        else
          return "other"
        end
      end
    `),
  },
  While: {
    JavaScript: strip(`
      function whileLoop(count) {
        while (count > 0) {
          i = 0;
          while (i < count) {
            print(" x");
            i = i + 1;
          }
          print("\\n");
          count = count - 1;
        }
      }
    `),
    Python: strip(`
      def whileLoop(count):
          while count > 0:
              i = 0
              while i < count:
                  print(" x")
                  i = i + 1
              print("\\n")
              count = count - 1
    `),
    Lua: strip(`
      function whileLoop(count)
        while count > 0 do
          i = 0
          while i < count do
            print(" x")
            i = i + 1
          end
          print("\\n")
          count = count - 1
        end
      end
    `),
  },
  DotAccessor: {
    JavaScript: strip(`
      function dotAccessor(a, b) {
        text = Math.floor(a, b).toString();
        System.out.println(text);
      }
    `),
    Python: strip(`
      def dotAccessor(a, b):
          text = Math.floor(a, b).toString()
          System.out.println(text)
    `),
    Lua: strip(`
      function dotAccessor(a, b)
        text = Math:floor(a, b):toString()
        System.out:println(text)
      end
    `),
  },
  Record: {
    JavaScript: strip(`
      function recordExample() {
        record = { a: 1, b: 2, o: 99.7, m: "hi" };
        echo(String(record["b"] + record["o"]));
        record["m"] = "hey";
        echo(record["m"]);
      }
    `),
    Python: strip(`
      def recordExample():
          record = { "a": 1, "b": 2, "o": 99.7, "m": "hi" }
          echo(String(record["b"] + record["o"]))
          record["m"] = "hey"
          echo(record["m"])
    `),
    Lua: strip(`
      function recordExample()
        record = { a = 1, b = 2, o = 99.7, m = "hi" }
        echo(String(record["b"] + record["o"]))
        record["m"] = "hey"
        echo(record["m"])
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
