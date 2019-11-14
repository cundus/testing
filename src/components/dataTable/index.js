import React from "react";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import "antd/dist/antd.css";
import "./dataTable-style.scss";

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
    const { /*children,*/ dataIndex, record/*, title*/ } = this.props;
    // const { editing } = this.state;
    return (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          initialValue: record[dataIndex]
        })(
          <TextArea
            ref={node => (this.input = node)}
            autoSize={{ minRows: 3, maxRows: 5 }}
            onChange={this.change}
          />
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

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "KPI",
        dataIndex: "kpi",
        editable: true
      },
      {
        title: "2019 Baseline",
        dataIndex: "baseline",
        editable: true
      },
      {
        title: "Weight (100%)",
        dataIndex: "weight",
        editable: true
      },
      {
        title: "L1",
        dataIndex: "l1",
        editable: true
      },
      {
        title: "L2",
        dataIndex: "l2",
        editable: true
      },
      {
        title: "L3",
        dataIndex: "l3",
        editable: true
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <Button>Delete</Button>
            </Popconfirm>
          ) : null
      }
    ];

    this.state = {
      dataSource: [
        {
          key: 0,
          kpi: "",
          baseline: "",
          weight: "",
          l1: "",
          l2: "",
          l3: ""
        }
      ],
      count: 1
    };
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      kpi: "",
      baseline: "",
      weight: "",
      l1: "",
      l2: "",
      l3: ""
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1
    });
  };

  handleChange = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    // console.log(dataSource);

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
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
          handleChange: this.handleChange
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
            columns={columns}
            scroll={{ x: true}}
          />
          <Button
            onClick={this.handleAdd}
            type="primary"
            style={{ marginBottom: 16 }}
          >
            Add a row
          </Button>
      </div>
    );
  }
}

export default DataTable;
