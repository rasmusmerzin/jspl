function recordExample()
  record = {
    b = 2,
    o = 99.7,
  }
  echo(String(record["b"] + record["o"]))
  record["m"] = "hey"
  echo(record["m"])
end
