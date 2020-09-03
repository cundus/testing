import { customAxios } from "./axios";

export const getAlignment = () => customAxios({
    url: `/calibration`,
    method: 'GET',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('sfToken')}`
    }
});

export const getAlignmentDetail = (sessionId) => customAxios({
    url: `/calibration/${sessionId}/detail`,
    method: 'GET',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('sfToken')}`
    }
});

export const postAlignmentDetail = (data) => customAxios({
    url: `/calibration`,
    method: 'POST',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('sfToken')}`
    },
    data
});

export const getAlignmentDownloadPermission = () => customAxios({
    url: `/user/permission/allow-download-calibration-data`,
    method: 'GET',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('sfToken')}`
    },
  })
export const getAlignmentDownloadFile = () => customAxios({
    url: `/calibration/download`,
    method: 'GET',
    headers: {
        Accept: 'text/csv',
        'Content-Type': 'text/csv',
        Authorization: `Bearer ${localStorage.getItem('sfToken')}`
    },
    responseType: 'blob'
  })