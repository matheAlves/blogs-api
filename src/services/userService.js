const Joi = require('joi');
const models = require('../database/models');

const userService = {
  async validateBodyAdd(body) {
    const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string().required(),
  }).required();

  const result = await schema.validateAsync(body);
  return result;
  },

  async checkIfExists(email) {
    const existingEmail = await models.User.findOne({
      where: { email },
    });
    if (existingEmail) throw new Error();
  },

  async add(user) {
    const newUser = await models.User.create(user);
    return newUser;
  },

  async list() {
    const users = await models.User.findAll({
      attributes: { exclude: ['password'] },
    });

    return users;    
  },

  async byId(id) {
    const user = await models.User.findByPk(id, {
        attributes: { exclude: ['password'] },
      });
      if (!user) {
        const error = new Error('User does not exist');
        error.name = 'UserNotFound';
        throw error;
      }
      return user;
    },
};

module.exports = userService;