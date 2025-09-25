const reviewService = require("../services/review.service");
const { successResponse } = require("../utils/response");

exports.createReview = async (req, res, next) => {
    try {
        const { productId, rating, body } = req.body;
        const review = await reviewService.createReview(req.user.id, productId, rating, body);
        return successResponse(res, review, 201, "Tạo review thành công");
    } catch (err) {
        next(err);
    }
};

exports.getReviewsByProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const reviews = await reviewService.getReviewsByProduct(productId);
        return successResponse(res, reviews, 200, "Lấy danh sách review thành công");
    } catch (err) {
        next(err);
    }
};

exports.getReviewById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await reviewService.getReviewById(id);
        return successResponse(res, review, 200, "Lấy review thành công");
    } catch (err) {
        next(err);
    }
};

exports.updateReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rating, body } = req.body;
        const review = await reviewService.updateReview(id, req.user.id, rating, body);
        return successResponse(res, review, 200, "Cập nhật review thành công");
    } catch (err) {
        next(err);
    }
};

exports.deleteReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        await reviewService.deleteReview(id, req.user.id);
        return successResponse(res, null, 200, "Xoá review thành công");
    } catch (err) {
        next(err);
    }
};
