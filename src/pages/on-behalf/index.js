import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OnBehalf from "./home/index";
import LandingUserBehalf from "./landing/landing-user";
import LandingFormBehalf from "./landing/landing-form";
import "./onbehalf-styles.scss";

class IndexOnBehalf extends Component {
  render() {
    const { onBehalf } = this.props;
    if (onBehalf?.userId && onBehalf?.form) {
      return <OnBehalf />;
    } else if (onBehalf?.userId) {
      return <LandingFormBehalf />;
    }
    return <LandingUserBehalf />;
  }
}
const mapStateToProps = (state) => ({
  onBehalf: state.onBehalf,
});
const connectToComponent = connect(mapStateToProps, null)(IndexOnBehalf);

export default withRouter(connectToComponent);
