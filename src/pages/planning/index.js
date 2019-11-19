import React, { Component } from 'react';
import { Divider, Typography } from 'antd';
import StepWizzard from './components/steps';
import { MappedRouter } from '../../routes/RouteGenerator';

class Planning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWizzard: 0
    };
  }

  onChangeCurrentWizzard = (currentWizzard) => {
    this.setState({ currentWizzard });
  };

  render() {
    const { currentWizzard } = this.state;
    return (
      <div>
        <StepWizzard currentWizzard={currentWizzard} />
        <Divider />
        <Typography>Create New KPI</Typography>
        <Divider />
        <MappedRouter routes={this.props.child} />
      </div>
    );
  }
}
export default Planning;
