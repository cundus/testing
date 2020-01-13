import {
  getActivityThread as getActivityThreadAction,
  getACtivityStatus as getACtivityStatusACtion
} from '../../service/monitoring/activity';

import {
  getActivity,
  errGetActivity,
  successGetActivity,
  getStatusActivity,
  errGetStatusActivity,
  successGetStatusActivity
} from '../action.type';

import { Success } from '../status-code-type';

export const getListActivity = (idActivity) => {
  return async (dispatch) => {
    dispatch({
      type: getActivity,
      data: {
        loadingActivity: true
      }
    });
    try {
      const resp = await getActivityThreadAction(idActivity);
      if (resp.data.status_code !== Success) {
        dispatch({
          type: errGetActivity,
          data: {
            error: true,
            loadingActivity: false
          }
        });
      }
      dispatch({
        type: successGetActivity,
        data: Object.assign(resp.data.result, {
          loadingActivity: false
        })
      });
    } catch (error) {
      dispatch({
        type: errGetActivity,
        data: {
          error: true,
          errorCode: error.status_code,
          loadingActivity: false
        }
      });
    }
  };
};

export const getActivityStatus = () => {
  return async (dispatch) => {
    dispatch({
      type: getStatusActivity,
      data: {
        loadingStatusActivity: true
      }
    });
    try {
      const resp = await getACtivityStatusACtion();
      if (resp.data.status_code !== Success) {
        dispatch({
          type: errGetStatusActivity,
          data: {
            error: true,
            loadingStatusActivity: false
          }
        });
      }
      dispatch({
        type: successGetStatusActivity,
        data: Object.assign(resp.data.result, {
          loadingStatusActivity: false
        })
      });
    } catch (error) {
      dispatch({
        type: errGetStatusActivity,
        data: {
          error: true,
          errorCode: error.status_code,
          loadingStatusActivity: false
        }
      });
    }
  };
};
