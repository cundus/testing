import React, { Component } from 'react';
import { Button, Popconfirm } from 'antd';
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
        dataIndex: 'description',
        placeholder: 'Enter 2019 baseline',
        editable: true
      },
      {
        title: '2019 Baseline',
        dataIndex: 'baseline',
        placeholder: 'Enter 2019 baseline',
        editable: true
      },
      {
        title: 'Weight (100%)',
        dataIndex: 'weight',
        placeholder: 'Enter KPI Weight',
        type: 'number',
        editable: true
      },
      {
        title: 'L1',
        dataIndex: 'l1',
        placeholder: 'Enter Level 1',
        editable: true
      },
      {
        title: 'L2',
        dataIndex: 'l2',
        placeholder: 'Enter Level 2',
        editable: true
      },
      {
        title: 'L3',
        dataIndex: 'l3',
        placeholder: 'Enter Level 3',
        editable: true
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        action: true,
        render: (text, record) =>
          this.props.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.props.handleDelete(record.key)}
            >
              <Button>Delete</Button>
            </Popconfirm>
          ) : null
      }
    ];
  }

  render() {
    const { columns } = this;
    const { handleChange, dataSource } = this.props;
    return (
      <div>
        <DataTable
          columns={columns}
          dataSource={dataSource}
          handleChange={handleChange}
        />
      </div>
    );
  }
}
export default TableDrafKPI;
