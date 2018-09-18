/*
Given an array find number of tripets of indices (i,j,k) such that the elements at those indices are in geometric progression for a given common ratio "r" and i<j<k.

Example
[1, 4, 16, 64]
has triples
[1,4,16] at (0,1,2)
[4,16,64] at (1,2,3)
output is:
2


*/

const triples = (arr, r) => {
  const seenCount = {};
  const pairCount = {};
  let count = 0;
  arr.slice().reverse().forEach((x) => {
    if (pairCount[x * r]) {
      count += pairCount[x * r];
    }
    if (seenCount[x * r]) {
      if (!pairCount[x]) {
        pairCount[x] = 0;
      }
      pairCount[x] += seenCount[x * r];
    }

    if (!seenCount[x]) {
      seenCount[x] = 0;
    }

    seenCount[x]++;
  });
  return count;
};

const assert = (input, actual, expected) => {
  if (actual === expected) {
    return console.log(`${input} was ${actual} ✓`);
  }

  throw new Error(`${input} expected ${expected} but got ${actual}`);
};


try {
  const inputs = [
    [[1, 2, 2, 4], 2],
    [[1, 3, 9, 9, 27, 81], 3],
    [[1, 5, 5, 25, 125], 5],
    [[5, 1, 25], 0],
  ];
  const expecteds = [2, 6, 4, 0];

  inputs.forEach((input, index) => assert(input, triples(...input), expecteds[index]));

  console.log('All Tests Passed!');
} catch (err) {
  console.log(err);
  console.log('Failed!');
}
