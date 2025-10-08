const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const AppError = require('../utils/appError');
const { productResponse } = require('../utils/response');
const slugify = require('slugify');

exports.createProduct = async (data) => {
    const { name, description, category, price, stock, discountPercent } = data;

    if (!name || !description || !category || !price || !stock)
        throw new AppError(400, 'Vui lòng nhập đủ các giá trị');

    // check category
    const existCategory = Category.findById(category);
    if (!existCategory) throw new AppError(404, 'Danh mục không tồn tại');

    // Tạo slug từ name
    const baseSlug = slugify(name, { lower: true, strict: true, locale: 'vi' });
    let finalSlug = baseSlug;
    let count = 1;
    while (await Product.findOne({ slug: finalSlug })) {
        finalSlug = `${baseSlug}-${count++}`;
    }

    const newProduct = await Product.create({
        name,
        description,
        category,
        price,
        stock,
        slug: finalSlug,
        discountPercent
    });

    await newProduct.populate('category');
    return productResponse(newProduct);
}

exports.updateProduct = async (id, data) => {
    const { name, category } = data

    if (category) {
        const existCategory = await Category.findById(category);
        if (!existCategory) throw new AppError(404, 'Danh mục không tồn tại');
    }

    if (name) {
        const baseSlug = slugify(name, { lower: true, strict: true, locale: 'vi' });
        let finalSlug = baseSlug;
        let count = 1;
        while (await Product.findOne({ slug: finalSlug, _id: id })) {
            finalSlug = `${finalSlug}-${count++}`;
        }
        data.slug = finalSlug;
    }

    const existProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    }).populate('category', 'name slug');

    if (!existProduct) throw new AppError(404, 'Sản phẩm không tồn tại');
    return productResponse(existProduct);
}

exports.getAllProducts = async ({ page = 1, limit = 10, keyword, category, minPrice, maxPrice }) => {
    const skip = (page - 1) * limit;

    // lưu kq ở đây
    let filter = {};

    // keyword search (theo name, slug, description)
    if (keyword) {
        filter.$or = [
            { name: { $regex: keyword, $options: 'i' } },
            { slug: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } }
        ];
    }

    // lọc theo category
    if (category) {
        filter.category = category;
    }

    // lọc theo khoảng giá
    if (minPrice > 0 || maxPrice > 0) {
        filter.price = {};
        if (minPrice > 0) filter.price.$gte = Number(minPrice);
        if (maxPrice > 0) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter)
        .populate('category', 'name slug')
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    return {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
        data: products.map(product => productResponse(product)),
    };
}

exports.getProductById = async (id) => {
    const product = await Product.findById(id)
        .populate("category", "name slug");
    if (!product) throw new AppError(404, "Sản phẩm không tồn tại");
    return productResponse(product);
};