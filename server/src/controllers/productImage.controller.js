const { successResponse } = require("../utils/response");
const productImageService = require("../services/productImage.service");

exports.uploadThumbnail = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await productImageService.uploadThumbnail(productId, req.file);
        return successResponse(res, product, 200, "Cập nhật thumbnail thành công");
    } catch (error) {
        next(error);
    }
}

exports.addProductImages = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await productImageService.addProductImages(productId, req.files);
        return successResponse(res, product, 201, "Thêm ảnh mô tả thành công");
    } catch (err) {
        next(err);
    }
};