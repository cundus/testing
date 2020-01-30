import _ from 'lodash';
import {
  getUserInfo as getUserInfoAction,
  getMyTeam as getMyTeamAction,
  getMyKPI as getMyKPIAction,
  getMyTeamDetailKPI as getMyTeamDetailKPIAction,
  getMyTeamMonitoring as getMyTeamMonitoringAction,
  getMyTeamApraisal as getMyTeamApraisalAction,
  getMyTeamApraisalDetail,
  getUserDetail as getUserDetailAction,
  feedbackUserKpi as feedbackUserKpiAction,
  approveUserKpi as approveUserKpiAction,
  getKPIstate as getKPIstateAction
} from '../../service/auth/index';

import { Success } from '../status-code-type';

import {
  getUserInfo,
  errGetUserInfo,
  errGetMyTeam,
  getMyTeam,
  startGetMyTeam,
  errGetMyTeamDetail,
  getMyTeamDetail,
  startGetMyTeamDetail,
  getUserDetail,
  errUserDetail,
  startUserDetail,
  successFeedback,
  errSubmitFeedback,
  getUserKpiState,
  errGetUserKpiState,
  GET_APRAISAL_TEAM,
  GET_APRAISAL_TEAM_SUCCESS,
  GET_APRAISAL_TEAM_FAILED,
  GET_APRAISAL_TEAM_DETAIL,
  GET_APRAISAL_TEAM_DETAIL_SUCCESS,
  GET_APRAISAL_TEAM_DETAIL_FAILED
} from '../action.type';

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
        data: {
          error: true,
          errorCode: error.status_code
        }
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
        data: [{
          error: true,
          errorCode: error.response.status
        }]
      });
    }
  };
};


export const GetMyTeamKPIMonitoring = (idUser) => {
  return async (dispatch) => {
    dispatch({
      type: startGetMyTeam,
      data: []
    });
    try {
      const resp = await getMyTeamMonitoringAction(idUser);
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
        data: [{
          error: true,
          errorCode: error.status_code
        }]
      });
    }
  };
};


export const GetMyTeamKPIApraisal = (idUser) => {
  return async (dispatch) => {
    dispatch({
      type: startGetMyTeam,
      data: []
    });
    try {
      const resp = await getMyTeamApraisalAction(idUser);
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
        data: [{
          error: true,
          errorCode: error.status_code
        }]
      });
    }
  };
};


export const GetMyTeamKPIDetail = (idUser) => {
  return async (dispatch) => {
    dispatch({
      type: startGetMyTeamDetail,
      data: []
    });
    try {
      const resp = await getMyTeamDetailKPIAction(idUser);
      if (resp.status.status_code !== Success || resp.data.kpiList.result.length <= 0) {
        dispatch({
          type: errGetMyTeamDetail,
          data: [{
            error: true
          }]
        });
      }
      if (resp.data.result.kpiList.length > 0) {
        dispatch({
          type: getMyTeamDetail,
          data: resp.data.result
        });
      }
    } catch (error) {
      dispatch({
        type: errGetMyTeamDetail,
        data: [{
          error: true,
          errorCode: error.response.status
        }]
      });
    }
  };
};

export const GiveFeedbackKpi = (idUser, data) => {
  return async (dispatch) => {
    try {
      const resp = await feedbackUserKpiAction(idUser, data);
      dispatch({
        type: successFeedback,
        data: resp.data
      });
    } catch (error) {
      dispatch({
        type: errSubmitFeedback,
        data: {
          error: true,
          message: 'Sorry error to submit feedback',
          errorCode: error.response.status
        }
      });
    }
  };
};

export const ApproveKPI = (idUser, data) => {
  return async (dispatch) => {
    try {
      const resp = await approveUserKpiAction(idUser, data);
      dispatch({
        type: successFeedback,
        data: resp.data
      });
    } catch (error) {
      dispatch({
        type: errSubmitFeedback,
        data: {
          error: true,
          message: 'Sorry error to approve kpi',
          errorCode: error.response.status
        }
      });
    }
  };
};

export const GetUserDetail = (idUser) => {
  return async (dispatch) => {
    dispatch({
      type: startUserDetail,
      data: {}
    });
    try {
      const resp = await getUserDetailAction(idUser);
      if (resp.data.status_code !== Success) {
        dispatch({
          type: errUserDetail,
          data: {
            error: true
          }
        });
      }
      dispatch({
        type: getUserDetail,
        data: resp.data.result
      });
    } catch (error) {
      dispatch({
        type: errUserDetail,
        data: {
          error: true,
          errorCode: error.response.status
        }
      });
    }
  };
};

export const GetUserKpiState = () => {
  return async (dispatch) => {
    try {
      const resp = await getKPIstateAction();
      if (resp.data.status_code !== Success) {
        dispatch({
          type: errGetUserKpiState,
          data: {
            error: true
          }
        });
      }
      dispatch({
        type: getUserKpiState,
        data: resp.data.result
      });
    } catch (error) {
      dispatch({
        type: errGetUserKpiState,
        data: {
          error: true,
          errorCode: error.response.status
        }
      });
    }
  };
};


export const doGetAppraisalTeam = (idUser) => async (dispatch) => {
  dispatch({
    type: GET_APRAISAL_TEAM,
    loading: true,
    status: null,
    message: null,
    data: []
  });
  try {
    const payload = await getMyTeamApraisalAction(idUser);
    if (payload.data.status_code === Success) {
      dispatch({
        type: GET_APRAISAL_TEAM_SUCCESS,
        loading: false,
        data: payload.data.result,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: GET_APRAISAL_TEAM_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: GET_APRAISAL_TEAM_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: GET_APRAISAL_TEAM_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const doGetAppraisalTeamDetail = (idUser) => async (dispatch) => {
  dispatch({
    type: GET_APRAISAL_TEAM_DETAIL,
    loading: true,
    status: null,
    message: null,
    data: {}
  });
  try {
    const payload = await getMyTeamApraisalDetail(idUser);
    if (payload.data.status_code === Success) {
      dispatch({
        type: GET_APRAISAL_TEAM_DETAIL_SUCCESS,
        loading: false,
        data: {
          ...payload.data.result,
          id: idUser
        },
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: GET_APRAISAL_TEAM_DETAIL_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: GET_APRAISAL_TEAM_DETAIL_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: GET_APRAISAL_TEAM_DETAIL_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};
