import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OnBehalf from "./home/index";
import LandingUserBehalf from "./landing/landing-user";
import LandingFormBehalf from "./landing/landing-form";
import "./onbehalf-styles.scss";

class IndexOnBehalf extends Component {
  componentDidMount() {
    if (!this.props.authReducer?.administrator) {
      this.props.history.replace("/")
    }
  }

  render() {
    const { onBehalf, authReducer } = this.props;
    if(!authReducer?.administrator) {
      return <div />
    }
    if (onBehalf?.userId && onBehalf?.form) {
      return <OnBehalf />;
    } else if (onBehalf?.userId) {
      return <LandingFormBehalf activeStep={1} />;
    }
    return <LandingUserBehalf activeStep={0} />;
  }
}
const mapStateToProps = (state) => ({
  onBehalf: state.onBehalf,
  authReducer: state.authReducer,
});
const connectToComponent = connect(mapStateToProps, null)(IndexOnBehalf);

export default withRouter(connectToComponent);
