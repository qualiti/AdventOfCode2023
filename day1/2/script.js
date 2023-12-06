const fs = require("node:fs");
fs.readFile("day1/2/input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const numbers = {
    ["one"]: 1,
    ["two"]: 2,
    ["three"]: 3,
    ["four"]: 4,
    ["five"]: 5,
    ["six"]: 6,
    ["seven"]: 7,
    ["eight"]: 8,
    ["nine"]: 9,
  };
  const regex = /one|two|three|four|five|six|seven|eight|nine|[1-9]/gi;

  const lines = data.trim().split("\n");
  const count = lines
    .map((line) => {
      const matches = [...line.matchAll(regex)];
      const first = matches[0][0];
      const second = matches[matches.length - 1][0];
      return Number.parseInt(
        "" +
          (numbers[first] ? numbers[first] : first) +
          (numbers[second] ? numbers[second] : second)
      );
    })
    .reduce((prev, current) => prev + current);

  console.log(count);
});
