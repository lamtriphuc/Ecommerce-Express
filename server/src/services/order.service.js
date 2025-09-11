const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const AppError = require('../utils/appError');
const { v4: uuidv4 } = require("uuid");

// Tạo đơn hàng từ cart
exports.createOrder = async (userId, shippingAddress) => {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
        throw new AppError(400, "Giỏ hàng trống");
    }

    let totalAmount = 0;
    let discountAmount = 0;

    const items = cart.items.map((item) => {
        const product = item.product;
        const originalPrice = item.originalPriceAtAdd;
        const discountPrice = item.discountPriceAtAdd;
        const discountPercent = item.discountPercentAtAdd;

        // cộng dồn tổng giá và giảm giá
        totalAmount += originalPrice * item.quantity;
        if (discountPrice > 0) {
            discountAmount += (originalPrice - discountPrice) * item.quantity;
        }

        return {
            product: product._id,
            quantity: item.quantity,
            originalPrice,
            discountPrice,
            discountPercent,
            total: item.quantity * discountPrice,
        };
    });

    const shippingAmount = 0; // có thể tính dựa vào địa chỉ

    const netAmount = totalAmount + shippingAmount - discountAmount;

    const order = new Order({
        order_number: uuidv4(), // random unique order number
        user: userId,
        items,
        totalAmount,
        shippingAmount,
        discountAmount,
        netAmount,
        shippingAddress,
    });

    await order.save();

    // clear giỏ hàng sau khi đặt hàng
    cart.items = [];
    await cart.save();

    return order;
};

// Lấy đơn hàng theo user
exports.getOrdersByUser = async (userId) => {
    const orders = await Order.find({ user: userId }).populate("items.product");
    return orders;
};

// Lấy tất cả đơn hàng (admin)
exports.getAllOrders = async () => {
    const orders = await Order.find()
        .populate("user")
        .populate("items.product");
    return orders;
};

// Cập nhật status(admin)
exports.updateOrderStatus = async (orderId, status) => {
    const order = await Order.findById(orderId);
    if (!order) throw new AppError(404, "Đơn hàng không tồn tại");

    order.status = status;
    await order.save();

    return order;
};


exports.getOrderById = async (orderId, userId, isAdmin = false) => {
    const order = await Order.findById(orderId).populate("items.product");
    if (!order) throw new AppError(404, "Đơn hàng không tồn tại");

    //  chủ đơn hoặc admin
    if (!isAdmin && order.user.toString() !== userId.toString()) {
        throw new AppError(403, "Bạn không có quyền xem đơn hàng này");
    }

    return order;
};

exports.cancelOrder = async (orderId, userId, isAdmin = false) => {
    const order = await Order.findById(orderId);
    if (!order) throw new AppError(404, 'Không tìm thấy đơn hàng');

    if (!isAdmin && order.user.toString() === userId) {
        throw new AppError(403, 'Bạn không có quyền hủy đơn này')
    }

    if (!['pending', 'paid'].includes(order.status)) {
        throw new AppError(400, 'Đơn hàng đang trong trạng thái không thể hủy');
    }

    order.status = 'cancelled';
    await order.save();

    return order;
}

exports.isValidToPayment = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) throw new AppError(404, "Đơn hàng không tồn tại");

    if (['cancelled', 'paid'].includes(order.status)) {
        throw new AppError(400, "Trạng thái đơn hàng không hợp lệ để thanh toán");
    }
}