const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
});

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);
module.exports = PaymentMethod;
