import {
  SUBMIT_KPI_PLANNING,
  SUBMIT_KPI_PLANNING_SUCCESS,
  SUBMIT_KPI_PLANNING_FAILED
} from '../../action.type';
import { Success } from '../../status-code-type';
import { saveKpi, submitNext } from '../../../service/kpiPlanning';

export const actionSubmitKpi = (data, id) => async (dispatch) => {
  dispatch({
    type: SUBMIT_KPI_PLANNING,
    loading: true,
    status: null,
    message: null
  });
  try {
    const payloadSave = await saveKpi(data, id);
    const payloadSubmit = await submitNext(id);
    if (payloadSave.data.status_code === Success) {
      if (payloadSubmit.data.status_code === Success && !payloadSubmit.data.status_description.includes('Failed')) {
        dispatch({
          type: SUBMIT_KPI_PLANNING_SUCCESS,
          loading: false,
          status: payloadSubmit.data.status_code,
          message: payloadSubmit.data.status_description,
          payloadSave: payloadSave.data,
          payloadSubmit: payloadSubmit.data
        });
      } else {
        dispatch({
          type: SUBMIT_KPI_PLANNING_FAILED,
          loading: false,
          status: payloadSubmit.data.status_description.includes('Failed') ? 11111 : payloadSubmit.data.status_code,
          message: payloadSubmit.data.status_description,
          error: payloadSubmit.data
        });
      }
    } else {
      dispatch({
        type: SUBMIT_KPI_PLANNING_FAILED,
        loading: false,
        status: payloadSave.data.status_code,
        message: payloadSave.data.status_description,
        error: payloadSave
      });
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: SUBMIT_KPI_PLANNING_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: SUBMIT_KPI_PLANNING_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};
