function checkNull() {
  record = {
    foo: null,
  };
  echo(toString(record["foo"] === null));
}
