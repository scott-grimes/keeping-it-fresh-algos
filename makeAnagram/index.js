/*

The makeAnagram function  must return an integer representing the minimum total characters that must be deleted to make the strings anagrams.

Example:
cde
abc
returns 4
*/


const makeAnagram = (a, b) => {
  const aobj = {};
  const bobj = {};
  let count = 0;
  for (const c of a) {
    if (!aobj[c]) {
      aobj[c] = 0;
    }
    aobj[c]++;
  }

  for (const c of b) {
    if (!bobj[c]) {
      bobj[c] = 0;
    }
    bobj[c]++;
  }
  for (const key of Object.keys(aobj)) {
    if (bobj[key]) {
      count += Math.abs(aobj[key] - bobj[key]);
      delete bobj[key];
    } else {
      count += aobj[key];
    }
  }
  for (const key of Object.keys(bobj)) {
    count += bobj[key];
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
    ['cde', 'abc'],
    ['fcrxzwscanmligyxyvym',
      'jxwtrhvujlmrpdoqbisbwhmgpmeoke'],
  ];
  const expecteds = [
    4, 30,
  ];

  inputs.forEach((input, index) => assert(input, makeAnagram(...input), expecteds[index]));

  console.log('All Tests Passed!');
} catch (err) {
  console.log(err);
  console.log('Failed!');
}
