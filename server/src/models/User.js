const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            default: null
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;