import React from 'react';
import {
  Table,
  Input,
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
    const { record, handlechange, handleerror } = this.props;
    setTimeout(() => {
      this.form.validateFields((error, values) => {
        handlechange({ ...record, ...error, ...values });
        if (error) {
          handleerror(true);
        } else {
          handleerror(false);
        }
      });
    }, 100);
  };

  renderCell = (form) => {
    this.form = form;
    const {
      editable,
      dataindex,
      record,
      placeholder,
      type,
      title
    } = this.props;
    const index = dataindex;
    return (
      <Form.Item style={{ margin: 0 }}>
        { type === 'number' ? form.getFieldDecorator(index, {
          rules: [
            {
              required: true,
              pattern: new RegExp('^[0]*?(?<Percentage>[1-9][0-9]?|100)%?$'),
              message: `${title} is wrong`
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
        ) : form.getFieldDecorator(index, {
          rules: [
            {
              required: true
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
        )}
      </Form.Item>
    );
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
  editable: PropTypes.bool,
  dataindex: PropTypes.string,
  title: PropTypes.string,
  record: PropTypes.instanceOf(Object),
  index: PropTypes.string,
  handlechange: PropTypes.func,
  handleerror: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.instanceOf(Object)
};

const DataTable = (props) => {
  const {
    datasource,
    handlechange,
    columns,
    handleerror,
    loading
  } = props;

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
        dataindex: col.dataIndex,
        title: col.title,
        type: col.type,
        placeholder: col.placeholder,
        handlechange,
        handleerror
      })
    };
  });
  return (
    <div>
      <Table
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
  handleerror: PropTypes.func,
  loading: PropTypes.bool,
  columns: PropTypes.instanceOf(Array)
};
