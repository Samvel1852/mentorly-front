import axios from 'axios';
import { getLocalStorage } from './localStorage';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: {
    Authorization: getLocalStorage('accessToken') || '',
  },
});

export default axiosInstance;
