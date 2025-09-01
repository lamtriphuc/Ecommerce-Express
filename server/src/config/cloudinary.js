const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// cấu hình cơ bản: link
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// cấu hình Storage engine cho multer
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'ecommerce',
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [
            { quality: "auto:good", fetch_format: "auto" }
            // quality: auto (tự động chọn chất lượng), good/eco/high
            // fetch_format: auto => tự động chọn định dạng nhẹ nhất (vd: webp)
        ],
    },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };