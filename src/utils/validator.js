export const metricValidator = (data) => [
  {
    required: true,
    message: `${data.title} is required`
  },
  {
    validator: async (rule, value, callback, source) => {
      const L1 = data.form.getFieldValue(`${data.type}[${data.indexarr}].L1`);
      const L2 = data.form.getFieldValue(`${data.type}[${data.indexarr}].L2`);
      const L3 = data.form.getFieldValue(`${data.type}[${data.indexarr}].L3`);
      switch (data.title) {
        case 'L1':
          if (parseFloat(L1) >= parseFloat(L2)) {
            callback('Value must lower than L2');
          }
          break;
        case 'L2':
          if (parseFloat(L2) >= parseFloat(L3)) {
            callback('Value must lower than L3');
          } else if (parseFloat(L2) <= parseFloat(L1)) {
            callback('Value must higher than L1');
          }
          break;
        case 'L3':
          if (parseFloat(L3) <= parseFloat(L2)) {
            callback('Value must higher than L2');
          }
          break;
        default:
              // code block
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

export const weightValidator = (data) => [
  {
    required: true,
    message: 'Weight is required'
  },
  {
    pattern: new RegExp('^[0]*?(?<Percentage>[1-9][0-9]?|100)?$'),
    message: 'Weight\'s value must between 1 to 100'
  }
];
