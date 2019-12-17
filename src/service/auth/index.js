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

export const getMyTeam = (idUser) => customAxios({
  url: `/user/team/${idUser}`,
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
