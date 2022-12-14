const categoryService = require('../services/categoryService');

const userController = {
  /** @type {import('express').RequestHandler} */
  async add(req, res) {
    const { name } = await categoryService.validateBodyAdd(req.body);

    await categoryService.add(req.body);

    res.status(201).json({ name });
  },

  async list(req, res) {
    const categories = await categoryService.list();
    res.status(200).json(categories);
  },
};

module.exports = userController;