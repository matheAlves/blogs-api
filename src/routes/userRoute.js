const { Router } = require('express');

const userController = require('../controllers/userController');

const userRoute = Router();

userRoute.post('/', userController.add);
userRoute.get('/', userController.list);

module.exports = userRoute;