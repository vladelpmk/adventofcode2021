import { readFileSync } from "fs";
import { Packet } from "./packet";
import { hex2bin } from "./utils";

const file = readFileSync("day16/input.txt").toString("utf-8");
const packet = file
  .split("")
  .map((str) => hex2bin(str))
  .join("");

let packets: (Function | number)[] = [];

const parse = (packet: string): number => {
  let sum = 0;
  const pkt = new Packet(packet);

  let body = pkt.removeHeader();

  if (pkt.type === 4) {
    packets.push(pkt.getLiteralValue());
    body = pkt.removeLiteral();
  } else {
    packets.push(pkt.getOperator());
  }

  if (body.replace(/0/gm, "").length === 0) {
    return 0;
  }

  return (sum += pkt.version + parse(body));
};

console.log(`Part 1: ${parse(packet)}`);

let resolved = [];

while (packets.length > 1) {
  var operands = [];
  while (typeof packets[packets.length - 1] !== "function") {
    operands.push(packets.pop());
  }
  const f = packets.pop() as Function;
  resolved.push(f(operands));

  if (typeof packets[packets.length - 1] === "function" || packets.length < 3) {
    packets = [...packets, ...resolved];
    resolved = [];
  }
}

console.log(`Part 2: ${packets[0]}`);
