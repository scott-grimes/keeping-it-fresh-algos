/*

Given a chessboard with a width and height of N cells, how many possible ways can N queens be arranged on the board so that no two queens can attack each other?

*/


const nQueens = (boardSize) => {
  let solutions = 0;
  const rows = [];
  const width = Math.pow(2, boardSize) - 1;

  const recurse = (row, ld, col, rd) => {
    // check if we are at the end, if so, increment solutions
    if (row === boardSize) {
      return solutions++;
    }

    // figure out where the free spaces are for this row
    const freeMap = ld | col | rd;
    let queenPossibilities = (~freeMap) & width;


    // iterate over the free spaces
    while (queenPossibilities) {
      // compute next row's ld, col, and rd values
      const queenPos = queenPossibilities & -queenPossibilities; // gets right most queen position (LSB)
      const nextCol = queenPos | col;
      const nextLd = ((ld | queenPos) << 1) & width;
      const nextRd = ((rd | queenPos) >> 1);

      // push row to rows
      rows.push(queenPos);
      // call recurse with new values
      recurse(row + 1, nextLd, nextCol, nextRd);
      // pop row off of rows, use next queen position
      rows.pop();
      queenPossibilities ^= queenPos;
    }
  };

  recurse(0, 0, 0, 0);

  return solutions;
};

const assert = (input, actual, expected) => {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    return console.log(`${input} was ${actual} ✓`);
  }

  throw new Error(`${input} expected ${expected} but got ${actual}`);
};


try {
  const inputs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const expecteds = [1, 0, 0, 2, 10, 4, 40, 92, 352, 724, 2680, 14200, 73712];

  inputs.forEach((input, index) => assert(input, nQueens(input), expecteds[index]));

  console.log('All Tests Passed!');
} catch (err) {
  console.log(err);
  console.log('Failed!');
}
