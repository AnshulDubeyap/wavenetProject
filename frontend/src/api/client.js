import axios from 'axios'

const api = axios.create({
  baseURL: 'https://wavenetproject.vercel.app/api',
  withCredentials: true,
})

export default api