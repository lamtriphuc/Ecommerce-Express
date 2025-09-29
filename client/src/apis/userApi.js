import axiosInstance from './axios';

export const registerUser = async (data) => {
    const response = await axiosInstance.post('/users', data);
    return response.data;
}