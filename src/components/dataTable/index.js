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
  change = (e) => {
    const { record, handlechange, form } = this.props;
    setTimeout(() => {
      form.setFields((values) => {
        handlechange({ ...record, ...values });
      });
    }, 100);
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
      title,
      form
    } = this.props;
    const index = dataindex;
    const formIndex = index + record.key;
    if (index === 'kpi') {
      return (
        <div>
          <Form.Item style={{ margin: 0 }}>
            {form.getFieldDecorator(formIndex, {
              rules: [
                {
                  required: true,
                  message: `${title} is required`
                }
              ],
              initialValue: record[index]
            })(
              <TextArea
                id={`${title}-${index}-${record}`}
                placeholder={placeholder}
                autoSize={{ minRows: 2, maxRows: 4 }}
                onChange={this.change}
                disabled={!editable}
              />
          )}
          </Form.Item>
          <div style={{ flexDirection: 'row' }}>
            <Switch
              size="small"
              checked={record.achievementType !== 0}
              checkedChildren="Quantitative"
              style={{ width: '100%' }}
              onChange={this.changeSwitch}
              unCheckedChildren="Qualitative"
            />
          </div>
        </div>
      );
    } else {
      return (
        <Form.Item style={{ margin: 0 }}>
          { index === 'weight' ? form.getFieldDecorator(formIndex, {
            rules: [
              {
                required: true,
                message: 'Weight is required'
              },
              {
                pattern: new RegExp('^[0]*?(?<Percentage>[1-9][0-9]?|100)?$'),
                message: 'Weight\'s value must between 1 to 100'
              }
            ],
            initialValue: record[index]
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
              autoSize={{ minRows: 3, maxRows: 5 }}
              onChange={this.change}
              disabled={!editable}
            />
        ) : form.getFieldDecorator(formIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required`
            }
          ],
          initialValue: record[index]
        })(
          <TextArea
            id={`${title}-${formIndex}`}
            placeholder={placeholder}
            autoSize={{ minRows: 3, maxRows: 5 }}
            onChange={this.change}
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
            <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
          )}
      </td>
    );
  }
}

EditableCell.propTypes = {
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
