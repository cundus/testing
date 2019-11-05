import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

// custom config to create a new instance
export const customAxios = axios.create({
  baseURL: REACT_APP_API_URL
});
