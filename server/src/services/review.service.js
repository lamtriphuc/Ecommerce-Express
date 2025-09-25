const Review = require("../models/Review");
const Product = require("../models/Product");
const AppError = require("../utils/appError");

exports.createReview = async (userId, productId, rating, body) => {
    const product = await Product.findById(productId);
    if (!product) throw new AppError(404, "Sản phẩm không tồn tại");

    // Kiểm tra user đã review chưa (1 user chỉ 1 review/1 product)
    const existing = await Review.findOne({ user: userId, product: productId });
    if (existing) throw new AppError(400, "Bạn đã đánh giá sản phẩm này rồi");

    const review = new Review({ user: userId, product: productId, rating, body });
    await review.save();

    return review;
};

exports.getReviewsByProduct = async (productId) => {
    return await Review.find({ product: productId })
        .populate("user", "name email") // lấy thông tin user
        .sort({ created_at: -1 });
};

exports.getReviewById = async (reviewId) => {
    const review = await Review.findById(reviewId).populate("user", "name email");
    if (!review) throw new AppError(404, "Không tìm thấy review");
    return review;
};

exports.updateReview = async (reviewId, userId, rating, body) => {
    const review = await Review.findById(reviewId);
    if (!review) throw new AppError(404, "Không tìm thấy review");

    if (review.user.toString() !== userId.toString()) {
        throw new AppError(403, "Bạn không có quyền sửa review này");
    }

    if (rating) review.rating = rating;
    if (body) review.body = body;

    await review.save();
    return review;
};

exports.deleteReview = async (reviewId, userId) => {
    const review = await Review.findById(reviewId);
    if (!review) throw new AppError(404, "Không tìm thấy review");

    if (review.user.toString() !== userId.toString()) {
        throw new AppError(403, "Bạn không có quyền xoá review này");
    }

    await review.deleteOne();
    return true;
};
