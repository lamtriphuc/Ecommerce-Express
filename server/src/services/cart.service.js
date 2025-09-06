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
        const discountPrice = product.discountPrice > 0 ? product.discountPrice : product.price;
        const discountPercent = product.discountPercent;

        cart.items.push({
            product: productId,
            quantity,
            originalPriceAtAdd: product.price,
            discountPriceAtAdd: discountPrice,
            discountPercentAtAdd: discountPercent
        });
    }

    await cart.save();
    return cart;
}

exports.updateCartItem = async (userId, productId, quantity) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new AppError(404, "Cart không tồn tại");

    const item = cart.items.find(
        (item) => item.product.toString() === productId
    );
    if (!item) throw new AppError(404, "Item không tồn tại trong cart");

    item.quantity = quantity;
    await cart.save();
    return cart;
};

exports.removeCartItem = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new AppError(404, "Cart không tồn tại");

    cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
    );
    await cart.save();
    return cart;
};

exports.clearCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new AppError(404, "Cart không tồn tại");

    cart.items = [];
    await cart.save();
    return cart;
};