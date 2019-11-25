import {
  getUserDetail,
  errUserDetail,
  startUserDetail
} from '../action.type';

const initMyteamDetail = {};

export default (state = initMyteamDetail, action) => {
  switch (action.type) {
    case getUserDetail:
      return action.data;
    case errUserDetail:
      return action.data;
    case startUserDetail:
      return action.data;
    default:
      return state;
  }
};
