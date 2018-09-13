/*
A string is said to be a child of a another string if it can be formed by deleting 0 or more characters from the other string. Given two strings, what's the longest string that can be constructed such that it is a child of both?

For example, ABCD and ABDC have two children with maximum length 3, ABC and ABD. They can be formed by eliminating either the D or C from both strings. Note that we will not consider ABCD as a common child because we can't rearrange characters and ABCD  ABDC.
*/

const longestCommonChild = (s1, s2) => {
  const sol = new Array(s1.length + 1).fill().map(x => new Array(s2.length + 1).fill(0));
  for (let row = 1; row <= s1.length; row++) {
    const s1char = s1[row - 1];
    for (let col = 1; col <= s2.length; col++) {
      const s2char = s2[col - 1];
      if (s1char === s2char) {
        // append the char to length of the top left cell
        sol[row][col] = sol[row - 1][col - 1] + 1;
      } else {
        // pick longest lengths from above and the left
        // combine strings
        sol[row][col] = Math.max(sol[row - 1][col], sol[row][col - 1]);
      }
    }
  }
  // return the length of the longest string in the bottom right corner
  return sol[s1.length][s2.length];
};

const assert = (input, actual, expected) => {
  if (actual === expected) {
    return console.log(`${input} was ${actual} ✓`);
  }

  throw new Error(`${input} expected ${expected} but got ${actual}`);
};


try {
  const inputs = [['HARRY', 'SALLY'], ['HAN', 'SOLO'], ['SHINCHAN', 'NOHARAAA'], ['AGCAT', 'GACG']];
  const expecteds = [2, 0, 3, 2];

  inputs.forEach((input, index) => assert(input, longestCommonChild(input[0], input[1]), expecteds[index]));

  console.log('All Tests Passed!');
} catch (err) {
  console.log(err);
  console.log('Failed!');
}
