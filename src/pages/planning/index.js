import React, { Component } from "react";
import StepWizzard from "./components/steps";
import CreateKPI from "./create-kpi";


class Planning extends Component {
  handleSaveDraft = () => {};
  render() {
    return (
      <div>
        <StepWizzard />
        <CreateKPI/>
      </div>
    );
  }
}
export default Planning;
