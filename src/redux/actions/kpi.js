import {
  SAVE_DRAFT,
  SAVE_DRAFT_SUCCESS,
  SAVE_DRAFT_FAILED,
  GET_LATEST_GOAL_KPI,
  GET_LATEST_GOAL_KPI_SUCCESS,
  GET_LATEST_GOAL_KPI_FAILED
} from '../action.type';

import { getLatestGoalKpi } from '../../service/kpiPlanning';

export const doGetLatestGoalKpi = (data) => async (dispatch) => {
  dispatch({
    type: GET_LATEST_GOAL_KPI,
    isGetLatestGoal: false,
    loading: true,
    data: null,
    goalName: '',
    status: null,
    message: null
  });
  try {
    const payload = await getLatestGoalKpi();
    if (payload.data.status_code === 0) {
      dispatch({
        type: GET_LATEST_GOAL_KPI_SUCCESS,
        isGetLatestGoal: true,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        data: payload.data.result
      });
    }
  } catch (error) {
    dispatch({
      type: GET_LATEST_GOAL_KPI_FAILED,
      isGetLatestGoal: false,
      loading: false,
      status: error.data.status_code,
      message: error.data.status_description
    });
  }
};

export const doSaveDraft = (data) => async (dispatch) => {
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
        payload: data,
        error: null
      });
    }
  } catch (error) {
    dispatch({
      type: SAVE_DRAFT_FAILED,
      isDoSaveDraft: true,
      payload: null,
      error
    });
  }
};
