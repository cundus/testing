import axios from 'axios';

const uuidv1 = require('uuid/v1');

const { REACT_APP_API_URL } = process.env;

// custom config to create a new instance
export const customAxios = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'development' ?
      REACT_APP_API_URL :
      `${
          window.location.pathname !== '/' ?
          `${window.location.href.replace(window.location.pathname, '')}api` :
          'api'
        }`
});

customAxios.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers = Object.assign(config.headers, {
    'X-Requested-With': `${uuidv1()}-${new Date().getTime()}`
  });
  return config;
});
