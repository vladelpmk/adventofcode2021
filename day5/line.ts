import { Point } from "./point";

export class Line {
  public p1: Point;
  public p2: Point;

  constructor(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
  }

  public getPoints = (): Point[] => {
    const maxX = Math.max(this.p1.x, this.p2.x);
    const maxY = Math.max(this.p1.y, this.p2.y);
    const minX = Math.min(this.p1.x, this.p2.x);
    const minY = Math.min(this.p1.y, this.p2.y);

    const m = (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x);

    const b = this.p1.y - m * this.p1.x;

    const result = [];

    for (let y = minY; y < maxY + 1; y++) {
      for (let x = minX; x < maxX + 1; x++) {
        if (!isFinite(m) && x === this.p1.x) {
          result.push(new Point(x, y));
          break;
        }
        if (y === m * x + b) {
          result.push(new Point(x, y));
        }
      }
    }

    return result;
  };
}
