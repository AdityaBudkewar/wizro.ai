import axios from 'axios';

const TIMEOUT = 10000,
  axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: TIMEOUT,
  });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default axiosInstance;
