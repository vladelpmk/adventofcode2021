import { bin2dec } from "./utils";

export class Packet {
  public packet: string = "";
  public type: number = 0;
  public version: number = 0;
  public lengthId: number = 0;
  public numberOfSubPackets: number = 0;
  public lengthOfSubPackets: number = 0;

  constructor(_packet: string) {
    this.packet = _packet;
    this.version = bin2dec(_packet.substring(0, 3));
    this.type = bin2dec(_packet.substring(3, 6));
    this.lengthId = bin2dec(_packet.substring(6, 7));
    this.numberOfSubPackets = bin2dec(_packet.substring(7, 18));
    this.lengthOfSubPackets = bin2dec(_packet.substring(7, 22));
  }

  public removeHeader = (): string => {
    switch (this.lengthId) {
      case 0:
        return this.packet.substring(22);
      case 1:
        return this.packet.substring(18);
    }
    return "";
  };

  public removeLiteral = (): string => {
    let parts = this.packet.substring(6).match(/.{1,5}/g) || [];
    let splice = 0;
    for (let i = 0; i < parts.length; i++) {
      if (parts[i][0] === "0") {
        splice = (i + 1) * 4 + 6 + (i + 1);
        break;
      }
    }

    return this.packet.substring(splice);
  };

  public getLiteralValue = (): number => {
    const parts = this.packet.substring(6).match(/.{1,5}/g) || [];
    let result: string[] = [];

    for (let i = 0; i < parts.length; i++) {
      result.push(parts[i].substring(1, 5));
      if (parts[i][0] === "0") {
        break;
      }
    }

    return bin2dec(result.join(""));
  };

  public getOperator = (): any => {
    switch (this.type) {
      case 0: {
        return (i: number[]) => i.reduce((acc, i) => acc + i, 0);
      }
      case 1: {
        return (i: number[]) => i.reduce((acc, i) => acc * i, 1);
      }
      case 2: {
        return (i: number[]) => Math.min(...i);
      }
      case 3: {
        return (i: number[]) => Math.max(...i);
      }
      case 5: {
        return (i: number[]) => (i[0] > i[1] ? 1 : 0);
      }
      case 6: {
        return (i: number[]) => (i[0] < i[1] ? 1 : 0);
      }
      case 7: {
        return (i: number[]) => (i[0] === i[1] ? 1 : 0);
      }
    }
  };
}
