import { customAxios } from '../axios';
const token = localStorage.getItem('sfToken');


export const getActivityThread = (activityID, userID) => customAxios({
  url: `/activity/${activityID}/${userID}`,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});


export const getActivityThreadChat = (activityID, chatId) => customAxios({
  url: `/activity/detail/${activityID}/${chatId}`,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});

export const createActivity = (data) => customAxios({
  url: '/activity',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  },
  data
});

export const updateActivity = (data) => customAxios({
  url: '/activity',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  },
  data
});

export const createActivitychat = (data) => customAxios({
  url: '/activity/feedback',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  },
  data
});


export const getActivityStatus = () => customAxios({
  url: '/activity/statuses',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});
