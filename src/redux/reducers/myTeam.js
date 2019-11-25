import { getMyTeam, errGetMyTeam, startGetMyTeam } from '../action.type';

const initMyteam = [];

export default (state = initMyteam, action) => {
  switch (action.type) {
    case getMyTeam:
      return action.data;
    case errGetMyTeam:
      return action.data;
    case startGetMyTeam:
      return action.data;
    default:
      return { ...state };
  }
};
