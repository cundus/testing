import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DataTable } from '../../../components';

class TableEditMyKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: []
    };
    this.getColumns();
  }

  getColumns = async () =>{
    const { kpiReducers, dataMetrics } = this.props;
    const newColumns = [
      {
        title: 'KPI Subject',
        dataIndex: 'kpi',
        align: 'center',
        placeholder: 'Enter KPI Subject'
      },
      {
        title: 'Baseline',
        dataIndex: 'baseline',
        placeholder: 'Enter baseline'
      },
      {
        title: 'Weight (100%)',
        dataIndex: 'weight',
        placeholder: 'Enter KPI Weight',
        type: 'number'
      }
    ];
    await dataMetrics.map((itemMetric) => {
      const data = {
        title: itemMetric.label,
        dataIndex: itemMetric.label,
        placeholder: `Enter Level ${itemMetric.index}`,
        align: 'center',
        width: 200
      };
      newColumns.push(data);
    });
    newColumns.push({
      title: 'Feedback',
      dataIndex: 'feedback',
      placeholder: 'Feedback',
      editable: true
    });
    this.setState({
      columns: newColumns
    });
  }

  render() {
    const { dataSource } = this.props;
    const { columns } = this.state;
    const { handleChange, form } = this.props;
    const isLoading = (dataSource.length > 0 ) ? false: true;
    return (
      <div>
        {/* <Layout> */}
        <DataTable
          columns={columns}
          form={form}
          datasource={dataSource}
          handlechange={handleChange}
          loading={isLoading}
        />
        {/* </Layout> */}
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
)(TableEditMyKPI);

export default connectToComponent;
