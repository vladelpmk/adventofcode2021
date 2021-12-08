import { readFileSync } from "fs";
import { Display } from "./display";

const file = readFileSync("day8/input.txt").toString("utf-8");
const input = file.split("\n").map((i) =>
  i
    .trim()
    .split(" | ")
    .map((i) => i.split(" ")),
);

const lengthMap = (item: string) => {
  switch (item.length) {
    case 2:
      return 1;
    case 4:
      return 4;
    case 3:
      return 7;
    case 7:
      return 8;
    default:
      return false;
  }
};

const displays1 = input.map((i) => i[1]).flat();
console.log(`Part 1: ${displays1.filter((i) => lengthMap(i)).length}`);

let sum = 0;

const signals = input.map((i) => i[0]);
const displays = input.map((i) => i[1]);

for (let i = 0; i < signals.length; i++) {
  const display = new Display();

  [...signals[i], ...displays[i]].map((s) => {
    display.findAndSetNumber(s);
  });

  [...signals[i], ...displays[i]].map((s) => {
    if (!display.isMapped(s)) {
      display.findNine(s);
    }
  });

  [...signals[i], ...displays[i]].map((s) => {
    if (!display.isMapped(s)) {
      display.findZero(s);
    }
  });

  [...signals[i], ...displays[i]].map((s) => {
    if (!display.isMapped(s)) {
      display.findSix(s);
    }
  });

  [...signals[i], ...displays[i]].map((s) => {
    if (!display.isMapped(s)) {
      display.findThree(s);
    }
  });

  [...signals[i], ...displays[i]].map((s) => {
    if (!display.isMapped(s)) {
      display.findFive(s);
    }
  });

  [...signals[i], ...displays[i]].map((s) => {
    if (!display.isMapped(s)) {
      display.findTwo(s);
    }
  });

  sum += parseInt(displays[i].map((d) => display.decodeNumber(d)).join(""));
}

console.log(`Part 2: ${sum}`);
