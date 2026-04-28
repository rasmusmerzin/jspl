import type { LanguageName } from "./parser";

export const EXAMPLES: Array<Record<LanguageName, string>> = [
  {
    JavaScript: `function main(argc, argv) {\n  let abc = 1;\n  return abc;\n}\n`,
    Python: `def main(argc, argv):\n    abc = 1\n    return abc\n`,
    Lua: `function main(argc, argv)\n  local abc = 1\n  return abc\nend\n`,
  },
];
