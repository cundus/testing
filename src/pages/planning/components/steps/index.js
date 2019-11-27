import React, { useState, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Steps,
  Icon,
  message,
  Modal
} from 'antd';
import { useMediaQuery } from 'react-responsive';

const { Step } = Steps;
const { confirm } = Modal;

const StepWizzard = (props) => {
  const [wizzard, setWizzard] = useState(0);
  const { history } = props;
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
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
      if (current === 0) {
        confirm({
          title: 'Are you sure?',
          async onOk() {
            history.push('/planning/kpi/create-planning');
          },
          onCancel() {}
        });
      } else {
        message.warning('You cannot be able to go');
      }
    } else {
      message.warning('You cannot be able to back');
    }
  };

  return (
    <div>
      <Steps
        type="navigation"
        current={wizzard}
        style={{ display: 'flex' }}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onWizzardChange}
      >
        <Step
          title={isDesktopOrLaptop && 'Fill KPI Form'}
          icon={<Icon type="file-text" style={{ fontSize: 32 }} />}
        />
        <Step
          title={isDesktopOrLaptop && 'Save Draft'}
          icon={<Icon type="file-done" style={{ fontSize: 32 }} />}
        />
        <Step
          title={isDesktopOrLaptop && 'Submit & Complete'}
          icon={<Icon type="check" style={{ fontSize: 32 }} />}
        />
      </Steps>
    </div>
  );
};

export default withRouter(StepWizzard);
