import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import StepWizzard from './components/steps';
import { MappedRouter } from '../../routes/RouteGenerator';
import { doGetLatestGoalKpi, doGetKpiList } from '../../redux/actions/kpi';

class Planning extends Component {
  componentDidMount() {
    this.getKPIData();
  }

  getKPIData = async (e) => {
    const {
      getLatestGoalKpi,
      getKpiList,
      userReducers
      // history
    } = this.props;
    const { user } = userReducers.result;
    await getKpiList(user.userId);
    // const { kpiReducers } = this.props;
    // const { page } = kpiReducers;
    // if (page === 'create-kpi') {
    //   history.push('/planning/kpi/draft-planning');
    // }
    getLatestGoalKpi();
  }

  render() {
    const { child, history, kpiReducers } = this.props;
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

Planning.propTypes = {
  getLatestGoalKpi: PropTypes.func,
  getKpiList: PropTypes.func,
  userReducers: PropTypes.instanceOf(Object),
  kpiReducers: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  child: PropTypes.instanceOf(Object).isRequired
};
