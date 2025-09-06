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

exports.getAllProducts = async () => {
    const products = await Product.find()
        .populate('category', 'name slug')
        .sort({ created_at: -1 });
    const res = products.map(product => productResponse(product));
    return res;
}

exports.getProductById = async (id) => {
    const product = await Product.findById(id)
        .populate("category", "name slug");
    if (!product) throw new AppError(404, "Sản phẩm không tồn tại");
    return productResponse(product);
};