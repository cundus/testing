import React from 'react';
import {
  Table,
  Input,
  InputNumber,
  Form
} from 'antd';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

const { TextArea } = Input;

const EditableContext = React.createContext();

const EditableRow = ({ form, ...props }) => (
  <EditableContext.Provider value={form}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

EditableRow.propTypes = {
  form: PropTypes.instanceOf(Object)
};

class EditableCell extends React.Component {
  change = (e) => {
    const { record, handleChange } = this.props;
    setTimeout(() => {
      this.form.validateFields((error, values) => {
        handleChange({ ...record, ...error, ...values });
      });
    }, 100);
  };

  renderCell = (form) => {
    this.form = form;
    const {
      editable,
      dataIndex,
      record,
      placeholder,
      type,
      title
    } = this.props;

    return (
      <Form.Item style={{ margin: 0 }}>
        { type === 'number' ? form.getFieldDecorator(dataIndex, {
          rules: [
            {
              min: 1,
              max: 100,
              type: 'number',
              required: true
            }
          ],
          initialValue: record[dataIndex]
        })(
          <InputNumber
            id={title}
            placeholder={placeholder}
            autoSize={{ minRows: 3, maxRows: 5 }}
            onChange={this.change}
            disabled={!editable}
          />
        ) : form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true
            }
          ],
          initialValue: record[dataIndex]
        })(
          <TextArea
            id={title}
            placeholder={placeholder}
            autoSize={{ minRows: 3, maxRows: 5 }}
            onChange={this.change}
            disabled={!editable}
          />
        )}
      </Form.Item>
    );
  };

  render() {
    const {
      children,
      action,
      ...restProps
    } = this.props;

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <td {...restProps}>
        {action ? (
          children
        ) : (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        )}
      </td>
    );
  }
}

EditableCell.propTypes = {
  editable: PropTypes.bool,
  dataIndex: PropTypes.string,
  title: PropTypes.string,
  record: PropTypes.instanceOf(Object),
  index: PropTypes.string,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.instanceOf(Object),
  action: PropTypes.bool
};

const DataTable = (props) => {
  const { dataSource, handleChange, columns } = props;

  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });

  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell
    }
  };
  const columnList = columns.map((col) => {
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        type: col.type,
        action: col.action,
        placeholder: col.placeholder,
        handleChange
      })
    };
  });
  return (
    <div>
      <Table
        components={components}
        rowClassName="editable-row"
        bordered
        dataSource={dataSource}
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
  dataSource: PropTypes.instanceOf(Array),
  handleChange: PropTypes.func,
  columns: PropTypes.instanceOf(Array)
};
