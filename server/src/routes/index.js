const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const addressRoutes = require('./userAddress.routes');
const categoryRoutes = require('./category.routes');
const productRoutes = require('./product.routes');
const productImageRoutes = require('./productImage.routes');
const cartRoutes = require('./cart.routes');

router.use('/users', userRoutes);
router.use('/addresses', addressRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/product-images', productImageRoutes);
router.use('/cart', cartRoutes);

module.exports = router;    