import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILED
} from '../action.type';
import { Success } from '../status-code-type';
import { getNotifications } from '../../service/getNotifications';

export const actionGetNotifications = () => async (dispatch) => {
  dispatch({
    type: GET_NOTIFICATIONS,
    loading: true,
    status: null,
    message: null,
    data: []
  });
  try {
    const payload = await getNotifications();
    if (payload.data.status_code === Success) {
      dispatch({
        type: GET_NOTIFICATIONS_SUCCESS,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        data: payload.data.result
      });
    } else {
      dispatch({
        type: GET_NOTIFICATIONS_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: GET_NOTIFICATIONS_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: GET_NOTIFICATIONS_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};
