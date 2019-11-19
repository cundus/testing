// Custom Axios
import { customAxios } from '../axios';

export const getUserInfo = token => customAxios({
  url: '/user/loginByToken',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  data: {
    token: token
  }
});
