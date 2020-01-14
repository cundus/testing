import {
  getAchivementThread as getAchivementThreadAction
} from '../../service/monitoring/achivement';

import {
  getAchievementThread,
  errAchievementThread,
  successAchievementThread
} from '../action.type';

import { Success } from '../status-code-type';

export const getListAchivement = (idAchivement) => {
  return async (dispatch) => {
    dispatch({
      type: getAchievementThread,
      data: {
        loadingAchivement: true
      }
    });
    try {
      const resp = await getAchivementThreadAction(idAchivement);
      if (resp.data.status_code !== Success) {
        dispatch({
          type: errAchievementThread,
          data: {
            error: true,
            loadingActivity: false
          }
        });
      }
      dispatch({
        type: successAchievementThread,
        data: Object.assign(resp.data.result, {
          loadingActivity: false
        })
      });
    } catch (error) {
      dispatch({
        type: errAchievementThread,
        data: {
          error: true,
          errorCode: error.status_code,
          loadingActivity: false
        }
      });
    }
  };
};
