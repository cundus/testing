import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DataTable } from '../../../../components';

class TableDrafKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: []
    };
    this.getColumns();
  }

  getColumns = async () => {
    const { kpiReducers } = this.props;
    const { dataMetrics } = kpiReducers;
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
        dataIndex: 'description',
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

const mapStateToProps = (state) => ({
  kpiReducers: state.kpiReducers
});

const mapDispatchToProps = (dispatch) => ({});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableDrafKPI);

export default connectToComponent;

TableDrafKPI.propTypes = {
  dataSource: PropTypes.instanceOf(Array),
  kpiReducers: PropTypes.instanceOf(Object),
  loading: PropTypes.bool
};
