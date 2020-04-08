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
import { actionGetKPI } from '../../redux/actions';
import globalStyle from '../../styles/globalStyles';
import stepKpi from '../../utils/stepKpi';
import { Success } from '../../redux/status-code-type';

class Planning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: null,
      loading: true,
      error: false,
      access: false
    };
    this.getKpi();
  }

  getKpi = async () => {
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
    if (status === Success) {
      if (currentStep === stepKpi[0]) {
        if (dataKpi.length === 0) {
          // Fill KPI Form
          this.stepChange(0);
        } else {
          // Draft KPI
          this.stepChange(1);
        }
      } else {
        // Submitted KPI
        this.stepChange(2);
      }
    } else {
      // Error
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
    this.setState({
      step: target
    });
  }

  setAccess = (access) => {
    this.setState({
      access
    });
  }

  render() {
    const {
      step, loading, error, access
    } = this.state;
    const { stepChange, setAccess } = this;
    const { kpiReducers, history } = this.props;
    const {
      errMessage, status
    } = kpiReducers;
    if (!error) {
      if (step === 0) {
        return (
          <div style={{ ...globalStyle.contentContainer, padding: 0 }}>
            {loading ? <center><Spin /></center> :
            <div>
              <Step step={step} stepChange={stepChange} />
              <CreateKpi stepChange={stepChange} access={access} setAccess={setAccess} />
            </div>}
          </div>
        );
      } else if (step === 1) {
        return (
          <div style={{ ...globalStyle.contentContainer, padding: 0 }}>
            {loading ? <center><Spin /></center> :
            <div>
              <Step step={step} stepChange={stepChange} />
              <DraftKpi stepChange={stepChange} access={access} setAccess={setAccess} />
            </div>}
          </div>
        );
      } else {
        return (
          <div style={{ ...globalStyle.contentContainer, padding: 0 }}>
            {loading ? <center><Spin /></center> :
            <div>
              <Step step={step} stepChange={stepChange} />
              <SubmitKpi stepChange={stepChange} access={access} setAccess={setAccess} />
            </div>}
          </div>
        );
      }
    } else {
      return (
        <div style={globalStyle.contentContainer}>
          <Result
            status={'error'}
            title={status}
            subTitle={`Sorry, ${errMessage}`}
            // eslint-disable-next-line react/jsx-no-bind
            extra={<Button type="primary" onClick={() => history.push('/home')}>Back Home</Button>}
          />
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
  getKpiList: (id) => dispatch(actionGetKPI(id))
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
