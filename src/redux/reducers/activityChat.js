import { getActivityChat, successGetActivityChat, errGetActivityChat } from '../action.type';

const ActivityChatState = {};

export default (state = ActivityChatState, action) => {
  switch (action.type) {
    case getActivityChat:
      return action.data;
    case successGetActivityChat:
      return action.data;
    case errGetActivityChat:
      return action.data;
    default:
      // return initUsers;
      return { ...state };
  }
};
