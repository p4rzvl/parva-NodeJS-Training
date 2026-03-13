const express = require("express");
const app = express();
app.use(express.json());
let users = [];
function validateUser(body) {
  const errors = [];
  // Done: check missing name
  if (body.name === undefined){
    errors.push({message: "name is required", code: 400});
  } 
  // Done: check blank name (whitespace only)
  else if (body.name.trim() === ""){
    errors.push({message: 'Name cannot be blank', code: 422})
  }
  // Done: check missing email
  if(body.email === undefined) {
    errors.push({ message: "email is required", code: 400})
  }
  // Done: check invalid email (no '@')
  else if (!body.email.includes('@')){
    errors.push({message: 'email is invalid', code: 422})
  }
  return errors;
}
app.post("/api/users", (req, res) => {
  const errors = validateUser(req.body);
  if (errors.length > 0) {
    // Done: pick the right status code and respond
    if (errors.length > 0) {
        const first = errors[0];
        return res.status(first.code).json({error: first})
    }
  }
  const user = { id: users.length + 1, ...req.body };
  users.push(user);
  res.status(201).json({ data: user });
});

app.listen(3000);
