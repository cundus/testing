import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DataTable } from '../../../../components';

class TableDrafKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: []
    };
  }

  componentDidMount() {
    setTimeout(() => this.getColumns(), 10);
    // the settimeout would leaking memory (showing warn)
    // but i have to make it for getting a newest feedback props
  }

  getColumns = async () => {
     // the async await on this function would leaking memory (showing warn)
     // but i have to async await for making it table
    const { dataMetrics, isFeedback } = this.props;
    const newColumns = [
      {
        title: 'Cascading / Self KPI',
        dataIndex: 'typeKpi',
        align: 'center',
        width: 200,
        placeholder: 'Cascading/Self KPI',
        editable: false
      },
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
        width: 90,
        type: 'number',
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
    const Feedback = {
      title: 'Feedback',
      dataIndex: 'feedback',
      placeholder: 'Enter KPI Feedback',
      className: 'ant-table-th-yellow',
      align: 'center',
      editable: false
    };
    if (isFeedback) {
      await newColumns.push(Feedback);
    }
    this.setState({
      columns: newColumns
    });
  }

  render() {
    const { columns } = this.state;
    const {
      dataSource,
      loading
    } = this.props;
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

export default TableDrafKPI;

TableDrafKPI.propTypes = {
  dataSource: PropTypes.instanceOf(Array),
  dataMetrics: PropTypes.instanceOf(Array),
  isFeedback: PropTypes.bool,
  loading: PropTypes.bool
};
