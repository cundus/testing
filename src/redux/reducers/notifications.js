import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILED
} from '../action.type';

const initialState = {
  loading: false,
  status: NaN,
  statusMessage: '',
  data: []
};

const kpiReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        loading: action.loading
      };
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        status: action.status,
        statusMessage: action.message,
        data: action.data
      };
    case GET_NOTIFICATIONS_FAILED:
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

export default kpiReducers;
