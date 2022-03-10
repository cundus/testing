import {
  REVISE_KPI,
  REVISE_KPI_SUCCESS,
  REVISE_KPI_FAILED,
  DO_INLINE_EDIT_MONITORING,
} from "../action.type";

const init = {
  doInlineEdit: false,
  rowId: "",
};

export default (state = init, action) => {
  switch (action.type) {
    case REVISE_KPI:
      return action;
    case REVISE_KPI_SUCCESS:
      return action;
    case REVISE_KPI_FAILED:
      return action;
    case DO_INLINE_EDIT_MONITORING:
      return {
        ...state,
        doInlineEdit: action.data.editRow,
        rowId: action.data.idRow,
      };
    default:
      // return KpiState;
      return { ...state };
  }
};
