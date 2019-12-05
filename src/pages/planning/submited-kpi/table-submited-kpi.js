import React, { Component } from 'react';
import { DataTable } from '../../../components';

class TableDrafKPI extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Cascading / Self KPI',
        dataIndex: 'typeKpi',
        align: 'center',
        placeholder: 'Cascading/Self KPI',
        editable: false
      },
      {
        title: 'KPI Subject',
        dataIndex: 'description',
        align: 'center',
        placeholder: 'Enter KPI Subject',
        editable: false
      },
      {
        title: 'Baseline',
        dataIndex: 'baseline',
        align: 'center',
        placeholder: 'Enter baseline',
        editable: false
      },
      {
        title: 'Weight (%)',
        dataIndex: 'weight',
        align: 'center',
        placeholder: 'Enter KPI Weight',
        type: 'number',
        editable: false
      },
      {
        title: 'L1',
        dataIndex: 'L1',
        align: 'center',
        placeholder: 'Enter Level 1',
        editable: false
      },
      {
        title: 'L2',
        dataIndex: 'L2',
        align: 'center',
        placeholder: 'Enter Level 2',
        editable: false
      },
      {
        title: 'L3',
        dataIndex: 'L3',
        align: 'center',
        placeholder: 'Enter Level 3',
        editable: false
      }
    ];
  }

  render() {
    const { columns } = this;
    const { dataSource, loading } = this.props;
    return (
      <div>
        <DataTable
          loading={loading}
          columns={columns}
          datasource={dataSource}
        />
      </div>
    );
  }
}
export default TableDrafKPI;
