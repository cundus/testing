import React, { Component } from 'react';
import { Divider, Typography } from 'antd';
import StepWizzard from './components/steps';
import { MappedRouter } from '../../routes/RouteGenerator';

// eslint-disable-next-line react/prefer-stateless-function
class Planning extends Component {
  render() {
    const { child, history } = this.props;
    return (
      <div>
        <StepWizzard history={history} />
        <Divider />
        <Typography>Create New KPI</Typography>
        <Divider />
        <MappedRouter routes={child} />
      </div>
    );
  }
}
export default Planning;
