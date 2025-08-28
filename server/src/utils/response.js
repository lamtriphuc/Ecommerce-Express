const successResponse = (res, data, statusCode, message) => {
    return res.status(statusCode).json({
        success: true,
        data,
        statusCode,
        message
    })
}

const userResponse = (user) => {
    return {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at
    }
}

module.exports = {
    successResponse,
    userResponse
}