import { customAxios } from '../axios';
const token = localStorage.getItem('sfToken');


export const getActivityThread = (activityID) => customAxios({
  url: `/activity/${activityID}`,
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
