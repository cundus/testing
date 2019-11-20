import React, { useState, useMemo } from 'react';
import { Steps, Icon } from 'antd';

const { Step } = Steps;

const StepWizzard = (props) => {
  const [wizzard, setWizzard] = useState(0);
  const { history } = props;
  const { pathname } = history.location;

  useMemo(() => {
    if (pathname === '/planning/kpi/create-planning') {
      setWizzard(0);
    } else if (pathname === '/planning/kpi/draft-planning') {
      setWizzard(1);
    } else {
      setWizzard(2);
    }
  }, [pathname]);

  return (
    <div>
      <Steps type="navigation" current={wizzard}>
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
