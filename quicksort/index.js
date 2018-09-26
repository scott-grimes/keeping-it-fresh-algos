/*

Implement quicksort

*/


const quickSort = (arr, start, end) => {
  start = start || 0;
  end = end || arr.length - 1;
  // without in-place
  if (!arr.length) { return arr; }

  const piv = arr[0];
  let bef = [];
  let aft = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < piv) {
      bef.push(arr[i]);
    } else {
      aft.push(arr[i]);
    }
  }

  bef = quickSort(bef);
  aft = quickSort(aft);
  return bef.concat(piv).concat(aft);
};

const assert = (input, actual, expected) => {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    return console.log(`${input} was ${actual} ✓`);
  }

  throw new Error(`${input} expected ${expected} but got ${actual}`);
};


try {
  const inputs = [
    [100, 8, 7, 3, 6, 9, 2, 4, 5, 1],
    [8, 7, 3, 3, 9, 2, 4, 5, 1],
    [9, 8, 7, 6, 5, 4, 3, 2, 1],
  ];
  const expecteds = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 100],
    [1, 2, 3, 3, 4, 5, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
  ];

  inputs.forEach((input, index) => assert(input, quickSort(input), expecteds[index]));

  // Giant Random Array
  const input = [];
  const n = 100000;
  for (let i = 0; i < n; i++) {
    const number = Math.floor(Math.random() * n);
    input.push(number);
  }
  const sorted = input.slice().sort((a, b) => a - b);
  const result = quickSort(input);

  for (let i = 0; i < n; i++) {
    if (result[i] !== sorted[i]) {
      throw new Error('Array not sorted! Failed');
    }
  }
  console.log('Arr[100000] was sorted correctly');

  console.log('All Tests Passed!');
} catch (err) {
  console.log(err);
  console.log('Failed!');
}
