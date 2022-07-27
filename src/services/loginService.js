const Joi = require('joi');
const models = require('../database/models');

const loginService = {
  async validateBodyLogin(body) {
    const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).required();

  const result = await schema.validateAsync(body);
  return result;
  },
  
  async validateUser(user) {
    const { email, password } = user;
    const validUser = await models.User.findOne({
      where: { email, password },
    });
    if (!validUser) throw new Error();
    return validUser;
  },
};

module.exports = loginService;