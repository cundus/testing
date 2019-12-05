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

export const getKpiManagerList = (id) => customAxios({
  url: `/kpi/manager/${id}`,
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

export const getMetrics = () => customAxios({
  url: '/kpi/metrics',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});
