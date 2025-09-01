const mongoose = require('mongoose');

const productImageSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        position: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

const ProductImage = mongoose.model('ProductImage', productImageSchema);
module.exports = ProductImage;