import type { LanguageName } from "./parser";

export const EXAMPLES: Array<Record<LanguageName, string>> = [
  {
    JavaScript: `function main() {\n  print("Hello, World!");\n}\n`,
    Python: `def main():\n    print("Hello, World!")\n`,
    Lua: `function main()\n  print("Hello, World!")\nend\n`,
  },
  {
    JavaScript: `function main(argc, argv) {\n  let abc = 1;\n  return abc;\n}\n`,
    Python: `def main(argc, argv):\n    abc = 1\n    return abc\n`,
    Lua: `function main(argc, argv)\n  local abc = 1\n  return abc\nend\n`,
  },
];
