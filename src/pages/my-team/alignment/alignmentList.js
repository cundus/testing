import React, { Component } from "react";
import  { connect } from 'react-redux';
import  { Spin, Divider, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import TableAlignment from './table-alignmentList';
import globalStyle from "../../../styles/globalStyles";
import { getAlignmentSession } from "../../../redux/actions/alignment";
import actionGetCurrStep from "../../../redux/actions/auth/actionGetCurrentStep";

const { Text } = Typography;

class AlignmentList extends Component {
  componentDidMount() {
    const { doGetAlignment, doGetCurrStep } = this.props;
    doGetAlignment();
    doGetCurrStep()
  }

  render() {
    const { alignmentReducer } = this.props;
    return(
      <div style={globalStyle.contentContainer}>
        {
          !alignmentReducer?.loading ?
            <div>
               <div>
                <Divider />
                <Text strong>Performance Review Alignment</Text>
                <Divider />
              </div>
             <TableAlignment team={alignmentReducer?.data || []} />
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
  doGetAlignment: () => dispatch(getAlignmentSession()),
  doGetCurrStep: () => dispatch(actionGetCurrStep())
});

const mapStateToProps = (state) => ({
  alignmentReducer: state.alignmentReducer
});
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(AlignmentList);

export default withRouter(connectToComponent);
