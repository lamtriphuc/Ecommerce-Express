const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ShippingProvider",
        },
        trackingNumber: {
            type: String,
        },
        status: {
            type: String,
            enum: ["pending", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
        cost: {
            type: Number,
            default: 0,
        },
        shippedAt: Date,
        deliveredAt: Date,
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);
module.exports = Shipment;
