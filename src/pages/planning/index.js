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

  componentDidMount() {
    this.wizzardStatus();
  }

  wizzardStatus() {
    const { history } = this.props;
    const { pathname } = history.location;
    if (pathname === '/planning/kpi/create-planning') {
      this.setState({ currentWizzard: 0 });
    } else if (pathname === '/planning/kpi/draft-planning') {
      this.setState({ currentWizzard: 1 });
    } else {
      this.setState({ currentWizzard: 1 });
    }
  }

  render() {
    const { child } = this.props;
    const { currentWizzard } = this.state;
    return (
      <div>
        <StepWizzard currentWizzard={currentWizzard} />
        <Divider />
        <Typography>Create New KPI</Typography>
        <Divider />
        <MappedRouter routes={child} />
      </div>
    );
  }
}
export default Planning;
