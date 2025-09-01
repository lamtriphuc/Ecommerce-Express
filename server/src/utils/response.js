exports.successResponse = (res, data, statusCode, message) => {
    return res.status(statusCode).json({
        success: true,
        data,
        statusCode,
        message
    })
}

exports.userResponse = (user) => {
    return {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at
    }
}

exports.categoryResponse = (category) => {
    return {
        id: category._id,
        name: category.name,
        slug: category.slug,
        createdAt: category.created_at,
        updatedAt: category.updated_at
    }
}

exports.productResponse = (product) => {
    return {
        id: product._id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        category: {
            id: product.category._id,
            name: product.category.name,
            slug: product.category.slug
        },
        price: product.price,
        stock: product.stock,
        thumbnail: product.thumbnail,
        images: product.images.map(image => ({
            url: image.url,
            position: image.position
        })),
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
    }
}