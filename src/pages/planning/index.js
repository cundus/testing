import React, { Component } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import StepWizzard from './components/steps';
import { MappedRouter } from '../../routes/RouteGenerator';
import { doGetLatestGoalKpi, doGetKpiList } from '../../redux/actions/kpi';

// eslint-disable-next-line react/prefer-stateless-function
class Planning extends Component {
  componentDidMount() {
    this.getAllData();
  }

  getAllData = async () => {
    const {
      getLatestGoalKpi,
      getKpiList,
      userReducers
    } = this.props;
    await getKpiList(userReducers.result.user.userId);
    await getLatestGoalKpi();
  };

  render() {
    const { child, history } = this.props;
    const { kpiReducers } = this.props;
    const { loading } = kpiReducers;
    if (loading) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      );
    } else {
      return (
        <div>
          <StepWizzard history={history} />
          <MappedRouter routes={child} />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  kpiReducers: state.kpiReducers,
  userReducers: state.userReducers
});

const mapDispatchToProps = (dispatch) => ({
  getLatestGoalKpi: () => dispatch(doGetLatestGoalKpi()),
  getKpiList: (id) => dispatch(doGetKpiList(id))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Planning);

export default connectToComponent;
