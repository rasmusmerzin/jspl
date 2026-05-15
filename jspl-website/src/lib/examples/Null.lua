function checkNull()
  record = {
    foo = nil,
  }
  print(toString(record["foo"] == nil))
end
