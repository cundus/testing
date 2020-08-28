const kpiSendProcess = (dataSource, dataKpi, dataKpiMetrics) => {
  const newDataKpi = [];
  dataSource.map((itemKpi, iii) => {
    const newMetricValue = [];
    const datass = Object.keys(itemKpi);
    datass.map((m, index) => {
      if (dataKpi[iii]) {
        dataKpi[iii].metricLookup.map((metric) => {
          if (metric.label === datass[index]) {
            const mData = {
              id: metric.id,
              label: metric.label,
              achievementText: itemKpi.achievementType === 0 ? itemKpi[m] : '',
              achievementNumeric: itemKpi.achievementType === 1 ? parseFloat(itemKpi[m]) : 0
            };
            newMetricValue.push(mData);
          }
          return null;
        });
      } else {
        dataKpiMetrics.map((metric) => {
          if (metric.label === datass[index]) {
            const mData = {
              id: parseFloat(0),
              label: metric.label,
              achievementText: itemKpi.achievementType === 0 ? itemKpi[m] : '',
              achievementNumeric: itemKpi.achievementType === 1 ? parseFloat(itemKpi[m]) : 0
            };
            newMetricValue.push(mData);
          }
          return null;
        });
      }
      return null;
    });
    const data = {
      id: itemKpi.id,
      baseline: itemKpi.baseline,
      name: itemKpi.kpi,
      weight: itemKpi.weight ? parseFloat(itemKpi.weight) : parseFloat('0'),
      cascadeType: itemKpi.cascadeType,
      cascadeName: itemKpi.cascadeName,
      achievementType: itemKpi.achievementType,
      metricLookup: newMetricValue
    };
    newDataKpi.push(data);
    return newDataKpi;
  });
  return newDataKpi;
};

export default kpiSendProcess;
