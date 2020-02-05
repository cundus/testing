import {
  SAVE_KPI,
  SAVE_KPI_SUCCESS,
  SAVE_KPI_FAILED
} from '../../action.type';
import { Success } from '../../status-code-type';
import { saveKpi } from '../../../service/kpiPlanning';

export const actionSaveKpi = (data, id) => async (dispatch) => {
  dispatch({
    type: SAVE_KPI,
    loading: true,
    status: null,
    message: null
  });
  try {
    const payload = await saveKpi(data, id);
    if (payload.data.status_code === Success) {
      dispatch({
        type: SAVE_KPI_SUCCESS,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: SAVE_KPI_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: SAVE_KPI_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: SAVE_KPI_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};
