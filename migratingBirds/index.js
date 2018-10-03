/*

given an array of integers, each representing and species of bird spotted while birdwatching, return the integer representing the bird which was spotted the most frequently. if multiple birds tie for first place frequency, the bird with the smallest integer tag is returned

*/

const migratoryBirds = (arr) => {
  const count = {};
  let highestVal = 0;

  arr.forEach((i) => {
    if (!count[i]) {
      count[i] = 0;
    }
    count[i]++;

    if (count[i] > highestVal) {
      highestVal = count[i];
    }
  });

  return +Object.keys(count).filter(key => count[key] === highestVal).sort((a, b) => a - b)[0];
};


const assert = (input, actual, expected) => {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    return console.log(`${input} was ${actual} ✓`);
  }

  throw new Error(`${input} expected ${expected} but got ${actual}`);
};


try {
  const inputs = [
    [1, 4, 4, 4, 5, 3],
    [1, 2, 3, 4, 5, 4, 3, 2, 1, 3, 4],
  ];
  const expecteds = [
    4, 3,
  ];

  inputs.forEach((input, index) => assert(input, migratoryBirds(input), expecteds[index]));

  console.log('All Tests Passed!');
} catch (err) {
  console.log(err);
  console.log('Failed!');
}
