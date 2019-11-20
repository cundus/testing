import React, { useState, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Steps,
  Icon,
  message,
  Modal
} from 'antd';

const { Step } = Steps;
const {confirm} = Modal;

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

  const onWizzardChange = (current) => {
    // setWizzard(current);
    if (wizzard === 0) {
      message.warning('Please fill form first');
    } else if (wizzard === 1) {
      confirm({
        title: 'Are u sure?',
        async onOk() {
          if (current === 0) {
            history.push('/planning/kpi/create-planning');
          } else {
            history.push('/planning/kpi/submit-planning');
          }
        },
        onCancel() {}
      });
    } else {
      message.warning('U cannot be able to back');
    }
  };

  return (
    <div>
      <Steps type="navigation" current={wizzard} onChange={onWizzardChange}>
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

export default withRouter(StepWizzard);
