const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

// client gọi để lấy link thanh toán
router.post('/cod', paymentController.createCODPayment);
router.post('/vnpay', paymentController.createVnpayPayment);
// callback sau khi thanh toán
router.post('/vnpay_return', paymentController.vnpayReturn);

module.exports = router;