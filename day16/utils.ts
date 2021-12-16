export const hex2bin = (hex: string) =>
  parseInt(hex, 16).toString(2).padStart(4, "0");
export const bin2dec = (bin: string) => parseInt(bin, 2);
