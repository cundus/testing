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

export const getKpiList = (id) => customAxios({
  url: `/kpi/byid/${id}`,
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const saveKpi = (id) => customAxios({
  url: `/kpi/byid/${id}`,
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`
  }
});
