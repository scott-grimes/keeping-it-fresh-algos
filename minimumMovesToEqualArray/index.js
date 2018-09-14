/*
Given a non-empty integer array of size n, find the minimum number of moves required to make all array elements equal, where a move is incrementing n - 1 elements by 1.

Ex for the given array [1,2,3] => 3
[1,2,3]  =>  [2,3,3]  =>  [3,4,3]  =>  [4,4,4]
*/

const minimumMoves = (arr) => {
  let minVal = arr[0];
  let moves = 0;
  for (const val of arr) {
    minVal = val < minVal ? val : minVal;
  }
  for (const val of arr) {
    moves += val - minVal;
  }

  return moves;
};

const assert = (input, actual, expected) => {
  if (actual === expected) {
    return console.log(`${input} was ${actual} ✓`);
  }

  throw new Error(`${input} expected ${expected} but got ${actual}`);
};


try {
  const inputs = [[1, 2, 3], [1, 2, 3, 5, 1, 12, 15]];
  const expecteds = [3, 32];

  inputs.forEach((input, index) => assert(input, minimumMoves(input), expecteds[index]));

  console.log('All Tests Passed!');
} catch (err) {
  console.log(err);
  console.log('Failed!');
}
