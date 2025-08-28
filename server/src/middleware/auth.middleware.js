const AppError = require('../utils/appError');
const { verifyToken } = require('../utils/jwt');

exports.protect = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new AppError(401, 'Unauthorized');

        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        next(new AppError(401, 'Không có token'))
    }
}