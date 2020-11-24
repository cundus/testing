import React, { Component } from "react";
import  { connect } from 'react-redux';
import  { Spin, Divider, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import TablePrevious from './table-previousKpi';
import globalStyle from "../../../styles/globalStyles";
import { actionGetAllMyTeam } from "../../../redux/actions/previousKpi";
import actionGetCurrStep from "../../../redux/actions/auth/actionGetCurrentStep";

const { Text } = Typography;

class PreviousKpi extends Component {
  componentDidMount() {
    const { doGetAllMyTeam } = this.props;
    doGetAllMyTeam();
    this.props.doGetCurrStep()
  }

  render() {
    const { previousKpiReducer } = this.props;
    return(
      <div style={globalStyle.contentContainer}>
        {
          !previousKpiReducer?.loadingMyTeam ?
            <div>
               <div>
                <Divider />
                <Text strong>My Team - Previous KPI</Text>
                <Divider />
              </div>
             <TablePrevious team={previousKpiReducer?.dataMyTeam || []} />
            </div>:
            <center>
              <Spin/>
            </center>
        }
      </div>
    );
  }
}

const mapDispatchtoProps = (dispatch) => ({
  doGetAllMyTeam: () => dispatch(actionGetAllMyTeam()),
  doGetCurrStep: () => dispatch(actionGetCurrStep())
});

const mapStateToProps = (state) => ({
  previousKpiReducer: state.previousKpiReducer
});
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(PreviousKpi);

export default withRouter(connectToComponent);
