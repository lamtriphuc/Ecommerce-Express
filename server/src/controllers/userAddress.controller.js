const userAddressService = require('../services/userAddress.service');
const { successResponse } = require('../utils/response');

// Thêm địa chỉ mới
const addAddress = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const address = await userAddressService.addAddress(userId, req.body);
        return successResponse(res, address, 201, 'Thêm địa chỉ thành công');
    } catch (error) {
        next(error);
    }
};

// Cập nhật địa chỉ
const updateAddress = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.id;
        const address = await userAddressService.updateAddress(userId, addressId, req.body);
        return successResponse(res, address, 200, 'Cập nhật địa chỉ thành công');
    } catch (error) {
        next(error);
    }
};

// Lấy tất cả địa chỉ của user
const getAddresses = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const addresses = await userAddressService.getUserAddresses(userId);
        return successResponse(res, addresses, 200, 'Lấy tất cả địa chỉ thành công');
    } catch (error) {
        next(error);
    }
};

// Xoá địa chỉ
const deleteAddress = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.id;
        const address = await userAddressService.deleteAddress(userId, addressId);
        return successResponse(res, address, 200, 'Xoá địa chỉ thành công');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addAddress,
    updateAddress,
    getAddresses,
    deleteAddress
};