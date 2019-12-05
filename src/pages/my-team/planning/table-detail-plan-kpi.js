import React, { Component } from "react";
import { connect } from 'react-redux';

import { DataTable } from "../../../components";
import { connect } from 'react-redux';

class TableEditMyKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: []
    };
    this.getColumns();
  }

<<<<<<< HEAD
  getColumns = async (props) => {
    const { kpiReducers } = this.props;
    const { dataMetrics } = kpiReducers;
    this.columns = [
=======
  getColumns = async () =>{
    const { kpiReducers } = this.props;
    const { dataMetrics } = kpiReducers;
    const newColumns = [
>>>>>>> 105f5512a857f73333428cd3205de7f4c10d2316
      {
        title: 'KPI Subject',
        dataIndex: 'description',
        placeholder: 'Enter 2020 baseline'
      },
      {
        title: '2019 Baseline',
        dataIndex: 'baseline',
        placeholder: 'Enter 2019 baseline'
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
        placeholder: `Enter Level ${itemMetric.orderNo}`,
        align: 'center',
        width: 200
      };
<<<<<<< HEAD
      this.columns.push(data);
    });
    this.columns.push(
      {
        title: 'Feedback',
        dataIndex: 'feedback',
        placeholder: 'Feedback',
        editable: true
      });
=======
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
>>>>>>> 105f5512a857f73333428cd3205de7f4c10d2316
  }

  render() {
    const { dataSource } = this.props;
    const { columns } = this.state;
    const {handleChange } = this.props;
    const isLoading = (dataSource.length > 0 ) ? false: true;
    return (
      <div>
        {/* <Layout> */}
        <DataTable
          columns={columns}
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

<<<<<<< HEAD
export default connectToComponent;
=======
export default connectToComponent;
>>>>>>> 105f5512a857f73333428cd3205de7f4c10d2316
