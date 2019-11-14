import React from "react";
import { Table, Input, InputNumber, Button, Form } from "antd";
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
  state = {
    editing: true
  };

  change = e => {
    const { record, handleChange } = this.props;
    this.form.validateFields((error, values) => {
      handleChange({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const {
      /*children,*/ dataIndex,
      record,
      placeholder,
      type /*, title*/
    } = this.props;
    // const { editing } = this.state;
    return (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          initialValue: record[dataIndex]
        })(
          type === "number" ? (
            <InputNumber
              ref={node => (this.input = node)}
              placeholder={placeholder}
              type={type}
              autoSize={{ minRows: 3, maxRows: 5 }}
              onChange={this.change}
            />
          ) : (
            <TextArea
              ref={node => (this.input = node)}
              placeholder={placeholder}
              autoSize={{ minRows: 3, maxRows: 5 }}
              onChange={this.change}
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
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

const DataTable = (props) => {
    const { dataSource, handleChange, handleAdd, columns } = props;

    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columnList = columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          type: col.type,
          placeholder: col.placeholder,
          numberType: col.numberType,
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
        />
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
      </div>
    );
  }

export default DataTable;
