import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Select } from 'antd';
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
    this.setState({
      columns: newColumns,
      loading: false
    });
  }

  render() {
    const {
      dataSource
    } = this.props;
    const { columns, loading } = this.state;
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
