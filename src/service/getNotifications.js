// Custom Axios
import { customAxios } from './axios';

export const getNotifications = () => customAxios({
  url: '/notification',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});
