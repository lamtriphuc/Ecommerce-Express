const cartService = require('../services/cart.service');
const { successResponse } = require('../utils/response');

exports.getCartByUser = async (req, res, next) => {
    try {
        const cart = await cartService.getCartByUser(req.user.id);
        return successResponse(res, cart, 200, "Lấy thông tin giỏ hàng thành công");
    } catch (error) {
        next(error);
    }
}

exports.addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await cartService.addToCart(req.user.id, productId, quantity);
        return successResponse(res, cart, 201, "Thêm sản phẩm vào giỏ thành công");
    } catch (error) {
        next(error);
    }
};

exports.updateCartItem = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await cartService.updateCartItem(req.user.id, productId, quantity);
        return successResponse(res, cart, 200, "Cập nhật số lượng thành công");
    } catch (error) {
        next(error);
    }
};

exports.removeCartItem = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const cart = await cartService.removeCartItem(req.user.id, productId);
        return successResponse(res, cart, 200, "Xóa sản phẩm khỏi giỏ thành công");
    } catch (error) {
        next(error);
    }
};

exports.clearCart = async (req, res, next) => {
    try {
        const cart = await cartService.clearCart(req.user.id);
        return successResponse(res, cart, 200, "Xóa toàn bộ giỏ hàng thành công");
    } catch (error) {
        next(error);
    }
};