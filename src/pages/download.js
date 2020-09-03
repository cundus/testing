import React, { Component } from "react";
import  { connect } from 'react-redux';
import  { Result, Button, Typography, Icon, message, Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import globalStyle from "../styles/globalStyles";
import { doGetAlignmentDownload, doGetAlignmentDownloadPermission } from "../redux/actions/alignment";
import { Success } from "../redux/status-code-type";

const { Text } = Typography;

class Download extends Component {
  async componentDidMount() {
    const { doDownloadAlignmentPermission, history } = this.props;
    await doDownloadAlignmentPermission()
    const { alignmentReducers } = this.props;
    if ((alignmentReducers?.statusDownloadPermission === Success) &&
    alignmentReducers?.dataDownloadPermission) {
    } else {
      history.push('/')
    }
  }

  handleDownloadAlignment = async() => {
    const { doDownloadAlignment } = this.props;
    await doDownloadAlignment()
    const { alignmentReducers } = this.props;
    if (alignmentReducers?.statusDownload === Success) {
      message.success('Success, file was downloaded')
    } else {
      message.warning(`Sorry, you're unable to download this file, contact pmgm helpdesk`)
    }
  }
  render() {
    const { alignmentReducers } = this.props;
    return(
      <div style={globalStyle.contentContainer}>
        {alignmentReducers?.loadingDownloadPermission ?
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Spin />
        </div> :
        <Result 
          icon={<Icon type={"download"} />}
          title="Download current Performance Data"
          extra={
            <Button
              type="primary"
              loading={alignmentReducers?.loadingDownload}
              onClick={this.handleDownloadAlignment}
            >
              Download
            </Button>}
        />}
      </div>
    );
  }
}

const mapDispatchtoProps = (dispatch) => ({
  doDownloadAlignment: () => dispatch(doGetAlignmentDownload()),
  doDownloadAlignmentPermission: () => dispatch(doGetAlignmentDownloadPermission())
});

const mapStateToProps = (state) => ({
  alignmentReducers: state.alignmentReducers
});
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(Download);

export default withRouter(connectToComponent);
