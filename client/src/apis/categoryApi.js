import axiosInstance from './axios';

export const getAllCategories = async () => {
    const response = await axiosInstance.get('/categories');
    return response.data;
}