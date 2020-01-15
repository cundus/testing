import {
  getAchievementThread,
  successAchievementThread,
  errAchievementThread
} from '../action.type';

const AchievementState = {};

export default (state = AchievementState, action) => {
  switch(action.type) {
    case getAchievementThread:
      return action.data;
    case successAchievementThread:
      return action.data;
    case errAchievementThread:
      return action.data;
    default:
      // return initUsers;
      return { ...state };
  }
};
