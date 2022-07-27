const Joi = require('joi');
const models = require('../database/models');

const userService = {
  async validateBodyAdd(body) {
    const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number()).required(),
  }).required();

  const result = await schema.validateAsync(body);
  return result;
  },

  async add(post, userId) {
    const newPost = await models.BlogPost.create({ ...post, userId });

    await models.PostCategory.bulkCreate(post.categoryIds.map((categoryId) => ({
      categoryId,
      postId: newPost.id,
    })));

    const result = models.BlogPost.findByPk(newPost.id);

    return result;
  },

  async checkIfCategoryExists(array) {
    const exists = await Promise.all(array.map((category) => models.Category.findByPk(category)));
    if (!exists) throw new Error();
    return exists;
  },

  async list() {
    const posts = await models.BlogPost.findAll({
      include: [{
        model: models.User, 
        as: 'user',
        attributes: { exclude: ['password'] },
      },
    {
      model: models.Category,
      as: 'categories',
      through: { attributes: { exclude: ['postId', 'categoryId'] } },
    }],
    });
    return posts;
  },
};

module.exports = userService;