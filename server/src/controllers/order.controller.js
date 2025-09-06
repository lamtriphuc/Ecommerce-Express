const orderService = require('../services/order.service');
const { successResponse } = require('../utils/response');

exports.createOrder = async (req, res, next) => {
    try {
        const order = await orderService.createOrder(req.user.id, req.body.shippingAddress);
        return successResponse(res, order, 201, "Tạo đơn hàng thành công");
    } catch (error) {
        next(error);
    }
};

exports.getMyOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getOrdersByUser(req.user.id);
        return successResponse(res, orders, 200, "Lấy đơn hàng thành công");
    } catch (error) {
        next(error);
    }
};

exports.getOrderById = async (req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.id, req.user.id, req.user.role === "admin");
        return successResponse(res, order, 200, "Lấy chi tiết đơn hàng thành công");
    } catch (error) {
        next(error);
    }
};

// admin
exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getAllOrders();
        return successResponse(res, orders, 200, "Lấy tất cả đơn hàng thành công");
    } catch (error) {
        next(error);
    }
};

exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const order = await orderService.updateOrderStatus(req.params.id, status);
        return successResponse(res, order, 200, "Cập nhật trạng thái thành công");
    } catch (error) {
        next(error);
    }
};
