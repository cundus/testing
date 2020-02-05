import {
  SUBMIT_KPI_PLANNING,
  SUBMIT_KPI_PLANNING_SUCCESS,
  SUBMIT_KPI_PLANNING_FAILED
} from '../../action.type';

const initialState = {
  loading: false,
  status: NaN,
  message: ''
};

const kpiReducers = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_KPI_PLANNING:
      return {
        ...state,
        loading: action.loading
      };
    case SUBMIT_KPI_PLANNING_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        status: action.status,
        message: action.message
      };
    case SUBMIT_KPI_PLANNING_FAILED:
      return {
        ...state,
        loading: action.loading,
        status: action.status,
        message: action.message
      };
    default:
      return { ...state };
  }
};

export default kpiReducers;
