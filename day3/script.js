const fs = require("node:fs");
fs.readFile("day3/input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let total = 0;
  const lineMatches = [];
  const lines = data.trim().split("\n");
  lines.forEach((line, lineIndex) => {
    const numbers = line.matchAll(/\d+/gi);
    lineMatches[lineIndex] = [];
    for (const match of numbers) {
      lineMatches[lineIndex][lineMatches[lineIndex].length] = {
        value: Number.parseInt(match[0]),
        start: match.index,
        end: match.index + match[0].length,
      };

      let isValidMatch = false;
      for (let i = match.index; i < match.index + match[0].length; i++) {
        const hasMatch = (lineToCheck) => {
          // Check the char at the same position
          if (lines[lineToCheck][i].match(/[^.\d]/)) {
            return true;
          }

          // Check the prev char
          if (i > 0) {
            if (lines[lineToCheck][i - 1].match(/[^.\d]/)) {
              return true;
            }
          }

          // Check the next char
          if (i < lines[lineIndex].length - 2) {
            if (lines[lineToCheck][i + 1].match(/[^.\d]/)) {
              return true;
            }
          }
        };

        // Check the prev line
        if (lineIndex > 0 && hasMatch(lineIndex - 1)) {
          isValidMatch = true;
          break;
        }

        // Check in the same line
        if (hasMatch(lineIndex)) {
          isValidMatch = true;
          break;
        }

        // Check the next line
        if (lineIndex < lines.length - 1 && hasMatch(lineIndex + 1)) {
          isValidMatch = true;
          break;
        }
      }

      if (isValidMatch) {
        total += Number.parseInt(match[0]);
      }
    }
  });
  console.log("result first:", total);
});
