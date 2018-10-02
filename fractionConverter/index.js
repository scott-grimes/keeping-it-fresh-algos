/*

given a decmial number, produce a string with a simplified fraction that represents the number. whole numbers and mixed fractions should be returned as improper fractions

*/

const fractionConverter = (number) => {
  let num = number;
  let denom = 1;

  // multiply by 10 until whole number reached
  const decInd = `${number}`.indexOf('.');
  if (decInd !== -1) {
    const tens = `${number}`.length - decInd - 1;
    num *= 10 ** tens;
    denom *= 10 ** tens;
  }

  // divide by GCD
  const gcd = GCD(num, denom);

  return `${num / gcd}/${denom / gcd}`;
};

const GCD = (a, b) => {
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
};


const assert = (input, actual, expected) => {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    return console.log(`${input} was ${actual} ✓`);
  }

  throw new Error(`${input} expected ${expected} but got ${actual}`);
};


try {
  const inputs = [0.5, 3, 2.5, 2.75,
  ];
  const expecteds = ['1/2', '3/1', '5/2', '11/4',

  ];

  inputs.forEach((input, index) => assert(input, fractionConverter(input), expecteds[index]));

  console.log('All Tests Passed!');
} catch (err) {
  console.log(err);
  console.log('Failed!');
}
