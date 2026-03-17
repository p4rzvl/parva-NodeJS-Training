async function getUser() {
    try {
      const user = database.findById(5);
      return user.name;
    } catch (err) {
      console.error("Error occurred");
    }
  }
  
  getUser();

  
//   a) Why will the catch block NOT handle database errors in this code?
// when calling the database we are not using the "await" which results into 
// Promise not being resolved and catch block can't resolve unresolved Promise 
// errors.

//   b) Rewrite the function so errors are handled correctly using async/await.
// async function getUser() {
//     try {
//       const user = await database.findById(5); // added await
//       return user.name;
//     } catch (err) {
//       console.error("Error occurred");
//     }
//   }
  
//   getUser();

//   c) What type of error is this: synchronous or asynchronous?
// this is an example of asynchronous error because database call 
// is failing asynchronously(network issue, rejected promise)