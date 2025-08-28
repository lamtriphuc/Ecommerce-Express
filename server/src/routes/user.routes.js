const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware')

router.post('/', userController.createUser);
router.post('/login', userController.login);
router.get('/me', protect, userController.getMe);

module.exports = router;