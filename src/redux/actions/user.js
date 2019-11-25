import {
  getUserInfo as getUserInfoAction,
  getMyTeam as getMyTeamAction,
  getMyKPI as getMyKPIAction,
} from '../../service/auth/index';

import { Success } from '../status-code-type';

import { getUserInfo, errGetUserInfo, errGetMyTeam, getMyTeam, startGetMyTeam } from '../action.type';
import _ from  'lodash';

export const GetInfoUser = (token) => {
  return async (dispatch) => {
    try {
      const resp = await getUserInfoAction(token);
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


export const GetMyTeamKPI = (idUser) => {
  return async (dispatch) => {
    dispatch({
      type: startGetMyTeam,
      data: []
    });
    try {
      const resp = await getMyTeamAction(idUser);
      if (resp.status_code !== Success) {
        dispatch({
          type: errGetMyTeam,
          data: []
        });
      }
      let arayTeam = resp.data.result;
      arayTeam = await Promise.all(arayTeam.map( async (myT) => {
        const Team = myT;
        let Kpi = await getMyKPIAction(myT.userId);
        Kpi = Kpi.data.result;
        Team.title = _.get(Kpi, 'kpiTitle', 'none');
        Team.score = _.get(Kpi, 'kpiScore', '-');
        Team.ratting = _.get(Kpi, 'kpiRating', '-');
        Team.status = _.get(Kpi, 'userStatus', '-');
        Team.result = _.get(Kpi, 'nonKpiresult', '-');
        Team.Key = _.get(Kpi, 'userId', '-');
        return Team;
      }));

      resp.data.result = arayTeam;
      dispatch({
        type: getMyTeam,
        data: resp.data
      });
    } catch (error) {
      dispatch({
        type: errGetMyTeam,
        data: []
      });
    }
  };
};
