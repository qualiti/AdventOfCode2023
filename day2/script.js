const fs = require("node:fs");
fs.readFile("day2/input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.trim().split("\n");
  const inBag = {
    red: 12,
    green: 13,
    blue: 14,
  };

  // ---------------
  // Part 1
  // ---------------
  let total = 0;
  for (const line of lines) {
    const id = line.match(/Game (\d+)/)[1]; // Group 1 is the ID
    const sets = line
      .replace(/Game \d:/, "")
      .split(";")
      .map((s) => s.trim());
    let validGame = true;
    for (const set of sets) {
      const cubes = set.split(",").map((s) => s.trim());
      for (const colorCubes of cubes) {
        // First match is the entire string (amount + color)
        const [_, amount, color] = colorCubes.match(/(\d+) (red|green|blue)/);
        if (inBag[color] < amount) {
          validGame = false;
          break;
        }
      }
    }

    if (validGame) total += Number.parseInt(id);
  }

  console.log("First answer:", total);

  // ---------------
  // Part 2
  // ---------------
  let total2 = 0;
  for (const line of lines) {
    const id = line.match(/Game (\d+)/)[1]; // Group 1 is the ID
    const sets = line
      .replace(/Game \d:/, "")
      .split(";")
      .map((s) => s.trim());
    const least = {
      green: 0,
      blue: 0,
      red: 0,
    };
    for (const set of sets) {
      const cubes = set.split(",").map((s) => s.trim());
      for (const colorCubes of cubes) {
        // First match is the entire string (amount + color)
        const [_, amount, color] = colorCubes.match(/(\d+) (red|green|blue)/);
        if (least[color] < amount) {
          least[color] = Number.parseInt(amount);
        }
      }
    }

    total2 += least["red"] * least["blue"] * least["green"];
  }

  console.log("Second answer:", total2);
});
