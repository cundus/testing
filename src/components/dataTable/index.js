import React from 'react';
import {
  Table,
  Input,
  Form,
  Select,
  Typography
} from 'antd';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import {
  metricValidator, validator, weightValidator, metricValidatorText
} from '../../utils/validator';

const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  change = (index, field) => {
    const { record, handlechange, form } = this.props;
    setTimeout(() => form.validateFields(field, (errors, values) => {
      const item = values.dataKpi[index];
      handlechange({
        ...record,
        ...item
      });
    }), 100);
  };

  changeSwitch = (value) => {
    const { record, handlechange } = this.props;
    handlechange({
      ...record,
      achievementType: value === 'Qualitative' ? 0 : 1,
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
    const { cascadeType } = record;
    let type = '';
    if (cascadeType === 1) {
      type = 'dataManagerKpi';
    } else {
      type = 'dataKpi';
    }
    let valueType = 'Select type"';
    if (record.achievementType === 0) {
      valueType = 'Qualitative';
    } else if (record.achievementType === 1) {
      valueType = 'Quantitative';
    }
    const data = {
      index,
      title,
      type,
      indexarr,
      form
    };
    if (index === 'kpi') { // kpi contain type of metrics
      return (
        <div>
          <Form.Item style={{ margin: 0 }}>
            {form.getFieldDecorator(`${type}[${indexarr}].${index}`, {
              rules: validator(data),
              initialValue: record[index]
            })(
              <TextArea
                id={`${title}-${index}`}
                placeholder={placeholder}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={() => this.change(indexarr, [`${type}[${indexarr}].${index}`])}
                autoSize={{ minRows: 2, maxRows: 4 }}
                disabled={!editable}
              />
          )}
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text style={{ width: '20%' }}>Type:</Text>
            <Select
              size="small"
              defaultValue={valueType}
              placeholder="Select type"
              onChange={this.changeSwitch}
              style={{ width: '80%', color: valueType === 'Quantitative' ? '#52c41a' : '#' }}
            >
              <Option key="Qualitative"><Text style={{}}>Qualitative</Text></Option>
              <Option key="Quantitative"><Text style={{ color: '#52c41a' }}>Quantitative</Text></Option>
            </Select>
          </div>
        </div>
      );
    } else if (record.achievementType === 1 && index === 'L1') { // Quantitative
      return (
        <Form.Item style={{ margin: 0 }}>
          { form.getFieldDecorator(`${type}[${indexarr}].${title}`, {
            rules: metricValidator(data),
            initialValue: record[index]
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() => this.change(indexarr, [
                `${type}[${indexarr}].L1`,
                `${type}[${indexarr}].L2`,
                `${type}[${indexarr}].L3`
              ])}
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={!editable}
            />
        )}
        </Form.Item>
      );
    } else if (record.achievementType === 1 && index === 'L2') { // Quantitative
      return (
        <Form.Item style={{ margin: 0 }}>
          { form.getFieldDecorator(`${type}[${indexarr}].${title}`, {
            rules: metricValidator(data),
            initialValue: record[index]
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() => this.change(indexarr, [
                `${type}[${indexarr}].L1`,
                `${type}[${indexarr}].L2`,
                `${type}[${indexarr}].L3`
              ])}
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={!editable}
            />
        )}
        </Form.Item>
      );
    } else if (record.achievementType === 1 && index === 'L3') { // Quantitative
      return (
        <Form.Item style={{ margin: 0 }}>
          { form.getFieldDecorator(`${type}[${indexarr}].${title}`, {
            rules: metricValidator(data),
            initialValue: record[index]
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() => this.change(indexarr, [
                `${type}[${indexarr}].L1`,
                `${type}[${indexarr}].L2`,
                `${type}[${indexarr}].L3`
              ])}
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={!editable}
            />
        )}
        </Form.Item>
      );
    } else if (record.achievementType === 0 && index === 'L1') { // Quantitative
      return (
        <Form.Item style={{ margin: 0 }}>
          { form.getFieldDecorator(`${type}[${indexarr}].${title}`, {
            rules: metricValidatorText(data),
            initialValue: record[index]
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
               // eslint-disable-next-line react/jsx-no-bind
              onChange={() => this.change(indexarr, [
                `${type}[${indexarr}].L1`,
                `${type}[${indexarr}].L2`,
                `${type}[${indexarr}].L3`
              ])}
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={!editable}
            />
        )}
        </Form.Item>
      );
    } else if (record.achievementType === 0 && index === 'L2') { // Quantitative
      return (
        <Form.Item style={{ margin: 0 }}>
          { form.getFieldDecorator(`${type}[${indexarr}].${title}`, {
            rules: metricValidatorText(data),
            initialValue: record[index]
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() => this.change(indexarr, [
                `${type}[${indexarr}].L1`,
                `${type}[${indexarr}].L2`,
                `${type}[${indexarr}].L3`
              ])}
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={!editable}
            />
        )}
        </Form.Item>
      );
    } else if (record.achievementType === 0 && index === 'L3') { // Quantitative
      return (
        <Form.Item style={{ margin: 0 }}>
          { form.getFieldDecorator(`${type}[${indexarr}].${title}`, {
            rules: metricValidatorText(data),
            initialValue: record[index]
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() => this.change(indexarr, [
                `${type}[${indexarr}].L1`,
                `${type}[${indexarr}].L2`,
                `${type}[${indexarr}].L3`
              ])}
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={!editable}
            />
        )}
        </Form.Item>
      );
    } else if (index === 'feedback') { // Feedback
      return (
        <Form.Item style={{ margin: 0 }}>
          { form.getFieldDecorator(`${type}[${indexarr}].${index}`, {
            // rules: validator(data),
            initialValue: record[index]
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() => this.change(indexarr, [`${type}[${indexarr}].${index}`])}
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
            rules: weightValidator(),
            initialValue: record[index]
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() => this.change(indexarr, [`${type}[${indexarr}].${index}`])}
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={!editable}
            />
          ) : form.getFieldDecorator(`${type}[${indexarr}].${index}`, {
            rules: validator(data),
            initialValue: record[index]
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() => this.change(indexarr, [`${type}[${indexarr}].${index}`])}
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={!editable}
            />
          )}
        </Form.Item>
      );
    }
  };

  disableCell = () => {
    const {
      dataindex,
      record,
      children
    } = this.props;
    const index = dataindex;
    let valueType = 'Select type"';
    if (record.achievementType === 0) {
      valueType = 'Qualitative';
    } else if (record.achievementType === 1) {
      valueType = 'Quantitative';
    }
    if (index === 'kpi') {
      return (
        <div>
          <div className="editable-cell-value-wrap">
            {record[index]}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text style={{ width: '20%' }}>Type:</Text>
            <Select
              size="small"
              defaultValue={valueType}
              placeholder="Select type"
              style={{ width: '80%', color: valueType === 'Quantitative' ? '#9ced74' : '#' }}
              disabled
            >
              <Option key="Qualitative">Qualitative</Option>
              <Option key="Quantitative">Quantitative</Option>
            </Select>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="editable-cell-value-wrap">
            {children}
          </div>
        </div>
      );
    }
  };

  render() {
    const {
      editable,
      ...restProps
    } = this.props;
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <td {...restProps}>
        {!editable ? (
          <div>
            <EditableContext.Consumer>{this.disableCell}</EditableContext.Consumer>
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
