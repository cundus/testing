import {
  SAVE_DRAFT,
  SAVE_DRAFT_SUCCESS,
  SAVE_DRAFT_FAILED,
  GET_LATEST_GOAL_KPI,
  GET_LATEST_GOAL_KPI_SUCCESS,
  GET_LATEST_GOAL_KPI_FAILED,
  GET_KPI_LIST,
  GET_KPI_LIST_SUCCESS,
  GET_KPI_LIST_FAILED
} from '../action.type';

import { getLatestGoalKpi, getKpiList } from '../../service/kpiPlanning';

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
    if (payload.data.status_code === 0) {
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
      status: error.data.status_code,
      message: error.data.status_description
    });
  }
};

export const doSaveDraft = (data, pages) => async (dispatch) => {
  dispatch({
    type: SAVE_DRAFT,
    isDoSaveDraft: true,
    payload: null,
    error: null
  });
  try {
    // const response = await saveDraft(data);
    if (data) {
      dispatch({
        type: SAVE_DRAFT_SUCCESS,
        isDoSaveDraft: true,
        data,
        error: null,
        pages
      });
    }
  } catch (error) {
    dispatch({
      type: SAVE_DRAFT_FAILED,
      isDoSaveDraft: true
    });
  }
};

export const doGetKpiList = (id) => async (dispatch) => {
  dispatch({
    type: GET_KPI_LIST,
    loading: true,
    status: null,
    message: null,
    data: [],
    pages: ''
  });
  try {
    const payload = await getKpiList(id);
    if (payload.data.status_code === 0) {
      if (payload.data.result.length === 0) {
        dispatch({
          type: GET_KPI_LIST_SUCCESS,
          loading: false,
          status: payload.data.status_code,
          message: payload.data.status_description,
          data: payload.data.result,
          pages: 'create-kpi'
        });
      } else {
        dispatch({
          type: GET_KPI_LIST_SUCCESS,
          loading: false,
          status: payload.data.status_code,
          message: payload.data.status_description,
          data: payload.data.result,
          pages: 'draft-kpi'
        });
      }
    } else {
      throw payload;
    }
  } catch (error) {
    dispatch({
      type: GET_KPI_LIST_FAILED,
      loading: false,
      status: error.data.status_code,
      message: error.data.status_description
    });
  }
};
