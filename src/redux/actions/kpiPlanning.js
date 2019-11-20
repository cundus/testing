import {
  SAVE_DRAFT,
  SAVE_DRAFT_SUCCESS,
  SAVE_DRAFT_FAILED
} from '../action.type';

// import { saveDraft } from '../../services/saveDraft';

export const doSaveDraft = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_DRAFT,
    loading: true,
    isDraftSaved: false,
    draftData: data
  });
  try {
    // const response = await saveDraft(data);
    if (data) {
      dispatch({
        type: SAVE_DRAFT_SUCCESS,
        isDraftSaved: true,
        loading: false,
        draftData: data,
        errorMessage: {}
      });
    }
  } catch (err) {
    dispatch({
      type: SAVE_DRAFT_FAILED,
      isDraftSaved: false,
      loading: false,
      draftData: {},
      errorMessage: {}
    });
  }
};
