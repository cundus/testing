import { customAxios } from './axios';

export const getFormTemplates = (eligibleToCopy) => customAxios({
  url: '/kpi/form-template',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  },
  params: {
    eligibleToCopy
  }
});


export const getPrevKpiByFormId = (userId, formTemplateId) => customAxios({
  url: `/kpi/prev/${userId}/${formTemplateId}`,
  method: 'GET',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sfToken')}`
  }
});