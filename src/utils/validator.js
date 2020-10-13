export const metricValidator = (data) => [
  {
    required: true,
    message: `${data.title} is required`
  },
  {
    validator: async (rule, val, callback, source) => {
      const value = val.trim().toLowerCase()
      const { record } = data;
      let dataMetrics = record.metrics.map((metric) => {
        return `{"${metric.label}":""}`;
      });
      dataMetrics = JSON.parse(`[${dataMetrics.toString()}]`);
      dataMetrics = dataMetrics.reduce((result, current) => {
        return Object.assign(result, current);
      }, {});
      Object.keys(dataMetrics).map((newData, newIndex) => {
        return record.metrics.map((metric) => {
          if (newData === metric.label) {
            dataMetrics[newData] = `${data.form.getFieldValue(
              `${data.type}[${data.indexarr}].${metric.label}`
              )}`;
            return dataMetrics;
          }
          return null;
        });
      });
      let isFilled = true;
      let isError = false;
      let isSortedAsc = false;
      let isSortedDesc = false;
      const datas = Object.keys(dataMetrics);
      const datass = Object.values(dataMetrics);
      // const regexNumber = new RegExp('^[0-9]*$');
      const regexZero = new RegExp('^[0-0]*$');
      const regexPercent = new RegExp(/^(\d*\.)?\d+$/igm);
      const regexNumber = new RegExp(/[^0-9|.]/g);
      if (value) {
        if (regexZero.test(value)) {
          callback('Value must be more than 0');
        } else if (regexNumber.test(value)) {
          callback('Value must be a decimal, e.g 12.5');
        } else if (!regexPercent.test(value)) {
          callback('Value is invalid, e.g 12.5');
        } else {
          for (let index = 0; index < datas.length; index++) {
            const valuePerIndex = dataMetrics[datas[index]].trim().toLowerCase()
            if (!valuePerIndex) {
              isFilled = false;
              break;
            } else if (regexNumber.test(valuePerIndex)) {
              isError = true;
              break;
            }
          }
          if (isFilled) {
            const data1 = datass.map(
              (d) => (datass.filter((i) => i.trim().toLowerCase() === d.trim().toLowerCase())).length
            );
            // eslint-disable-next-line array-callback-return
            data1.filter((a, i) => {
              if (a > 1) {
                if (data.title.trim().toLowerCase() === datas[i].trim().toLowerCase()) {
                  callback('Value must be different');
                }
              }
            });
          }
          if (isFilled && !isError) {
            for (let index = 0; index < datas.length - 1; index++) {
              const valuePerIndex = dataMetrics[datas[index]].trim().toLowerCase()
              const valuePerIndexPlus1 = dataMetrics[datas[index + 1]].trim().toLowerCase()
              if (parseFloat(valuePerIndex) < parseFloat(valuePerIndexPlus1)) {
                isSortedAsc = true;
              } else {
                isSortedAsc = false;
                break;
              }
            }
            for (let index = 0; index < datas.length - 1; index++) {
              const valuePerIndex = dataMetrics[datas[index]].trim().toLowerCase()
              const valuePerIndexPlus1 = dataMetrics[datas[index + 1]].trim().toLowerCase()
              if (parseFloat(valuePerIndex) > parseFloat(valuePerIndexPlus1)) {
                isSortedDesc = true;
              } else {
                isSortedDesc = false;
                break;
              }
            }
            if (!isSortedAsc && !isSortedDesc) {
              callback('Target Must be Ascending/Descending');
            }
          }
        }
      }
    }
  }
];

export const validator = (data) => [
  {
    required: true,
    message: `${data.title} is required`
  }
];

export const kpiValidator = (data) => [
  {
    required: true,
    message: `${data.title} is required`
  },
  {
    validator: async (rule, value, callback, source) => {
      const dataKpis = [];
      for (let a = 0; a < data.indexlength; a++) {
        const datas = `${data.form.getFieldValue(
          `${data.type}[${a}].${data.index}`
          )}`;
        dataKpis.push(datas);
      }
      // eslint-disable-next-line array-callback-return
      dataKpis.map((kpi, index) => {
        if (index !== data.indexarr) {
          if (dataKpis[data.indexarr].trim().toLowerCase() === kpi.trim().toLowerCase()) {
            callback('KPI Subject should not be duplicate');
          }
        }
      });
    }
  }
];

export const weightValidator = () => [
  {
    validator: async (rule,value,callback,source) => {
      const regexNumber = new RegExp(/[^0-9|.]/g);
      let score = value?.toString()
      score = score?.trim().toLowerCase();
      if (!score) {
        callback('Weight is required')
      } else if(regexNumber.test(score)){
        callback('Weight\'s value must be decimal, e.g 20.5')
      }
    }
  }
]

export const achievementScoreValidator = (result) => [
  {
    validator: async (rule,value,callback,source) => {
      const regexPercent = new RegExp(
        /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/g
      );
      const regexNumber = new RegExp(/[^0-9|.]/g);
      let score = value?.toString()
      score = score.trim().toLowerCase();
      if (!value) {
        callback("Score is required");
      } else if (regexNumber.test(score)) {
        callback("Score's value must be decimal, e.g 2.5");
      } else if (result === "Below" && (score < 1 || score > 1.9)) {
        callback(
          "Out of range! Input range is between >= 1.0 until < 2.0"
        );
      } else if (result === "Meet" && (score < 2 || score > 2.9)) {
        callback(
          "Out of range! Input range is between >= 2.0 until < 3.0"
        );
      } else if (result === "Exceed" && (score < 3 || score > 4)) {
        callback(
          "Out of range! Input range is between >= 3.0 until <= 4.0"
        );
      } else if (!regexPercent.test(score)) {
        callback("Score's value must be decimal, e.g 2.5");
      }
    }
  }
];

export const metricValidatorText = (data) => [
  {
    required: true,
    message: `${data.title} is required`
  },
  {
    validator: async (rule, value, callback, source) => {
      const { record } = data;
      let dataMetrics = record.metrics.map((metric) => {
        return `{"${metric.label}":""}`;
      });
      dataMetrics = JSON.parse(`[${dataMetrics.toString()}]`);
      dataMetrics = dataMetrics.reduce((result, current) => {
        return Object.assign(result, current);
      }, {});
      Object.keys(dataMetrics).map((newData, newIndex) => {
        return record.metrics.map((metric) => {
          if (newData === metric.label) {
            dataMetrics[newData] = `${data.form.getFieldValue(
              `${data.type}[${data.indexarr}].${metric.label}`
              )}`;
            return dataMetrics;
          }
          return null;
        });
      });
      let isFilled = true;
      const datas = Object.keys(dataMetrics);
      const datass = Object.values(dataMetrics);
      const regexNumber = new RegExp('^[0-9]*$');
      if (value) {
        if (regexNumber.test(value)) {
          callback('Value must contain number and letter, or letter only.');
        } else {
          for (let index = 0; index < datas.length; index++) {
            if (!dataMetrics[datas[index]]) {
              isFilled = false;
              break;
            }
          }
          if (isFilled) {
            const data1 = datass.map(
              (d) => (datass.filter((i) => i.trim().toLowerCase() === d.trim().toLowerCase())).length
            );
            // eslint-disable-next-line array-callback-return
            data1.filter((a, i) => {
              if (a > 1) {
                if (data.title === datas[i]) {
                  callback('Value must be different');
                }
              }
            });
          }
        }
      }
    }
  }
];
