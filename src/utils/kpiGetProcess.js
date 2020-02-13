const kpiGetSelfProcess = (dataKpi, dataKpiMetrics) => {
  return dataKpi.map((itemKpi) => {
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
    return data;
  });
};

const kpiGetManagerProcess = (dataManager, dataKpiManagerMetrics) => {
  if (dataManager.kpi) {
    return dataManager.kpi.map((itemKpi) => {
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
        id: 0,
        cascadeType: 1,
        cascadeName: `${dataManager.manager.firstName || ''} ${dataManager.manager.lastName || ''}`,
        kpi: itemKpi.name,
        baseline: itemKpi.baseline,
        weight: itemKpi.weight,
        achievementType: itemKpi.achievementType,
        metrics: dataKpiManagerMetrics,
        ...dataMetrics
      };
      return data;
    });
  } else {
    return [];
  }
};

export {
  kpiGetSelfProcess,
  kpiGetManagerProcess
};
