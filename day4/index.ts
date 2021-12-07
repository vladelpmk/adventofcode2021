import { readFileSync } from "fs";
import { flipMajorDiagonal } from "../utils/matrix";

const file = readFileSync("day4/input.txt").toString("utf-8");
const input = file.split(/\n\s*\n/);

const [drawString, ...boardsString] = input;

const draw = drawString.split(",").map((i) => parseInt(i));
const boards = boardsString.map((i) =>
  i.split("\n").map((j) =>
    j
      .split(" ")
      .filter((m) => m !== "")
      .map((k) => parseInt(k)),
  ),
);

const boardWins = (board, draw) => {
  for (let row of board) {
    if (row.every((j) => draw.includes(j))) {
      return true;
    }
  }

  const flippedBoard = flipMajorDiagonal(board);

  for (let row of flippedBoard) {
    if (row.every((j) => draw.includes(j))) {
      return true;
    }
  }

  return false;
};

const calculateBoardSum = (board, draw) => {
  let sum = 0;
  board
    .join()
    .split(",")
    .map((i) => parseInt(i))
    .forEach((k) => {
      if (!draw.includes(k)) {
        sum = sum + k;
      }
    });
  return sum;
};

let winningBoard;
let i = 4;

for (; i < draw.length; i++) {
  for (let board of boards) {
    if (boardWins(board, draw.slice(0, i))) {
      winningBoard = board;
      break;
    }
  }
  if (winningBoard) {
    break;
  }
}
console.log(
  `Part 1 ${calculateBoardSum(winningBoard, draw.slice(0, i)) * draw[i - 1]}`,
);

let losingBoards = boards;
i = 4;

for (; i < draw.length; i++) {
  let winningBoards = [];

  for (let j = 0; j < losingBoards.length; j++) {
    if (draw[i - 1] === 34) {
    }

    if (boardWins(losingBoards[j], draw.slice(0, i))) {
      winningBoards.push(j);
    }
  }

  if (losingBoards.length === 1 && winningBoards.length === 1) {
    break;
  }

  losingBoards = losingBoards.filter(
    (i, index) => !winningBoards.includes(index),
  );
}

console.log(
  `Part 2 ${
    calculateBoardSum(losingBoards[0], draw.slice(0, i)) * draw[i - 1]
  }`,
);
