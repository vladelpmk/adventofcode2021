export let flipMajorDiagonal = function (matrix: number[][]) {
  return matrix[0].map((column, index) => matrix.map((row) => row[index]));
};
