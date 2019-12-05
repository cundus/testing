import React, { useState, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Steps,
  Icon,
  message
} from 'antd';
import { useMediaQuery } from 'react-responsive';

const { Step } = Steps;

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
      if (current === 1) {
        history.push('/planning/kpi/draft-planning');
      } else {
        message.warning('Sorry, You cannot be able to go');
      }
    } else if (wizzard === 1) {
      if (current === 0) {
        history.push('/planning/kpi/create-planning');
      } else {
        message.warning('Sorry, You cannot be able to go');
      }
    } else {
      message.warning('Sorry, You cannot be able to back');
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
