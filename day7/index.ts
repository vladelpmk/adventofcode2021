import { readFileSync } from "fs";

const file = readFileSync("day7/input.txt").toString("utf-8");
var input = file.split(",").map((i) => parseInt(i));

var fuel = 0;

while (!input.every((i) => i === input[0])) {
  const max = Math.max(...input);
  const min = Math.min(...input);

  const maxItems = input.filter((i) => i === max).length;
  const minItems = input.filter((i) => i === min).length;

  if (maxItems <= minItems) {
    input = input.map((i) => {
      if (i === max) {
        fuel++;
        return i - 1;
      }
      return i;
    });
  }

  if (maxItems >= minItems) {
    input = input.map((i) => {
      if (i === min) {
        fuel++;
        return i + 1;
      }
      return i;
    });
  }
}

console.log(`Part 1: ${fuel}`);

const getFuel = (start, end) => {
  let sum = 0;
  for (let i = 0; i <= Math.abs(start - end); i++) {
    sum = sum + i;
  }
  return sum;
};

const max = Math.max(...input);
const min = Math.min(...input);

let opt = [];

for (let i = min; i <= max; i++) {
  opt.push(input.map((j) => getFuel(j, i)).reduce((k, acc) => k + acc, 0));
}

console.log(`Part 2: ${Math.min(...opt.map((i) => i))}`);
