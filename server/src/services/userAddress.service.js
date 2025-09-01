// services/userAddress.service.js
const UserAddress = require('../models/UserAddress');
const User = require('../models/User');
const AppError = require('../utils/appError');

// Thêm địa chỉ mới
const addAddress = async (userId, addressData) => {
    const user = await User.findById(userId);
    if (!user) throw new AppError(404, "Người dùng không tồn tại");

    // Nếu address được set là mặc định -> bỏ mặc định của các địa chỉ khác
    if (addressData.isDefault) {
        await UserAddress.updateMany(
            { user: userId },
            { $set: { isDefault: false } }
        );
    }

    const newAddress = await UserAddress.create({
        user: userId,
        ...addressData
    });

    return newAddress;
};

const updateAddress = async (userId, addressId, updateData) => {
    const address = await UserAddress.findOne({ _id: addressId, user: userId });
    if (!address) throw new AppError(404, "Không tìm thấy địa chỉ");

    // Nếu set mặc định thì bỏ mặc định ở các địa chỉ khác
    if (updateData.isDefault) {
        await UserAddress.updateMany(
            { user: userId },
            { $set: { isDefault: false } }
        );
    }

    Object.assign(address, updateData);
    await address.save();

    return address;
};

// Lấy tất cả địa chỉ theo user
const getUserAddresses = async (userId) => {
    return await UserAddress.find({ user: userId }).sort({ is_default: -1, updated_at: -1 });
};

// Xoá địa chỉ
const deleteAddress = async (userId, addressId) => {
    const address = await UserAddress.findOneAndDelete({ _id: addressId, user: userId });
    if (!address) throw new AppError(404, "Không tìm thấy địa chỉ để xoá");
    return address;
};

module.exports = {
    addAddress,
    updateAddress,
    getUserAddresses,
    deleteAddress
};
