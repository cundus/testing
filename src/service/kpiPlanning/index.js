// Custom Axios
import { customAxios } from '../axios';

const token = localStorage.getItem('sfToken');

export const getLatestGoalKpi = () => customAxios({
  url: '/kpi/goal-plan/latest',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`
  }
});
