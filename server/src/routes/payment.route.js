const express = require('express');
const router = express.Router();
const paypemtController = require('../controllers/payment.controller');

// client gọi để lấy link thanh toán
router.post('/create_payment_url', paypemtController.createPaymentUrl);
// callback sau khi thanh toán
router.post('/vnpay_return', paypemtController.vnpayReturn);

module.exports = router;