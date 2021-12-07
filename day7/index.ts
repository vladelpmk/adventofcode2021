import { readFileSync } from "fs";

const file = readFileSync("day7/input.txt").toString("utf-8");
const input = file.split(",");

var fuel = 0;

var positions = input.map((i) => parseInt(i));

while (!positions.every((i) => i === positions[0])) {
  const max = Math.max(...positions);
  const min = Math.min(...positions);

  const maxItems = positions.filter((i) => i === max).length;
  const minItems = positions.filter((i) => i === min).length;

  if (maxItems <= minItems) {
    positions = positions.map((i) => {
      if (i === max) {
        fuel++;
        return i - 1;
      }
      return i;
    });
  }

  if (maxItems >= minItems) {
    positions = positions.map((i) => {
      if (i === min) {
        fuel++;
        return i + 1;
      }
      return i;
    });
  }
}

console.log(`Part 1: ${fuel}`);

positions = input.map((i) => parseInt(i));

const getFuel = (start: number, end: number) => {
  let sum = 0;
  for (let i = 0; i <= Math.abs(start - end); i++) {
    sum = sum + i;
  }
  return sum;
};

const max = Math.max(...positions);
const min = Math.min(...positions);

let opt = [];

for (let i = min; i <= max; i++) {
  opt.push(positions.map((j) => getFuel(j, i)).reduce((k, acc) => k + acc, 0));
}

console.log(`Part 2: ${Math.min(...opt.map((i) => i))}`);
