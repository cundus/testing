import {
  SAVE_DRAFT,
  SAVE_DRAFT_SUCCESS,
  SAVE_DRAFT_FAILED,
  GET_LATEST_GOAL_KPI,
  GET_LATEST_GOAL_KPI_SUCCESS,
  GET_LATEST_GOAL_KPI_FAILED
} from '../action.type';

const initialState = {
  isDoSaveDraft: false,
  isGetLatestGoal: false,
  getGoal: false,
  payload: null,
  status: null,
  message: null,
  data: ''
};

const kpiReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_LATEST_GOAL_KPI:
      return {
        ...state,
        isGetLatestGoal: action.isGetLatestGoal,
        getGoal: action.loading,
        status: null,
        message: null,
        data: ''
      };
    case GET_LATEST_GOAL_KPI_SUCCESS:
      return {
        ...state,
        isGetLatestGoal: action.isGetLatestGoal,
        getGoal: action.loading,
        status: action.status,
        message: action.message,
        data: action.data
      };
    case GET_LATEST_GOAL_KPI_FAILED:
      return {
        ...state,
        isGetLatestGoal: action.isGetLatestGoal,
        getGoal: action.loading,
        status: action.status,
        message: action.message,
        data: ''
      };
    case SAVE_DRAFT:
      return {
        ...state,
        isDoSaveDraft: action.isDoSaveDraft
      };
    case SAVE_DRAFT_SUCCESS:
      return {
        ...state,
        isDoSaveDraft: action.isDoSaveDraft
      };
    case SAVE_DRAFT_FAILED:
      return {
        ...state,
        isDoSaveDraft: action.isDoSaveDraft
      };
    default:
      return { ...state };
  }
};

export default kpiReducers;
