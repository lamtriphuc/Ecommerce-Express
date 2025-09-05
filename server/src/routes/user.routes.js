const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authMiddleware } = require('../middleware/auth.middleware')

router.post('/', userController.createUser);
router.post('/login', userController.login);
router.get('/me', authMiddleware, userController.getMe);

module.exports = router;