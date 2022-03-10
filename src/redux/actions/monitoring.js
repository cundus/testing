import {
  REVISE_KPI,
  REVISE_KPI_SUCCESS,
  REVISE_KPI_FAILED,
  DO_INLINE_EDIT_MONITORING,
} from "../action.type";
import { reviseKpi } from "../../service/monitoring";
import { Success } from "../status-code-type";

export const doReviseKPI = (id) => async (dispatch) => {
  dispatch({
    type: REVISE_KPI,
    loading: true,
    status: null,
    message: null,
    data: [],
  });
  try {
    const payload = await reviseKpi(id);
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
        error: payload,
      });
    }
  } catch (error) {
    if (error?.response) {
      dispatch({
        type: REVISE_KPI_FAILED,
        loading: false,
        status: error?.response?.data?.status,
        message: error?.response?.data?.error || "Something wrong",
        error,
      });
    } else {
      dispatch({
        type: REVISE_KPI_FAILED,
        loading: false,
        status: null,
        message: "Something wrong",
        error,
      });
    }
  }
};

export const doInlineEdit = (id, val) => async (dispatch) => {
  dispatch({
    type: DO_INLINE_EDIT_MONITORING,
    data: {
      editRow: val,
      idRow: id,
    },
  });
};
