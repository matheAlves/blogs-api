const postService = require('../services/postService');

const userController = {
  /** @type {import('express').RequestHandler} */
  async add(req, res) {
    try {
    await postService.validateBodyAdd(req.body);
  } catch (e) {
    const error = new Error('Some required fields are missing');
    error.name = 'InvalidFields';
    throw error;
  }
    try {
      await postService.checkIfCategoryExists(req.body.categoryIds);
    } catch (e) {
      const error = new Error('categoryIds not found');
      throw error;
    }
    
    const { id } = req.user;

    const newPost = await postService.add(req.body, id);

    res.status(200).json(newPost);
  },

  async list(req, res) {
    const posts = await postService.list();
    res.status(200).json(posts);
  },
};

module.exports = userController;