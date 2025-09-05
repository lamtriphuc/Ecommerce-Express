const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
const { authMiddleware, isAdmin } = require('../middleware/auth.middleware');

router.post('/', authMiddleware, isAdmin, productController.createProduct);
router.patch('/:id', productController.updateProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

module.exports = router;