export class Display {
  public numbers: String[] = new Array(10).fill(undefined);

  public findAndSetNumber = (display: String) => {
    switch (display.length) {
      case 2:
        return this.setNumber(display, 1);
      case 4:
        return this.setNumber(display, 4);
      case 3:
        return this.setNumber(display, 7);
      case 7:
        return this.setNumber(display, 8);
      default:
        return;
    }
  };

  public setNumber = (display: String, number: number) => {
    this.numbers[number] = this.softString(display);
  };

  public decodeNumber = (display: String) => {
    return this.numbers.findIndex((i) => i === this.softString(display));
  };

  public findNine = (input: String) => {
    if (
      input.length === 6 &&
      this.numbers[4] &&
      !this.numbers[9] &&
      this.numbers[4].split("").every((i) => input.split("").includes(i))
    ) {
      this.numbers[9] = this.softString(input);
    }
  };

  public findZero = (input: String) => {
    if (
      input.length === 6 &&
      this.numbers[9] &&
      !this.numbers[0] &&
      this.numbers[1] &&
      this.numbers[1].split("").every((i) => input.split("").includes(i))
    ) {
      this.numbers[0] = this.softString(input);
    }
  };

  public findSix = (input: String) => {
    if (
      input.length === 6 &&
      !this.numbers[6] &&
      this.numbers[9] &&
      this.numbers[0]
    ) {
      this.numbers[6] = this.softString(input);
    }
  };

  public findThree = (input: String) => {
    if (
      input.length === 5 &&
      !this.numbers[3] &&
      this.numbers[7] &&
      this.numbers[7].split("").every((i) => input.split("").includes(i))
    ) {
      this.numbers[3] = this.softString(input);
    }
  };

  public findFive = (input: String) => {
    if (
      input.length === 5 &&
      !this.numbers[5] &&
      this.numbers[9] &&
      input.split("").every((i) => this.numbers[9].split("").includes(i))
    ) {
      this.numbers[5] = this.softString(input);
    }
  };

  public findTwo = (input: String) => {
    if (input.length === 5 && this.numbers[5] && this.numbers[3]) {
      this.numbers[2] = this.softString(input);
    }
  };

  public isMapped = (input: String): boolean =>
    this.numbers.some((i) => i === this.softString(input));

  private softString = (str: String) =>
    [...str].sort((a, b) => a.localeCompare(b)).join("");
}
