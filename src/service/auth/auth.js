import { customAxios } from '../axios';

export const loginByADToken = (ADToken) => customAxios({
  url: '/user/loginByToken',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  data: {
    token: ADToken
  }
});

export const getCurrentStep = () => customAxios({
  url: '/kpi/current-step',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});
