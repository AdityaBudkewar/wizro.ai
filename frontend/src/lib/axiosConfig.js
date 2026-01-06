import axios from 'axios';
import { toast } from 'sonner';

const TIMEOUT = 10000;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: TIMEOUT,
});

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🚨 IMPORTANT: do NOT retry refresh endpoint itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/user/refresh'
    ) {
      originalRequest._retry = true;

      try {
        const res = await axiosInstance.post('/user/refresh');

        setAccessToken(res.data.accessToken);

        return axiosInstance(originalRequest);
      } catch (err) {
        toast.error('Session expired. Please login again.');
        accessToken = null;

        // optional: redirect to login
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
