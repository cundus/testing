import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import {
  Step, CreateKpi, DraftKpi, SubmitKpi
} from './components';

class Planning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
  }

  stepChange = (current) => {
    const { step } = this.state;
    if (step === 0) {
      if (current === 1) {
        this.setState({
          step: current
        });
      } else {
        message.warning('Sorry, You cannot be able to go');
      }
    } else if (step === 1) {
      if (current === 0) {
        this.setState({
          step: current
        });
      } else {
        message.warning('Sorry, You cannot be able to go');
      }
    } else {
      message.warning('Sorry, You cannot be able to back');
    }
  };

  render() {
    const { step } = this.state;
    const { stepChange } = this;
    return (
      <div>
        <Step step={step} stepChange={stepChange} />
        {/* eslint-disable-next-line no-nested-ternary */}
        {step === 0 ?
          <CreateKpi stepChange={stepChange} /> :
          step === 1 ?
            <DraftKpi stepChange={stepChange} /> :
            step === 2 &&
            <SubmitKpi stepChange={stepChange} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  kpiReducers: state.kpiReducers,
  userReducers: state.userReducers
});

const mapDispatchToProps = (dispatch) => ({
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Planning);

export default connectToComponent;
