import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Row, Col, Button } from "antd";
import PropTypes from "prop-types";
import "../onbehalf-styles.scss";

// icons list
import CustomerIcon from "../../../assets/icons/customer.svg";
import FileIcon from "../../../assets/icons/file.svg";
import UsersIcon from "../../../assets/icons/users.svg";
import globalStyle from "../../../styles/globalStyles";
import {
  menuAppraisalAllow,
  menuMonitoringAllow,
} from "../../../utils/stepKpi";
import { doResetBehalf } from "../../../redux/actions/onBehalf";
import Text from "antd/lib/typography/Text";

class OnBehalf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalShow: false,
    };
  }

  render() {
    const { authReducer, onBehalf } = this.props;
    const isMonitoring = menuMonitoringAllow.includes(authReducer?.currentStep);
    const isAppraisal = menuAppraisalAllow.includes(authReducer?.currentStep);

    console.log(onBehalf);
    return (
      <>
        <div
          style={{
            ...globalStyle.contentContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Text strong style={{marginRight: 20}}>{onBehalf?.form?.formTitle} </Text>
          <Button type="primary" onClick={this.props.resetBehalf}>Change</Button>
        </div>
        <div
          style={{
            ...globalStyle.contentContainer,
            textAlign: "center",
            marginTop: 20,
            minHeight: "80vh",
          }}
        >
          <Row style={{ paddingTop: 50, paddingBottom: 50 }}>
            <Col xl={24 / 3} lg={24 / 3} md={24 / 3} xs={24} className="grid">
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
                  style={{ fontWeight: "bold" }}
                >
                  Create KPI
                </Button>
              </Link>
            </Col>
            <Col xl={24 / 3} lg={24 / 3} md={24 / 3} xs={24} className="grid">
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
                  disabled={!isMonitoring}
                  style={{ fontWeight: "bold" }}
                >
                  View Feedback Session
                </Button>
              </Link>
            </Col>
            <Col xl={24 / 3} lg={24 / 3} md={24 / 3} xs={24} className="grid">
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
                  disabled={!isAppraisal}
                  style={{ fontWeight: "bold" }}
                >
                  View My Final Performance
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.activeDirectoryReducer,
  authReducer: state.authReducer,
  user: state.userReducer,
  step: state.userKpiStateReducer,
  onBehalf: state.onBehalf,
});
const mapDispatchToProps = (dispatch) => ({
  resetBehalf: () => dispatch(doResetBehalf()),
});
const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(OnBehalf);

export default withRouter(connectToComponent);

OnBehalf.propTypes = {
  authReducer: PropTypes.instanceOf(Object),
};
