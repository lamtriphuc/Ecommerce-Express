const { successResponse } = require('../utils/response');
const paymentService = require('../services/payment.service');
const orderService = require('../services/order.service');

exports.createPaymentUrl = async (req, res, next) => {
    try {
        const { orderId } = req.body;
        await orderService.isValidToPayment(orderId);

        const ipAddr =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress;

        const paymentUrl = await paymentService.createPaymentUrl(order, ipAddr);
        return successResponse(res, paymentUrl, 200, 'Đã xử lý thanh toán');
    } catch (error) {
        next(error);
    }
};

exports.vnpayReturn = async (req, res, next) => {
    try {
        const result = await paymentService.verifyReturn(req.query);

        if (result.success) {
            // return res.render("success", { code: result.code });
            return successResponse(res, null, 200, 'Thành công');
        } else {
            // return res.render("error", { code: result.code });
            return successResponse(res, null, 200, 'Thất bại');
        }
    } catch (error) {
        next(error);
    }
};