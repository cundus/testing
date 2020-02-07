import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Steps,
  Icon
} from 'antd';
import { useMediaQuery } from 'react-responsive';
import globalStyle from '../../../../styles/globalStyles';

const { Step } = Steps;

const StepWizzard = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  const { step /* stepChange */ } = props;
  return (
    <div style={{
      ...globalStyle.contentContainer,
      paddingBottom: 0,
      borderRadius: 0,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5
    }}
    >
      <Steps
        type="navigation"
        current={step}
        // style={{ display: 'flex' }}
        // eslint-disable-next-line react/jsx-no-bind
        // onChange={stepChange}
      >
        <Step
          title="Fill KPI Form"
          icon={<Icon type="file-text" style={{ fontSize: 32 }} />}
        />
        <Step
          title="Save Draft"
          icon={<Icon type="file-done" style={{ fontSize: 32 }} />}
        />
        <Step
          title="Submitted"
          icon={<Icon type="check" style={{ fontSize: 32 }} />}
        />
      </Steps>
    </div>
  );
};

export default withRouter(StepWizzard);
