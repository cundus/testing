import {
    GET_APRAISAL_TEAM,
    GET_APRAISAL_TEAM_SUCCESS,
    GET_APRAISAL_TEAM_FAILED,
    GET_APRAISAL_TEAM_DETAIL,
    GET_APRAISAL_TEAM_DETAIL_SUCCESS,
    GET_APRAISAL_TEAM_DETAIL_FAILED
} from '../action.type';

const initialState = {
  loading: true,
  status: null,
  message: null,
  success: false,
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_APRAISAL_TEAM:
      return {
        ...state,
        loading: action.loading
      };
    case GET_APRAISAL_TEAM_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        status: action.status,
        message: action.message,
        data: action.data
      };
    case GET_APRAISAL_TEAM_FAILED:
      return {
        ...state,
        loading: action.loading,
        status: action.status,
        message: action.message
      };
    case GET_APRAISAL_TEAM_DETAIL:
      return {
        ...state,
        loadinga: action.loading
      };
    case GET_APRAISAL_TEAM_DETAIL_SUCCESS:
      return {
        ...state,
        loadinga: action.loading,
        statusa: action.status,
        messagea: action.message,
        dataa: action.data
      };
    case GET_APRAISAL_TEAM_DETAIL_FAILED:
      return {
        ...state,
        loadinga: action.loading,
        statusa: action.status,
        messagea: action.message
      };
    default:
      return { ...state };
  }
};
