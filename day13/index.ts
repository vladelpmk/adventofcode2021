import { readFileSync } from "fs";

const file = readFileSync("day13/input.txt").toString("utf-8");
let input = file.split("\n\n");

let dots: number[][] = input[0]
  .split("\n")
  .map((i) => i.split(",").map((i) => parseInt(i)));

let maxX = Math.max(...dots.map((i) => i[0]));
let maxY = Math.max(...dots.map((i) => i[1]));

const folds = input[1]
  .split("\n")
  .map((i) => i.replace("fold along ", ""))
  .map((i) => {
    const parts = i.split("=");
    switch (parts[0]) {
      case "y":
        return { y: parseInt(parts[1]) };
      case "x":
        return { x: parseInt(parts[1]) };
    }
  });

const log = () => {
  for (let i = 0; i < maxY; i++) {
    const ret = [];
    for (let j = 0; j < maxX; j++) {
      if (dots.find((k) => k[0] === j && k[1] === i)) {
        ret.push("#");
        continue;
      }
      ret.push(" ");
    }
    console.log(ret.join(""));
  }
};

const foldY = (y: number) => {
  dots.forEach((dot) => {
    if (dot[1] > y) {
      dot[1] -= (dot[1] - y) * 2;
    }
  });
  maxY = maxY / 2;
};

const foldX = (x: number) => {
  dots.forEach((dot) => {
    if (dot[0] > x) {
      dot[0] -= (dot[0] - x) * 2;
    }
  });
  maxX = maxX / 2;
};

if (folds[0]?.y !== undefined) {
  foldY(folds[0].y);
}
if (folds[0]?.x !== undefined) {
  foldX(folds[0].x);
}

const countDots = () => {
  let ret = 0;
  const maxX = Math.max(...dots.map((i) => i[0]));
  const maxY = Math.max(...dots.map((i) => i[1]));
  for (let i = 0; i < maxY + 1; i++) {
    for (let j = 0; j < maxX + 1; j++) {
      if (dots.find((k) => k[0] === j && k[1] === i)) {
        ret++;
        continue;
      }
    }
  }
  return ret;
};

console.log(`Part 1: ${countDots()}`);

dots = input[0].split("\n").map((i) => i.split(",").map((i) => parseInt(i)));
maxX = Math.max(...dots.map((i) => i[0]));
maxY = Math.max(...dots.map((i) => i[1]));

folds.forEach((fold) => {
  if (fold?.y !== undefined) {
    foldY(fold.y);
  }
  if (fold?.x !== undefined) {
    foldX(fold.x);
  }
});

console.log("Part 2:");
log();
