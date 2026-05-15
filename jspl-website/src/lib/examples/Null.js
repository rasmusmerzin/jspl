function checkNull() {
  record = {
    foo: null,
  };
  print(toString(record["foo"] === null));
}
