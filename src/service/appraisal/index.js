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

export const getKpiRating = (id) => customAxios({
  url: `/kpi/rating/${id}`,
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

export const teamAcknowledge = (data) => customAxios({
  url: `/kpi/manager-acknowledment/${data.userId}`,
  method: 'GET',
  params: {
    comment: data.acknowledgement,
    signatureComment: data.acknowledgement
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});

export const empAcknowledgeList = () => customAxios({
  url: '/kpi/employee-acknowledment/list',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});

export const empAcknowledge = (data) => customAxios({
  url: '/kpi/employee-acknowledment',
  method: 'GET',
  params: {
    elementValue: data
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});
