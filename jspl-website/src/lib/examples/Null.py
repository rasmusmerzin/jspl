def checkNull():
    record = {
        "foo": None,
    }
    print(toString(record["foo"] == None))
