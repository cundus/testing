import axios from 'axios';
const uuidv1 = require('uuid/v1');

const { REACT_APP_API_URL } = process.env;

// custom config to create a new instance
export const customAxios = axios.create({
  baseURL: REACT_APP_API_URL
});

customAxios.interceptors.request.use((config) => {
  config.headers = Object.assign(config.headers , { 'X-Requested-With' : uuidv1() });
  return config;
});
