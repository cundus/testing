// Custom Axios
import { customAxios } from '../axios';

export const getLatestGoalKpi = () => customAxios({
  url: '/kpi/goal-plan/latest',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});

export const getKpiList = (id) => customAxios({
  url: `/kpi/byid/${id}`,
  method: 'GET',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});

export const saveKpi = (data, id) => customAxios({
  url: `/kpi/byid/${id}`,
  method: 'POST',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  },
  data: {
    kpis: data
  }
});
