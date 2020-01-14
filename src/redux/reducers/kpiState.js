import { getUserKpiState, errGetUserKpiState } from '../action.type';

const KpiState = {};

export default (state = KpiState, action) => {
  switch(action.type) {
    case getUserKpiState:
      return action.data;
    case errGetUserKpiState:
      return action.data;
    default:
      // return KpiState;
      return { ...state };
  }
};
