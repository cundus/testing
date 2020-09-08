import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';
import './home-styles.scss';
import { GetInfoUser, GetUserKpiState } from '../../redux/actions/user';

// icons list
import collaborationIcon from '../../assets/icons/collaboration.svg';
import CustomerIcon from '../../assets/icons/customer.svg';
import FileIcon from '../../assets/icons/file.svg';
import UsersIcon from '../../assets/icons/users.svg';
import globalStyle from '../../styles/globalStyles';

class Home extends Component {
  async componentDidMount() {
    // await this.props.GetMyKpiState();
  }

  render() {
    const { authReducer } = this.props;
    const step = authReducer?.currentStep;
    const isAllowToMonitor =
      step === 'Manager Goal Review' || step === 'Emp Goal Setting';
    const isManager = authReducer?.manager;
    let size = 6;
    if (!isManager) {
      size = 8;
    }
    return (
      <div style={{ ...globalStyle.contentContainer, textAlign: 'center' }}>
        <Row style={{ paddingTop: 50, paddingBottom: 50 }}>
          <Col xl={size} lg={size} md={size} xs={24} className="grid">
            <br />
            <br />
            <img
              alt="plannning"
              src={FileIcon}
              className="purple"
              style={{ width: 120, height: 120 }}
            />
            <h1>Planning</h1>
            <p className="qoute-text">Create New KPI or Cascade</p>
            <Link to="planning">
              <Button
                shape="round"
                className="homeBtn  purpleBtn"
                style={{ fontWeight: 'bold' }}
              >
                Create KPI
              </Button>
            </Link>
          </Col>
          <Col xl={size} lg={size} md={size} xs={24} className="grid">
            <br />
            <br />
            <img
              alt="monitoring"
              src={UsersIcon}
              className="pink"
              style={{ width: 120, height: 120 }}
            />
            <h1>Monitoring</h1>
            <p className="qoute-text">Feedback session with Superior</p>
            <Link to="/monitoring">
              <Button
                shape="round"
                className="homeBtn  pinkBtn"
                disabled={isAllowToMonitor}
                style={{ fontWeight: 'bold' }}
              >
                View Feedback Session
              </Button>
            </Link>
          </Col>
          <Col xl={6} lg={6} md={6} xs={24} className="grid">
            <br />
            <br />
            <img
              alt="appraisal"
              src={CustomerIcon}
              className="yellow"
              style={{ width: 120, height: 120 }}
            />
            <h1>Appraisal</h1>
            <p className="qoute-text">View your final performance rating</p>
            <Link to="/appraisal">
              <Button
                shape="round"
                className="homeBtn  yellowBtn"
                disabled={isAllowToMonitor}
                style={{ fontWeight: 'bold' }}
              >
                View My Final Performance
              </Button>
            </Link>
          </Col>
          <Col
            xl={size}
            lg={size}
            md={size}
            xs={24}
            className="grid"
            style={{ display: isManager ? '' : 'none' }}
          >
            <br />
            <br />
            <img
              alt="team"
              src={collaborationIcon}
              className="green"
              style={{ width: 120, height: 120 }}
            />
            <h1>My Team</h1>
            <p className="qoute-text">View your team&apos;s performance</p>
            <Link to="/my-team/planning">
              <Button
                className="homeBtn  greenBtn"
                shape="round"
                style={{ fontWeight: 'bold' }}
              >
                View My Team Performance
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapDispatchtoProps = (dispatch) => ({
  GetInfoUser: (token) => dispatch(GetInfoUser(token)),
  GetMyKpiState: () => dispatch(GetUserKpiState())
});
const mapStateToProps = (state) => ({
  auth: state.activeDirectoryReducer,
  authReducer: state.authReducer,
  user: state.userReducer,
  step: state.userKpiStateReducers
});
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(Home);

export default withRouter(connectToComponent);

Home.propTypes = {
  authReducer: PropTypes.instanceOf(Object)
};
