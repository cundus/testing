import {
  SAVE_KPI,
  SAVE_KPI_SUCCESS,
  SAVE_KPI_FAILED
} from '../../action.type';

const initialState = {
  loading: false,
  status: NaN,
  statusMessage: ''
};

const kpiReducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_KPI:
      return {
        ...state,
        loading: action.loading
      };
    case SAVE_KPI_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        status: action.status,
        statusMessage: action.message
      };
    case SAVE_KPI_FAILED:
      return {
        ...state,
        loading: action.loading,
        status: action.status,
        statusMessage: action.message
      };
    default:
      return { ...state };
  }
};

export default kpiReducers;
