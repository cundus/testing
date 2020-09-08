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
  GET_KPI_RATING_FAILED,
  GET_PROPOSE_RATING,
  GET_PROPOSE_RATING_SUCCESS,
  GET_PROPOSE_RATING_FAILED,
  SEND_FEEDBACK_APPRAISAL,
  SEND_FEEDBACK_APPRAISAL_SUCCESS,
  SEND_FEEDBACK_APPRAISAL_FAILED,
  APPROVE_APPRAISAL,
  APPROVE_APPRAISAL_SUCCESS,
  APPROVE_APPRAISAL_FAILED,
  TEAM_ACKNOWLEDGEMENT,
  TEAM_ACKNOWLEDGEMENT_SUCCESS,
  TEAM_ACKNOWLEDGEMENT_FAILED,
  EMP_ACKNOWLEDGEMENT,
  EMP_ACKNOWLEDGEMENT_SUCCESS,
  EMP_ACKNOWLEDGEMENT_FAILED,
  EMP_ACKNOWLEDGEMENT_LIST,
  EMP_ACKNOWLEDGEMENT_LIST_SUCCESS,
  EMP_ACKNOWLEDGEMENT_LIST_FAILED,
  GET_ATTACHMENT_FILE,
  GET_ATTACHMENT_FILE_SUCCESS,
  GET_ATTACHMENT_FILE_FAILED,
  DOWNLOAD_FILE,
  DOWNLOAD_FILE_SUCCESS,
  DOWNLOAD_FILE_FAILED,
  DO_ASSESSMENT_ALL,
  DO_ASSESSMENT_SUCCESS_ALL,
  DO_ASSESSMENT_FAILED_ALL
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
  dataKpiRating: {},
  dataProposeRating: [],
  loadingEmpAck: false,
  generalFeedback: {
    id: null,
    comment: null
  }
};

