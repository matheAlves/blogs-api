const { Router } = require('express');

const categoryController = require('../controllers/categoryController');
const validateToken = require('../middlewares/validateToken');

const categoryRoute = Router();

categoryRoute.post('/', validateToken, categoryController.add);
categoryRoute.get('/', validateToken, categoryController.list);

module.exports = categoryRoute;