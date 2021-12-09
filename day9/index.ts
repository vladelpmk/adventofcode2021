import { readFileSync } from "fs";

const file = readFileSync("day9/input.txt").toString("utf-8");
const input = file.split("\n").map((i) => i.split("").map((i) => parseInt(i)));

let normalizedInput: boolean[][] = [];

const getValue = (i: number, j: number) => {
  if (input[i] === undefined || input[i][j] === undefined) {
    return 9;
  }
  return input[i][j];
};

const getNormalizedValue = (i: number, j: number) => {
  if (normalizedInput[i] === undefined || normalizedInput[i][j] === undefined) {
    return true;
  }
  return normalizedInput[i][j];
};

const setNormalizedValue = (i: number, j: number, value: boolean) => {
  if (normalizedInput[i] === undefined || normalizedInput[i][j] === undefined) {
    return;
  }
  normalizedInput[i][j] = value;
};

const calculateBasinWithOrigin = (x: number, y: number) => {
  normalizedInput = input.map((i) => i.map((j) => j === 9));
  let ret = 0;
  const spread = (x: number, y: number) => {
    if (getNormalizedValue(x, y)) {
      return;
    }
    ret++;
    setNormalizedValue(x, y, true);
    spread(x - 1, y);
    spread(x, y - 1);
    spread(x + 1, y);
    spread(x, y + 1);
  };
  spread(x, y);

  return ret;
};

let sum1 = 0;
let basinSizes = [];
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (
      input[i][j] < getValue(i, j - 1) &&
      input[i][j] < getValue(i, j + 1) &&
      input[i][j] < getValue(i - 1, j) &&
      input[i][j] < getValue(i + 1, j)
    ) {
      sum1 += input[i][j] + 1;
      basinSizes.push(calculateBasinWithOrigin(i, j));
    }
  }
}

basinSizes = basinSizes.sort((a, b) => b - a);

console.log(`Part 1: ${sum1}`);
console.log(`Part 2: ${basinSizes[0] * basinSizes[1] * basinSizes[2]}`);
