import {
  getActivityThread as getActivityThreadAction,
  getActivityStatus as getActivityStatusAction,
  getActivityThreadChat as getActivityThreadChatAction,
  createActivitychat as createActivitychatAction,
  createActivity as createActivityAction,
  updateActivity as updateActivityAction
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
  errGetActivityChat,
  doFeedbackComment,
  successFeedbackComment,
  errFeedbackComment
} from '../action.type';

import { Success } from '../status-code-type';


export const createActivity = (data) => {
  return async (dispatch) => {
    dispatch({
      type: getActivity,
      data: {
        loadingActivity: true
      }
    });
    try {
      const resp = await createActivityAction(data);
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

export const updateActivity = (data) => {
  return async (dispatch) => {
    dispatch({
      type: getActivity,
      data: {
        loadingActivity: true
      }
    });
    try {
      const resp = await updateActivityAction(data);
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


export const createChat = (data) => {
  return async (dispatch) => {
    dispatch({
      type: doFeedbackComment,
      data: {
        loadingActivity: true
      }
    });
    try {
      const resp = await createActivitychatAction(data);
      if (resp.data.status_code !== Success) {
        dispatch({
          type: errFeedbackComment,
          data: {
            error: true,
            loadingActivity: false
          }
        });
      }
      dispatch({
        type: successFeedbackComment,
        data: Object.assign(resp.data.result, {
          loadingActivity: false
        })
      });
    } catch (error) {
      dispatch({
        type: errFeedbackComment,
        data: {
          error: true,
          errorCode: error.status_code,
          loadingActivity: false
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
        loadingActivityChat: true
      }
    });
    try {
      const resp = await getActivityThreadChatAction(idActivity, chatId);
      if (resp.data.status_code !== Success) {
        dispatch({
          type: errGetActivityChat,
          data: {
            error: true,
            loadingActivityChat: false
          }
        });
      }
      dispatch({
        type: successGetActivityChat,
        data: Object.assign(resp.data.result, {
          loadingActivityChat: false
        })
      });
    } catch (error) {
      dispatch({
        type: errGetActivityChat,
        data: {
          error: true,
          errorCode: error.status_code,
          loadingActivityChat: false
        }
      });
    }
  };
};
