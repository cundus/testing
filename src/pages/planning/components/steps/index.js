import React from "react";
import { Steps, Icon } from "antd";
// import { faFile } from "@fortawesome/free-solid-svg-icons";

const { Step } = Steps;

const StepWizzard = props => {
  const { currentWizzard } = props;

  return (
    <div>
      <Steps type="navigation" current={currentWizzard}>
        <Step
          title="Fill KPI Form"
          description="This is a description."
          icon={<Icon type="file-text" style={{ fontSize: 32 }} />}
        />
        <Step
          title="Save Draft"
          description="This is a description."
          icon={<Icon type="file-done" style={{ fontSize: 32 }} />}
        />
        <Step
          title="Submit & Complete"
          description="This is a description."
          icon={<Icon type="check" style={{ fontSize: 32 }} />}
        />
      </Steps>
    </div>
  );
};
export default StepWizzard;
