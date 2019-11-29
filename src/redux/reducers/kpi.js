import {
  SAVE_KPI,
  SAVE_KPI_SUCCESS,
  SAVE_KPI_FAILED,
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
  page: '',
  dataGoal: {
    id: null,
    name: '',
    description: '',
    startDate: '',
    dueDate: '',
    parentPlanId: null
  },
  dataKpi: [],
  loadingSaveKPI: false,
  statusSaveKPI: null,
  messageSaveKPI: ''
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
        dataKpi: action.data
      };
    case GET_KPI_LIST_FAILED:
      return {
        ...state,
        loading: action.loading,
        status: action.status,
        message: action.message
      };
    case SAVE_KPI:
      return {
        ...state,
        loadingSaveKPI: action.loading,
        statusSaveKPI: action.status,
        messageSaveKPI: action.message
      };
    case SAVE_KPI_SUCCESS:
      return {
        ...state,
        loadingSaveKPI: action.loading,
        statusSaveKPI: action.status,
        messageSaveKPI: action.message
      };
    case SAVE_KPI_FAILED:
      return {
        ...state,
        loadingSaveKPI: action.loading,
        statusSaveKPI: action.status,
        messageSaveKPI: action.message
      };
    default:
      return { ...state };
  }
};

export default kpiReducers;
