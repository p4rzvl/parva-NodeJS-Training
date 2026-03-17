console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");


// a) What will be the exact output order?
// Output:
// Start
// End
// Promise
// Timeout

// b) Explain why this order occurs in Node.js.
// the execution sequence is 
// CallStack(synchronous code) --> MicroTask Code(Promise, queueMicroTask()) --> MacroTask Queue (web apis, I/O)

// c) Which mechanism executes first: microtasks or callbacks?
// Microtask callbacks