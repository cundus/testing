import React, { Component } from "react";
import  { connect } from 'react-redux';
import  { Spin, Divider, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import TableAlignment from './table-alignmentList';
import globalStyle from "../../../styles/globalStyles";
import { getAlignmentSession } from "../../../redux/actions/alignment";

const { Text } = Typography;

class AlignmentList extends Component {
  componentDidMount() {
    const { doGetAlignment } = this.props;
    doGetAlignment();
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
});

const mapStateToProps = (state) => ({
  alignmentReducer: state.alignmentReducer
});
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(AlignmentList);

export default withRouter(connectToComponent);
