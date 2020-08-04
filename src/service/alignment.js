import { customAxios } from "./axios";

export const getAlignment = () => customAxios({
    url: `/calibration`,
    method: 'GET',
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBZG1pbiIsImp0aSI6ImFkbWluZGRnIiwiZXhwIjoxNTk2NjA5OTcwfQ.2mrghwLULyAh_37qqdWxldOroTE0Jg8D-5J-xH0nkn4`
    }
});

export const getAlignmentDetail = (sessionId) => customAxios({
    url: `/calibration/${sessionId}/detail`,
    method: 'GET',
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBZG1pbiIsImp0aSI6ImFkbWluZGRnIiwiZXhwIjoxNTk2NjA5OTcwfQ.2mrghwLULyAh_37qqdWxldOroTE0Jg8D-5J-xH0nkn4`
    }
});