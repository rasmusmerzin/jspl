import type { LanguageName } from "jspl";
import HelloWorldJavaScript from "./examples/HelloWorld.js?raw";
import HelloWorldPython from "./examples/HelloWorld.py?raw";
import HelloWorldLua from "./examples/HelloWorld.lua?raw";
import DeclareAssignReturnJavaScript from "./examples/DeclareAssignReturn.js?raw";
import DeclareAssignReturnPython from "./examples/DeclareAssignReturn.py?raw";
import DeclareAssignReturnLua from "./examples/DeclareAssignReturn.lua?raw";
import ConditionaryReturnJavaScript from "./examples/ConditionaryReturn.js?raw";
import ConditionaryReturnPython from "./examples/ConditionaryReturn.py?raw";
import ConditionaryReturnLua from "./examples/ConditionaryReturn.lua?raw";
import WhileJavaScript from "./examples/While.js?raw";
import WhilePython from "./examples/While.py?raw";
import WhileLua from "./examples/While.lua?raw";

export const EXAMPLES: Record<string, Record<LanguageName, string>> = {
  HelloWorld: {
    JavaScript: HelloWorldJavaScript,
    Python: HelloWorldPython,
    Lua: HelloWorldLua,
  },
  DeclareAssignReturn: {
    JavaScript: DeclareAssignReturnJavaScript,
    Python: DeclareAssignReturnPython,
    Lua: DeclareAssignReturnLua,
  },
  ConditionaryReturn: {
    JavaScript: ConditionaryReturnJavaScript,
    Python: ConditionaryReturnPython,
    Lua: ConditionaryReturnLua,
  },
  While: {
    JavaScript: WhileJavaScript,
    Python: WhilePython,
    Lua: WhileLua,
  },
};
