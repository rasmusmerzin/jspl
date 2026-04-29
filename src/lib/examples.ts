import type { LanguageName } from "./parser";
import HelloWorldJavaScript from "./examples/HelloWorld.js?raw";
import HelloWorldPython from "./examples/HelloWorld.py?raw";
import HelloWorldLua from "./examples/HelloWorld.lua?raw";
import DeclareReturnJavaScript from "./examples/DeclareReturn.js?raw";
import DeclareReturnPython from "./examples/DeclareReturn.py?raw";
import DeclareReturnLua from "./examples/DeclareReturn.lua?raw";
import ConditionaryReturnJavaScript from "./examples/ConditionaryReturn.js?raw";
import ConditionaryReturnPython from "./examples/ConditionaryReturn.py?raw";
import ConditionaryReturnLua from "./examples/ConditionaryReturn.lua?raw";

export const EXAMPLES: Record<string, Record<LanguageName, string>> = {
  HelloWorld: {
    JavaScript: HelloWorldJavaScript,
    Python: HelloWorldPython,
    Lua: HelloWorldLua,
  },
  DeclareAndReturn: {
    JavaScript: DeclareReturnJavaScript,
    Python: DeclareReturnPython,
    Lua: DeclareReturnLua,
  },
  ConditionaryReturn: {
    JavaScript: ConditionaryReturnJavaScript,
    Python: ConditionaryReturnPython,
    Lua: ConditionaryReturnLua,
  },
};
