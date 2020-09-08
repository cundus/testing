import {
  LOGIN_BY_AD_TOKEN,
  GET_USER_SUCCESS,
  LOGIN_BY_AD_TOKEN_SUCCESS,
  LOGIN_BY_AD_TOKEN_FAILED
} from '../../action.type';
import { loginByADToken } from '../../../service/auth';
import { SUCCESS } from '../../status-code-type';

const actionLoginByADToken = (ADToken) => async (dispatch) => {
  dispatch({
    type: LOGIN_BY_AD_TOKEN,
    loadingLogin: true,
    statusLoginCode: null,
    statusLoginDesc: null
  });
  try {
    const payload = await loginByADToken(ADToken);
    if (payload?.data?.status_code === SUCCESS) {
      if (payload?.data?.result) {
        const result = payload?.data?.result;
        await localStorage.setItem('sfToken', result?.accessToken);
        dispatch({
          type: LOGIN_BY_AD_TOKEN_SUCCESS,
          statusLoginCode: payload?.data?.status_code,
          statusLoginDesc: payload?.data?.status_description,
          loadingLogin: false
        });
        dispatch({
          type: GET_USER_SUCCESS,
          data: result?.user
        });
      } else {
        dispatch({
          type: LOGIN_BY_AD_TOKEN_FAILED,
          loadingLogin: false,
          statusLoginCode: 9999,
          statusLoginDesc: 'Internal server error'
        });
      }
    } else {
      dispatch({
        type: LOGIN_BY_AD_TOKEN_FAILED,
        loadingLogin: false,
        statusLoginCode: payload?.data?.status_code,
        statusLoginDesc: payload?.data?.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error?.response?.data) {
      dispatch({
        type: LOGIN_BY_AD_TOKEN_FAILED,
        loadingLogin: false,
        statusLoginCode: error?.data?.status,
        statusLoginDesc: error?.data?.error,
        error
      });
    } else {
      dispatch({
        type: LOGIN_BY_AD_TOKEN_FAILED,
        loadingLogin: false,
        statusLoginCode: null,
        statusLoginDesc: 'Something wrong',
        error
      });
    }
  }
};

export default actionLoginByADToken;
