import { errSubmitFeedback, successFeedback } from '../action.type';

const initMyteam = {
  error: true,
  success: false
};

export default (state = initMyteam, action) => {
  switch (action.type) {
    case errSubmitFeedback:
      return action.data;
    case successFeedback:
      return {
        error: false,
        success: true
      };
    default:
      return { ...state };
  }
};
