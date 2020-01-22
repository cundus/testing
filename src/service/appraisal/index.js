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

export const getValues = (id) => customAxios({
  url: `/values/${id}`,
  method: 'GET',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});

export const saveValues = (id, data) => customAxios({
  url: `/values/${id}`,
  method: 'POST',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  },
  data
});

export const getRating = () => customAxios({
  url: '/values/ratings',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});
