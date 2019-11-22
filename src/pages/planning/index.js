import React, { Component } from "react";
import { Divider, Typography, Spin } from "antd";
import { connect } from "react-redux";
import StepWizzard from "./components/steps";
import { MappedRouter } from "../../routes/RouteGenerator";
import { doGetLatestGoalKpi } from "../../redux/actions/kpi";

const {Text} = Typography;
// eslint-disable-next-line react/prefer-stateless-function
class Planning extends Component {
  componentDidMount() {
    this.getLatestGoal();
  }

  getLatestGoal = async () => {
    const { doGetLatestGoal } = this.props;
    await doGetLatestGoal();
  };

  render() {
    const { child, history } = this.props;
    const { kpiReducers } = this.props;
    const { getGoal } = kpiReducers;
    if (getGoal) {
      return (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      );
    } else {
      return (
        <div>
          <StepWizzard history={history} />
          <Divider />
          <Text strong>Create New KPI </Text>
          <Text>Please complete the following form. You can create your own KPI or cascade from your Superior's KPI.</Text>
          <Divider />
          <MappedRouter routes={child} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  kpiReducers: state.kpiReducers
});

const mapDispatchToProps = dispatch => ({
  doGetLatestGoal: data => dispatch(doGetLatestGoalKpi(data))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Planning);

export default connectToComponent;
