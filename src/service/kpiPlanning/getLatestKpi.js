// Custom Axios
import { customAxios } from '../axios';

const token = localStorage.getItem('sfToken');

export const getLatestKpi = () => customAxios({
  url: '/kpi/goal-plan/latest',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`
  }
});
