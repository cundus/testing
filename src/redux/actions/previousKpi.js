import { getFormTemplates, getPrevKpiByFormId } from "../../service/previousKpi";
import {
  GET_FORM_TEMPLATES,
  GET_FORM_TEMPLATES_FAILED,
  GET_FORM_TEMPLATES_SUCCESS,
  GET_KPI_BY_FORM_ID,
  GET_KPI_BY_FORM_ID_FAILED,
  GET_KPI_BY_FORM_ID_SUCCESS,
} from "../action.type";
import { SUCCESS } from "../status-code-type";

export const actionGetFormTemplates = (eligibleToCopy) => async (dispatch) => {
  dispatch({
    type: GET_FORM_TEMPLATES,
    loadingFormTemplates: true,
    statusFormTemplates: null,
    messageFormTemplates: null,
    dataFormTemplates: [],
  });
  try {
    const payload = await getFormTemplates(eligibleToCopy);
    if (payload?.data?.status_code === SUCCESS) {
      dispatch({
        type: GET_FORM_TEMPLATES_SUCCESS,
        loadingFormTemplates: false,
        statusFormTemplates: payload?.data?.status_code,
        messageFormTemplates: payload?.data?.status_description,
        dataFormTemplates: payload?.data?.result,
      });
    } else {
      dispatch({
        type: GET_FORM_TEMPLATES_FAILED,
        loadingFormTemplates: false,
        statusFormTemplates: payload?.data?.status_code,
        messageFormTemplates: payload?.data?.status_description,
        dataFormTemplates: [],
        errorFormTemplates: payload,
      });
    }
  } catch (error) {
    if (error?.response?.data) {
      dispatch({
        type: GET_FORM_TEMPLATES_FAILED,
        loadingFormTemplates: false,
        statusFormTemplates: error?.response?.data?.status,
        messageFormTemplates: error?.response?.data?.error || "Something wrong",
        errorFormTemplates: error,
        dataFormTemplates: [],
      });
    } else {
      dispatch({
        type: GET_FORM_TEMPLATES_FAILED,
        loadingFormTemplates: false,
        statusFormTemplates: null,
        messageFormTemplates: "Something wrong",
        errorFormTemplates: error,
        dataFormTemplates: [],
      });
    }
  }
};

export const actionGetPrevKpiByFormId = (userId, formId) => async (dispatch) => {
  dispatch({
    type: GET_KPI_BY_FORM_ID,
    loadingKpiByForm: true,
    statusKpiByForm: null,
    messageKpiByForm: null,
    dataKpiByForm: [],
  });
  try {
    const payload = await getPrevKpiByFormId(userId, formId);
    if (payload?.data?.status_code === SUCCESS) {
      dispatch({
        type: GET_KPI_BY_FORM_ID_SUCCESS,
        loadingKpiByForm: false,
        statusKpiByForm: payload?.data?.status_code,
        messageKpiByForm: payload?.data?.status_description,
        dataKpiByForm: payload?.data?.result,
      });
    } else {
      dispatch({
        type: GET_KPI_BY_FORM_ID_FAILED,
        loadingKpiByForm: false,
        statusKpiByForm: payload?.data?.status_code,
        messageKpiByForm: payload?.data?.status_description,
        dataKpiByForm: [],
        errorKpiByForm: payload,
      });
    }
  } catch (error) {
    if (error?.response?.data) {
      dispatch({
        type: GET_KPI_BY_FORM_ID_FAILED,
        loadingKpiByForm: false,
        statusKpiByForm: error?.response?.data?.status,
        messageKpiByForm: error?.response?.data?.error || "Something wrong",
        errorKpiByForm: error,
        dataKpiByForm: [],
      });
    } else {
      dispatch({
        type: GET_KPI_BY_FORM_ID_FAILED,
        loadingKpiByForm: false,
        statusKpiByForm: null,
        messageKpiByForm: "Something wrong",
        errorKpiByForm: error,
        dataKpiByForm: [],
      });
    }
  }
};
