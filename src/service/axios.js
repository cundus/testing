import axios from 'axios';
import apiUrl from '../utils/apiUrl';
const { REACT_APP_API_URL } = process.env;

const uuidv1 = require('uuid/v1');

// custom config to create a new instance
export const customAxios = axios.create({
  baseURL: REACT_APP_API_URL
});

customAxios.interceptors.request.use(async(config) => {
  config.baseURL = await apiUrl();
  config.headers = Object.assign(config.headers, {
    'X-Requested-With': `${uuidv1()}-${new Date().getTime()}`
  });
  return config;
});
