import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Result
} from 'antd';

const StepWizzard = (props) => {
  return (
    <div>
      <Result
        status="500"
        title="500"
        subTitle="Sorry, the server is wrong."
        // eslint-disable-next-line react/jsx-no-bind
        extra={<Button type="primary" onClick={() => props.history.push('/home')}>Back Home</Button>}
      />
    </div>
  );
};

export default withRouter(StepWizzard);
