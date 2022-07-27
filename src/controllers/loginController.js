const loginService = require('../services/loginService');
const authService = require('../services/authService');

const loginController = {
  /** @type {import('express').RequestHandler} */
  async login(req, res) {
    const user = await loginService.validateBodyLogin(req.body);

    try {
      await loginService.validateUser(user);
    } catch (e) {
      const error = new Error('Invalid fields');
      error.name = 'InvalidFields';
      throw error;
    }
    const token = await authService.makeToken(user);

    res.status(200).json({ token });
  },
};

module.exports = loginController;