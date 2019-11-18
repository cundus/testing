// Custom Axios
import { customAxios } from '../axios';

export const getUserInfo = token => customAxios({
  url: 'user/loginByToken',
  method: 'POST',
  headers: {
    ttl: 1440
  },
  data: {
    token: token
  }
});
