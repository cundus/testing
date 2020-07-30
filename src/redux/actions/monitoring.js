import { REVISE_KPI, REVISE_KPI_SUCCESS, REVISE_KPI_FAILED } from "../action.type";
import { reviseKpi } from "../../service/monitoring";
import { Success } from "../status-code-type";
import { submitToPreviousStep } from "../../service/kpiPlanning";

export const doReviseKPI = (id) => async (dispatch) => {
    dispatch({
      type: REVISE_KPI,
      loading: true,
      status: null,
      message: null,
      data: []
    });
    try {
      const payload = await submitToPreviousStep(id);
      if (payload.data.status_code === Success) {
        dispatch({
          type: REVISE_KPI_SUCCESS,
          loading: false,
          status: payload?.data?.status_code,
          message: payload?.data?.status_description,
        });
      } else {
        dispatch({
          type: REVISE_KPI_FAILED,
          loading: false,
          status: payload?.data?.status_code,
          message: payload?.data?.status_description,
          error: payload
        });
      }
    } catch (error) {
      if (error.response.data) {
        dispatch({
          type: REVISE_KPI_FAILED,
          loading: false,
          status: error?.response?.data?.status,
          message: error?.response?.data?.error || 'Something wrong',
          error
        });
      } else {
        dispatch({
          type: REVISE_KPI_FAILED,
          loading: false,
          status: null,
          message: 'Something wrong',
          error
        });
      }
    }
  };
  