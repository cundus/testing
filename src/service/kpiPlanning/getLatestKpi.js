// Custom Axios
import { customAxios } from "../axios";

export const getUserInfo = () => customAxios({
  url: '/user/loginByToken',
  method: 'GET',
  headers: {
    Authorization: 'Bearer '
  }
});
