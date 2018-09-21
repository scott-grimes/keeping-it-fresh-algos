/*

Given a string with pairs of parenthesis, brackets, and braces: return a boolean value which represents if the string is correctly balanced

*/


const isBalanced = (s) => {
  const opens = {
    '(': ')',
    '[': ']',
    '{': '}',
  };
  const closes = {
    '}': '{',
    ')': '(',
    ']': '[',
  };
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (Object.keys(opens).includes(char)) {
      stack.push(s[i]);
    } else if (Object.keys(closes).includes(char)) {
      const other = stack.pop();
      if (closes[char] !== other) {
        return false;
      }
    }
  }
  return !stack.length;
};

const assert = (input, actual, expected) => {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    return console.log(`${input} was ${actual} ✓`);
  }

  throw new Error(`${input} expected ${expected} but got ${actual}`);
};


try {
  const inputs = ['{[()]}', '{[(])}', '{{[[(())]]}()}', '()['];
  const expecteds = [
    true, false, true, false,
  ];

  inputs.forEach((input, index) => assert(input, isBalanced(input), expecteds[index]));

  console.log('All Tests Passed!');
} catch (err) {
  console.log(err);
  console.log('Failed!');
}
