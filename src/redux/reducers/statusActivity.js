import { successGetActivity, errGetActivity } from '../action.type';

const ActivityStatusState = {};

export default (state = ActivityStatusState, action) => {
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
