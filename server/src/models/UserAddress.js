const mongoose = require('mongoose');

const userAddressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // tham chiêu => Model User
            required: true
        },
        recipientName: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
        },
        province: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        streetAddress: {
            type: String,
            required: true,
        },
        isDefault: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

const UserAddress = mongoose.model('UserAddress', userAddressSchema);
module.exports = UserAddress;