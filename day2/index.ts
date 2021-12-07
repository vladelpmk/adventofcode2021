import { readFileSync } from "fs";

const file = readFileSync("day2/input.txt").toString("utf-8");
const input = file.split("\n");

//Part 1
let x = 0,
  depth = 0;

for (let i = 0; i < input.length; i++) {
  const [command, value] = input[i].split(" ");

  switch (command) {
    case "forward":
      x += parseInt(value);
      break;
    case "down":
      depth += parseInt(value);
      break;
    case "up":
      depth -= parseInt(value);
      break;
    default:
      continue;
  }
}

console.log(`Part 1: ${x * depth}`);

//Part 2
(x = 0), (depth = 0);
let aim = 0;

for (let i = 0; i < input.length; i++) {
  const [command, value] = input[i].split(" ");

  switch (command) {
    case "forward":
      x += parseInt(value);
      depth += parseInt(value) * aim;
      break;
    case "down":
      aim += parseInt(value);
      break;
    case "up":
      aim -= parseInt(value);
      break;
    default:
      continue;
  }
}

console.log(`Part 2: ${x * depth}`);
