import { successGetStatusActivity, errGetStatusActivity } from '../action.type';

const ActivityStatusState = {};

export default (state = ActivityStatusState, action) => {
  switch(action.type) {
    case successGetStatusActivity:
      return action.data;
    case errGetStatusActivity:
      return action.data;
    default:
      // return initUsers;
      return { ...state };
  }
};
