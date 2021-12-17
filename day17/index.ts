import { readFileSync } from "fs";

const file = readFileSync("day17/input.txt").toString("utf-8");
const input = file
  .replace("target area: x=", "")
  .replace("y=", "")
  .split(",")
  .map((i) => i.split("..").map((i) => parseInt(i)));

const TARGET = {
  X: {
    MIN: input[0][0],
    MAX: input[0][1],
  },
  Y: {
    MIN: input[1][0],
    MAX: input[1][1],
  },
};

const maximums: number[] = [];

const calc = (vx: number, vy: number) => {
  let state = {
    x: 0,
    y: 0,
    velocityX: vx,
    velocityY: vy,
  };

  let yMAX = 0;

  while (true) {
    if (
      state.x >= TARGET.X.MIN &&
      state.x <= TARGET.X.MAX &&
      state.y >= TARGET.Y.MIN &&
      state.y <= TARGET.Y.MAX
    ) {
      maximums.push(yMAX);
      break;
    }

    if (state.x >= TARGET.X.MAX || state.y <= TARGET.Y.MIN) {
      break;
    }

    state.x += state.velocityX;
    state.y += state.velocityY;

    if (state.y > yMAX) {
      yMAX = state.y;
    }

    if (state.velocityX !== 0) {
      if (state.velocityX > 0) {
        state.velocityX -= 1;
      }
      if (state.velocityX < 0) {
        state.velocityX += 1;
      }
    }
    state.velocityY -= 1;
  }
};

for (let i = 0; i <= TARGET.X.MAX; i++) {
  for (let j = TARGET.Y.MIN; j < Math.abs(TARGET.Y.MAX * 2); j++) {
    calc(i, j);
  }
}

console.log(`Part 1:${Math.max(...maximums)} Part 2:${maximums.length}`);
