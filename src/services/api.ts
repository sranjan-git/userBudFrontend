// src/services/api.ts
import axios from 'axios';

axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: 'https://userbudbackend.onrender.com', // Ensure this points to your backend URL
});

export default api;
