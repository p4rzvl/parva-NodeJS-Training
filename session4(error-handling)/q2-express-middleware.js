app.get('/user/:id', async (req, res, next) => {
    const user = await getUserById(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    res.json(user);
  });

  
//  a) If getUserById() throws an error, will Express 
//  automatically send it to error middleware? Why or why not?
// No, Express will not send it to middleware because the express v4 router is not 
// async-aware so when async route handler throws an error it can not catch it 
// which becomes an unhandled promise rejection.

//  b) Modify the code so the error correctly reaches Express error middleware.
// app.get('user/:id', async(req, res, next) => {
//     try{
//         const user = await getUserById(req.param.id);
//         if (!user) {
//             throw new Error("User not found");
//         }
//         res.json(user);
// } catch(err){
//     next(err)
// }
// })

//  c) What is the correct signature of an Express error middleware?
// app.get(err, req, res, next) if we write only the 3 parameters (req, res, next), 
// express will treat it as simple middleware