const User = require("../models/User");
const bcrypt = require('bcrypt');
const AppError = require('../utils/appError');
const { userResponse } = require("../utils/response");
const { signToken } = require("../utils/jwt");

const createUser = async ({ username, email, password }) => {
    const exit = await User.findOne({ email })
    if (exit) throw new AppError(409, 'Email đã tồn tại');
    // if (exit) throw { statusCode: 404, message: "User not found" };

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        email,
        password_hash: hashedPassword
    })
    const res = await user.save();
    return userResponse(res);
}

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new AppError(404, 'Tài khoản không tồn tại');

    const isMatch = checkPassword(password, user.password_hash);
    if (!isMatch) throw new AppError(401, 'Tài khoản hoặc mật khẩu không chính xác');

    // Tạo token
    const token = signToken({ id: user._id, email: user.email });

    return { token };
}

const getMe = async (email) => {
    console.log(email)
    const user = await User.findOne({ email });
    if (!user) throw new AppError(404, 'Người dùng không tồn tại');
    return userResponse(user);
}

const checkPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
    createUser,
    getMe,
    checkPassword,
    login
};
