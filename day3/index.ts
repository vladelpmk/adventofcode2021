import { readFileSync } from "fs";
import { flipMajorDiagonal } from "../utils/matrix";

const file = readFileSync("day3/input.txt").toString("utf-8");
const input = file.split("\n");

let oxygenOutput = input.map((r) => r.split("").map((i) => parseInt(i)));
let bitPosition = 0;

// part 1
let gammaBinary = [],
  epsilonBinary = [];

const flippedInput = flipMajorDiagonal(
  input.map((r) => r.split("").map((i) => parseInt(i))),
);

for (let i = 0; i < flippedInput.length; i++) {
  if (
    flippedInput[i].filter((i: number) => i === 0).length <
    flippedInput[i].filter((i: number) => i === 1).length
  ) {
    gammaBinary.push(1);
    epsilonBinary.push(0);
  }
  if (
    flippedInput[i].filter((i: number) => i === 0).length >
    flippedInput[i].filter((i: number) => i === 1).length
  ) {
    gammaBinary.push(0);
    epsilonBinary.push(1);
  }
}

console.log(
  `Part 1: ${
    parseInt(gammaBinary.join(""), 2) * parseInt(epsilonBinary.join(""), 2)
  }`,
);

// part 2
while (oxygenOutput.length > 1) {
  const flippedOutput = flipMajorDiagonal(oxygenOutput);
  if (
    flippedOutput[bitPosition].filter((i: number) => i === 1).length >=
    flippedOutput[bitPosition].filter((i: number) => i === 0).length
  ) {
    oxygenOutput = oxygenOutput.filter((k) => k[bitPosition] === 1);
  } else {
    oxygenOutput = oxygenOutput.filter((k) => k[bitPosition] === 0);
  }

  bitPosition++;
}

let co2ScrubberRatingOutput = input.map((r) =>
  r.split("").map((i) => parseInt(i)),
);
bitPosition = 0;
// part 2
while (co2ScrubberRatingOutput.length > 1) {
  const flippedOutput = flipMajorDiagonal(co2ScrubberRatingOutput);
  if (
    flippedOutput[bitPosition].filter((i: number) => i === 0).length <=
    flippedOutput[bitPosition].filter((i: number) => i === 1).length
  ) {
    co2ScrubberRatingOutput = co2ScrubberRatingOutput.filter(
      (k) => k[bitPosition] === 0,
    );
  } else {
    co2ScrubberRatingOutput = co2ScrubberRatingOutput.filter(
      (k) => k[bitPosition] === 1,
    );
  }

  bitPosition++;
}

console.log(
  `Part 2: ${
    parseInt(oxygenOutput[0].join(""), 2) *
    parseInt(co2ScrubberRatingOutput[0].join(""), 2)
  }`,
);
