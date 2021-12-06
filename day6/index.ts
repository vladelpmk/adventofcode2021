import { readFileSync } from "fs";

const file = readFileSync("day6/input.txt").toString("utf-8");
const input = file.split(",");

let fish = input.map((i) => parseInt(i));

const calculateForDays = (initial, days) => {
  let optimizedFish = [
    initial.filter((i) => i === 0).length,
    initial.filter((i) => i === 1).length,
    initial.filter((i) => i === 2).length,
    initial.filter((i) => i === 3).length,
    initial.filter((i) => i === 4).length,
    initial.filter((i) => i === 5).length,
    initial.filter((i) => i === 6).length,
    initial.filter((i) => i === 7).length,
    initial.filter((i) => i === 8).length,
  ];

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

console.log(`part 1: ${calculateForDays(fish, 200)}`);
console.log(`part 2: ${calculateForDays(fish, 256)}`);
