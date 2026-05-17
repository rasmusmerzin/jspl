function checkNull()
  local record = {
    foo = nil,
  }
  echo(toString(record["foo"] == nil))
end
