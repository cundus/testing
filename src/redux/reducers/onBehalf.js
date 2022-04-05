import {
  CHOOSE_USER_ON_BEHALF,
  CHOOSE_FORM_ON_BEHALF,
  GET_USERS_BEHALF,
  GET_FORMS_BEHALF,
  FORM_BEHALF_RESET,
} from "../action.type";

const initalState = {
  userId: localStorage.getItem("onbehalf_userid") || null,
  form: localStorage.getItem("onbehalf_form")
    ? JSON.parse(localStorage.getItem("onbehalf_form"))
    : null,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case CHOOSE_USER_ON_BEHALF:
      return {
        ...state,
        userId: action.userId,
      };
    case CHOOSE_FORM_ON_BEHALF:
      return {
        ...state,
        form: action.form,
      };
    case FORM_BEHALF_RESET:
      return {
        ...state,
        form: null,
        userId: null,
      };
    case GET_USERS_BEHALF:
    case GET_FORMS_BEHALF:
      return {
        ...state,
        ...action,
      };
    default:
      // return initUsers;
      return { ...state };
  }
};
