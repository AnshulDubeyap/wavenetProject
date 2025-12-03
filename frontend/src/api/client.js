import axios from 'axios';

const api = axios.create({
  baseURL: 'https://wavenetproject-1.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized: Please login again.');
    }
    return Promise.reject(error);
  }
);

export default api;
