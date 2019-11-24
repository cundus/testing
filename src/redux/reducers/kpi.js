import {
  SAVE_DRAFT,
  SAVE_DRAFT_SUCCESS,
  SAVE_DRAFT_FAILED,
  GET_LATEST_GOAL_KPI,
  GET_LATEST_GOAL_KPI_SUCCESS,
  GET_LATEST_GOAL_KPI_FAILED,
  GET_KPI_LIST,
  GET_KPI_LIST_SUCCESS,
  GET_KPI_LIST_FAILED
} from '../action.type';

const initialState = {
  loading: false,
  status: null,
  message: '',
  pages: '',
  dataGoal: {
    id: null,
    name: '',
    description: '',
    startDate: '',
    dueDate: '',
    parentPlanId: null
  },
  dataKpi: []
};

const kpiReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_LATEST_GOAL_KPI:
      return {
        ...state,
        loading: action.loading
      };
    case GET_LATEST_GOAL_KPI_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        status: action.status,
        message: action.message,
        dataGoal: action.data
      };
    case GET_LATEST_GOAL_KPI_FAILED:
      return {
        ...state,
        loading: action.loading,
        status: action.status,
        message: action.message
      };
    case GET_KPI_LIST:
      return {
        ...state,
        loading: action.loading
      };
    case GET_KPI_LIST_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        status: action.status,
        message: action.message,
        dataKpi: action.data,
        pages: action.pages,
        action: action.pages
      };
    case GET_KPI_LIST_FAILED:
      return {
        ...state,
        loading: action.loading,
        status: action.status,
        message: action.message
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
