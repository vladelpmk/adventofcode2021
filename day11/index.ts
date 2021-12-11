import { readFileSync } from "fs";

const file = readFileSync("day11/input.txt").toString("utf-8");
let input = file.split("\n").map((i) => i.split("").map((i) => parseInt(i)));
const STEPS = 100;

let pulses = 0;
let pulsedThisStep: { i: number; j: number }[] = [];

const pulseAdjacent = (x: number, y: number) => {
  var adjacent: String[][] = [[]];
  for (let i = x - 1; i <= x + 1; i++) {
    const row: String[] = [];
    for (let j = y - 1; j <= y + 1; j++) {
      if (!input[i] || input[i][j] === undefined) {
        continue;
      }
      if (pulsedThisStep.some((p) => p.i === i && p.j === j)) {
        continue;
      }
      input[i][j] += 1;
      if (input[i][j] > 9) {
        input[i][j] = 0;
        pulses++;
        pulsedThisStep.push({ i, j });
        pulseAdjacent(i, j);
      }
    }
    adjacent.push(row);
  }
};

const pulse = () => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] > 9) {
        input[i][j] = 0;
        pulses++;
        pulsedThisStep.push({ i, j });
        pulseAdjacent(i, j);
      }
    }
  }
};

for (let i = 0; i < STEPS; i++) {
  pulsedThisStep = [];
  input = input.map((i) => i.map((j) => j + 1));
  pulse();
}

console.log(`Part 1: ${pulses}`);
input = file.split("\n").map((i) => i.split("").map((i) => parseInt(i)));
const everyoneFlashes = (): boolean => input.flat().every((i) => i === 0);

let stop = false;
let step = 0;
while (!stop) {
  step++;
  pulsedThisStep = [];
  input = input.map((i) => i.map((j) => j + 1));
  pulse();
  if (everyoneFlashes()) {
    console.log(`Part 2: ${step}`);
    stop = true;
  }
}
