// Custom Axios
import { customAxios } from '../axios';

export const doAssess = (data) => customAxios({
  url: '/kpi/assesment',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  },
  data
});
