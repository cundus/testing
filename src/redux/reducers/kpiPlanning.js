import {
  SAVE_DRAFT,
  SAVE_DRAFT_SUCCESS,
  SAVE_DRAFT_FAILED
} from '../action.type';

const initialState = {
  loading: false,
  isDraftSaved: false,
  errorMessage: null,
  draftData: []
};

export const draft = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DRAFT:
      return {
        ...state,
        isDraftSaved: action.isDraftSaved,
        loading: action.loading,
        draftData: action.draftData,
        errorMessage: action.errorMessage
      };
    case SAVE_DRAFT_SUCCESS:
      return {
        ...state,
        isDraftSaved: action.isDraftSaved,
        loading: action.loading,
        draftData: action.draftData,
        errorMessage: action.errorMessage
      };
    case SAVE_DRAFT_FAILED:
      return {
        ...state,
        isDraftSaved: action.isDraftSaved,
        loading: action.loading,
        draftData: action.draftData,
        errorMessage: action.errorMessage
      };
    default:
      return { ...state };
  }
};
