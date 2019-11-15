import React from "react";
import { Steps } from "antd";

const { Step } = Steps;

const StepWizzard = () => {
  return (
    <div>
      <Steps type="navigation" current={0}>
        <Step title="Fill KPI Form" description="This is a description." />
        <Step title="Save Draft" description="This is a description." />
        <Step title="Submit & Complete" description="This is a description." />
      </Steps>
    </div>
  );
};
export default StepWizzard;
