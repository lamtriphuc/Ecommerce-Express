const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'lamtriphuc';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '6h';

const signToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    signToken,
    verifyToken
}