import React from 'react';
import {
  Table,
  Input,
  Form,
  Switch
} from 'antd';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

const { TextArea } = Input;

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  change = (index) => {
    const { record, handlechange, form } = this.props;
    setTimeout(() => form.validateFields((errors, values) => {
      const item = values.dataKpi[index];
      handlechange({
        ...record,
        ...item
      });
    }), 100);
  };


  changeSwitch = (checked) => {
    const { record, handlechange } = this.props;
    handlechange({
      ...record,
      achievementType: checked ? 1 : 0,
      L1: '',
      L2: '',
      L3: ''
    });
  };

  renderCell = () => {
    const {
      editable,
      dataindex,
      record,
      placeholder,
      indexarr,
      title,
      form
    } = this.props;
    const index = dataindex;
    const { typeKpi } = record;
    let type = '';
    if (typeKpi.includes('Self')) {
      type = 'dataKpi';
    } else {
      type = 'dataManagerKpi';
    }
    if (index === 'kpi') {
      return (
        <div>
          <Form.Item style={{ margin: 0 }}>
            {form.getFieldDecorator(`${type}[${indexarr}].${index}`, {
              rules: [
                {
                  required: true,
                  message: `${title} is required`
                }
              ],
              initialValue: record[index]
            })(
              <TextArea
                id={`${title}-${index}`}
                placeholder={placeholder}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={() => this.change(indexarr)}
                autoSize={{ minRows: 2, maxRows: 4 }}
                disabled={!editable}
              />
          )}
          </Form.Item>
          <div>
            <Switch
              size="small"
              checked={record.achievementType !== 0}
              style={{ width: '100%' }}
              onChange={this.changeSwitch}
              checkedChildren="Quantitative"
              unCheckedChildren="Qualitative"
            />
          </div>
        </div>
      );
    } else if (record.achievementType === 1 && title === 'L1') {
      return (
        <Form.Item style={{ margin: 0 }}>
          { form.getFieldDecorator(`${type}[${indexarr}].${index}`, {
            rules: [
              {
                required: true,
                message: `${title} is required`
              },
              {
                validator: async (rule, value, callback, source) => {
                  const L1 = form.getFieldValue(`${type}[${indexarr}].L1`);
                  const L2 = form.getFieldValue(`${type}[${indexarr}].L2`);
                  if (parseFloat(L1) >= parseFloat(L2)) {
                    callback('Value lower than L2');
                  }
                }
              }
            ],
            initialValue: record[index]
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() => this.change(indexarr)}
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={!editable}
            />
        )}
        </Form.Item>
      );
    } else if (record.achievementType === 1 && title === 'L2') {
      return (
        <Form.Item style={{ margin: 0 }}>
          { form.getFieldDecorator(`${type}[${indexarr}].${index}`, {
            rules: [
              {
                required: true,
                message: `${title} is required`
              },
              {
                validator: async (rule, value, callback, source) => {
                  const L1 = form.getFieldValue(`${type}[${indexarr}].L1`);
                  const L2 = form.getFieldValue(`${type}[${indexarr}].L2`);
                  const L3 = form.getFieldValue(`${type}[${indexarr}].L3`);
                  if (parseFloat(L2) >= parseFloat(L3)) {
                    callback('Value must lower than L3');
                  } else if (parseFloat(L2) <= parseFloat(L1)) {
                    callback('Value must higher than L1');
                  }
                }
              }
            ],
            initialValue: record[index]
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() => this.change(indexarr)}
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={!editable}
            />
        )}
        </Form.Item>
      );
    } else if (record.achievementType === 1 && title === 'L3') {
      return (
        <Form.Item style={{ margin: 0 }}>
          { form.getFieldDecorator(`${type}[${indexarr}].${index}`, {
            rules: [
              {
                required: true,
                message: `${title} is required`
              },
              {
                validator: async (rule, value, callback, source) => {
                  const L2 = form.getFieldValue(`${type}[${indexarr}].L2`);
                  const L3 = form.getFieldValue(`${type}[${indexarr}].L3`);
                  if (parseFloat(L3) <= parseFloat(L2)) {
                    callback('Value must higher than L2');
                  }
                }
              }
            ],
            initialValue: record[index]
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() => this.change(indexarr)}
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={!editable}
            />
        )}
        </Form.Item>
      );
    } else if (index === 'feedback') {
      return (
        <Form.Item style={{ margin: 0 }}>
          { form.getFieldDecorator(`${type}[${indexarr}].${index}`, {
            rules: [],
            initialValue: record[index]
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() => this.change(indexarr)}
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={!editable}
            />
          )}
        </Form.Item>
      );
    } else {
      return (
        <Form.Item style={{ margin: 0 }}>
          { index === 'weight' ? form.getFieldDecorator(`${type}[${indexarr}].${index}`, {
            rules: [
              {
                required: true,
                message: 'Weight is required'
              },
              {
                pattern: new RegExp('^[0]*?(?<Percentage>[1-9][0-9]?|100)?$'),
                message: 'Weight\'s value between 1 to 100'
              }
            ],
            initialValue: record[index]
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() => this.change(indexarr)}
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={!editable}
            />
        ) : form.getFieldDecorator(`${type}[${indexarr}].${index}`, {
          rules: [
            {
              required: true,
              message: `${title} is required`
            }
          ],
          initialValue: record[index]
        })(
          <TextArea
            id={`${title}-${index}`}
            placeholder={placeholder}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={() => this.change(indexarr)}
            autoSize={{ minRows: 3, maxRows: 5 }}
            disabled={!editable}
          />
        )}
        </Form.Item>
      );
    }
  };

  render() {
    const {
      children,
      editable,
      ...restProps
    } = this.props;
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <td {...restProps}>
        {!editable ? (
          <div
            className="editable-cell-value-wrap"
          >
            {children}
          </div>
          ) : (
            <div>
              <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
            </div>
          )}
      </td>
    );
  }
}

EditableCell.propTypes = {
  indexarr: PropTypes.number,
  color: PropTypes.string,
  editable: PropTypes.bool,
  dataindex: PropTypes.string,
  title: PropTypes.string,
  record: PropTypes.instanceOf(Object),
  index: PropTypes.string,
  handlechange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.instanceOf(Object),
  form: PropTypes.instanceOf(Object)
};

const DataTable = (props) => {
  const {
      datasource,
      handlechange,
      columns,
      loading,
      form
    } = props;

  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  const components = {
    body: {
      cell: EditableCell
    }
  };
  const columnList = columns.map((col) => {
    return {
      ...col,
      onCell: (record, index) => ({
        record,
        form,
        datasource,
        indexarr: index,
        editable: col.editable,
        dataindex: col.dataIndex,
        title: col.title,
        type: col.type,
        placeholder: col.placeholder,
        color: col.color,
        handlechange
      })
    };
  });

  return (
    <div>
      <Table
        form={form}
        loading={loading}
        components={components}
        rowClassName="editable-row"
        bordered
        dataSource={datasource}
        columns={columnList}
        scroll={isDesktopOrLaptop ? { x: false } : { x: true }}
        pagination={false}
        style={{ marginBottom: 10 }}
      />
    </div>
  );
};

export default DataTable;

DataTable.propTypes = {
  datasource: PropTypes.instanceOf(Array),
  handlechange: PropTypes.func,
  loading: PropTypes.bool,
  columns: PropTypes.instanceOf(Array),
  form: PropTypes.instanceOf(Object)
};
