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

  async list(req, res) {
    const token = req.headers.authorization;
    if (!token) {
      const error = new Error('Token not found');
      error.name = 'TokenNotFound';
      throw error;
    }
    try {
      await authService.readToken(token);
    } catch (e) {
      const error = new Error('Expired or invalid token');
      error.name = 'TokenNotFound';
      throw error;
    }
    const users = await userService.list();
    res.status(200).json(users);
  },

  async byId(req, res) {
    const token = req.headers.authorization;
    const { id } = req.params;
    if (!token) {
      const error = new Error('Token not found');
      error.name = 'TokenNotFound';
      throw error;
    }
    try {
      await authService.readToken(token);
    } catch (e) {
      const error = new Error('Expired or invalid token');
      error.name = 'TokenNotFound';
      throw error;
    }

      const user = await userService.byId(id);
      res.status(200).json(user);
  },
};

module.exports = userController;