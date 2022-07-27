const authService = require('../services/authService');

async function validateToken(req, _res, next) {
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
  next();
}

module.exports = validateToken;