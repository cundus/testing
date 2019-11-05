// Custom Axios
import { customAxios } from '../axios';

export const Login = data => customAxios({
  url: '/auth/login',
  method: 'post',
  headers: {
    ttl: 1440
  },
  data
})
  .then(res => Promise.resolve(res))
  .catch(err => Promise.reject(err));
