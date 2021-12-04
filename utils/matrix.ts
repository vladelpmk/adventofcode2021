export let flipMajorDiagonal = function (matrix) {
  return matrix[0].map((column, index) => matrix.map((row) => row[index]));
};
