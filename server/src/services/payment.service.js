const qs = require('qs');
const moment = require('moment');
const { sortObject, sign } = require("../utils/vnpay");
const Order = require("../models/Order");
const AppError = require('../utils/appError');

// COD Payment
exports.createCODPayment = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) throw new AppError(404, "Đơn hàng không tồn tại");
    if (order.status !== "pending") throw new AppError(400, "Đơn hàng không hợp lệ để thanh toán");

    const method = await PaymentMethod.findOne({ code: "cod" });
    if (!method) throw new AppError(500, "Phương thức COD chưa được cấu hình");

    const payment = await Payment.create({
        order: order._id,
        paymentMethod: method._id,
        amount: order.netAmount,
        status: "pending", // chờ giao hàng
    });

    order.payment = payment._id;
    await order.save();

    return payment;
};

// VNPAY Payment
exports.createPaymentUrl = async (order, ipAddr) => {
    if (order.status !== "pending") throw new AppError(400, "Đơn hàng không hợp lệ để thanh toán");

    const method = await PaymentMethod.findOne({ code: "vnpay" });
    if (!method) throw new AppError(500, "Phương thức VNPAY chưa được cấu hình");

    const payment = await Payment.create({
        order: order._id,
        paymentMethod: method._id,
        amount: order.netAmount,
        status: "initiated",
    });

    const date = new Date();
    const createDate = moment(date).format("YYYYMMDDHHmmss");

    let vnp_Params = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: process.env.VNP_TMNCODE,
        vnp_Locale: "vn",
        vnp_CurrCode: "VND",
        vnp_TxnRef: order.order_number,
        vnp_OrderInfo: `Thanh toan don hang ${order.order_number}`,
        vnp_OrderType: "other",
        vnp_Amount: order.netAmount * 100,
        vnp_ReturnUrl: process.env.VNP_RETURNURL,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
    }

    vnp_Params = sortObject(vnp_Params);

    const signData = qs.stringify(vnp_Params, { encode: false });
    vnp_Params['vnp_SecureHash'] = sign(signData);

    return process.env.VNP_URL + '?' + qs.stringify(vnp_Params, { encode: false });
}

// Verify VNPAY Return
exports.verifyReturn = async (query) => {
    let vnp_Params = { ...query };
    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    const signData = qs.stringify(vnp_Params, { encode: false });
    const signed = sign(signData);

    if (secureHash !== signed) return { success: false, code: "97" };

    const order = await Order.findOne({ order_number: vnp_Params["vnp_TxnRef"] }).populate("payment");;
    if (!order) return { success: false, code: "01" };

    const payment = order.payment;

    if (vnp_Params["vnp_ResponseCode"] === "00") {
        payment.status = "paid";
        payment.transactionId = vnp_Params["vnp_TransactionNo"];
        payment.gatewayResponse = query;
        await payment.save();

        order.status = "paid";
        await order.save();
        return { success: true, code: "00" };
    } else {
        payment.status = "failed";
        payment.gatewayResponse = query;
        await payment.save();

        order.status = "cancelled";
        await order.save();
        return { success: false, code: vnp_Params["vnp_ResponseCode"] };
    }
}