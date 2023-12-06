const fs = require("node:fs");
fs.readFile("day1/1/input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.trim().split("\n");
  const count = lines
    .map((line) => line.split(""))
    .map((chars) => chars.filter((char) => !isNaN(char)))
    .map((chars) => {
      if (chars.length > 0) {
        return Number.parseInt(chars[0] + chars[chars.length - 1]);
      }
      return 0;
    })
    .reduce((prev, current) => prev + current);
  console.log(count);
});