const kpiReducer = (state = initialState, action) => {
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
        dataGoal: action.data
      };
    case GET_LATEST_GOAL_KPI_FAILED:
      return {
        ...state,
        loadingGoal: action.loading
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
        challenge: action.data.challengeYourSelf,
        currentStep: action.data.currentStep,
        formStatusId: action.data.formStatusId,
        formStatusDescription: action.data.formStatusDescription,
        holderUserId: action.data.holderUserId,
        user: action.data.user
      };
    case GET_KPI_LIST_FAILED:
      return {
        ...state,
        loadingKpi: action.loading,
        status: action.status,
        dataKpi: [],
        dataKpiMetrics: [],
        generalFeedback: '',
        challenge: '',
        currentStep: '',
        formStatusId: '',
        formStatusDescription: '',
        holderUserId: '',
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
        dataKpiManagerMetrics: action.data.labelList || []
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
        loadingAssessOne: action.loading
      };
    case DO_ASSESSMENT_SUCCESS:
      return {
        ...state,
        loadingAssessOne: action.loading,
        statusAssessOne: action.status,
        messageAssessOne: action.message,
        dataAssessOne: action.data
      };
    case DO_ASSESSMENT_FAILED:
      return {
        ...state,
        loadingAssessOne: action.loading,
        statusAssessOne: action.status,
        messageAssessOne: action.message
      };
    case DO_ASSESSMENT_ALL:
      return {
        ...state,
        loadingAssess: action.loading
      };
    case DO_ASSESSMENT_SUCCESS_ALL:
      return {
        ...state,
        loadingAssess: action.loading,
        statusAssess: action.status,
        messageAssess: action.message
      };
    case DO_ASSESSMENT_FAILED_ALL:
      return {
        ...state,
        loadingAssess: action.loading,
        statusAssess: action.status,
        messageAssess: action.message
      };
    case GET_VALUES:
      return {
        ...state,
        loadingValues: action.loading,
        dataValues: []
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
        messageValues: action.message,
        dataValues: []
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
        dataRating: action.data.ratings
      };
    case GET_RATING_FAILED:
      return {
        ...state,
        loading: action.loading,
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
    case GET_PROPOSE_RATING:
      return {
        ...state,
        loadingProposeRating: action.loading,
        dataProposeRating: []
      };
    case GET_PROPOSE_RATING_SUCCESS:
      return {
        ...state,
        loadingProposeRating: action.loading,
        statusProposeRating: action.status,
        messageProposeRating: action.message,
        dataProposeRating: action.data
      };
    case GET_PROPOSE_RATING_FAILED:
      return {
        ...state,
        loadingProposeRating: action.loading,
        statusProposeRating: action.status,
        messageProposeRating: action.message,
        dataProposeRating: []
      };
    case SEND_FEEDBACK_APPRAISAL:
      return {
        ...state,
        loadingSendBackAppraisal: action.loading,
        dataSendBackAppraisal: null
      };
    case SEND_FEEDBACK_APPRAISAL_SUCCESS:
      return {
        ...state,
        loadingSendBackAppraisal: action.loading,
        statusSendBackAppraisal: action.status,
        messageSendBackAppraisal: action.message,
        dataSendBackAppraisal: action.data
      };
    case SEND_FEEDBACK_APPRAISAL_FAILED:
      return {
        ...state,
        loadingSendBackAppraisal: action.loading,
        statusSendBackAppraisal: action.status,
        messageSendBackAppraisal: action.message,
        dataSendBackAppraisal: null
      };
    case APPROVE_APPRAISAL:
      return {
        ...state,
        loadingApproveAppraisal: action.loading,
        dataApproveAppraisal: null
      };
    case APPROVE_APPRAISAL_SUCCESS:
      return {
        ...state,
        loadingApproveAppraisal: action.loading,
        statusApproveAppraisal: action.status,
        messageApproveAppraisal: action.message,
        dataApproveAppraisal: action.data
      };
    case APPROVE_APPRAISAL_FAILED:
      return {
        ...state,
        loadingApproveAppraisal: action.loading,
        statusApproveAppraisal: action.status,
        messageApproveAppraisal: action.message,
        dataApproveAppraisal: null
      };
    case TEAM_ACKNOWLEDGEMENT:
      return {
        ...state,
        loadingTeamAck: action.loading,
        dataTeamAck: null
      };
    case TEAM_ACKNOWLEDGEMENT_SUCCESS:
      return {
        ...state,
        loadingTeamAck: action.loading,
        statusTeamAck: action.status,
        messageTeamAck: action.message,
        dataTeamAck: action.data
      };
    case TEAM_ACKNOWLEDGEMENT_FAILED:
      return {
        ...state,
        loadingTeamAck: action.loading,
        statusTeamAck: action.status,
        messageTeamAck: action.message,
        dataTeamAck: null
      };
    case EMP_ACKNOWLEDGEMENT:
      return {
        ...state,
        loadingEmpAck: action.loading,
        dataEmpAck: null
      };
    case EMP_ACKNOWLEDGEMENT_SUCCESS:
      return {
        ...state,
        loadingEmpAck: action.loading,
        statusEmpAck: action.status,
        messageEmpAck: action.message,
        dataEmpAck: action.data
      };
    case EMP_ACKNOWLEDGEMENT_FAILED:
      return {
        ...state,
        loadingEmpAck: action.loading,
        statusEmpAck: action.status,
        messageEmpAck: action.message,
        dataEmpAck: null
      };
    case EMP_ACKNOWLEDGEMENT_LIST:
      return {
        ...state,
        loadingEmpAckList: action.loading,
        dataEmpAckList: {
          name: '',
          list: []
        }
      };
    case EMP_ACKNOWLEDGEMENT_LIST_SUCCESS:
      return {
        ...state,
        loadingEmpAckList: action.loading,
        statusEmpAckList: action.status,
        messageEmpAckList: action.message,
        dataEmpAckList: action.data
      };
    case EMP_ACKNOWLEDGEMENT_LIST_FAILED:
      return {
        ...state,
        loadingEmpAckList: action.loading,
        statusEmpAckList: action.status,
        messageEmpAckList: action.message,
        dataEmpAckList: {
          name: '',
          list: []
        }
      };
    case GET_ATTACHMENT_FILE:
      return {
        ...state,
        loadingAttachment: action.loading,
        dataAttachment: []
      };
    case GET_ATTACHMENT_FILE_SUCCESS:
      return {
        ...state,
        loadingAttachment: action.loading,
        statusAttachment: action.status,
        messageAttachment: action.message,
        dataAttachment: action.data
      };
    case GET_ATTACHMENT_FILE_FAILED:
      return {
        ...state,
        loadingAttachment: action.loading,
        statusAttachment: action.status,
        messageAttachment: action.message,
        dataAttachment: []
      };
    case DOWNLOAD_FILE:
      return {
        ...state,
        loadingDownload: action.loading,
        dataDownload: []
      };
    case DOWNLOAD_FILE_SUCCESS:
      return {
        ...state,
        loadingDownload: action.loading,
        statusDownload: action.status,
        messageDownload: action.message,
        dataDownload: action.data
      };
    case DOWNLOAD_FILE_FAILED:
      return {
        ...state,
        loadingDownload: action.loading,
        statusDownload: action.status,
        messageDownload: action.message,
        dataDownload: []
      };
    default:
      return { ...state };
  }
};

export default kpiReducer;
