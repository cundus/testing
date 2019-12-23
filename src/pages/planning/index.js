import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
 message, Spin, Result, Button
} from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Step, CreateKpi, DraftKpi, SubmitKpi, ReviewKpi
} from './components';
import { doGetKpiList } from '../../redux/actions/kpi';

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
      let feedback = false;
      if (dataKpi.length !== 0 && step === 0) {
        if (currentStep === 'Manager Goal Review') {
          this.stepChange(2, true);
        } else {
          // eslint-disable-next-line array-callback-return
          await dataKpi.map((itemKpi) => {
            if (itemKpi.othersRatingComments.id || currentStep !== 'Emp Goal Setting') {
              if (feedback === false) {
                this.stepChange(3, true);
                feedback = true;
              }
            }
          });
          if (feedback === false) {
            this.stepChange(1);
          }
        }
      } else {
        this.stepChange(0);
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

  stepChange = (target, access) => {
    const { step } = this.state;
    if (target !== null) {
      if (step === 0 || step === 1) {
        if (target === 0) {
          this.setState({
            step: target
          });
        } else if (target === 1) {
          this.setState({
            step: target
          });
        } else if (target === 2 && access) {
          this.setState({
            step: target
          });
        } else if (target === 3 && access) {
          this.setState({
            step: target
          });
        } else {
          message.warning('Sorry, You can\'t go to next step');
        }
      } else if (step === 3) {
        if (target === 1 && access) {
          this.setState({
            step: target
          });
        } else {
          message.warning('Sorry, You can\'t go back to previous step');
        }
      } else if (step === 2) {
        if (target === 3) {
          message.warning('Sorry, You can\'t go to next step');
        } else {
          message.warning('Sorry, You can\'t go back to previous step');
        }
      }
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
        <Result
          status={status}
          title={status}
          subTitle={`Sorry, ${errMessage}`}
          // eslint-disable-next-line react/jsx-no-bind
          extra={<Button type="primary" onClick={() => history.push('/home')}>Back Home</Button>}
        />
      );
    } else {
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
