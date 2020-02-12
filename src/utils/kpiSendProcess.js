const kpiSendProcess = (dataSource, dataKpi) => {
  const newDataKpi = [];
  dataSource.map((itemKpi, iii) => {
    const newMetricValue = [];
    const datass = Object.keys(itemKpi);
    datass.map((m, index) => {
      return dataKpi[iii].metricLookup.map((metric) => {
        if (metric.label === datass[index]) {
          const mData = {
            id: metric.id,
            label: metric.label,
            achievementText: itemKpi.achievementType === 0 ? itemKpi[m] : '',
            achievementNumeric: parseFloat(itemKpi.achievementType === 1 ? itemKpi[m] : '')
          };
          newMetricValue.push(mData);
        }
        return null;
      });
    });
    const data = {
      id: itemKpi.id,
      baseline: itemKpi.baseline,
      name: itemKpi.kpi,
      weight: itemKpi.weight,
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
