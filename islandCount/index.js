/*

given a string representing a 2d map, count the number of islands on the map. land is represnted by a 0, water is a period. adjacent land spaces are connected, but not diagonally.

*/

const countIslands = (mapStr) => {
  let count = 0;
  const lines = mapStr.slice().split('\n').map(x => ([...x]));

  const fillIsland = (row, col) => {
    if (row < 0 || row >= lines.length) return;
    if (col < 0 || col >= lines[row].length) return;
    if (lines[row][col] !== '0') return;
    lines[row][col] = '-1';
    fillIsland(row + 1, col);
    fillIsland(row - 1, col);
    fillIsland(row, col + 1);
    fillIsland(row, col - 1);
  };


  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === '0') {
        count++;
        fillIsland(i, j);
      }
    }
  }

  return count;
};

const assert = (input, actual, expected) => {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    return console.log(`${input} was ${actual} ✓`);
  }

  throw new Error(`${input} expected ${expected} but got ${actual}`);
};


try {
  const inputs = [
`.0...
.00..
....0`, 

`..000.
..000.
..000.
.0....
..000.`, 

`..000.
..0...
..0.0.
..0...
..000.`, 

`0...0
..0..
0...0`];
  const expecteds = [
    2, 3, 2, 5,
  ];

  inputs.forEach((input, index) => assert(input, countIslands(input), expecteds[index]));

  console.log('All Tests Passed!');
} catch (err) {
  console.log(err);
  console.log('Failed!');
}
