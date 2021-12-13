import { readFileSync } from "fs";

const file = readFileSync("day12/input.txt").toString("utf-8");
let input = file.split("\n").map((i) => i.split("-"));

let paths1: number = 0;

const countPaths1 = (start: string, path: string[]) => {
  const next = input
    .filter((i) => i[0] === start || i[1] === start)
    .map((i) => {
      return i[0] === start ? i[1] : i[0];
    });

  next.forEach((i) => {
    let isSmall = i.toLowerCase() == i;
    if (i === "end") {
      paths1++;
    }

    if (i !== "end" && i !== "start") {
      if ((isSmall && path.indexOf(i) == -1) || !isSmall) {
        countPaths1(i, [...path, i]);
      }
    }
  });
};

countPaths1("start", ["start"]);

console.log(`Part 1: ${paths1}`);

let paths2: number = 0;

const countPaths2 = (start: string, path: string[]) => {
  const next = input
    .filter((i) => i[0] === start || i[1] === start)
    .map((i) => {
      return i[0] === start ? i[1] : i[0];
    });

  const smallInPath = path.filter((i) => i.toLowerCase() == i);
  let alreadyTwoSmallInPath = false;

  smallInPath.forEach((el) => {
    if (smallInPath.filter((n) => n == el).length > 1) {
      alreadyTwoSmallInPath = true;
    }
  });

  next.forEach((i) => {
    let isSmall = i.toLowerCase() == i;

    if (i === "end") {
      paths2++;
    }

    if (i !== "end" && i !== "start") {
      if (!isSmall) {
        countPaths2(i, [...path, i]);
      } else if (!alreadyTwoSmallInPath) {
        countPaths2(i, [...path, i]);
      } else if (alreadyTwoSmallInPath && smallInPath.indexOf(i) === -1) {
        countPaths2(i, [...path, i]);
      }
    }
  });
};

countPaths2("start", ["start"]);

console.log(`Part 2: ${paths2}`);
