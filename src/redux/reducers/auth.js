import {
  GET_USER_SUCCESS,
  LOGIN_BY_AD_TOKEN_SUCCESS,
  LOGIN_BY_AD_TOKEN,
  LOGIN_BY_AD_TOKEN_FAILED,
  GET_CURRENT_STEP,
  GET_CURRENT_STEP_SUCCESS,
  GET_CURRENT_STEP_FAILED
} from '../action.type';

const initialState = {
  cellPhone: null,
  email: '',
  empId: '',
  firstName: '',
  lastName: '',
  manager: null,
  managerId: null,
  userId: '',
  userName: '',
  statusLoginCode: null,
  statusLoginDesc: null,
  loadingLogin: true
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_BY_AD_TOKEN:
      return {
        ...state,
        ...action
      };
    case LOGIN_BY_AD_TOKEN_SUCCESS:
      return {
        ...state,
        ...action
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        ...action?.data
      };
    case LOGIN_BY_AD_TOKEN_FAILED:
      return {
        ...state,
        ...action
      };
    case GET_CURRENT_STEP:
      return {
        ...state,
        ...action
      };
    case GET_CURRENT_STEP_SUCCESS:
      return {
        ...state,
        ...action
      };
    case GET_CURRENT_STEP_FAILED:
      return {
        ...state,
        ...action
      };
    default:
      return state;
  }
};

export default authReducer;
