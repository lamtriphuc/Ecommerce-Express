const { cloudinary } = require("../config/cloudinary");
const Product = require("../models/Product");
const AppError = require("../utils/appError");

exports.uploadThumbnail = async (productId, file) => {
    const product = await Product.findById(productId);
    if (!product) throw new AppError(404, "Product không tồn tại");

    if (product.thumbnail) {
        const publicId = product.thumbnail.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`ecommerce/${publicId}`);
    }

    product.thumbnail = file.path;
    await product.save();

    return product.thumbnail;
}

exports.addProductImages = async (productId, files) => {
    const product = await Product.findById(productId);
    if (!product) throw new AppError(404, "Product không tồn tại");

    // xóa ảnh cũ trên cloud
    for (const image of product.images) {
        const publicId = image.url.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`ecommerce/${publicId}`);
    }
    const newImages = files.map((file, index) => ({
        url: file.path,
        position: index,
    }));

    product.images = newImages;
    await product.save();

    return product.images;
};
