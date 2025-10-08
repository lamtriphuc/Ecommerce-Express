import axiosInstance from './axios';

export const registerUser = async (data) => {
    const response = await axiosInstance.post('/users', data);
    return response.data;
}

export const login = async (data) => {
    const response = await axiosInstance.post('/users/login', data);
    return response.data;
}

export const getMe = async (data) => {
    const response = await axiosInstance.get('/users/me');
    return response.data;
}