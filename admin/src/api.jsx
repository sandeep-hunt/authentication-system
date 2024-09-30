import axios from 'axios';

// Set the base URL of your API
const API = axios.create({
    baseURL: 'http://localhost:3000/api',  // Change the base URL as needed
});

// Add a request interceptor to add token to headers
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
