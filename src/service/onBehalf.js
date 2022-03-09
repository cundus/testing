import { customAxios } from './axios';


export const getOnBehalfUsers = (params) => customAxios({
  url: `/on-behalf/user`,
  method: 'GET',
  params
});

export const getOnBehalfForms = (params, userId) => customAxios({
  url: `/on-behalf/form-performance/${userId}`,
  method: 'GET',
  params
});

export const getDirectorates = () => customAxios({
  url: `/user/directorate`,
  method: 'GET',
});

export const getDepartements = () => customAxios({
  url: `/user/department`,
  method: 'GET',
});