const userService = require('../services/user.service');
const { successResponse } = require('../utils/response');

const createUser = async (req, res, next) => {
    try {
        const newUser = await userService.createUser(req.body);
        return successResponse(res, newUser, 201, 'Tạo tài khoản thành công');
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { token } = await userService.login(email, password);

        // Set cookie (HTTP-only, bảo mật)
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 ngày
        })

        return successResponse(res, token, 200, 'Đăng nhập thành công');
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const getMe = async (req, res, next) => {
    try {
        const user = await userService.getMe(req.user.email);
        return successResponse(res, user, 200, 'Lấy thông tin user thành công');
    } catch (error) {
        console.log(error)
        next(error);
    }
}

module.exports = {
    createUser,
    getMe,
    login
};
