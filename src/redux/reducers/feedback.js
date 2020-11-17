import { errSubmitFeedback, successFeedback } from '../action.type';

const initialState = {
  loading: false,
  status: NaN,
  statusMessage: ''
};

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case successFeedback:
      return {
        ...state,
        loading: action.loading,
        status: action.status,
        statusMessage: action.message
      };
    case errSubmitFeedback:
      return {
        ...state,
        loading: action.loading,
        status: action.status,
        statusMessage: action.message
      };
    default:
      return { ...state };
  }
};

export default feedbackReducer;
