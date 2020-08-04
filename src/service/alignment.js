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