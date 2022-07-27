const userService = require('../services/userService');
const authService = require('../services/authService');

const userController = {
  /** @type {import('express').RequestHandler} */
  async add(req, res) {
    const { email } = await userService.validateBodyAdd(req.body);

    try {
      await userService.checkIfExists(email);
    } catch (e) {
      const error = new Error('User already registered');
      error.name = 'ExistingUser';
      throw error;
    }

    await userService.add(req.body);

    const token = await authService.makeToken(req.body);
    res.status(201).json({ token });
  },
};

module.exports = userController;