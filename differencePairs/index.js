/*

Given an array of unique integers and a target value, determine the number of pairs of integers in the array who's difference is the target value;

example:
arr = [1,5,3,4,2]
targer = 2
returns 3
the possible pairs are
5-3
4-2
3-1

*/


const pairs = (arr, k) => {
  const hash = {};
  let count = 0;
  arr.forEach((x) => {
    if (hash[x - k]) {
      count++;
    }
    if (hash[x + k]) {
      count++;
    }
    hash[x] = true;
  });
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
    [[1, 5, 3, 4, 2], 2],
    [[363374326, 364147530, 61825163, 1073065718, 1281246024, 1399469912, 428047635, 491595254, 879792181, 1069262793], 1],
    [[1, 3, 5, 8, 6, 4, 2], 2],
  ];
  const expecteds = [
    3, 0, 5,
  ];

  inputs.forEach((input, index) => assert(input, pairs(...input), expecteds[index]));

  console.log('All Tests Passed!');
} catch (err) {
  console.log(err);
  console.log('Failed!');
}
