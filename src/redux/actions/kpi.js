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
  GET_KPI_RATING_FAILED,
  GET_PROPOSE_RATING,
  GET_PROPOSE_RATING_SUCCESS,
  GET_PROPOSE_RATING_FAILED,
  SEND_FEEDBACK_APPRAISAL,
  SEND_FEEDBACK_APPRAISAL_SUCCESS,
  SEND_FEEDBACK_APPRAISAL_FAILED,
  APPROVE_APPRAISAL,
  APPROVE_APPRAISAL_SUCCESS,
  APPROVE_APPRAISAL_FAILED,
  TEAM_ACKNOWLEDGEMENT,
  TEAM_ACKNOWLEDGEMENT_SUCCESS,
  TEAM_ACKNOWLEDGEMENT_FAILED,
  EMP_ACKNOWLEDGEMENT,
  EMP_ACKNOWLEDGEMENT_SUCCESS,
  EMP_ACKNOWLEDGEMENT_FAILED,
  EMP_ACKNOWLEDGEMENT_LIST,
  EMP_ACKNOWLEDGEMENT_LIST_SUCCESS,
  EMP_ACKNOWLEDGEMENT_LIST_FAILED,
  GET_ATTACHMENT_FILE,
  GET_ATTACHMENT_FILE_SUCCESS,
  GET_ATTACHMENT_FILE_FAILED,
  DOWNLOAD_FILE,
  DOWNLOAD_FILE_SUCCESS,
  DOWNLOAD_FILE_FAILED,
  DO_ASSESSMENT_SUCCESS_ALL,
  DO_ASSESSMENT_ALL,
  DO_ASSESSMENT_FAILED_ALL
} from '../action.type';

import {
  Success
} from '../status-code-type';

import {
  getLatestGoalKpi, getKpiList, saveKpi, getKpiManagerList, getMetrics, submitNext, submitToPreviousStep
 } from '../../service/kpiPlanning';
import {
  doAssess, getValues, getRating, saveValues, attachFile, deleteFile, getKpiRating, getProposeRating, sendFeedbackAppraisal, approveAppraisal, teamAcknowledge, empAcknowledgeList, empAcknowledge, getAttachId, downloadFiles, doAssessAll
} from '../../service/appraisal';
import { getKPIstate } from '../../service/auth';

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
    await getKPIstate();
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
    data: []
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
    await getKPIstate();
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
        message: payload.data.status_description,
        data: payload.data.result
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

