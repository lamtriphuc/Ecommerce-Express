const Cart = require("../models/Cart");
const Product = require('../models/Product');
const AppError = require('../utils/appError');

exports.getCartByUser = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
        return [];
    }
    return cart;
}

exports.addToCart = async (userId, productId, quantity = 1) => {
    const product = await Product.findById(productId);
    if (!product) throw new AppError(404, 'Sản phẩm không tồn tại');

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
        item => item.product.toString() === productId
    )

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            product: productId,
            quantity,
            priceAtAdd: product.price
        });
    }

    await cart.save();
    return cart;
}