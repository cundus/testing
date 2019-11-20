import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import TablePlanningDetails from './table-detail-plan-kpi';

class PlanningDetail extends Component {
  componentDidMount() {
    console.log('detail', this.props.match.params);
  }

  render() {
    return(
      <div>
         <TablePlanningDetails />
      </div>
    );
  }
}

export default withRouter(PlanningDetail);
