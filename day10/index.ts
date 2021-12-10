import { readFileSync } from "fs";

const file = readFileSync("day10/input.txt").toString("utf-8");
const input = file.split("\n");

const pairs = [/\[\]/g, /\{\}/g, /\(\)/g, /\<\>/g];

const opening: string[] = ["[", "{", "(", "<"];
const closing: string[] = ["]", "}", ")", ">"];

let illegals: string[] = [];
let additions: string[][] = [];

for (let l = 0; l < input.length; l++) {
  let line: string = input[l];

  while (true) {
    const previousLength = line.length;

    for (let i = 0; i < pairs.length; i++) {
      line = line.replace(pairs[i], "");
    }

    if (line.length === previousLength) {
      break;
    }
  }

  if (line.length === 0) {
    break;
  }

  // corrupted lines
  if (closing.some((r) => line.includes(r))) {
    illegals.push(
      line.split("").find((char) => closing.indexOf(char) !== -1) as string,
    );
  }

  // incomplete lines
  if (!closing.some((r) => line.includes(r))) {
    additions.push(
      line
        .split("")
        .reverse()
        .map((i) => closing[opening.indexOf(i)]),
    );
  }
}

console.log(
  `Part 1: ${illegals.reduce((acc, item): number => {
    switch (item) {
      case ")":
        return acc + 3;
      case "]":
        return acc + 57;
      case "}":
        return acc + 1197;
      case ">":
        return acc + 25137;
    }
    return acc;
  }, 0)}`,
);

let convertedAdditions: number[] = [];

additions.forEach((addition) => {
  let score = 0;
  addition.forEach((char) => {
    switch (char) {
      case ")":
        return (score = score * 5 + 1);
      case "]":
        return (score = score * 5 + 2);
      case "}":
        return (score = score * 5 + 3);
      case ">":
        return (score = score * 5 + 4);
    }
  });
  convertedAdditions.push(score);
});

console.log(
  `Part 1: ${
    convertedAdditions.sort((a, b) => a - b)[
      convertedAdditions.length / 2 - 0.5
    ]
  }`,
);
