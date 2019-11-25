import {
  getMyTeamDetail,
  errGetMyTeamDetail,
  startGetMyTeamDetail
} from '../action.type';

const initMyteamDetail = {};

export default (state = initMyteamDetail, action) => {
  switch (action.type) {
    case getMyTeamDetail:
      return action.data;
    case errGetMyTeamDetail:
      return action.data;
    case startGetMyTeamDetail:
      return action.data;
    default:
      return state;
  }
};
