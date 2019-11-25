import React, { Component } from "react";
import { DataTable } from "../../../components";
import { Button, Popconfirm } from "antd";

class TableEditMyKPI extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'KPI Subject',
        dataIndex: 'description',
        placeholder: 'Enter 2020 baseline'
      },
      {
        title: '2019 Baseline',
        dataIndex: 'baseline',
        placeholder: 'Enter 2019 baseline'
      },
      {
        title: 'Weight (100%)',
        dataIndex: 'weight',
        placeholder: 'Enter KPI Weight',
        type: 'number'
      },
      {
        title: 'L1',
        dataIndex: 'L1',
        placeholder: 'Enter Level 1'
      },
      {
        title: 'L2',
        dataIndex: 'L2',
        placeholder: 'Enter Level 2'
      },
      {
        title: 'L3',
        dataIndex: 'L3',
        placeholder: 'Enter Level 3'
      },
      {
        title: 'Feedback',
        dataIndex: 'feedback',
        placeholder: 'Feedback',
        editable: true
      }
    ];
  }

  render() {
    const { dataSource } = this.props;
    const { columns } = this;
    const {handleChange } = this.props;
    return (
      <div>
        {/* <Layout> */}
        <DataTable
          columns={columns}
          dataSource={dataSource}
          handleChange={handleChange}
        />
        {/* </Layout> */}
      </div>
    );
  }
}
export default TableEditMyKPI;
