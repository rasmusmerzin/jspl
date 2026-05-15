def checkNull():
    record = {
        "foo": None,
    }
    echo(toString(record["foo"] == None))
