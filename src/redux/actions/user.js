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
  GET_USER_INFO,
  ERR_GET_USER_INFO,
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
        type: GET_USER_INFO,
        data: resp.data
      });
    } catch (error) {
      dispatch({
        type: ERR_GET_USER_INFO,
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
      const arayTeam = resp.data.result;
      arayTeam.map(d => {
        d.title = d.kpiTitle;
        d.status = d.userStatus;
        d.Key = d.userId;
        return d
      });

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
      const arayTeam = resp.data.result;
      arayTeam.map(d => {
        d.title = d.kpiTitle;
        d.status = d.userStatus;
        d.Key = d.userId;
        return d
      });

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
        Team.title = Kpi?.kpiTitle || "none";
        Team.score = Kpi?.kpiScore || "-";
        Team.ratting =  Kpi?.kpiRating || "-";
        Team.status = Kpi?.userStatus || "-";
        Team.result = Kpi?.nonKpiresult || "-";
        Team.Key = Kpi?.userId || "-";
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
      if (resp.data.status_code === 0) {
        dispatch({
          type: getMyTeamDetail,
          data: resp.data.result
        });
      } else {
        dispatch({
          type: errGetMyTeamDetail,
          data: {
            error: true,
            errorDetail: resp.data
          }
        });
      }
    } catch (error) {
      dispatch({
        type: errGetMyTeamDetail,
        data: {
          error: true,
          errorDetail: error
        }
      });
    }
  };
};

export const GiveFeedbackKpi = (idUser, data) => {
  return async (dispatch) => {
    try {
      const payload = await feedbackUserKpiAction(idUser, data);
      if (payload?.data?.status_code === Success) {
        dispatch({
          type: successFeedback,
          loading: false,
          status: payload?.data?.status_code,
          message: payload?.data?.status_description
        });
      } else {
        dispatch({
          type: errSubmitFeedback,
          loading: false,
          status: payload?.data?.status_code,
          message: payload?.data?.status_description,
          error: payload
        });
      }
    } catch (error) {
      if (error?.response) {
        dispatch({
          type: errSubmitFeedback,
          loading: false,
          status: error?.response?.data?.status,
          message: error?.response?.data?.error,
          error
        });
      } else {
        dispatch({
          type: errSubmitFeedback,
          loading: false,
          status: null,
          message: 'Something wrong',
          error
        });
      }
    }
  }
}

export const ApproveKPI = (idUser, data) => {
  return async (dispatch) => {
    try {
      const payload = await approveUserKpiAction(idUser, data);
      if (payload?.data?.status_code === Success) {
        dispatch({
          type: successFeedback,
          loading: false,
          status: payload?.data?.status_code,
          message: payload?.data?.status_description
        });
      } else {
        dispatch({
          type: errSubmitFeedback,
          loading: false,
          status: payload?.data?.status_code,
          message: payload?.data?.status_description,
          error: payload
        });
      }
    } catch (error) {
      if (error?.response) {
        dispatch({
          type: errSubmitFeedback,
          loading: false,
          status: error?.response?.data?.status,
          message: error?.response?.data?.error,
          error
        });
      } else {
        dispatch({
          type: errSubmitFeedback,
          loading: false,
          status: null,
          message: 'Something wrong',
          error
        });
      }
    }
  }
}

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
          errorCode: error?.response?.status
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
    if (error?.response) {
      dispatch({
        type: GET_APRAISAL_TEAM_FAILED,
        loading: false,
        status: error?.response.status,
        message: error?.response.error,
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
    if (error?.response) {
      dispatch({
        type: GET_APRAISAL_TEAM_DETAIL_FAILED,
        loading: false,
        status: error?.response.status,
        message: error?.response.error,
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
