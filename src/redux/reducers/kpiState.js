import { getUserKpiState, errGetUserKpiState } from '../action.type';

const initUsers = {};

export default (state = initUsers, action) => {
  switch(action.type) {
    case getUserKpiState:
      return action.data;
    case errGetUserKpiState:
      return action.data;
    default:
      // return initUsers;
      return { ...state };
  }
};
