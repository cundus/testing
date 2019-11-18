import React, { Component } from "react";
import { Divider, Typography } from "antd";
import StepWizzard from "./components/steps";
import CreateKPI from "./create-kpi";

class Planning extends Component {
  state = {
    currentWizzard: 0
  };

  onChangeCurrentWizzard = currentWizzard => {
    this.setState({ currentWizzard });
  };
  render() {
    const { currentWizzard } = this.state;
    return (
      <div>
        <StepWizzard currentWizzard={currentWizzard} />
        <Divider />
        <Typography>Create New KPI</Typography>
        <Divider />
        <CreateKPI />
      </div>
    );
  }
}
export default Planning;
