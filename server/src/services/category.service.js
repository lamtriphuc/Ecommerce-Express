const Category = require("../models/Category");
const AppError = require("../utils/appError");
const slugify = require('slugify');
const { categoryResponse } = require("../utils/response");

const createCategory = async (data) => {
    const { name } = data;
    const slug = slugify(name, { lower: true, strict: true, locale: 'vi' });

    let finalSlug = slug;
    let count = 1;

    while (await Category.findOne({ slug: finalSlug })) {
        finalSlug = `${slug}-${count++}`;
    }

    const category = await Category.create({ name, slug: finalSlug });
    return categoryResponse(category);
}

const getAllCategories = async () => {
    const categories = await Category.find().sort({ created_at: -1 });
    return categories.map(category => categoryResponse(category));
}

const updateCategory = async (id, data) => {
    const category = await Category.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!category) throw new AppError(404, "Category không tồn tại");
    return categoryResponse(category);
}

const deleteCategory = async (id) => {
    const category = await Category.findByIdAndDelete(id);
    if (!category) throw new AppError(404, "Category không tồn tại");
    return categoryResponse(category);
}

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}