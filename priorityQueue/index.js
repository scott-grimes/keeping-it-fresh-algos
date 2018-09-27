/*

Build a priority queue

*/

function BinaryHeap() {
  this._heap = [];
}

BinaryHeap.prototype.insert = function (value) {
  this._heap.push(value);
  let child = this._heap.length - 1;
  let parent = Math.floor((child - 1) / 2);
  while (this._heap[child] < this._heap[parent]) {
    [this._heap[child], this._heap[parent]] = [this._heap[parent], this._heap[child]];
    child = parent;
    parent = Math.floor((child - 1) / 2);
  }
};
BinaryHeap.prototype.pop = function () {
  [[this._heap[0], this._heap[this._heap.length - 1]]] = [[this._heap[this._heap.length - 1], this._heap[0]]];
  const sol = this._heap.pop();
  let i = 0;
  while (this._heap[i] > this._heap[i * 2 + 1] || this._heap[i] > this._heap[i * 2 + 2]) {
    const smaller = this._heap[i * 2 + 1] > this._heap[i * 2 + 2] ? i * 2 + 2 : i * 2 + 1;
    [this._heap[i], this._heap[smaller]] = [this._heap[smaller], this._heap[i]];
    i = smaller;
  }
  return sol;
};

const assert = (input, actual, expected) => {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    return console.log(`${input} was ${actual} ✓`);
  }

  throw new Error(`${input} expected ${expected} but got ${actual}`);
};


try {
  const binaryHeap = new BinaryHeap();
  const heap = binaryHeap._heap;
  binaryHeap.insert(4);
  binaryHeap.insert(5);
  binaryHeap.insert(9);
  binaryHeap.insert(8);
  binaryHeap.insert(1);
  assert('length', heap.length, 5);
  assert('order 0/1', heap[0] < heap[1], true);
  assert('order 0/2', heap[0] < heap[2], true);
  assert('order 1/3', heap[1] < heap[3], true);
  assert('order 1/4', heap[1] < heap[4], true);
  assert('root', binaryHeap.pop(), 1);
  assert('length', heap.length, 4);
  assert('order 0/1', heap[0] < heap[1], true);
  assert('order 0/2', heap[0] < heap[2], true);
  assert('order 1/3', heap[1] < heap[3], true);

  console.log('All Tests Passed!');
} catch (err) {
  console.log(err);
  console.log('Failed!');
}
