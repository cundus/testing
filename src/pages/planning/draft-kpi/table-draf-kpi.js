import React, { Component } from 'react';
import {
  Button,
  Popconfirm,
  Tooltip,
  Icon
} from 'antd';
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
        editable: true
      },
      {
        title: 'Baseline',
        dataIndex: 'baseline',
        align: 'center',
        placeholder: 'Enter baseline',
        editable: true
      },
      {
        title: 'Weight (%)',
        dataIndex: 'weight',
        align: 'center',
        placeholder: 'Enter KPI Weight',
        type: 'number',
        editable: true
      },
      {
        title: 'L1',
        dataIndex: 'L1',
        align: 'center',
        placeholder: 'Enter Level 1',
        editable: true
      },
      {
        title: 'L2',
        dataIndex: 'L2',
        align: 'center',
        placeholder: 'Enter Level 2',
        editable: true
      },
      {
        title: 'L3',
        dataIndex: 'L3',
        align: 'center',
        placeholder: 'Enter Level 3',
        editable: true
      },
      {
        title: 'Action',
        align: 'center',
        dataIndex: 'action',
        action: true,
        render: (text, record) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          (this.props.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              // eslint-disable-next-line react/jsx-no-bind
              onConfirm={() => this.props.handleDelete(record.key)}
            >
              <Tooltip placement="bottomRight" title="delete">
                <Button type="danger" ghost>
                  <Icon type="delete" />
                </Button>
              </Tooltip>
            </Popconfirm>
          ) : null)
      }
    ];
  }

  render() {
    const { columns } = this;
    const { handleChange, dataSource, handleError, loading } = this.props;
    return (
      <div>
        <DataTable
          loading={loading}
          columns={columns}
          handleError={handleError}
          dataSource={dataSource}
          handleChange={handleChange}
        />
      </div>
    );
  }
}
export default TableDrafKPI;
