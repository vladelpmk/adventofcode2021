import { readFileSync } from "fs";

const file = readFileSync("day15/input.txt").toString("utf-8");
const input = file.split("\n").map((i) => i.split("").map((i) => parseInt(i)));

const getShortestPath = (times: number = 1) => {
  const width = input[0].length * times;
  const height = input.length * times;

  const getMap = Array.from({ length: height }, (col, i) =>
    Array.from({ length: width }, (row, j) => {
      return (
        ((input[i % input.length][j % input[0].length] +
          Math.floor(i / input.length) +
          Math.floor(j / input[0].length) -
          1) %
          9) +
        1
      );
    }),
  );

  const getMinAdjacent = (x: number, y: number) => {
    const adj = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];

    return Math.min(...adj.map((i) => scoreMap[i[1]]?.[i[0]] ?? Infinity));
  };

  const scoreMap: number[][] = getMap.map((r) => r.map((i) => Infinity));

  scoreMap[0][0] = 0;
  getMap[0][0] = 0;

  let previousScoreMap: number[][] = [];

  while (JSON.stringify(scoreMap) !== JSON.stringify(previousScoreMap)) {
    previousScoreMap = scoreMap.map((r) => [...r]);
    for (let x = 0; x < getMap[0].length; x++) {
      for (let y = 0; y < getMap.length; y++) {
        if (x === 0 && y === 0) {
          continue;
        }
        scoreMap[y][x] = getMinAdjacent(x, y) + getMap[y][x];
      }
    }
  }
  return scoreMap[height - 1][width - 1];
};

console.log(`Part 1: ${getShortestPath()}`);
console.log(`Part 2: ${getShortestPath(5)}`);
