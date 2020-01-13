import { successGetActivity, errGetActivity } from '../action.type';

const ActivityState = {};

export default (state = ActivityState, action) => {
  switch(action.type) {
    case successGetActivity:
      return action.data;
    case errGetActivity:
      return action.data;
    default:
      // return initUsers;
      return { ...state };
  }
};
