import axios from 'axios'

const api = axios.create({
  baseURL: 'https://wavenetproject-1.onrender.com/api',
  withCredentials: true,
});

export default api;