import { GET_CURRENT_STEP, GET_CURRENT_STEP_SUCCESS, GET_CURRENT_STEP_FAILED } from '../../action.type';
import { getCurrentStep } from '../../../service/auth';
import { SUCCESS } from '../../status-code-type';

const actionGetCurrStep = (ADToken) => async (dispatch) => {
  const init = JSON.parse(localStorage.getItem("currStep") || JSON.stringify({
    loadingGetCurrStep: true,
    statusGetCurrStepCode: null,
    statusGetCurrStepDesc: null
  }))
  dispatch({
    type: GET_CURRENT_STEP,
    ...init
  });
  try {
    const payload = await getCurrentStep(ADToken);
    if (payload?.data?.status_code === SUCCESS) {
      if (payload?.data?.result) {
        const success = {
          statusGetCurrStepCode: payload?.data?.status_code,
          statusGetCurrStepDesc: payload?.data?.status_description,
          loadingGetCurrStep: false,
          ...payload?.data?.result
        }
        localStorage.setItem("currStep", JSON.stringify(success))
        dispatch({
          type: GET_CURRENT_STEP_SUCCESS,
          ...success
        });
      } else {
        dispatch({
          type: GET_CURRENT_STEP_FAILED,
          loadingGetCurrStep: false,
          statusGetCurrStepCode: 9999,
          statusGetCurrStepDesc: 'Internal server error'
        });
      }
    } else {
      dispatch({
        type: GET_CURRENT_STEP_FAILED,
        loadingGetCurrStep: false,
        statusGetCurrStepCode: payload?.data?.status_code,
        statusGetCurrStepDesc: payload?.data?.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error?.response?.data) {
      dispatch({
        type: GET_CURRENT_STEP_FAILED,
        loadingGetCurrStep: false,
        statusGetCurrStepCode: error?.data?.status,
        statusGetCurrStepDesc: error?.data?.error,
        error
      });
    } else {
      dispatch({
        type: GET_CURRENT_STEP_FAILED,
        loadingGetCurrStep: false,
        statusGetCurrStepCode: null,
        statusGetCurrStepDesc: 'Something wrong',
        error
      });
    }
  }
};

export default actionGetCurrStep;
