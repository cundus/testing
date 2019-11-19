import { getUserInfo as getUserInfoAction } from '../../service/auth/index';
import { getUserInfo } from '../action.type';

export const GetInfoUser = (token) => {
  return async (dispatch) => {
    try {
      const resp = await getUserInfoAction(token);
      console.log(resp);
      dispatch({
        type: getUserInfo,
        data: resp
      });
    } catch (error) {
      console.log(error);
      console.log('err');
    }
  };
};
