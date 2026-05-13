function print(text)
  io.write(text)
end

function echo(text)
  io.write(text)
  io.write("\n")
  io.flush()
end

function String(value)
  return tostring(value)
end
