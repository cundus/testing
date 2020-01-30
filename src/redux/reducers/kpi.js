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
  SUBMIT_NEXT_FAILED,
  DO_ASSESSMENT,
  DO_ASSESSMENT_SUCCESS,
  DO_ASSESSMENT_FAILED,
  GET_VALUES,
  GET_VALUES_SUCCESS,
  GET_VALUES_FAILED,
  GET_RATING,
  GET_RATING_SUCCESS,
  GET_RATING_FAILED,
  SAVE_VALUES,
  SAVE_VALUES_SUCCESS,
  SAVE_VALUES_FAILED,
  ATTACHMENT_FILE_SUCCESS,
  ATTACHMENT_FILE,
  ATTACHMENT_FILE_FAILED,
  DELETE_FILE,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_FAILED,
  GET_KPI_RATING,
  GET_KPI_RATING_SUCCESS,
  GET_KPI_RATING_FAILED
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
  dataKpiManagerMetrics: [],
  generalFeedback: {
    id: null,
    comment: null
  }
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
        holderUserId: action.data.holderUserId,
        user: action.data.user
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
    case DO_ASSESSMENT:
      return {
        ...state,
        loadingAssess: action.loading
      };
    case DO_ASSESSMENT_SUCCESS:
      return {
        ...state,
        loadingAssess: action.loading,
        statusAssess: action.status,
        messageAssess: action.message
      };
    case DO_ASSESSMENT_FAILED:
      return {
        ...state,
        loadingAssess: action.loading,
        statusAssess: action.status,
        messageAssess: action.message
      };
    case GET_VALUES:
      return {
        ...state,
        loadingValues: action.loading
      };
    case GET_VALUES_SUCCESS:
      return {
        ...state,
        loadingValues: action.loading,
        statusValues: action.status,
        messageValues: action.message,
        dataValues: action.data.values
      };
    case GET_VALUES_FAILED:
      return {
        ...state,
        loadingValues: action.loading,
        statusValues: action.status,
        messageValues: action.message
      };
    case SAVE_VALUES:
      return {
        ...state,
        loadingSaveValues: action.loading
      };
    case SAVE_VALUES_SUCCESS:
      return {
        ...state,
        loadingSaveValues: action.loading,
        statusSaveValues: action.status,
        messageSaveValues: action.message
      };
    case SAVE_VALUES_FAILED:
      return {
        ...state,
        loadingSaveValues: action.loading,
        statusSaveValues: action.status,
        messageSaveValues: action.message
      };
    case GET_RATING:
      return {
        ...state,
        loading: action.loading,
        dataRating: []
      };
    case GET_RATING_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        status: action.status,
        message: action.message,
        dataRating: action.data.ratings
      };
    case GET_RATING_FAILED:
      return {
        ...state,
        loading: action.loading,
        status: action.status,
        message: action.message,
        dataRating: []
      };
    case ATTACHMENT_FILE:
      return {
        ...state,
        loadingAttach: action.loading
      };
    case ATTACHMENT_FILE_SUCCESS:
      return {
        ...state,
        loadingAttach: action.loading,
        statusAttach: action.status,
        messageAttach: action.message
      };
    case ATTACHMENT_FILE_FAILED:
      return {
        ...state,
        loadingAttach: action.loading,
        statusAttach: action.status,
        messageAttach: action.message
      };
    case DELETE_FILE:
      return {
        ...state,
        loadingDeleteFile: action.loading
      };
    case DELETE_FILE_SUCCESS:
      return {
        ...state,
        loadingDeleteFile: action.loading,
        statusDeleteFile: action.status,
        messageDeleteFile: action.message
      };
    case DELETE_FILE_FAILED:
      return {
        ...state,
        loadingDeleteFile: action.loading,
        statusDeleteFile: action.status,
        messageDeleteFile: action.message
      };
    case GET_KPI_RATING:
      return {
        ...state,
        loadingKpiRating: action.loading,
        dataKpiRating: {}
      };
    case GET_KPI_RATING_SUCCESS:
      return {
        ...state,
        loadingKpiRating: action.loading,
        statusKpiRating: action.status,
        messageKpiRating: action.message,
        dataKpiRating: action.data
      };
    case GET_KPI_RATING_FAILED:
      return {
        ...state,
        loadingKpiRating: action.loading,
        statusKpiRating: action.status,
        messageKpiRating: action.message,
        dataKpiRating: {}
      };
    default:
      return { ...state };
  }
};

export default kpiReducers;
