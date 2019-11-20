import React, { Component } from 'react';
import { DataTable } from '../../../components';

class TableDrafKPI extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Cascading/Self KPI',
        dataIndex: 'typeKpi',
        placeholder: 'Cascading/Self KPI',
        editable: false
      },
      {
        title: 'KPI Subject',
        dataIndex: 'kpi',
        placeholder: 'Enter 2020 baseline',
        editable: false
      },
      {
        title: '2019 Baseline',
        dataIndex: 'baseline',
        placeholder: 'Enter 2019 baseline',
        editable: false
      },
      {
        title: 'Weight (100%)',
        dataIndex: 'weight',
        placeholder: 'Enter KPI Weight',
        type: 'number',
        editable: false
      },
      {
        title: 'L1',
        dataIndex: 'l1',
        placeholder: 'Enter Level 1',
        editable: false
      },
      {
        title: 'L2',
        dataIndex: 'l2',
        placeholder: 'Enter Level 2',
        editable: false
      },
      {
        title: 'L3',
        dataIndex: 'l3',
        placeholder: 'Enter Level 3',
        editable: false
      }
    ];
  }

  render() {
    const { columns } = this;
    const { dataSource } = this.props;
    return (
      <div>
        <DataTable
          columns={columns}
          dataSource={dataSource}
        />
      </div>
    );
  }
}
export default TableDrafKPI;
