import axios from 'axios';
import apiUrl from '../utils/apiUrl';

const uuidv1 = require('uuid/v1');

// custom config to create a new instance
export const customAxios = axios.create({
  baseURL: apiUrl()
});

customAxios.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers = Object.assign(config.headers, {
    'X-Requested-With': `${uuidv1()}-${new Date().getTime()}`
  });
  return config;
});
