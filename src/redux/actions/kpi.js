import {
  SAVE_KPI,
  SAVE_KPI_SUCCESS,
  SAVE_KPI_FAILED,
  GET_LATEST_GOAL_KPI,
  GET_LATEST_GOAL_KPI_SUCCESS,
  GET_LATEST_GOAL_KPI_FAILED,
  GET_KPI_LIST,
  GET_KPI_LIST_SUCCESS,
  GET_KPI_LIST_FAILED,
  GET_KPI_MANAGER_LIST,
  GET_KPI_MANAGER_LIST_SUCCESS,
  GET_KPI_MANAGER_LIST_FAILED
} from '../action.type';

import {
  Success
} from '../status-code-type';

import {
  getLatestGoalKpi, getKpiList, saveKpi, getKpiManagerList
 } from '../../service/kpiPlanning';

export const doGetLatestGoalKpi = () => async (dispatch) => {
  dispatch({
    type: GET_LATEST_GOAL_KPI,
    loading: true,
    status: null,
    message: null,
    data: {}
  });
  try {
    const payload = await getLatestGoalKpi();
    if (payload.data.status_code === Success) {
      dispatch({
        type: GET_LATEST_GOAL_KPI_SUCCESS,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        data: payload.data.result
      });
    } else {
      dispatch({
        type: GET_LATEST_GOAL_KPI_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: GET_LATEST_GOAL_KPI_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: GET_LATEST_GOAL_KPI_FAILED,
        loading: false,
        status: null,
        message: 'Something went wrong',
        error
      });
    }
  }
};

export const doSaveKpi = (data, id) => async (dispatch) => {
  dispatch({
    type: SAVE_KPI,
    loading: true,
    status: null,
    message: null
  });
  try {
    const payload = await saveKpi(data, id);
    if (payload.data.status_code === Success) {
      dispatch({
        type: SAVE_KPI_SUCCESS,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: SAVE_KPI_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: SAVE_KPI_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: SAVE_KPI_FAILED,
        loading: false,
        status: null,
        message: 'Something went wrong',
        error
      });
    }
  }
};

export const doGetKpiList = (id) => async (dispatch) => {
  dispatch({
    type: GET_KPI_LIST,
    loading: true,
    status: null,
    message: null,
    data: [],
    page: ''
  });
  try {
    const payload = await getKpiList(id);
    if (payload.data.status_code === Success) {
      dispatch({
        type: GET_KPI_LIST_SUCCESS,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        data: payload.data.result
      });
    } else {
      dispatch({
        type: GET_KPI_LIST_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: GET_KPI_LIST_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: GET_KPI_LIST_FAILED,
        loading: false,
        status: null,
        message: 'Something went wrong',
        error
      });
    }
  }
};

export const doGetKpiManagerList = (id) => async (dispatch) => {
  dispatch({
    type: GET_KPI_MANAGER_LIST,
    loading: true,
    status: null,
    message: null,
    data: [],
    page: ''
  });
  try {
    const payload = await getKpiManagerList(id);
    if (payload.data.status_code === Success) {
      dispatch({
        type: GET_KPI_MANAGER_LIST_SUCCESS,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        data: payload.data.result
      });
    } else {
      dispatch({
        type: GET_KPI_MANAGER_LIST_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: GET_KPI_MANAGER_LIST_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: GET_KPI_MANAGER_LIST_FAILED,
        loading: false,
        status: null,
        message: 'Something went wrong',
        error
      });
    }
  }
};
