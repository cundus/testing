import {
  GET_USER_SUCCESS,
  LOGIN_BY_AD_TOKEN_SUCCESS,
  LOGIN_BY_AD_TOKEN,
  LOGIN_BY_AD_TOKEN_FAILED,
  GET_CURRENT_STEP,
  GET_CURRENT_STEP_SUCCESS,
  GET_CURRENT_STEP_FAILED,
} from "../action.type";

const initialState = {
  cellPhone: null,
  email: "",
  empId: "",
  firstName: "",
  lastName: "",
  manager: null,
  managerId: null,
  userId: "",
  userName: "",
  statusLoginCode: null,
  statusLoginDesc: null,
  loadingLogin: true,
};

const authReducer = (action, state = initialState) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        ...action?.data,
      };
    case LOGIN_BY_AD_TOKEN:
    case LOGIN_BY_AD_TOKEN_SUCCESS:
    case LOGIN_BY_AD_TOKEN_FAILED:
    case GET_CURRENT_STEP:
    case GET_CURRENT_STEP_SUCCESS:
    case GET_CURRENT_STEP_FAILED:
      return {
        ...state,
        ...action,
      };
    default:
      return state;
  }
};

export default authReducer;
