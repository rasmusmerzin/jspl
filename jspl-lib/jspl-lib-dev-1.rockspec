rockspec_format = "3.0"
package = "jspl-lib"
version = "dev-1"
source = {
  url = "git+ssh://git@github.com/rasmusmerzin/jspl",
}
description = {
  homepage = "https://jspl.merzin.dev",
  license = "MIT",
}
build = {
  type = "builtin",
  modules = {
    init = "init.lua",
  },
}
test_dependencies = {
  "busted",
}
test = {
  type = "busted",
}
