import axios from 'axios'

const api = axios.create({
  baseURL: 'https://wavenet-project-nao9.vercel.app/api',
  withCredentials: true, 
});


export default api