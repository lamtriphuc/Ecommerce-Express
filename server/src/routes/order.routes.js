const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authMiddleware, isAdmin } = require('../middleware/auth.middleware');

// user
router.post('/', authMiddleware, orderController.createOrder);
router.get('/', authMiddleware, orderController.getMyOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);

// admin
router.get('/admin/all', authMiddleware, isAdmin, orderController.getAllOrders);
router.patch('/:id/status', authMiddleware, isAdmin, orderController.updateOrderStatus);

router.patch('/:id/cancel', authMiddleware, isAdmin, orderController.cancelOrder);

module.exports = router;
