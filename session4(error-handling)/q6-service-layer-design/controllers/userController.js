const userService = require('../services/userService');

async function createUser(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const user = await userService.createUser({ name, email, password });

    res.status(201).json({
      message: 'User created successfully',
      data: user
    });

  } catch (err) {
    next(err);
  }
}

module.exports = { createUser };