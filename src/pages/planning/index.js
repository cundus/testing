import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import {
  Step, CreateKpi, DraftKpi, SubmitKpi, ReviewKpi
} from './components';
import { doGetKpiList } from '../../redux/actions/kpi';

class Planning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      loading: false
    };
    this.getKpi();
  }

  getKpi = async () => {
    const {
      step
    } = this.state;
    const {
      userReducers,
      history
    } = this.props;
    const { user } = userReducers.result;
    const { getKpiList } = this.props;
    // await getKpiList(user.userId);
    const { kpiReducers } = this.props;
    const { errMessage, dataKpi, status } = kpiReducers;
    if (status === 0) {
      if (dataKpi.length !== 0 && step === 0) {
        // this.stepChange(1);
      }
      this.setState({
        loading: false
      });
    } else {
      message.warning(`Sorry, ${errMessage}`);
      history.goBack();
    }
  }

  stepChange = (target, access) => {
    const { step } = this.state;
    if (step === 0) {
      if (target === 1) {
        this.setState({
          step: target
        });
      } else {
        message.warning('Sorry, You cannot be able to go');
      }
    } else if (step === 1) {
      if (target === 0) {
        this.setState({
          step: target
        });
      } else if (target === 2 && access) {
        this.setState({
          step: target
        });
      } else {
        message.warning('Sorry, You cannot be able to go');
      }
    } else {
      message.warning('Sorry, You cannot be able to back');
    }
  };

  render() {
    const { step, loading } = this.state;
    const { stepChange } = this;
    return (
      <div>
        {loading ? <center><Spin /></center> :
        <div>
          <Step step={step} stepChange={stepChange} />
          {/* eslint-disable-next-line no-nested-ternary */}
          {step === 0 ?
            <CreateKpi stepChange={stepChange} /> :
          // eslint-disable-next-line no-nested-ternary
          step === 1 ?
            <DraftKpi stepChange={stepChange} /> :
            step === 2 ?
              <SubmitKpi stepChange={stepChange} /> :
              step === 3 &&
              <ReviewKpi stepChange={stepChange} />}
        </div>}
      </div>
    );
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
