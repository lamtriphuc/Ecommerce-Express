const express = require('express');
const router = express.Router();
const productImageController = require('../controllers/productImage.controller');
const { upload } = require('../config/cloudinary');

router.post('/:productId/thumbnail', upload.single('thumbnail'), productImageController.uploadThumbnail);
router.post('/:productId/images', upload.array('images', 5), productImageController.addProductImages);

module.exports = router;