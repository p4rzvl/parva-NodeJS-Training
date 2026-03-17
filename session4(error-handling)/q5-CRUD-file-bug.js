router.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync('./data/users.json'));
    res.json(users);
  });
  
const { error } = require('console');
//   a) Why is readFileSync considered a bad practice in production servers?
// the readFileSync is a blocking operation when we use it the code execution 
// gets blocked until that operation is done which leads to bad performance 

//   b) Rewrite the route using async/await with fs.promises.
// const fs = require('fs')
// const path = require('path')
// router.get('/users', async(req, res, next) => {
//     try{
//         const filePath = './data/users.json'

//         const raw = await fs.promises.readFile(filePath, 'utf-8')
//         const users = JSON.parse(raw);

//         res.json(users);
//     } catch(err){
//         if (err.code === "ENOENT"){
//             return res.status(404).json({error: "User data not found"})
//         }
//         next(err)
//     }
// })

//   c) What will happen to the Node.js event loop if many requests call this route simultaneously?
// When many requests are called the requests get accumulated because readFileSync is still processing and that can crash the server.