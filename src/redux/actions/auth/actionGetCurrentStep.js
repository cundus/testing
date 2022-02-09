import { GET_CURRENT_STEP, GET_CURRENT_STEP_SUCCESS, GET_CURRENT_STEP_FAILED } from '../../action.type';
import { getCurrentStep } from '../../../service/auth';
import { SUCCESS } from '../../status-code-type';

const actionGetCurrStep = () => async (dispatch) => {
  dispatch({
    type: GET_CURRENT_STEP,
    loadingGetCurrStep: true,
    statusGetCurrStepCode: null,
    statusGetCurrStepDesc: null
  });
  try {
    const payload = await getCurrentStep();
    if (payload?.data?.status_code === SUCCESS) {
      if (payload?.data?.result) {
        dispatch({
          type: GET_CURRENT_STEP_SUCCESS,
          statusGetCurrStepCode: payload?.data?.status_code,
          statusGetCurrStepDesc: payload?.data?.status_description,
          loadingGetCurrStep: false,
          ...payload?.data?.result
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
