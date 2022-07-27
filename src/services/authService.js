const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const authService = {
  async makeToken(user) {
    const { email } = user;
    const payload = { data: email };
    const token = jwt.sign(payload, secret);
    return token;
  },
};

module.exports = authService;