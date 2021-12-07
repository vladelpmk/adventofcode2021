import { readFileSync } from "fs";

const file = readFileSync("day1/input.txt").toString("utf-8");
const input = file.split("\n");

let deeper1 = 0,
  deeper2 = 0;

for (let i = 0; i < input.length; i++) {
  if (parseInt(input[i]) > parseInt(input[i - 1])) {
    deeper1++;
  }

  const firstWindow =
    parseInt(input[i]) + parseInt(input[i + 1]) + parseInt(input[i + 2]);
  const secondWindow =
    parseInt(input[i + 1]) + parseInt(input[i + 2]) + parseInt(input[i + 3]);

  if (secondWindow > firstWindow) {
    deeper2++;
  }
}

console.log(`Part 1: ${deeper1}`, `Part 2: ${deeper2}`);
