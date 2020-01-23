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
  GET_KPI_MANAGER_LIST_FAILED,
  GET_METRICS,
  GET_METRICS_SUCCESS,
  GET_METRICS_FAILED,
  SUBMIT_NEXT,
  SUBMIT_NEXT_SUCCESS,
  SUBMIT_NEXT_FAILED,
  DO_ASSESSMENT,
  DO_ASSESSMENT_SUCCESS,
  DO_ASSESSMENT_FAILED,
  GET_VALUES,
  GET_VALUES_SUCCESS,
  GET_VALUES_FAILED,
  GET_RATING,
  GET_RATING_SUCCESS,
  GET_RATING_FAILED,
  SAVE_VALUES,
  SAVE_VALUES_SUCCESS,
  SAVE_VALUES_FAILED,
  ATTACHMENT_FILE,
  ATTACHMENT_FILE_SUCCESS,
  ATTACHMENT_FILE_FAILED,
  DELETE_FILE,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_FAILED,
  GET_KPI_RATING,
  GET_KPI_RATING_SUCCESS,
  GET_KPI_RATING_FAILED
} from '../action.type';

import {
  Success
} from '../status-code-type';

import {
  getLatestGoalKpi, getKpiList, saveKpi, getKpiManagerList, getMetrics, submitNext
 } from '../../service/kpiPlanning';
import {
  doAssess, getValues, getRating, saveValues, attachFile, deleteFile, getKpiRating
} from '../../service/appraisal';

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
        message: 'Something wrong',
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
        message: 'Something wrong',
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
      if (payload.data.result) {
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
          status: 9999,
          message: 'Internal server error',
          error: payload
        });
      }
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
        message: 'Something wrong',
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
        message: 'Something wrong',
        error
      });
    }
  }
};

export const doGetMetrics = () => async (dispatch) => {
  dispatch({
    type: GET_METRICS,
    loading: true,
    status: null,
    message: null,
    data: []
  });
  try {
    const payload = await getMetrics();
    if (payload.data.status_code === Success) {
      dispatch({
        type: GET_METRICS_SUCCESS,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        data: payload.data.result
      });
    } else {
      dispatch({
        type: GET_METRICS_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: GET_METRICS_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: GET_METRICS_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const doSubmitNext = (id) => async (dispatch) => {
  dispatch({
    type: SUBMIT_NEXT,
    loading: true,
    status: null,
    message: null,
    data: []
  });
  try {
    const payload = await submitNext(id);
    if (payload.data.status_code === Success) {
      dispatch({
        type: SUBMIT_NEXT_SUCCESS,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: SUBMIT_NEXT_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: SUBMIT_NEXT_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: SUBMIT_NEXT_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const doAssessment = (data) => async (dispatch) => {
  dispatch({
    type: DO_ASSESSMENT,
    loading: true,
    status: null,
    message: null,
    data: []
  });
  try {
    const payload = await doAssess(data);
    if (payload.data.status_code === Success) {
      dispatch({
        type: DO_ASSESSMENT_SUCCESS,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: DO_ASSESSMENT_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: DO_ASSESSMENT_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: DO_ASSESSMENT_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const getValueList = (id) => async (dispatch) => {
  dispatch({
    type: GET_VALUES,
    loading: true,
    status: null,
    message: null,
    data: []
  });
  try {
    const payload = await getValues(id);
    if (payload.data.status_code === Success) {
      dispatch({
        type: GET_VALUES_SUCCESS,
        loading: false,
        data: payload.data.result,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: GET_VALUES_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: GET_VALUES_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: GET_VALUES_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const getRatings = () => async (dispatch) => {
  dispatch({
    type: GET_RATING,
    loading: true,
    status: null,
    message: null,
    data: []
  });
  try {
    const payload = await getRating();
    if (payload.data.status_code === Success) {
      dispatch({
        type: GET_RATING_SUCCESS,
        loading: false,
        data: payload.data.result,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: GET_RATING_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: GET_RATING_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: GET_RATING_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const saveValueList = (id, data) => async (dispatch) => {
  dispatch({
    type: SAVE_VALUES,
    loading: true,
    status: null,
    message: null,
    data: []
  });
  try {
    const payload = await saveValues(id, data);
    if (payload.data.status_code === Success) {
      dispatch({
        type: SAVE_VALUES_SUCCESS,
        loading: false,
        data: payload.data.result,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: SAVE_VALUES_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: SAVE_VALUES_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: SAVE_VALUES_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const doAttachFile = (data) => async (dispatch) => {
  dispatch({
    type: ATTACHMENT_FILE,
    loading: true,
    status: null,
    message: null,
    data: []
  });
  try {
    const payload = await attachFile(data);
    if (payload.data.status_code === Success) {
      dispatch({
        type: ATTACHMENT_FILE_SUCCESS,
        loading: false,
        data: payload.data.result,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: ATTACHMENT_FILE_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: ATTACHMENT_FILE_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: ATTACHMENT_FILE_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const doDeleteFiles = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_FILE,
    loading: true,
    status: null,
    message: null,
    data: []
  });
  try {
    const payload = await deleteFile(id);
    if (payload.data.status_code === Success) {
      dispatch({
        type: DELETE_FILE_SUCCESS,
        loading: false,
        data: payload.data.result,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: DELETE_FILE_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: DELETE_FILE_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: DELETE_FILE_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const doGetKpiRating = () => async (dispatch) => {
  dispatch({
    type: GET_KPI_RATING,
    loading: true,
    status: null,
    message: null,
    data: {}
  });
  try {
    const payload = await getKpiRating();
    if (payload.data.status_code === Success) {
      dispatch({
        type: GET_KPI_RATING_SUCCESS,
        loading: false,
        data: payload.data.result,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: GET_KPI_RATING_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: GET_KPI_RATING_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: GET_KPI_RATING_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};
