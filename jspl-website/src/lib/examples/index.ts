import type { LanguageName } from "jspl";
import HelloWorldJavaScript from "./HelloWorld.js?raw";
import HelloWorldPython from "./HelloWorld.py?raw";
import HelloWorldLua from "./HelloWorld.lua?raw";
import DeclareAssignReturnJavaScript from "./DeclareAssignReturn.js?raw";
import DeclareAssignReturnPython from "./DeclareAssignReturn.py?raw";
import DeclareAssignReturnLua from "./DeclareAssignReturn.lua?raw";
import ConditionaryReturnJavaScript from "./ConditionaryReturn.js?raw";
import ConditionaryReturnPython from "./ConditionaryReturn.py?raw";
import ConditionaryReturnLua from "./ConditionaryReturn.lua?raw";
import WhileJavaScript from "./While.js?raw";
import WhilePython from "./While.py?raw";
import WhileLua from "./While.lua?raw";
import DotAccessorJavaScript from "./DotAccessor.js?raw";
import DotAccessorPython from "./DotAccessor.py?raw";
import DotAccessorLua from "./DotAccessor.lua?raw";
import RecordJavaScript from "./Record.js?raw";
import RecordPython from "./Record.py?raw";
import RecordLua from "./Record.lua?raw";
import NullJavaScript from "./Null.js?raw";
import NullPython from "./Null.py?raw";
import NullLua from "./Null.lua?raw";
import EmptyJavaScript from "./Empty.js?raw";
import EmptyPython from "./Empty.py?raw";
import EmptyLua from "./Empty.lua?raw";

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
  DotAccessor: {
    JavaScript: DotAccessorJavaScript,
    Python: DotAccessorPython,
    Lua: DotAccessorLua,
  },
  Record: {
    JavaScript: RecordJavaScript,
    Python: RecordPython,
    Lua: RecordLua,
  },
  Null: {
    JavaScript: NullJavaScript,
    Python: NullPython,
    Lua: NullLua,
  },
  Empty: {
    JavaScript: EmptyJavaScript,
    Python: EmptyPython,
    Lua: EmptyLua,
  },
};
