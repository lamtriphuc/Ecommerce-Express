const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        paymentMethod: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PaymentMethod",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["initiated", "pending", "paid", "failed", "refunded"],
            default: "initiated",
        },
        /* "initiated" → khởi tạo(mới tạo payment, chưa thực hiện).
         "pending" → dành cho COD(đơn đang giao, chờ thanh toán).
         "paid" → đã thanh toán thành công.
         "failed" → thất bại(thanh toán online fail hoặc COD bị từ chối).
         "refunded" → hoàn tiền(dùng cho VNPAY hoặc gateway online).
        */
        transactionId: { type: String }, // Mã giao dịch VNPAY
        gatewayResponse: { type: Object }, // Lưu raw response từ VNPAY
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
