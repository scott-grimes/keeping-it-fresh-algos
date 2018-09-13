/*
In an alphabetized array of every anagram of a given string, what index would the given string occupy?

Consider an anagram as any sequence of letters. For any word with at least two different letters, there are other words composed of the same letters but in a different order (for instance, “RESISTANCE”/”ANCESTRIES”, which happen to both be dictionary words; for our purposes “SISTANERCE” is also a word composed of the same letters as these two).

Given a word, return its index number starting at 1 (not 0) to represent the rank of the anagram (for example, the 42nd element is the 42nd alphabetic anagram).

Example for given string ‘cat’:

anagramsOfCat = [‘act’, ‘atc’, ‘cat’, ‘cta’, ‘tac’, ‘tca’];

‘cat’ is the 3rd item in this array, so anagramPosition should return 3; remember that the array is 1-indexed (starts at 1 instead of the usual 0).

The function should be able to accept any word 20 letters or less in length (possibly with some letters repeated), and take no more than 5000 milliseconds to run.
*/


const anagramPosition = (string) => {
  const fact = (z) => { ans = 1; for (i = 1; i < z + 1; i++) { ans *= i; } return !z ? 0 : ans; };

  const orig = string.split('');
  const uniques = Array.from(new Set(orig)).sort();
  const positionDict = {};

  uniques.forEach((letter, index) => {
    positionDict[letter] = 1 + index;
  });

  // how many characters positioned after the index in the original string come before the character in the alphabet?
  const numerator = orig.map((c, index) => {
    let count = 0;
    const charsInFront = uniques.filter(char => positionDict[char] < positionDict[c]);

    if (!charsInFront.length) {
      return count;
    }

    const stringAfterMe = orig.slice(index);

    stringAfterMe.forEach((char) => {
      if (char !== c && charsInFront.includes(char)) {
        count++;
      }
    });
    return count;
  });


  // multiply factorial(letterfrequency) for each letter in the string from the given index on
  const denominator = orig.map((c, index) => {
    // string from each character onward
    const stringAfterMe = orig.slice(index);

    // number of repeats for all characters in string after me
    const repeatedDict = {};
    stringAfterMe.forEach((c) => {
      if (!repeatedDict[c]) {
        repeatedDict[c] = 0;
      }
      repeatedDict[c]++;
    });

    // x!,y!,z! for all characters after me

    const numArr = Object.values(repeatedDict).map(x => fact(x));

    // multiply together x!*y!*z!
    return numArr.reduce((m, i) => m * i, 1);
  });

  // 5!, 4!, 3!, 2!, 1!, 0! for each character in the array
  const reverseFact = new Array(orig.length).fill(0).map((x, i) => fact(i)).reverse();

  const comboArr = numerator.map((x, i) => x * reverseFact[i] / denominator[i]);

  // return sum, plus 1 for indexing at 1 instead of zero
  return comboArr.reduce((m, i) => i + m, 0) + 1;
};

const assert = (input, actual, expected) => {
  if (actual === expected) {
    return console.log(`${input} was ${actual} ✓`);
  }

  throw new Error(`${input} expected ${expected} but got ${actual}`);
};


try {
  const inputs = ['ARCTIC', 'BAEBEE', 'TURQUOISE', 'STARK', 'ABBS', 'MISSISSIPPI', 'BABS', 'PARIS'];
  const expecteds = [42, 12, 139432, 92, 1, 13737, 4, 51];

  inputs.forEach((input, index) => assert(input, anagramPosition(input), expecteds[index]));

  console.log('All Tests Passed!');
} catch (err) {
  console.log(err);
  console.log('Failed!');
}
