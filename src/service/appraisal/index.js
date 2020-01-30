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

export const getKpiRating = () => customAxios({
  url: '/kpi/rating',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});

export const attachFile = (data) => customAxios({
  url: '/attachment',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  },
  data
});

export const deleteFile = (id) => customAxios({
  url: `/attachment/${id}`,
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});

export const getProposeRating = () => customAxios({
  url: '/kpi/proposed-rating/',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});

export const sendFeedbackAppraisal = (userId, data) => customAxios({
  url: `/user/team/appraisal/send-back/${userId}`,
  method: 'POST',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  },
  data
});

export const approveAppraisal = (userId, data) => customAxios({
  url: `/user/team/appraisal/approve/${userId}`,
  method: 'POST',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  },
  data
});
