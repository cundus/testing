import { Button, Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// icons list
import CustomerIcon from "../../../assets/icons/customer.svg";
import FileIcon from "../../../assets/icons/file.svg";
import UsersIcon from "../../../assets/icons/users.svg";
import { doResetBehalf } from "../../../redux/actions/onBehalf";
import globalStyle from "../../../styles/globalStyles";
import "../onbehalf-styles.scss";


class OnBehalf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalShow: false,
    };
  }

  render() {
    const { onBehalf } = this.props;

    return (
      <>
        <div
          style={{
            ...globalStyle.contentContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Text strong style={{ marginRight: 20 }}>
            {onBehalf?.form?.formTitle}{" "}
          </Text>
          <Button type="primary" onClick={this.props.resetBehalf}>
            Change
          </Button>
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
              <Button
                shape="round"
                className="homeBtn  purpleBtn"
                style={{ fontWeight: "bold" }}
              >
                Create KPI
              </Button>
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
              <Button
                shape="round"
                className="homeBtn  pinkBtn"
                style={{ fontWeight: "bold" }}
              >
                View Feedback Session
              </Button>
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
              <Button
                shape="round"
                className="homeBtn  yellowBtn"
                style={{ fontWeight: "bold" }}
              >
                View My Final Performance
              </Button>
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
