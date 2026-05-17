function checkNull() {
  let record = {
    foo: null,
  };
  echo(toString(record["foo"] === null));
}
