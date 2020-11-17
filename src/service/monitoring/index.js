import { customAxios } from "../axios";

export const reviseKpi = (id) => customAxios({
    url: `/kpi/revise/${id}?comment=revise kpi`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('sfToken')}`
    }
  });