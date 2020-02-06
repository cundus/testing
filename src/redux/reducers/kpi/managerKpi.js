import {
  GET_KPI_MANAGER_LIST,
  GET_KPI_MANAGER_LIST_SUCCESS,
  GET_KPI_MANAGER_LIST_FAILED
} from '../../action.type';

const initialState = {
  loading: false,
  status: null,
  message: '',
  dataFirstManager: null,
  dataSecondManager: null,
  dataKpiManagerMetrics: []
};

const kpiReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_KPI_MANAGER_LIST:
      return {
        ...state,
        loading: action.loading
      };
    case GET_KPI_MANAGER_LIST_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        status: action.status,
        message: action.message,
        dataFirstManager: action.data.firstManager,
        dataSecondManager: action.data.secondManager,
        dataKpiManagerMetrics: action.data.labelList || []
      };
    case GET_KPI_MANAGER_LIST_FAILED:
      return {
        ...state,
        loading: action.loading,
        status: action.status,
        message: action.message,
        dataFirstManager: null,
        dataSecondManager: null,
        dataKpiManagerMetrics: []
      };
    default:
      return { ...state };
  }
};

export default kpiReducers;
