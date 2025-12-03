import axios from 'axios';

const api = axios.create({
    baseURL: 'https://wavenetproject-1.onrender.com/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

// Response interceptor to handle 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await axios.get('https://wavenetproject-1.onrender.com/api/auth/refresh-token', {
                    withCredentials: true,
                });
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Session expired. Please log in again.');
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
