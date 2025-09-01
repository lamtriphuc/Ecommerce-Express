const categoryService = require('../services/category.service');
const { successResponse } = require('../utils/response');

const createCategory = async (req, res, next) => {
    try {
        const newCategory = await categoryService.createCategory(req.body);
        return successResponse(res, newCategory, 201, 'Tạo danh mục thành công');
    } catch (error) {
        next(error);
    }
}

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();
        return successResponse(res, categories, 200, 'Lấy danh mục thành công');
    } catch (error) {
        next(error);
    }
}

const updateCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const categories = await categoryService.updateCategory(categoryId, req.body);
        return successResponse(res, categories, 200, 'Cập nhật danh mục thành công');
    } catch (error) {
        next(error);
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const categories = await categoryService.deleteCategory(categoryId);
        return successResponse(res, categories, 200, 'Xóa danh mục thành công');
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
}