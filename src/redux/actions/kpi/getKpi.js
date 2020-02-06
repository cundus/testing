import {
  GET_KPI_LIST,
  GET_KPI_LIST_SUCCESS,
  GET_KPI_LIST_FAILED,
  GET_LATEST_GOAL_KPI,
  GET_LATEST_GOAL_KPI_SUCCESS,
  GET_LATEST_GOAL_KPI_FAILED,
  GET_KPI_MANAGER_LIST,
  GET_KPI_MANAGER_LIST_SUCCESS,
  GET_KPI_MANAGER_LIST_FAILED
} from '../../action.type';
import { Success } from '../../status-code-type';
import { getKpiList, getLatestGoalKpi, getKpiManagerList } from '../../../service/kpiPlanning';

export const actionGetKPI = (id) => async (dispatch) => {
  dispatch({
    type: GET_KPI_LIST,
    loading: true,
    status: null,
    message: null,
    data: []
  });
  try {
    const payload = await getKpiList(id);
    if (payload?.data?.status_code === Success) {
      if (payload?.data?.result) {
        dispatch({
          type: GET_KPI_LIST_SUCCESS,
          loading: false,
          status: payload?.data?.status_code,
          message: payload?.data?.status_description,
          data: payload?.data?.result
        });
      } else {
        dispatch({
          type: GET_KPI_LIST_FAILED,
          loading: false,
          status: 9999,
          message: 'Internal server error',
          error: payload
        });
      }
    } else {
      dispatch({
        type: GET_KPI_LIST_FAILED,
        loading: false,
        status: payload?.data?.status_code,
        message: payload?.data?.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error?.response?.data) {
      dispatch({
        type: GET_KPI_LIST_FAILED,
        loading: false,
        status: error?.response?.data?.status,
        message: error?.response?.data?.error,
        error
      });
    } else {
      dispatch({
        type: GET_KPI_LIST_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const actionGetLatestGoalKPI = () => async (dispatch) => {
  dispatch({
    type: GET_LATEST_GOAL_KPI,
    loading: true,
    status: null,
    message: null,
    data: {}
  });
  try {
    const payload = await getLatestGoalKpi();
    if (payload?.data?.status_code === Success) {
      dispatch({
        type: GET_LATEST_GOAL_KPI_SUCCESS,
        loading: false,
        status: payload?.data?.status_code,
        message: payload?.data?.status_description,
        data: payload?.data?.result
      });
    } else {
      dispatch({
        type: GET_LATEST_GOAL_KPI_FAILED,
        loading: false,
        status: payload?.data?.status_code,
        message: payload?.data?.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error?.response?.data) {
      dispatch({
        type: GET_LATEST_GOAL_KPI_FAILED,
        loading: false,
        status: error?.response?.data?.status,
        message: error?.response?.data?.error,
        error
      });
    } else {
      dispatch({
        type: GET_LATEST_GOAL_KPI_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const actionGetManagerKPI = (id) => async (dispatch) => {
  dispatch({
    type: GET_KPI_MANAGER_LIST,
    loading: true,
    status: null,
    message: null,
    data: {}
  });
  try {
    const payload = await getKpiManagerList(id);
    if (payload?.data?.status_code === Success) {
      if (payload?.data?.result) {
        dispatch({
          type: GET_KPI_MANAGER_LIST_SUCCESS,
          loading: false,
          status: payload?.data?.status_code,
          message: payload?.data?.status_description,
          data: payload?.data?.result
        });
      } else {
        dispatch({
          type: GET_KPI_MANAGER_LIST_FAILED,
          loading: false,
          status: payload?.data?.status_code,
          message: payload?.data?.status_description,
          error: payload
        });
      }
    } else {
      dispatch({
        type: GET_KPI_MANAGER_LIST_FAILED,
        loading: false,
        status: payload?.data?.status_code,
        message: payload?.data?.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error?.response?.data) {
      dispatch({
        type: GET_KPI_MANAGER_LIST_FAILED,
        loading: false,
        status: error?.response?.data?.status,
        message: error?.response?.data?.error,
        error
      });
    } else {
      dispatch({
        type: GET_KPI_MANAGER_LIST_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};
