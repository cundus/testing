export const metricValidator = (data) => [
  {
    required: true,
    message: `${data.title} is required`
  },
  {
    validator: async (rule, value, callback, source) => {
      const Below = data.form.getFieldValue(`${data.type}[${data.indexarr}].Below`);
      const Meet = data.form.getFieldValue(`${data.type}[${data.indexarr}].Meet`);
      const Exceed = data.form.getFieldValue(`${data.type}[${data.indexarr}].Exceed`);
      const regexNumber = new RegExp('^[0-9]*$');
      const regexZero = new RegExp('^[0-0]*$');
      switch (data.title) {
        case 'Below':
          if (regexZero.test(Below)) {
            callback('Value must be not a zero');
          } else if (!regexNumber.test(Below)) {
            callback('Value must be a number');
          } else if (Below && Meet && Exceed) {
            if (parseFloat(Below) < parseFloat(Meet)) {
              if (!(parseFloat(Meet) < parseFloat(Exceed))) {
                callback('Target Must be Ascending/Descending');
              }
            } else if (parseFloat(Below) > parseFloat(Meet)) {
              if (!(parseFloat(Meet) > parseFloat(Exceed))) {
                callback('Target Must be Ascending/Descending');
              }
            } else {
              callback('Target Must be Ascending/Descending');
            }
          }
          break;
        case 'Meet':
          if (regexZero.test(Meet)) {
            callback('Value must be not a zero');
          } else if (!regexNumber.test(Meet)) {
            callback('Value must be a number');
          } else if (Below && Meet && Exceed) {
            if (parseFloat(Below) < parseFloat(Meet)) {
              if (!(parseFloat(Meet) < parseFloat(Exceed))) {
                callback('Target Must be Ascending/Descending');
              }
            } else if (parseFloat(Below) > parseFloat(Meet)) {
              if (!(parseFloat(Meet) > parseFloat(Exceed))) {
                callback('Target Must be Ascending/Descending');
              }
            } else {
              callback('Target Must be Ascending/Descending');
            }
          }
          break;
        case 'Exceed':
          if (regexZero.test(Exceed)) {
            callback('Value must be not a zero');
          } else if (!regexNumber.test(Exceed)) {
            callback('Value must be a number');
          } else if (Below && Meet && Exceed) {
            if (parseFloat(Below) < parseFloat(Meet)) {
              if (!(parseFloat(Meet) < parseFloat(Exceed))) {
                callback('Target Must be Ascending/Descending');
              }
            } else if (parseFloat(Below) > parseFloat(Meet)) {
              if (!(parseFloat(Meet) > parseFloat(Exceed))) {
                callback('Target Must be Ascending/Descending');
              }
            } else {
              callback('Target Must be Ascending/Descending');
            }
          }
          break;
        default:
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
      const Below = data.form.getFieldValue(`${data.type}[${data.indexarr}].Below`);
      const Meet = data.form.getFieldValue(`${data.type}[${data.indexarr}].Meet`);
      const Exceed = data.form.getFieldValue(`${data.type}[${data.indexarr}].Exceed`);
      if (Below && Meet && Exceed) {
        switch (data.title) {
          case 'Below':
            if (Below === Meet) {
              callback('Value must different with Meet');
            } else if (Below === Meet) {
              callback('Value must different with Exceed');
            }
            break;
          case 'Meet':
            if (Meet === Below) {
              callback('Value must different with Below');
            } else if (Meet === Exceed) {
              callback('Value must different with Exceed');
            }
            break;
          case 'Exceed':
            if (Exceed === Meet) {
              callback('Value must different with Meet');
            } else if (Exceed === Below) {
              callback('Value must different with Below');
            }
            break;
          default:
                // code block
        }
      }
    }
  }
];
