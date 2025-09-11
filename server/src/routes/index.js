const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const addressRoutes = require('./userAddress.routes');
const categoryRoutes = require('./category.routes');
const productRoutes = require('./product.routes');
const productImageRoutes = require('./productImage.routes');
const cartRoutes = require('./cart.routes');
const orderRoutes = require('./order.routes');
const paymentRoutes = require('./payment.route');

router.use('/users', userRoutes);
router.use('/addresses', addressRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/product-images', productImageRoutes);
router.use('/cart', cartRoutes);
router.use('/order', orderRoutes);
router.use('/payment', paymentRoutes);

module.exports = router;    