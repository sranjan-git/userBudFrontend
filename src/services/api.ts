import axios from 'axios';

// axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: 'http://localhost:5001/',
});

export default api;
