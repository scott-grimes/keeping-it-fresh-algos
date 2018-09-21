/*

You are climbing a stair case. It takes N steps to reach to the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top? Solution must run in O(n) time

*/

const climbStairs = (n) => {
  // Write your code here, and
  // return your final answer.

  const memo = new Array(n + 1).fill(0);
  memo[1] = 1;
  memo[2] = 2;
  for (let i = 3; i < memo.length; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }

  return memo[n];
};


const assert = (input, actual, expected) => {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    return console.log(`${input} was ${actual} ✓`);
  }

  throw new Error(`${input} expected ${expected} but got ${actual}`);
};


try {
  const inputs = [0, 1, 8, 10];
  const expecteds = [0, 1, 34, 89];

  inputs.forEach((input, index) => assert(input, climbStairs(input), expecteds[index]));


  console.log('All Tests Passed!');
} catch (err) {
  console.log(err);
  console.log('Failed!');
}
