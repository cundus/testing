import { REVISE_KPI, REVISE_KPI_SUCCESS, REVISE_KPI_FAILED } from "../action.type";

const init = {};

export default (state = init, action) => {
  switch(action.type) {
    case REVISE_KPI:
      return action;
    case REVISE_KPI_SUCCESS:
      return action;
    case REVISE_KPI_FAILED:
      return action;
    default:
      // return KpiState;
      return { ...state };
  }
};
