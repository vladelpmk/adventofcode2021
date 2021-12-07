import { readFileSync } from "fs";

const file = readFileSync("day6/input.txt").toString("utf-8");
const input = file.split(",");

let fish = input.map((i) => parseInt(i));

const calculateForDays = (initial, days) => {
  let optimizedFish = new Array(9).fill(0);
  initial.forEach((i) => {
    optimizedFish[i]++;
  });

  for (var day = 1; day <= days; day++) {
    let newFishState = new Array(9).fill(0);
    for (var type = 8; type >= 1; type--) {
      newFishState[type - 1] = optimizedFish[type];
    }

    newFishState[8] = optimizedFish[0];
    newFishState[6] += optimizedFish[0];
    optimizedFish = newFishState;
  }

  return optimizedFish.reduce((acc, item) => acc + item, 0);
};

console.log(`Part 1: ${calculateForDays(fish, 200)}`);
console.log(`Part 2: ${calculateForDays(fish, 256)}`);
