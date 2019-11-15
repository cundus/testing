import React, { Component } from "react";
import { DataTable } from "../../../components";
import { Button, Popconfirm } from "antd";

class CascadePrevious extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "KPI",
        dataIndex: "kpi",
        placeholder: "Enter KPI subject"
      },
      {
        title: "2020 Baseline",
        dataIndex: "baseline",
        placeholder: "Enter 2020 baseline"
      },
      {
        title: "Weight (100%)",
        dataIndex: "weight",
        placeholder: "Enter KPI Weight",
        type: "number"
      },
      {
        title: "L1",
        dataIndex: "l1",
        placeholder: "Enter Level 1"
      },
      {
        title: "L2",
        dataIndex: "l2",
        placeholder: "Enter Level 2"
      },
      {
        title: "L3",
        dataIndex: "l3",
        placeholder: "Enter Level 3"
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
    const { columns, handleAdd, handleChange, handleDelete } = this;
    return (
      <div>
        {/* <Layout> */}
        <DataTable
          columns={columns}
          dataSource={dataSource}
          handleAdd={handleAdd}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
        {/* </Layout> */}
      </div>
    );
  }
}
export default CascadePrevious;
