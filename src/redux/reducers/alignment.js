import { GET_ALIGNMENTS, GET_ALIGNMENTS_SUCCESS, GET_ALIGNMENTS_FAILED, GET_ALIGNMENTS_DETAIL, GET_ALIGNMENTS_DETAIL_SUCCESS, GET_ALIGNMENTS_DETAIL_FAILED, POST_ALIGNMENTS_DETAIL, POST_ALIGNMENTS_DETAIL_SUCCESS, POST_ALIGNMENTS_DETAIL_FAILED } from "../action.type";

const init = {};

export default (state = init, action) => {
  switch(action.type) {
    case GET_ALIGNMENTS:
      return {
        ...state,
        ...action
      };
    case GET_ALIGNMENTS_SUCCESS:
      
      return {
        ...state,
        ...action
      };
    case GET_ALIGNMENTS_FAILED:
      
      return {
        ...state,
        ...action
      };
    case GET_ALIGNMENTS_DETAIL:
      
      return {
        ...state,
        ...action
      };
    case GET_ALIGNMENTS_DETAIL_SUCCESS:
      
      return {
        ...state,
        ...action
      };
    case GET_ALIGNMENTS_DETAIL_FAILED:
      
      return {
        ...state,
        ...action
      };
    case POST_ALIGNMENTS_DETAIL:
      
      return {
        ...state,
        ...action
      };
    case POST_ALIGNMENTS_DETAIL_SUCCESS:
      
      return {
        ...state,
        ...action
      };
    case POST_ALIGNMENTS_DETAIL_FAILED:
      
      return {
        ...state,
        ...action
      };
    default:
      // return KpiState;
      return { ...state };
  }
};
