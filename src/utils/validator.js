export const metricValidator = (data) => [
  {
    required: true,
    message: `${data.title} is required`
  },
  {
    validator: async (rule, value, callback, source) => {
      const { record } = data;
      let dataMetrics = record.metrics.map((metric) => {
        return `{"${metric.label}":
        "${data.form.getFieldValue(
          `${data.type}[${data.indexarr}].${metric.label}`
          )}"}`;
      });
      dataMetrics = JSON.parse(`[${dataMetrics.toString()}]`);
      dataMetrics = dataMetrics.reduce((result, current) => {
        return Object.assign(result, current);
      }, {});
      let isFilled = true;
      let isError = false;
      let isSortedAsc = false;
      let isSortedDesc = false;
      const datas = Object.keys(dataMetrics);
      const regexNumber = new RegExp('^[0-9]*$');
      const regexZero = new RegExp('^[0-0]*$');
      if (value) {
        if (regexZero.test(value)) {
          callback('Value must be not a zero');
        } else if (!regexNumber.test(value)) {
          callback('Value must be a number');
        } else {
          for (let index = 0; index < datas.length; index++) {
            if (!dataMetrics[datas[index]]) {
              isFilled = false;
              break;
            } else if (regexZero.test(dataMetrics[datas[index]])) {
              isError = true;
              break;
            } else if (!regexNumber.test(dataMetrics[datas[index]])) {
              isError = true;
              break;
            }
          }
          if (isFilled && !isError) {
            for (let index = 0; index < datas.length - 1; index++) {
              if (parseFloat(dataMetrics[datas[index]]) < parseFloat(dataMetrics[datas[index + 1]])) {
                isSortedAsc = true;
              } else {
                isSortedAsc = false;
                break;
              }
            }
            for (let index = 0; index < datas.length - 1; index++) {
              if (parseFloat(dataMetrics[datas[index]]) > parseFloat(dataMetrics[datas[index + 1]])) {
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
          if (dataKpis[data.indexarr] === kpi) {
            callback('KPI Subject should not be duplicate');
          }
        }
      });
    }
  }
];

export const weightValidator = () => [
  {
    required: true,
    message: 'Weight is required'
  },
  {
    pattern: new RegExp('^[1]*?(?<Percentage>[1-9][0-9]?|100)?$'),
    message: 'Weight\'s value must between 1 to 100'
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
        return `{"${metric.label}":
        "${data.form.getFieldValue(
          `${data.type}[${data.indexarr}].${metric.label}`
          )}"}`;
      });
      dataMetrics = JSON.parse(`[${dataMetrics.toString()}]`);
      dataMetrics = dataMetrics.reduce((result, current) => {
        return Object.assign(result, current);
      }, {});
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
              (d) => (datass.filter((i) => i === d)).length
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
