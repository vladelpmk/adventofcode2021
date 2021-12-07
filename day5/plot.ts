import { Line } from "./line";
import { Point } from "./point";

export class Plot {
  public lines: Line[] = [];

  maxX: number = 0;
  maxY: number = 0;

  public addLine = (line: Line) => {
    this.lines.push(line);
    this.getMaxX();
    this.getMaxY();
  };

  public addLines = (lines: Line[]) => {
    this.lines = [...this.lines, ...lines];
    this.getMaxX();
    this.getMaxY();
  };

  public getMaxX = () => {
    this.maxX = Math.max(...this.lines.map((l) => [l.p1.x, l.p2.x]).flat());
  };

  public getMaxY = () => {
    this.maxY = Math.max(...this.lines.map((l) => [l.p1.y, l.p2.y]).flat());
  };

  public getPlot = () => {
    let plot: any[] = [];
    for (let y = 0; y <= this.maxY; y++) {
      plot.push([...Array(this.maxX + 1).fill(0)]);
    }

    this.lines.map((l) => {
      l.getPoints().forEach((p) => {
        plot[p.y][p.x]++;
      });
    });
    return plot;
  };

  public toString = () => {
    const plot = this.getPlot();
    return plot
      .map((i) => i.map((j: number) => (j === 0 ? "." : j)).join(""))
      .join("\n");
  };
}
