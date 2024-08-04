// src/services/api.ts
import axios from 'axios';

axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: 'https://userbudbackend.onrender.com', 
});

export default api;
