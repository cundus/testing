import {
  SAVE_KPI,
  SAVE_KPI_SUCCESS,
  SAVE_KPI_FAILED,
  GET_LATEST_GOAL_KPI,
  GET_LATEST_GOAL_KPI_SUCCESS,
  GET_LATEST_GOAL_KPI_FAILED,
  GET_KPI_LIST,
  GET_KPI_LIST_SUCCESS,
  GET_KPI_LIST_FAILED
} from '../action.type';

import {
  Success,
  UNHANDLED_ERROR
} from '../status-code-type';

import { getLatestGoalKpi, getKpiList, saveKpi } from '../../service/kpiPlanning';

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
      throw payload;
    }
  } catch (error) {
    dispatch({
      type: GET_LATEST_GOAL_KPI_FAILED,
      loading: false,
      status: error,
      message: error
    });
  }
};

export const doSaveKpi = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_KPI,
    loading: true,
    status: null,
    message: null
  });
  try {
    const payload = await saveKpi(data);
    if (payload.data.status_code === Success) {
      dispatch({
        type: SAVE_KPI_SUCCESS,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      throw payload;
    }
  } catch (error) {
    if (error.data) {
      dispatch({
        type: SAVE_KPI_FAILED,
        loading: false,
        status: error.data.status_code,
        message: error.data.status_description,
        error
      });
    } else {
      dispatch({
        type: SAVE_KPI_FAILED,
        loading: false,
        status: UNHANDLED_ERROR,
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
      throw payload;
    }
  } catch (error) {
    if (error.data) {
      dispatch({
        type: GET_KPI_LIST_FAILED,
        loading: false,
        status: error.data.status_code,
        message: error.data.status_description,
        error
      });
    } else {
      dispatch({
        type: GET_KPI_LIST_FAILED,
        loading: false,
        status: UNHANDLED_ERROR,
        message: 'Something went wrong',
        error
      });
    }
  }
};
