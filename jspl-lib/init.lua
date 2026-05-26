function print(text)
  io.write(text)
end

function echo(text)
  io.write(text)
  io.write("\n")
  io.flush()
end

function toString(value)
  return tostring(value)
end

function isArray(t)
  if getmetatable(t) ~= nil then
    return false
  end
  if type(t) ~= "table" then
    return false
  end
  for k in pairs(t) do
    if type(k) ~= "number" then
      return false
    end
  end
  return true
end

function class(init)
  local c = {}
  if type(init) == "function" then
    c.__init = init
  elseif type(init) == "table" then
    -- shallow copy of init class for inheritance
    for i, v in pairs(init) do
      c[i] = v
    end
  end
  -- Metatable allowing the class to be called like a function
  local mt = {}
  mt.__call = function(class_tbl, ...)
    local obj = {}
    setmetatable(obj, c)
    if c.__init then
      c.__init(obj, ...)
    end
    return obj
  end
  setmetatable(c, mt)
  return c
end

function isA(self, klass)
  local m = getmetatable(self)
  while m do
    if m == klass then
      return true
    end
    m = m.__base
  end
  return false
end

_G.List = class {
  __init = function(self, ...)
    self.items = { ... }
  end,
  of = function(class_tbl, source)
    if isArray(source) then
      return List(table.unpack(source))
    elseif isA(source, List) then
      return List(table.unpack(source.items))
    end
    return List(source)
  end,
  __pairs = function(self)
    return ipairs(self.items)
  end,
  __ipairs = function(self)
    return ipairs(self.items)
  end,
  __index = {
    length = function(self)
      return #self.items
    end,
    at = function(self, index)
      if index >= #self.items or index < -#self.items then
        return nil
      end
      if index < 0 then
        index = #self.items + index
      end
      return self.items[index + 1]
    end,
  },
}
