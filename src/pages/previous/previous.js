import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Select, Typography } from 'antd';
import { DataTable } from '../../components';

class Previous extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      loading: true
    };
    this.getColumns();
  }

  getColumns = async () => {
    // the async await on this function would leaking memory (showing warn)
    // but i have to async await for making it table
    const { dataMetrics } = this.props;
    const newColumns = [
      {
        title: 'KPI Subject',
        dataIndex: 'kpi',
        placeholder: 'Enter KPI Subject',
        align: 'center',
        width: 200,
        editable: false
      },
      {
        title: 'Baseline',
        dataIndex: 'baseline',
        placeholder: 'Enter baseline',
        align: 'center',
        width: 200,
        editable: false
      },
      {
        title: 'Weight (%)',
        dataIndex: 'weight',
        placeholder: 'Enter KPI Weight',
        align: 'center',
        type: 'number',
        width: 90,
        editable: false
      }
    ];
    // eslint-disable-next-line array-callback-return
    await dataMetrics.map((itemMetric) => {
      const data = {
        title: itemMetric.label,
        dataIndex: itemMetric.label,
        placeholder: `Enter Level ${itemMetric.orderNo}`,
        align: 'center',
        width: 150,
        editable: false
      };
      newColumns.push(data);
    });
    const result = {
      title: 'Result',
      align: 'center',
      editable: false,
      width: 100,
      dataIndex: 'rating',
      render: (text, record) => {
        let colorring = 'default';
        if (text === 'Below') {
          colorring = '#d1a145';
        } else if (text === 'Meet') {
          colorring = '#4ebf37';
        } else if (text === 'Exceed') {
          colorring = '#484ef0';
        }
        return (
          <Typography.Text strong style={{ color: colorring }}>{text || ''}</Typography.Text>
        );
      }
    };
    newColumns.push(result);
    this.setState({
      columns: newColumns,
      loading: false
    });
  }

  render() {
    const {
      dataSource,
      loading
    } = this.props;
    const { columns } = this.state;
    return (
      <div>
        <DataTable
          columns={columns}
          loading={loading}
          datasource={dataSource}
        />
      </div>
    );
  }
}

export default Previous;

Previous.propTypes = {
  dataSource: PropTypes.instanceOf(Array),
  dataSelectedCascade: PropTypes.instanceOf(Array),
  handleSaveDraft: PropTypes.func,
  handleSelectData: PropTypes.func,
  handleError: PropTypes.func,
  dataMetrics: PropTypes.instanceOf(Array)
};
