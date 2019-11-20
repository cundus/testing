import React, { Component } from "react";
import TablePlanning from './table-plan';
import { withRouter } from 'react-router-dom';

class Planning extends Component {
  componentDidMount() {
    console.log('plan', this.props);
  }

  render() {
    return(
      <div>
        <TablePlanning />
      </div>
    );
  }
}

export default withRouter(Planning);
