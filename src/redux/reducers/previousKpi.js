import {
  GET_ALL_MY_TEAM,
  GET_ALL_MY_TEAM_FAILED,
  GET_ALL_MY_TEAM_SUCCESS,
  GET_FORM_TEMPLATES,
  GET_FORM_TEMPLATES_FAILED,
  GET_FORM_TEMPLATES_SUCCESS,
  GET_KPI_BY_FORM_ID,
  GET_KPI_BY_FORM_ID_FAILED,
  GET_KPI_BY_FORM_ID_SUCCESS
} from "../action.type";

const init = {};

export default (state = init, action) => {
  switch(action.type) {
    case GET_FORM_TEMPLATES:
      return {
        ...state,
        ...action
      };
    case GET_FORM_TEMPLATES_SUCCESS:
      return {
        ...state,
        ...action
      };
    case GET_FORM_TEMPLATES_FAILED:
      return {
        ...state,
        ...action
      };
    case GET_KPI_BY_FORM_ID:
      return {
        ...state,
        ...action
      };
    case GET_KPI_BY_FORM_ID_SUCCESS:
      
      return {
        ...state,
        ...action
      };
    case GET_KPI_BY_FORM_ID_FAILED:
      return {
        ...state,
        ...action
      };
    case GET_ALL_MY_TEAM:
      return {
        ...state,
        ...action
      };
    case GET_ALL_MY_TEAM_SUCCESS:
      
      return {
        ...state,
        ...action
      };
    case GET_ALL_MY_TEAM_FAILED:
      return {
        ...state,
        ...action
      };
    default:
      // return KpiState;
      return { ...state };
  }
};
