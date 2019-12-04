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
  GET_KPI_MANAGER_LIST_FAILED
} from '../action.type';

const initialState = {
  loadingGoal: false,
  loadingKpi: false,
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
  messageSaveKPI: '',
  loadingManagerKpi: false,
  statusManagerKpi: null,
  messageManagerKpi: '',
  dataFirstManager: {
    firstName: null,
    lastName: null,
    cellPhone: null,
    email: null,
    empId: null,
    manager: false,
    managerId: null,
    userId: null,
    userName: null
  },
  dataSecondManager: {
    firstName: null,
    lastName: null,
    cellPhone: null,
    email: null,
    empId: null,
    manager: false,
    managerId: null,
    userId: null,
    userName: null
  },
  dataFirstManagerKpi: [],
  dataSecondManagerKpi: []
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
        dataKpi: action.data
      };
    case GET_KPI_LIST_FAILED:
      return {
        ...state,
        loadingKpi: action.loading,
        status: action.status,
        message: action.message
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
        dataFirstManager: {
          firstName: action.data.firstManager.manager.firstName,
          lastName: action.data.firstManager.manager.lastName,
          cellPhone: action.data.firstManager.manager.cellPhone,
          email: action.data.firstManager.manager.email,
          empId: action.data.firstManager.manager.empId,
          manager: action.data.firstManager.manager.manager,
          managerId: action.data.firstManager.manager.managerId,
          userId: action.data.firstManager.manager.userId,
          userName: action.data.firstManager.manager.userName
        },
        dataSecondManager: {
          firstName: action.data.secondManager.manager.firstName,
          lastName: action.data.secondManager.manager.lastName,
          cellPhone: action.data.secondManager.manager.cellPhone,
          email: action.data.secondManager.manager.email,
          empId: action.data.secondManager.manager.empId,
          manager: action.data.secondManager.manager.manager,
          managerId: action.data.secondManager.manager.managerId,
          userId: action.data.secondManager.manager.userId,
          userName: action.data.secondManager.manager.userName
        },
        dataFirstManagerKpi: action.data.firstManager.kpi,
        dataSecondManagerKpi: action.data.secondManager.kpi
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
    default:
      return { ...state };
  }
};

export default kpiReducers;
