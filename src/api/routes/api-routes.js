const router = require('express').Router();

const userController = require('../controllers/user.controller');

router.post('/login', userController.login);

router.post('/users', userController.create);

module.exports = router;