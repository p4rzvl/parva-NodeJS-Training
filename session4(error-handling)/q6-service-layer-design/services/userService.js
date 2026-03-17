const User = require('../models/User');

async function createUser({ name, email, password }) {

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const err = new Error('An account with this email already exists');
    err.status = 409; 
    throw err;
  }
  const user = await User.create({ name, email, password });
  const { password: _, ...safeUser } = user.toObject();
  return safeUser;
}

module.exports = { createUser };