const AppError = require('../utils/appError');
const { verifyToken } = require('../utils/jwt');

exports.authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new AppError(401, 'Unauthorized');

        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        next(new AppError(401, 'Không có token'))
    }
};

// phân quyền 
exports.isAdmin = (req, res, next) => {
    if (!req.user) {
        return next(new AppError(401, "Chưa đăng nhập"));
    }
    if (req.user.role !== "admin") {
        return next(new AppError(403, "Không có quyền truy cập"));
    }
    next();
};