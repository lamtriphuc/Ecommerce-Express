const mongoose = require('mongoose');

const shippingProviderSchema = new mongoose.Schema({
    code: { type: String, unique: true },
    name: { type: String },
});

const ShippingProvider = mongoose.model("ShippingProvider", shippingProviderSchema);
module.exports = ShippingProvider;
