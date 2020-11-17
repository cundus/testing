import React, { Component } from "react";
import  { connect } from 'react-redux';
import  { Spin, Divider, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import TableAlignment from './table-alignmentList';
import globalStyle from "../../../styles/globalStyles";
import { actionGetAllMyTeam } from "../../../redux/actions/previousKpi";

const { Text } = Typography;

class AlignmentList extends Component {
  componentDidMount() {
    const { doGetAllMyTeam } = this.props;
    doGetAllMyTeam();
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
             <TableAlignment team={previousKpiReducer?.dataMyTeam || []} />
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
  doGetAllMyTeam: () => dispatch(actionGetAllMyTeam())
});

const mapStateToProps = (state) => ({
  previousKpiReducer: state.previousKpiReducer
});
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(AlignmentList);

export default withRouter(connectToComponent);
