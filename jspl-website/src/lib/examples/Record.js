function recordExample() {
  let record = {
    b: 2,
    o: 99.7,
  };
  echo(toString(record["b"] + record["o"]));
  record["m"] = "hey";
  echo(record["m"]);
}
