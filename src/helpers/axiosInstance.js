import axios from 'axios';

import { getLocalStorage } from './localStorage';

const { REACT_APP_MAIN_URL } = process.env

const axiosInstance = axios.create({
  baseURL: `${REACT_APP_MAIN_URL}`,
  headers: {
    Accepted: 'appication/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage('accessToken');
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance
