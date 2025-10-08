import axiosInstance from './axios';

export const getAllProducts = async ({ page = 1, limit = 6, keyword, category, minPrice, maxPrice } = {}) => {
    const response = await axiosInstance.get('/products', {
        params: {
            page,
            limit,
            keyword,
            category,
            minPrice,
            maxPrice,
        },
    });
    return response.data; // { total, page, limit, totalPages, data }
}