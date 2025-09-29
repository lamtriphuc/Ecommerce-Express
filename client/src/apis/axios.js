import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // Nếu dùng cookie
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosInstance.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config;

        const isLoginOrRefresh =
            originalRequest.url.includes('/auth/login') ||
            originalRequest.url.includes('/auth/refresh-token');

        // Nếu không có access token hoặc không có refresh token → không gọi refresh
        const token = localStorage.getItem('accessToken');
        if (error.response?.status === 401 && !originalRequest._retry && !isLoginOrRefresh) {
            if (!token) {
                // Trạng thái đăng xuất → trả lỗi luôn
                return Promise.reject(error);
            }

            originalRequest._retry = true;
            try {
                const res = await axiosInstance.post('/auth/refresh-token');
                const newToken = res.data.access_token;
                localStorage.setItem('accessToken', newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);



export default axiosInstance;
