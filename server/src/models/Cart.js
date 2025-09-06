const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
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
        // snapshot giá tại thời điểm thêm vào
        originalPriceAtAdd: { type: Number, required: true }, // giá gốc
        discountPriceAtAdd: { type: Number, required: true }, // giá sau giảm
        discountPercentAtAdd: { type: Number, required: true }, // % giảm
    },
    { _id: false } // không cần id riêng cho item
);

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, // mỗi user chỉ có 1 cart
        },
        items: {
            type: [cartItemSchema],
            default: []
        }, // mảng các item
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
