const productService = require('../services/product.service');
const { successResponse } = require('../utils/response');

exports.createProduct = async (req, res, next) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        return successResponse(res, newProduct, 201, 'Tạo sản phẩm thành công');
    } catch (error) {
        next(error);
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const newProduct = await productService.updateProduct(productId, req.body);
        return successResponse(res, newProduct, 200, 'Tạo sản phẩm thành công');
    } catch (error) {
        next(error);
    }
}

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        return successResponse(res, products, 200, 'Lấy danh sách sản phẩm thành công');
    } catch (error) {
        next(error);
    }
}

exports.getProductById = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await productService.getProductById(productId);
        return successResponse(res, product, 200, 'Lấy sản phẩm thành công');
    } catch (error) {
        next(error);
    }
}