export const doAssessmentAll = (data) => async (dispatch) => {
  dispatch({
    type: DO_ASSESSMENT_ALL,
    loading: true,
    status: null,
    message: null,
    data: []
  });
  try {
    const payload = await doAssessAll(data);
    if (payload.data.status_code === Success) {
      dispatch({
        type: DO_ASSESSMENT_SUCCESS_ALL,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: DO_ASSESSMENT_FAILED_ALL,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: DO_ASSESSMENT_FAILED_ALL,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: DO_ASSESSMENT_FAILED_ALL,
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
    if (error.response) {
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
          message: 'Failed when attaching files',
          error
        });
      }
    } else {
      dispatch({
        type: ATTACHMENT_FILE_FAILED,
        loading: false,
        status: null,
        message: 'Failed when attaching files',
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

export const doGetKpiRating = (id) => async (dispatch) => {
  dispatch({
    type: GET_KPI_RATING,
    loading: true,
    status: null,
    message: null,
    data: {}
  });
  try {
    const payload = await getKpiRating(id);
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

export const doGetProposeRating = () => async (dispatch) => {
  dispatch({
    type: GET_PROPOSE_RATING,
    loading: true,
    status: null,
    message: null,
    data: {}
  });
  try {
    const payload = await getProposeRating();
    if (payload.data.status_code === Success) {
      dispatch({
        type: GET_PROPOSE_RATING_SUCCESS,
        loading: false,
        data: payload.data.result,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: GET_PROPOSE_RATING_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: GET_PROPOSE_RATING_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: GET_PROPOSE_RATING_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const doSendBackAppraisal = (id, data) => async (dispatch) => {
  dispatch({
    type: SEND_FEEDBACK_APPRAISAL,
    loading: true,
    status: null,
    message: null,
    data: {}
  });
  try {
    const payload = await sendFeedbackAppraisal(id, data);
    if (payload.data.status_code === Success) {
      await submitToPreviousStep(id);
      dispatch({
        type: SEND_FEEDBACK_APPRAISAL_SUCCESS,
        loading: false,
        data: payload.data.result,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: SEND_FEEDBACK_APPRAISAL_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: SEND_FEEDBACK_APPRAISAL_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: SEND_FEEDBACK_APPRAISAL_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const doApproveAppraisal = (id, data) => async (dispatch) => {
  dispatch({
    type: APPROVE_APPRAISAL,
    loading: true,
    status: null,
    message: null,
    data: {}
  });
  try {
    const payload = await approveAppraisal(id, data);
    if (payload.data.status_code === Success) {
      await submitNext(id);
      dispatch({
        type: APPROVE_APPRAISAL_SUCCESS,
        loading: false,
        data: payload.data.result,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: APPROVE_APPRAISAL_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: APPROVE_APPRAISAL_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: APPROVE_APPRAISAL_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const doTeamAcknowledge = (data) => async (dispatch) => {
  dispatch({
    type: TEAM_ACKNOWLEDGEMENT,
    loading: true,
    status: null,
    message: null,
    data: {}
  });
  try {
    const payload = await teamAcknowledge(data);
    if (payload.data.status_code === Success) {
      dispatch({
        type: TEAM_ACKNOWLEDGEMENT_SUCCESS,
        loading: false,
        data: payload.data.result,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: TEAM_ACKNOWLEDGEMENT_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: TEAM_ACKNOWLEDGEMENT_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: TEAM_ACKNOWLEDGEMENT_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const doEmpAcknowledgeList = () => async (dispatch) => {
  dispatch({
    type: EMP_ACKNOWLEDGEMENT_LIST,
    loading: true,
    status: null,
    message: null,
    data: {}
  });
  try {
    const payload = await empAcknowledgeList();
    if (payload.data.status_code === Success) {
      dispatch({
        type: EMP_ACKNOWLEDGEMENT_LIST_SUCCESS,
        loading: false,
        data: payload.data.result,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: EMP_ACKNOWLEDGEMENT_LIST_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: EMP_ACKNOWLEDGEMENT_LIST_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: EMP_ACKNOWLEDGEMENT_LIST_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const doEmpAcknowledge = (data) => async (dispatch) => {
  dispatch({
    type: EMP_ACKNOWLEDGEMENT,
    loading: true,
    status: null,
    message: null,
    data: {}
  });
  try {
    const payload = await empAcknowledge(data);
    if (payload.data.status_code === Success) {
      dispatch({
        type: EMP_ACKNOWLEDGEMENT_SUCCESS,
        loading: false,
        data: payload.data.result,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: EMP_ACKNOWLEDGEMENT_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: EMP_ACKNOWLEDGEMENT_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: EMP_ACKNOWLEDGEMENT_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const getAttachment = (id) => async (dispatch) => {
  dispatch({
    type: GET_ATTACHMENT_FILE,
    loading: true,
    status: null,
    message: null,
    data: []
  });
  try {
    const payload = await getAttachId(id);
    if (payload.data.status_code === Success) {
      dispatch({
        type: GET_ATTACHMENT_FILE_SUCCESS,
        loading: false,
        data: payload.data.result,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: GET_ATTACHMENT_FILE_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: GET_ATTACHMENT_FILE_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: GET_ATTACHMENT_FILE_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const doDownloadFile = (attachId) => async (dispatch) => {
  dispatch({
    type: DOWNLOAD_FILE,
    loading: true,
    status: null,
    message: null,
    data: []
  });
  try {
    const payload = await downloadFiles(attachId);
    if (payload.data.status_code === Success) {
      dispatch({
        type: DOWNLOAD_FILE_SUCCESS,
        loading: false,
        data: payload.data.result,
        status: payload.data.status_code,
        message: payload.data.status_description
      });
    } else {
      dispatch({
        type: DOWNLOAD_FILE_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error.response.data) {
      dispatch({
        type: DOWNLOAD_FILE_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: DOWNLOAD_FILE_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};
