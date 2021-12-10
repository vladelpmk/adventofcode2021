import { readFileSync } from "fs";

const file = readFileSync("day10/input.txt").toString("utf-8");
const input = file.split("\n");

const pairs = [/\[\]/g, /\{\}/g, /\(\)/g, /\<\>/g];

const opening = ["[", "{", "(", "<"];
const closing = ["]", "}", ")", ">"];

let illegals: String[] = [];
let additions: String[][] = [];

input.forEach((line) => {
  let stop = false;
  while (!stop) {
    const previousLength = line.length;

    for (let i = 0; i < pairs.length; i++) {
      line = line.replace(pairs[i], "");
    }

    if (line.length === previousLength) {
      stop = true;
    }
  }

  // corrupted lines
  if (line.length !== 0 || line.split("").some((r) => closing.includes(r))) {
    const parts = line.split("");
    for (var i = 0; i < parts.length; i++) {
      if (closing.indexOf(parts[i]) !== -1) {
        illegals.push(parts[i]);
        break;
      }
    }
  }

  // incomplete lines
  if (line.length !== 0 && !closing.some((r) => line.includes(r))) {
    const parts = line.split("");
    const closeWith: String[] = [];
    for (var i = parts.length - 1; i >= 0; i--) {
      closeWith.push(closing[opening.indexOf(parts[i])]);
    }
    additions.push(closeWith);
  }
});

const convertedIllegals: number[] = illegals.map((i) => {
  switch (i) {
    case ")":
      return 3;
    case "]":
      return 57;
    case "}":
      return 1197;
    case ">":
      return 25137;
  }
  return 0;
});

console.log(
  `Part 1: ${convertedIllegals.reduce((acc, item) => acc + item, 0)}`,
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
