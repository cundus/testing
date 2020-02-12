import {
  GET_LATEST_GOAL_KPI,
  GET_LATEST_GOAL_KPI_SUCCESS,
  GET_LATEST_GOAL_KPI_FAILED,
  GET_KPI_LIST,
  GET_KPI_LIST_SUCCESS,
  GET_KPI_LIST_FAILED
} from '../../action.type';

const initialState = {
  loadingGoal: false,
  statusGoal: NaN,
  messageGoal: '',
  dataGoal: {
    id: NaN,
    name: '',
    description: '',
    startDate: '',
    dueDate: '',
    parentPlanId: NaN
  },
  loadingKpi: false,
  statusKpi: NaN,
  messageKpi: '',
  dataKpi: [],
  dataKpiFiltered: [],
  dataKpiMetrics: [],
  generalFeedback: '',
  challenge: '',
  currentStep: '',
  holderUserId: '',
  user: {
    userId: '',
    userName: '',
    firstName: '',
    lastName: '',
    empId: '',
    cellPhone: null,
    email: '',
    department: '',
    location: '',
    managerId: ''
  }
};

const kpiReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_LATEST_GOAL_KPI:
      return {
        ...state,
        loadingGoal: action.loading
      };
    case GET_LATEST_GOAL_KPI_SUCCESS:
      return {
        ...state,
        loadingGoal: action.loading,
        statusGoal: action.status,
        messageGoal: action.message,
        dataGoal: action.data
      };
    case GET_LATEST_GOAL_KPI_FAILED:
      return {
        ...state,
        loadingGoal: action.loading,
        statusGoal: action.status,
        messageGoal: action.message
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
        statusKpi: action.status,
        messageKpi: action.message,
        dataKpi: action.data.kpiList,
        dataKpiMetrics: action.data.labelList,
        generalFeedback: action.data.challengeOthersRatingComments,
        challenge: action.data.challengeYourSelf,
        currentStep: action.data.currentStep,
        holderUserId: action.data.holderUserId,
        user: action.data.user,
        dataKpiFiltered: action.dataKpi
      };
    case GET_KPI_LIST_FAILED:
      return {
        ...state,
        loadingKpi: action.loading,
        statusKpi: action.status,
        messageKpi: action.message
      };
    default:
      return { ...state };
  }
};

export default kpiReducers;
