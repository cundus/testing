import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StepWizzard from './components/steps';
import { MappedRouter } from '../../routes/RouteGenerator';
import { doGetLatestGoalKpi, doGetKpiList } from '../../redux/actions/kpi';

class Planning extends Component {
  componentDidMount() {
    this.getKPIData();
  }

  getKPIData = async (e) => {}

  render() {
    const { child, history } = this.props;
    return (
      <div>
        <StepWizzard history={history} />
        <MappedRouter routes={child} />
      </div>
    );
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
  history: PropTypes.instanceOf(Object).isRequired,
  child: PropTypes.instanceOf(Object).isRequired
};
