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
    const { kpiReducers, dataMetrics, editableFeedback } = this.props;
    const newColumns = [
      {
        title: 'KPI Subject',
        dataIndex: 'kpi',
        align: 'center',
        width: 200,
        placeholder: 'Enter KPI Subject'
      },
      {
        title: 'Baseline',
        dataIndex: 'baseline',
        align: 'center',
        placeholder: 'Enter baseline',
        width: 200
      },
      {
        title: 'Weight (100%)',
        dataIndex: 'weight',
        align: 'center',
        placeholder: 'Enter KPI Weight',
        type: 'number',
        width: 90
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
      align: 'center',
      placeholder: 'Feedback',
      editable: editableFeedback,
      width: 200,
    });
    this.setState({
      columns: newColumns
    });
  }

  render() {
    const { dataSource } = this.props;
    const { columns } = this.state;
    const { handleChange, form, } = this.props;
    return (
      <div>
        {/* <Layout> */}
        <DataTable
          columns={columns}
          form={form}
          datasource={dataSource}
          handlechange={handleChange}
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
