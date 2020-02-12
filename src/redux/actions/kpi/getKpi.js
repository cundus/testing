import {
  GET_KPI_LIST,
  GET_KPI_LIST_SUCCESS,
  GET_KPI_LIST_FAILED,
  GET_LATEST_GOAL_KPI,
  GET_LATEST_GOAL_KPI_SUCCESS,
  GET_LATEST_GOAL_KPI_FAILED,
  GET_KPI_MANAGER_LIST,
  GET_KPI_MANAGER_LIST_SUCCESS,
  GET_KPI_MANAGER_LIST_FAILED
} from '../../action.type';
import { Success } from '../../status-code-type';
import { getKpiList, getLatestGoalKpi, getKpiManagerList } from '../../../service/kpiPlanning';

export const actionGetKPI = (id) => async (dispatch) => {
  dispatch({
    type: GET_KPI_LIST,
    loading: true,
    status: null,
    message: null,
    data: []
  });
  try {
    const payload = await getKpiList(id);
    if (payload.data.status_code === Success) {
      if (payload.data.result) {
        const dataResult = payload.data.result;
        const dataKpi = dataResult.kpiList;
        const dataKpiMetrics = dataResult.labelList;
        const newData = [];
        dataKpi.map((itemKpi) => {
          if (itemKpi.othersRatingComments.id) {
            this.setState({ isFeedback: true });
          }
          let dataMetrics = itemKpi.metricLookup.map((metric) => {
            return `{"${metric.label}":""}`;
          });
          dataMetrics = JSON.parse(`[${dataMetrics.toString()}]`);
          dataMetrics = dataMetrics.reduce((result, current) => {
            return Object.assign(result, current);
          }, {});
          Object.keys(dataMetrics).map((newDataMetric, newIndex) => {
            return itemKpi.metricLookup.map((metric) => {
              if (newDataMetric === metric.label) {
                dataMetrics[newDataMetric] = `${itemKpi.achievementType === 0 ?
                  metric.achievementText : metric.achievementNumeric}`;
                return dataMetrics;
              }
              return null;
            });
          });
          const data = {
            key: itemKpi.id,
            id: itemKpi.id,
            cascadeType: itemKpi.cascadeType,
            cascadeName: itemKpi.cascadeName,
            kpi: itemKpi.name,
            baseline: itemKpi.baseline,
            weight: itemKpi.weight,
            achievementType: itemKpi.achievementType,
            metrics: dataKpiMetrics,
            ...dataMetrics,
            feedback: itemKpi.othersRatingComments.comment
          };
          newData.push(data);
        });
        dispatch({
          type: GET_KPI_LIST_SUCCESS,
          loading: false,
          status: payload.data.status_code,
          message: payload.data.status_description,
          data: payload.data.result,
          dataKpi: newData
        });
      } else {
        dispatch({
          type: GET_KPI_LIST_FAILED,
          loading: false,
          status: 9999,
          message: 'Internal server error',
          error: payload
        });
      }
    } else {
      dispatch({
        type: GET_KPI_LIST_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error?.response?.data) {
      dispatch({
        type: GET_KPI_LIST_FAILED,
        loading: false,
        status: error?.response?.data?.status,
        message: error?.response?.data?.error,
        error
      });
    } else {
      dispatch({
        type: GET_KPI_LIST_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const actionGetLatestGoalKPI = () => async (dispatch) => {
  dispatch({
    type: GET_LATEST_GOAL_KPI,
    loading: true,
    status: null,
    message: null,
    data: {}
  });
  try {
    const payload = await getLatestGoalKpi();
    if (payload.data.status_code === Success) {
      dispatch({
        type: GET_LATEST_GOAL_KPI_SUCCESS,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        data: payload.data.result
      });
    } else {
      dispatch({
        type: GET_LATEST_GOAL_KPI_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error?.response?.data) {
      dispatch({
        type: GET_LATEST_GOAL_KPI_FAILED,
        loading: false,
        status: error?.response?.data?.status,
        message: error?.response?.data?.error,
        error
      });
    } else {
      dispatch({
        type: GET_LATEST_GOAL_KPI_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};

export const actionGetManagerKPI = (id) => async (dispatch) => {
  dispatch({
    type: GET_KPI_MANAGER_LIST,
    loading: true,
    status: null,
    message: null,
    data: {}
  });
  try {
    const payload = await getKpiManagerList(id);
    if (payload.data.status_code === Success) {
      if (payload.data.result) {
        dispatch({
          type: GET_KPI_MANAGER_LIST_SUCCESS,
          loading: false,
          status: payload.data.status_code,
          message: payload.data.status_description,
          data: payload.data.result
        });
      } else {
        dispatch({
          type: GET_KPI_MANAGER_LIST_FAILED,
          loading: false,
          status: payload.data.status_code,
          message: payload.data.status_description,
          error: payload
        });
      }
    } else {
      dispatch({
        type: GET_KPI_MANAGER_LIST_FAILED,
        loading: false,
        status: payload.data.status_code,
        message: payload.data.status_description,
        error: payload
      });
    }
  } catch (error) {
    if (error?.response?.data) {
      dispatch({
        type: GET_KPI_MANAGER_LIST_FAILED,
        loading: false,
        status: error.response.data.status,
        message: error.response.data.error,
        error
      });
    } else {
      dispatch({
        type: GET_KPI_MANAGER_LIST_FAILED,
        loading: false,
        status: null,
        message: 'Something wrong',
        error
      });
    }
  }
};
