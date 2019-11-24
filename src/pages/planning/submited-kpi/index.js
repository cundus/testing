import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TableSubmitedKPI from './table-submited-kpi';

const { Text } = Typography;

class SubmitedKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = () => {
    const { kpiReducers } = this.props;
    const { dataKpi } = kpiReducers;
    this.setState({
      dataSource: dataKpi
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <div>
          <Divider />
          <Text strong>Submit KPI </Text>
          <Text>Submit KPI to your Superior</Text>
          <Divider />
        </div>
        <TableSubmitedKPI dataSource={dataSource} />
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
)(SubmitedKPI);

export default withRouter(connectToComponent);

SubmitedKPI.propTypes = {
  kpiReducers: PropTypes.instanceOf(Object).isRequired
};
