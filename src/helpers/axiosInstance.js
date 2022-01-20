import axios from 'axios';
import { getLocalStorage } from './localStorage';

const {REACT_APP_MAIN_URL} = process.env

export const myAxios = axios.create({
  baseURL: `${REACT_APP_MAIN_URL}`,
  headers: {
    Authorization: getLocalStorage('accessToken') || '',
  },
});
