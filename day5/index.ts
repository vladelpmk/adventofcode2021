import { readFileSync } from "fs";
import { Line } from "./line";
import { Plot } from "./plot";
import { Point } from "./point";

const file = readFileSync("day5/input.txt").toString("utf-8");
const input = file.split("\n");

const lines = input.map((i) => {
  const parts = i.split(" -> ").map((j) => {
    const parts = j.split(",");
    return new Point(parseInt(parts[0]), parseInt(parts[1]));
  });
  return new Line(parts[0], parts[1]);
});

const plot1 = new Plot();

plot1.addLines(lines.filter((l) => l.p1.x === l.p2.x || l.p1.y === l.p2.y));
console.log(
  "part 1",
  plot1
    .getPlot()
    .flat()
    .filter((i) => i > 1).length,
);

const plot2 = new Plot();
plot2.addLines(lines);
console.log(
  "part 2",
  plot2
    .getPlot()
    .flat()
    .filter((i) => i > 1).length,
);
