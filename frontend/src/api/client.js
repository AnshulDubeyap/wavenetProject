import axios from 'axios'

const api = axios.create({
  baseURL: 'https://wavenet-project-nj6y.vercel.app/api', // updated backend URL
  withCredentials: true, // allow cookies for auth
});


export default api