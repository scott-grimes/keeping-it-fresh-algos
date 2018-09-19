/*

Given a number N, determine if N is prime

*/


const isPrime = (n) => {
  if (n <= 1) {
    return false;
  } if (n <= 3) {
    return true;
  } if (n % 2 === 0 || n % 3 === 0) {
    return false;
  }
  let i = 5;
  while (i * i <= n) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
    i += 6;
  }
  return true;
};

const assert = (input, actual, expected) => {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    return console.log(`${input} was ${actual} ✓`);
  }

  throw new Error(`${input} expected ${expected} but got ${actual}`);
};


try {
  const inputs = [1, 2, 3, 4, 31, 97, 666, 27644437];
  const expecteds = [false, true, true, false, true, true, false, true];

  inputs.forEach((input, index) => assert(input, isPrime(input), expecteds[index]));


  console.log('All Tests Passed!');
} catch (err) {
  console.log(err);
  console.log('Failed!');
}
