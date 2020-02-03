import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
 message, Spin, Result, Button
} from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Step, CreateKpi, DraftKpi, SubmitKpi
} from './components';
import { doGetKpiList } from '../../redux/actions/kpi';
import globalStyle from '../../styles/globalStyles';

class Planning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      loading: true,
      error: false
    };
    this.getKpi();
  }

  getKpi = async () => {
    const { step } = this.state;
    const {
      userReducers
    } = this.props;
    const { user } = userReducers.result;
    const { getKpiList } = this.props;
    await getKpiList(user.userId);
    const { kpiReducers } = this.props;
    const {
      errMessage, dataKpi, status, currentStep
    } = kpiReducers;
    if (status === 0) {
      if (dataKpi.length === 0 && currentStep === 'Emp Goal Setting') {
        this.stepChange(0);
      } else if (dataKpi.length !== 0 && currentStep === 'Emp Goal Setting') {
        this.stepChange(1);
      } else {
        this.stepChange(2);
      }
    } else {
      this.stepChange(null);
      message.warning(`Sorry, ${errMessage}`);
      this.setState({
        error: true
      });
    }
    this.setState({
      loading: false
    });
  }

  stepChange = (target) => {
    if (target !== null) {
      if (target === 1) {
        this.setState({
          step: target
      });
    }
  };

  render() {
    const {
      step, loading, error
    } = this.state;
    const { stepChange } = this;
    const { kpiReducers, history } = this.props;
    const {
      errMessage, status
    } = kpiReducers;
    if (error) {
      return (
        <div style={globalStyle.contentContainer}>
          <Result
            status={status}
            title={status}
            subTitle={`Sorry, ${errMessage}`}
            // eslint-disable-next-line react/jsx-no-bind
            extra={<Button type="primary" onClick={() => history.push('/home')}>Back Home</Button>}
          />
        </div>
      );
    } else {
      return (
        <div style={{ ...globalStyle.contentContainer, padding: 0 }}>
          {loading ? <center><Spin /></center> :
          <div>
            <Step step={step} stepChange={stepChange} />
            {/* eslint-disable-next-line no-nested-ternary */}
            {step === 0 ?
              <CreateKpi stepChange={stepChange} /> :
          // eslint-disable-next-line no-nested-ternary
          step === 1 ?
            <DraftKpi stepChange={stepChange} /> :
            step === 2 &&
              <SubmitKpi stepChange={stepChange} />}
          </div>}
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
  getKpiList: (id) => dispatch(doGetKpiList(id))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Planning);

export default withRouter(connectToComponent);

Planning.propTypes = {
  kpiReducers: PropTypes.instanceOf(Object),
  userReducers: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
  getKpiList: PropTypes.func
};
