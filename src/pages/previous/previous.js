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


  checkStatus = (record) => {
    const { dataSelectedCascade } = this.props;
    const dataChecking = dataSelectedCascade.filter((item) => item.kpi === record.kpi);
    if (dataChecking.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const {
      dataSource, handleSaveDraft, handleError, dataSelectedCascade
    } = this.props;
    const { columns, loading } = this.state;
    return (
      <div>
        <Select
          placeholder="Select Performance"
          style={{minWidth: 300}}
        >
          {/* <Select.Option></Select.Option> */}
        </Select>
        <DataTable
          columns={columns}
          loading={loading}
          datasource={dataSource}
          handleerror={handleError}
          // it (lowercase) handle vdom warn, but another vdom valid function err show
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
