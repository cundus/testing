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


export const getACtivityStatus = () => customAxios({
  url: '/activity/statuses',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});
