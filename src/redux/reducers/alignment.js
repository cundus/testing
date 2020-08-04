import { GET_ALIGNMENTS, GET_ALIGNMENTS_SUCCESS, GET_ALIGNMENTS_FAILED, GET_ALIGNMENTS_DETAIL, GET_ALIGNMENTS_DETAIL_SUCCESS, GET_ALIGNMENTS_DETAIL_FAILED } from "../action.type";

const init = {};

export default (state = init, action) => {
  switch(action.type) {
    case GET_ALIGNMENTS:
      return action;
    case GET_ALIGNMENTS_SUCCESS:
      return action;
    case GET_ALIGNMENTS_FAILED:
      return action;
    case GET_ALIGNMENTS_DETAIL:
      return action;
    case GET_ALIGNMENTS_DETAIL_SUCCESS:
      return action;
    case GET_ALIGNMENTS_DETAIL_FAILED:
      return action;
    default:
      // return KpiState;
      return { ...state };
  }
};
