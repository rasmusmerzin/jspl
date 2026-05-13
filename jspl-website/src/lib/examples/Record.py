def recordExample():
    record = { "a": 1, "b": 2, "o": 99.7, "m": "hi" }
    echo(String(record["b"] + record["o"]))
    record["m"] = "hey"
    echo(record["m"])
