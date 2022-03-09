import { getOnBehalfForms, getOnBehalfUsers } from "../../service/onBehalf";
import {
  CHOOSE_FORM_ON_BEHALF,
  CHOOSE_USER_ON_BEHALF,
  FORM_BEHALF_RESET,
  GET_FORMS_BEHALF,
  GET_USERS_BEHALF,
} from "../action.type";

export const doChooseUserOnBehalf = (id) => async (dispatch) => {
  localStorage.setItem("onbehalf_userid", id);
  dispatch({
    type: CHOOSE_USER_ON_BEHALF,
    userId: id,
  });
};

export const doChooseFormOnBehalf = (form) => async (dispatch) => {
  localStorage.setItem("onbehalf_form", JSON.stringify(form));
  dispatch({
    type: CHOOSE_FORM_ON_BEHALF,
    form: form,
  });
};
export const doResetBehalf = () => async (dispatch) => {
  localStorage.removeItem("onbehalf_form");
  localStorage.removeItem("onbehalf_userid");
  dispatch({
    type: FORM_BEHALF_RESET,
  });
};

export const doGetUsersBehalf =
  ({ size, page, filters, sort }) =>
  async (dispatch) => {
    dispatch({
      type: GET_USERS_BEHALF,
      loadingUsersBehalf: true,
      errorUsersBehalf: null
    });
    try {
      const payload = await getOnBehalfUsers({
        size,
        page,
        ...filters,
        sort,
      });
      if (payload?.data?.status_code === 0) {
        dispatch({
          type: GET_USERS_BEHALF,
          dataUsersBehalf: payload?.data,
          filterUsersBehalf: {...filters, sort},
          loadingUsersBehalf: false,
          errorUsersBehalf: null
        });
      } else throw payload;
    } catch (error) {
      dispatch({
        type: GET_USERS_BEHALF,
        dataUsersBehalf: null,
        filterFormsBehalf: null,
        loadingUsersBehalf: false,
        errorUsersBehalf: error,
      });
    }
  };

export const doGetFormsBehalf =
  ({ size, page, filters, sort }) =>
  async (dispatch) => {
    dispatch({
      type: GET_FORMS_BEHALF,
      loadingFormsBehalf: true,
      errorFormsBehalf: null
    });
    try {
      const payload = await getOnBehalfForms(
        {
          size,
          page,
          ...filters,
          sort,
        },
        localStorage.getItem("onbehalf_userid")
      );
      if (payload?.data?.status_code === 0) {
        dispatch({
          type: GET_FORMS_BEHALF,
          dataFormsBehalf: payload?.data,
          filterFormsBehalf: {...filters, sort},
          loadingFormsBehalf: false,
          errorFormsBehalf: null
        });
      } else throw payload;
    } catch (error) {
      dispatch({
        type: GET_FORMS_BEHALF,
        dataFormsBehalf: null,
        filterFormsBehalf: null,
        loadingFormsBehalf: false,
        errorFormsBehalf: error,
      });
    }
  };
