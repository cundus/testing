import {
  SAVE_KPI,
  SAVE_KPI_SUCCESS,
  SAVE_KPI_FAILED,
  GET_LATEST_GOAL_KPI,
  GET_LATEST_GOAL_KPI_SUCCESS,
  GET_LATEST_GOAL_KPI_FAILED,
  GET_KPI_LIST,
  GET_KPI_LIST_SUCCESS,
  GET_KPI_LIST_FAILED,
  GET_KPI_MANAGER_LIST,
  GET_KPI_MANAGER_LIST_SUCCESS,
  GET_KPI_MANAGER_LIST_FAILED,
  GET_METRICS,
  GET_METRICS_SUCCESS,
  GET_METRICS_FAILED,
  SUBMIT_NEXT,
  SUBMIT_NEXT_SUCCESS,
  SUBMIT_NEXT_FAILED
} from '../action.type';

const initialState = {
  loadingMetric: false,
  loadingGoal: false,
  loadingKpi: false,
  status: null,
  message: '',
  page: '',
  dataGoal: {},
  dataKpi: [],
  loadingSaveKPI: false,
  statusSaveKPI: null,
  messageSaveKPI: '',
  loadingManagerKpi: false,
  statusManagerKpi: null,
  messageManagerKpi: '',
  dataFirstManager: {},
  dataSecondManager: {},
  dataMetrics: [],
  dataKpiMetrics: [],
  dataKpiManagerMetrics: []
};

const kpiReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_METRICS:
      return {
        ...state,
        loadingMetric: action.loading
      };
    case GET_METRICS_SUCCESS:
      return {
        ...state,
        loadingMetric: action.loading,
        status: action.status,
        message: action.message,
        dataMetrics: action.data
      };
    case GET_METRICS_FAILED:
      return {
        ...state,
        loadingMetric: action.loading,
        status: action.status,
        message: action.message
      };
    case GET_LATEST_GOAL_KPI:
      return {
        ...state,
        loadingGoal: action.loading
      };
    case GET_LATEST_GOAL_KPI_SUCCESS:
      return {
        ...state,
        loadingGoal: action.loading,
        status: action.status,
        message: action.message,
        dataGoal: action.data
      };
    case GET_LATEST_GOAL_KPI_FAILED:
      return {
        ...state,
        loadingGoal: action.loading,
        status: action.status,
        message: action.message
      };
    case GET_KPI_LIST:
      return {
        ...state,
        loadingKpi: action.loading
      };
    case GET_KPI_LIST_SUCCESS:
      return {
        ...state,
        loadingKpi: action.loading,
        status: action.status,
        message: action.message,
        dataKpi: action.data.kpiList,
        dataKpiMetrics: action.data.labelList,
        generalFeedback: action.data.challengeOthersRatingComments,
        challenge: action.data.challangeYourSelf,
        currentStep: action.data.currentStep,
        holderUserId: action.data.holderUserId
      };
    case GET_KPI_LIST_FAILED:
      return {
        ...state,
        loadingKpi: action.loading,
        status: action.status,
        errMessage: action.message
      };
    case GET_KPI_MANAGER_LIST:
      return {
        ...state,
        loadingManagerKpi: action.loading
      };
    case GET_KPI_MANAGER_LIST_SUCCESS:
      return {
        ...state,
        loadingManagerKpi: action.loading,
        statusManagerKpi: action.status,
        messageManagerKpi: action.message,
        dataFirstManager: action.data.firstManager,
        dataSecondManager: action.data.secondManager,
        dataKpiManagerMetrics: action.data.labelList
      };
    case GET_KPI_MANAGER_LIST_FAILED:
      return {
        ...state,
        loadingManagerKpi: action.loading,
        statusManagerKpi: action.status,
        messageManagerKpi: action.message
      };
    case SAVE_KPI:
      return {
        ...state,
        loadingSaveKPI: action.loading
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
    case SUBMIT_NEXT:
      return {
        ...state,
        loadingSaveKPI: action.loading
      };
    case SUBMIT_NEXT_SUCCESS:
      return {
        ...state,
        loadingSaveKPI: action.loading,
        statusSaveKPI: action.status,
        messageSaveKPI: action.message
      };
    case SUBMIT_NEXT_FAILED:
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
