import {
  getActivityThread as getActivityThreadAction,
  getActivityStatus as getActivityStatusAction,
  getActivityThreadChat as getActivityThreadChatAction
} from '../../service/monitoring/activity';

import {
  getActivity,
  errGetActivity,
  successGetActivity,
  getStatusActivity,
  errGetStatusActivity,
  successGetStatusActivity,
  getActivityChat,
  successGetActivityChat,
  errGetActivityChat
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
      const resp = await getActivityStatusAction();
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


export const getActivityThreadChat = (idActivity, chatId) => {
  return async (dispatch) => {
    dispatch({
      type: getActivityChat,
      data: {
        loadingActivity: true
      }
    });
    try {
      const resp = await getActivityThreadChatAction(idActivity, chatId);
      if (resp.data.status_code !== Success) {
        dispatch({
          type: errGetActivityChat,
          data: {
            error: true,
            loadingActivity: false
          }
        });
      }
      dispatch({
        type: successGetActivityChat,
        data: Object.assign(resp.data.result, {
          loadingActivity: false
        })
      });
    } catch (error) {
      dispatch({
        type: errGetActivityChat,
        data: {
          error: true,
          errorCode: error.status_code,
          loadingActivity: false
        }
      });
    }
  };
};
