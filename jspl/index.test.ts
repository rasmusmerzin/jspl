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
          let i = 0;
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
          local i = 0
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
        let text = Math.floor(a, b).toString();
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
        local text = Math:floor(a, b):toString()
        System.out:println(text)
      end
    `),
  },
  Record: {
    JavaScript: strip(`
      function recordExample() {
        let record = {
          b: 2,
          o: 99.7,
        };
        echo(toString(record["b"] + record["o"]));
        record["m"] = "hey";
        echo(record["m"]);
      }
    `),
    Python: strip(`
      def recordExample():
          record = {
              "b": 2,
              "o": 99.7,
          }
          echo(toString(record["b"] + record["o"]))
          record["m"] = "hey"
          echo(record["m"])
    `),
    Lua: strip(`
      function recordExample()
        local record = {
          b = 2,
          o = 99.7,
        }
        echo(toString(record["b"] + record["o"]))
        record["m"] = "hey"
        echo(record["m"])
      end
    `),
  },
  Null: {
    JavaScript: strip(`
      function checkNull() {
        let record = {
          foo: null,
        };
        echo(toString(record["foo"] === null));
      }
    `),
    Python: strip(`
      def checkNull():
          record = {
              "foo": None,
          }
          echo(toString(record["foo"] == None))
    `),
    Lua: strip(`
      function checkNull()
        local record = {
          foo = nil,
        }
        echo(toString(record["foo"] == nil))
      end
    `),
  },
  Empty: {
    JavaScript: strip(`
      function empty() {
        function foo() {}
        if (1 < 2) {
        } else if (true) {
        } else {
        }
        while (false) {}
      }
    `),
    Python: strip(`
      def empty():
          def foo(): pass
          if 1 < 2: pass
          elif True: pass
          else: pass
          while False: pass
    `),
    Lua: strip(`
      function empty()
        function foo() end
        if 1 < 2 then
        elseif true then
        else
        end
        while false do
        end
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
