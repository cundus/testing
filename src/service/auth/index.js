import { customAxios } from '../axios';
const token = localStorage.getItem('sfToken');

export const getUserInfo = (token) => customAxios({
  url: '/user/loginByToken',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  data: {
    token
  }
});

export const getUserDetail = (idUser) => customAxios({
  url: `/user/getUserByid/${idUser}`,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});

export const getKPIstate = () => customAxios({
  url: '/kpi/current-step',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
})

export const getMyTeam = (idUser) => customAxios({
  url: `/user/team/${idUser}`,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});

export const getMyTeamMonitoring = (idUser) => customAxios({
  url: `/user/team/monitoring/${idUser}`,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});

export const getMyTeamApraisal = (idUser) => customAxios({
  url: `/user/team/appraisal/${idUser}`,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});

export const getMyTeamApraisalDetail = (idUser) => customAxios({
  url: `/user/team/appraisal/detail/${idUser}`,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});


export const getMyTeamDetailKPI = (idUser) => customAxios({
  url: `/user/team/kpi/detail/${idUser}`,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});

export const getMyKPI = (idUser) => customAxios({
  url: `/user/team/kpi/${idUser}`,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});

export const feedbackUserKpi = (idUser, data) => customAxios({
  url: `/user/team/send-feedback/${idUser}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  },
  data
});

export const approveUserKpi = (idUser, data) => customAxios({
  url: `/user/team/approve/${idUser}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  },
  data
});
