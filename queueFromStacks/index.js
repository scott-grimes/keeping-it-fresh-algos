/*

implement a queue using stacks

*/

class Queue {
  constructor() {
    this.ins = [];
    this.outs = [];
  }

  enqueue(val) {
    while (this.outs.length) {
      this.ins.push(this.outs.pop());
    }
    this.ins.push(val);
  }

  dequeue() {
    while (this.ins.length) {
      this.outs.push(this.ins.pop());
    }
    return this.outs.pop();
  }
}

const assert = (input, actual, expected) => {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    return console.log(`${input} was ${actual} ✓`);
  }

  throw new Error(`${input} expected ${expected} but got ${actual}`);
};


try {
  const q = new Queue();
  q.enqueue(1);
  assert('enqueue', q.ins[0], 1);
  assert('dequeue', q.dequeue(), 1);
  assert('dequeue', q.dequeue(), undefined);
  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3);
  assert('dequeue', q.dequeue(), 1);
  q.enqueue(4);
  assert('dequeue', q.dequeue(), 2);
  assert('dequeue', q.dequeue(), 3);
  assert('dequeue', q.dequeue(), 4);
  assert('dequeue', q.dequeue(), undefined);

  console.log('All Tests Passed!');
} catch (err) {
  console.log(err);
  console.log('Failed!');
}
