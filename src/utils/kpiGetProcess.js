const kpiGetSelfProcess = (dataKpi, dataKpiMetrics) => {
  let feedback = false;
  const datas = dataKpi.map((itemKpi) => {
    if (itemKpi.othersRatingComments.id) {
      feedback = true;
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
      weight: itemKpi.weight ? parseFloat(itemKpi.weight) : parseFloat('0'),
      achievementType: itemKpi.achievementType,
      metrics: dataKpiMetrics,
      ...dataMetrics,
      feedback: itemKpi.othersRatingComments.comment
    };
    return data;
  });
  return {
    dataKpi: datas,
    isFeedback: feedback
  };
};

const kpiGetProcess = (dataKpi, dataKpiMetrics) => {
  const datas = dataKpi.map((itemKpi) => {
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
      cascadeType: null,
      cascadeName: itemKpi.cascadeName,
      kpi: itemKpi.name,
      baseline: itemKpi.baseline,
      weight: itemKpi.weight ? parseFloat(itemKpi.weight) : parseFloat('0'),
      achievementType: itemKpi.achievementType,
      metrics: dataKpiMetrics,
      rating: itemKpi.rating,
      ...dataMetrics
    };
    return data;
  });
  return datas
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
        weight: itemKpi.weight ? parseFloat(itemKpi.weight) : parseFloat('0'),
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
  kpiGetManagerProcess,
  kpiGetProcess
};
