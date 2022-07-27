const Joi = require('joi');
const models = require('../database/models');

const categoryService = {
  async validateBodyAdd(body) {
    const schema = Joi.object({
    name: Joi.string().required(),
  }).required();

  const result = await schema.validateAsync(body);
  return result;
  },

  async add(name) {
    const newCategory = await models.Category.create(name);
    return newCategory;
  },

  async list() {
    const categories = await models.Category.findAll();
    return categories;
  },
};

module.exports = categoryService;