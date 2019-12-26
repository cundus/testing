export const metricValidator = (data) => [
  {
    required: true,
    message: `${data.title} is required`
  },
  {
    pattern: new RegExp('^[1]*?(?<Percentage>[1-9][0-9]?|100)?$'),
    message: 'Value must between 1 to 100'
  },
  {
    validator: async (rule, value, callback, source) => {
      const L1 = data.form.getFieldValue(`${data.type}[${data.indexarr}].L1`);
      const L2 = data.form.getFieldValue(`${data.type}[${data.indexarr}].L2`);
      const L3 = data.form.getFieldValue(`${data.type}[${data.indexarr}].L3`);
      if (L1 && L2 && L3) {
        if (parseFloat(L1) < parseFloat(L3)) {
          switch (data.title) {
            case 'L1':
              if (parseFloat(L1) >= parseFloat(L2)) {
                callback('Value must last than L2');
              }
              break;
            case 'L2':
              if (parseFloat(L2) >= parseFloat(L3)) {
                callback('Value must last than L3');
              } else if (parseFloat(L2) <= parseFloat(L1)) {
                callback('Value must bigger than L1');
              }
              break;
            case 'L3':
              if (parseFloat(L3) <= parseFloat(L2)) {
                callback('Value must bigger than L2');
              }
              break;
            default:
                  // code block
          }
        } else if (parseFloat(L1) > parseFloat(L3)) {
          switch (data.title) {
            case 'L1':
              if (parseFloat(L1) <= parseFloat(L2)) {
                callback('Value must bigger than L2');
              }
              break;
            case 'L2':
              if (parseFloat(L2) <= parseFloat(L3)) {
                callback('Value must bigger than L3');
              } else if (parseFloat(L2) >= parseFloat(L1)) {
                callback('Value must last than L1');
              }
              break;
            case 'L3':
              if (parseFloat(L3) >= parseFloat(L2)) {
                callback('Value must last than L2');
              }
              break;
            default:
                  // code block
          }
        } else if (parseFloat(L1) === parseFloat(L3)) {
          switch (data.title) {
            case 'L1':
              if (parseFloat(L1) === parseFloat(L2)) {
                callback('Value can\'t be same with L2');
              } else if (parseFloat(L1) === parseFloat(L3)) {
                callback('Value can\'t be same with L3');
              }
              break;
            case 'L2':
              if (parseFloat(L2) === parseFloat(L1)) {
                callback('Value can\'t be same with L1');
              } else if (parseFloat(L2) === parseFloat(L3)) {
                callback('Value can\'t be same with L3');
              }
              break;
            case 'L3':
              if (parseFloat(L3) === parseFloat(L2)) {
                callback('Value can\'t be same with L2');
              } else if (parseFloat(L3) === parseFloat(L1)) {
                callback('Value can\'t be same with L1');
              }
              break;
            default:
                  // code block
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
      const L1 = data.form.getFieldValue(`${data.type}[${data.indexarr}].L1`);
      const L2 = data.form.getFieldValue(`${data.type}[${data.indexarr}].L2`);
      const L3 = data.form.getFieldValue(`${data.type}[${data.indexarr}].L3`);
      if (L1 && L2 && L3) {
        switch (data.title) {
          case 'L1':
            if (L1 === L2) {
              callback('Value must different with L2');
            } else if (L1 === L2) {
              callback('Value must different with L3');
            }
            break;
          case 'L2':
            if (L2 === L1) {
              callback('Value must different with L1');
            } else if (L2 === L3) {
              callback('Value must different with L3');
            }
            break;
          case 'L3':
            if (L3 === L2) {
              callback('Value must different with L2');
            } else if (L3 === L1) {
              callback('Value must different with L1');
            }
            break;
          default:
                // code block
        }
      }
    }
  }
];
