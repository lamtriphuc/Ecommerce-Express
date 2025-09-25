const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },  // "cod", "vnpay"
    name: { type: String, required: true }, // "Thanh toán khi nhận hàng", "VNPAY"
});


const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);
module.exports = PaymentMethod;
