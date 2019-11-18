import React from "react";
import { Table, Input, InputNumber, Form } from "antd";
import "antd/dist/antd.css";
import "./dataTable-style.scss";
import { useMediaQuery } from "react-responsive";

const { TextArea } = Input;

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  change = e => {
    const { record, handleChange } = this.props;
    this.form.validateFields((error, values) => {
      handleChange({ ...record, ...values });
    });
  };

  renderCell = form => {
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
        {form.getFieldDecorator(dataIndex, {
          initialValue: record[dataIndex]
        })(
          type === "number" ? (
            <InputNumber
              id={title}
              className="input"
              ref={node => (this.input = node)}
              placeholder={placeholder}
              type={type}
              onChange={this.change}
              disabled={!editable}
            />
          ) : (
            <TextArea
              id={title}
              className="input"
              ref={node => (this.input = node)}
              placeholder={placeholder}
              autoSize={{ minRows: 3, maxRows: 5 }}
              onChange={this.change}
              disabled={!editable}
            />
          )
        )}
      </Form.Item>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleChange,
      children,
      action,
      ...restProps
    } = this.props;

    return (
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

const DataTable = props => {
  const { dataSource, handleChange, columns } = props;

  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });

  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell
    }
  };
  const columnList = columns.map(col => {
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        type: col.type,
        action: col.action,
        placeholder: col.placeholder,
        handleChange: handleChange
      })
    };
  });
  return (
    <div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
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
