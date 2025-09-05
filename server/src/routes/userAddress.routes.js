const express = require('express');
const router = express.Router();
const userAddressController = require('../controllers/userAddress.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.post('/', userAddressController.addAddress);
router.get('/', userAddressController.getAddresses);
router.patch('/:id', userAddressController.updateAddress);
router.delete('/:id', userAddressController.deleteAddress);

module.exports = router;
