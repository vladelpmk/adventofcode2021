import { readFileSync } from "fs";

const file = readFileSync("day14/input.txt").toString("utf-8");
let input = file.split("\n\n");

let initialPolymer = input[0];
let rules = input[1].split("\n").map((i) => i.split(" -> "));

let template: {
  [key: string]: number;
} = {};

for (let i = 1; i < initialPolymer.length; i++) {
  const pair = initialPolymer[i - 1] + initialPolymer[i];

  if (template[pair] === undefined) {
    template[pair] = 1;
    continue;
  }
  template[pair] += 1;
}

function run(STEPS = 40) {
  for (let step = 0; step < STEPS; step++) {
    let newPairs: {
      [key: string]: number;
    } = {};

    for (const [pair, count] of Object.entries(template)) {
      const matchPair = rules.find((i) => i[0] === pair);

      if (matchPair) {
        const pair1 = pair[0] + matchPair[1];
        const pair2 = matchPair[1] + pair[1];

        if (newPairs[pair1] === undefined) {
          newPairs[pair1] = 0;
        }
        if (newPairs[pair2] === undefined) {
          newPairs[pair2] = 0;
        }

        newPairs[pair1] += count;
        newPairs[pair2] += count;
      }
    }

    template = { ...newPairs };
  }

  let charCounts: {
    [key: string]: number;
  } = {};

  for (const [pair, count] of Object.entries(template)) {
    if (charCounts[pair[0]] === undefined) {
      charCounts[pair[0]] = 0;
    }
    if (charCounts[pair[1]] === undefined) {
      charCounts[pair[1]] = 0;
    }

    charCounts[pair[0]] += count as number;
    charCounts[pair[1]] += count as number;
  }

  const results = Object.values(charCounts)
    .map((i) => Math.ceil(i / 2))
    .sort((a, b) => a - b);

  return results[results.length - 1] - results[0];
}

console.log(`Part 1: ${run(10)}`);
console.log(`Part 2: ${run()}`);
