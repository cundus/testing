import { getUserInfo as getUserInfoAction } from  '../../service/auth/index';
import {getUserInfo, errGetUserInfo } from '../action.type';

export const GetInfoUser = (token) => {
  return async (dispatch) => {
    try {
      const resp = await getUserInfoAction(token);
      console.log(resp);
      dispatch({
        type: getUserInfo,
        data: resp.data
      });
    } catch (error) {
      dispatch({
        type: errGetUserInfo,
        data: error
      });
    }
  };
};
