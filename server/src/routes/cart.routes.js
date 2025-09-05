const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.post('/', cartController.addToCart);
router.get('/', cartController.getCartByUser);
router.patch("/", cartController.updateCartItem);
router.delete("/:productId", cartController.removeCartItem);
router.delete("/", cartController.clearCart);

module.exports = router;