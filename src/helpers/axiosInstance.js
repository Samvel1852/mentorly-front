import axios from 'axios';
import { getLocalStorage } from './localStorage';

const {REACT_APP_MAIN_URL} = process.env

const accessToken = getLocalStorage('accessToken');

console.log('accessToken', accessToken)

export const myAxios = axios.create({
  baseURL: `${REACT_APP_MAIN_URL}`,
  // headers: {
  //   Authorization: `Bearer ${getLocalStorage('accessToken')}`,
  // },
});