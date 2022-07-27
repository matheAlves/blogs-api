const categoryService = require('../services/categoryService');

const userController = {
  /** @type {import('express').RequestHandler} */
  async add(req, res) {
    const { name } = await categoryService.validateBodyAdd(req.body);

    await categoryService.add(req.body);

    res.status(201).json({ name });
  },
};

module.exports = userController;