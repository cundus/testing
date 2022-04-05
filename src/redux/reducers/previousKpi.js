import {
  GET_ALL_MY_TEAM,
  GET_ALL_MY_TEAM_FAILED,
  GET_ALL_MY_TEAM_SUCCESS,
  GET_FORM_TEMPLATES,
  GET_FORM_TEMPLATES_FAILED,
  GET_FORM_TEMPLATES_SUCCESS,
  GET_KPI_BY_FORM_ID,
  GET_KPI_BY_FORM_ID_FAILED,
  GET_KPI_BY_FORM_ID_SUCCESS,
} from "../action.type";

const init = {};

export default (state = init, action) => {
  switch (action.type) {
    case GET_FORM_TEMPLATES:
    case GET_FORM_TEMPLATES_SUCCESS:
    case GET_FORM_TEMPLATES_FAILED:
    case GET_KPI_BY_FORM_ID:
    case GET_KPI_BY_FORM_ID_SUCCESS:
    case GET_KPI_BY_FORM_ID_FAILED:
    case GET_ALL_MY_TEAM:
    case GET_ALL_MY_TEAM_SUCCESS:
    case GET_ALL_MY_TEAM_FAILED:
      return {
        ...state,
        ...action,
      };
    default:
      // return KpiState;
      return { ...state };
  }
};
