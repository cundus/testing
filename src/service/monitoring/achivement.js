import { customAxios } from '../axios';

export const createAchivement = (data) => customAxios({
  url: '/achievement',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  },
  data
});

export const updateAchivement = (data) => customAxios({
  url: '/achievement',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  },
  data
});


export const getAchivementThread = (achivementID) => customAxios({
  url: `/achievement/${achivementID}`,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});
