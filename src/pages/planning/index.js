import React, { Component } from "react";
import StepWizzard from "./components/steps";
import CreateKPI from "./create-kpi";

class Planning extends Component {
  state = {
    draftData: [],
    currentWizzard: 0
  };

  onChangeCurrentWizzard = currentWizzard => {
    this.setState({ currentWizzard });
  };

  handleSaveDraft = () => {};

  render() {
    const { currentWizzard } = this.state;
    return (
      <div>
        <StepWizzard currentWizzard={currentWizzard} />
        <CreateKPI />
      </div>
    );
  }
}
export default Planning;
