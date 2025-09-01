const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        paymentMethod: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PaymentMethod",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["initiated", "paid", "failed", "refunded"],
            default: "initiated",
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
