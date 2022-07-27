const loginService = require('../services/loginService');
const authService = require('../services/authService');

const loginController = {
  /** @type {import('express').RequestHandler} */
  async login(req, res) {
    try {
      await loginService.validateBodyLogin(req.body);
    } catch (e) {
      const error = new Error('Some required fields are missing');
      error.name = 'InvalidFields';
      throw error;
    }

    try {
      await loginService.validateUser(req.body);
    } catch (e) {
      const error = new Error('Invalid fields');
      error.name = 'ValidationError';
      throw error;
    }
    
    const token = await authService.makeToken(req.body);
    res.status(200).json({ token });
  },
};

module.exports = loginController;