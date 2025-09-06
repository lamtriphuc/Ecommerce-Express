const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
    {
        url: { type: String, required: true, default: "" },
        position: { type: Number, default: 0 },
    },
    { _id: false } // tắt _id cho từng phần tử
);

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true, },
        description: { type: String, default: "", },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true, },
        price: { type: Number, required: true }, // giá gốc
        discountPercent: { type: Number, default: 0 }, // % giảm giá
        discountPrice: { type: Number, default: 0 },   // giá sau giảm
        stock: { type: Number, default: 0, },
        isActive: { type: Boolean, default: true, },
        thumbnail: { type: String, default: "", },
        images: [imageSchema],
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

productSchema.pre('save', function (next) {
    if (this.discountPercent > 0) {
        this.discountPrice = Math.round(this.price - (this.price * this.discountPercent / 100));
    } else {
        this.discountPrice = this.price;
    }
    next();
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;