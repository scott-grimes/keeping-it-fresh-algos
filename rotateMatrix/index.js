/*


*/

// rotation 1: clockwise, -1, counter clockwise
const rotateMatrix = (m, rot = 1) => {
  const r = m.length;
  const c = m[0].length;
  const s = new Array(c).fill().map(x => new Array(r).fill());
  m.forEach((row, ri) => {
    row.forEach((col, ci) => {
      if (rot === 1) {
        s[ci][r - ri - 1] = col;
      } else {
        s[c - ci - 1][ri] = col;
      }
    });
  });
  return s;
};

const assert = (input, actual, expected) => {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    return console.log(`${input} was ${actual} ✓`);
  }

  throw new Error(`${input} expected ${expected} but got ${actual}`);
};


try {
  const inputs = [
    [[1, 2],
      [3, 4]],
    [[1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 'A', 'B', 'C'],
      ['D', 'E', 'F', 'G']],
  ];
  const expecteds = [
    [[3, 1],
      [4, 2]],
    [['D', 9, 5, 1],
      ['E', 'A', 6, 2],
      ['F', 'B', 7, 3],
      ['G', 'C', 8, 4]],
  ];

  inputs.forEach((input, index) => assert(input, rotateMatrix(input), expecteds[index]));

  console.log('All Tests Passed!');
} catch (err) {
  console.log(err);
  console.log('Failed!');
}
