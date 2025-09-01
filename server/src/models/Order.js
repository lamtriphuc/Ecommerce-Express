const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        unitPrice: {
            type: Number,
            required: true,
        },
        //quantity * unit_price
        total: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        order_number: {
            type: String,
            required: true,
            unique: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
        items: [orderItemSchema],
        totalAmount: {
            type: Number,
            required: true,
        },
        shippingAmount: {
            type: Number,
            default: 0,
        },
        discountAmount: {
            type: Number,
            default: 0,
        },
        // total_amount + shipping_amount - discount_amount
        netAmount: {
            type: Number,
            required: true,
        },
        shippingAddress: {
            recipient_name: { type: String, required: true },
            phone: { type: String, required: true },
            province: { type: String, required: true },
            city: { type: String, required: true },
            street_address: { type: String, required: true },
        },
        placedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
