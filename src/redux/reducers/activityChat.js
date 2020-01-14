import {
  getActivityChat,
  successGetActivityChat,
  errGetActivityChat,
  doFeedbackComment,
  successFeedbackComment,
  errFeedbackComment
} from '../action.type';

const ActivityChatState = {};

export default (state = ActivityChatState, action) => {
  switch (action.type) {
    case getActivityChat:
      return action.data;
    case successGetActivityChat:
      return action.data;
    case errGetActivityChat:
      return action.data;
    case successFeedbackComment:
      return action.data;
    case errFeedbackComment:
      return action.data;
    case doFeedbackComment:
      return action.data;
    default:
      // return initUsers;
      return { ...state };
  }
};
