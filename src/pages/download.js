import React, { Component } from "react";
import  { connect } from 'react-redux';
import  { Result, Button, Icon, Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import globalStyle from "../styles/globalStyles";
import { doGetAlignmentDownload, doGetAlignmentDownloadPermission } from "../redux/actions/alignment";
import { Success } from "../redux/status-code-type";
import { toast } from 'react-toastify'

class Download extends Component {
  async componentDidMount() {
    const { doDownloadAlignmentPermission, history } = this.props;
    await doDownloadAlignmentPermission()
    const { alignmentReducer } = this.props;
    if ((alignmentReducer?.statusDownloadPermission === Success) &&
    alignmentReducer?.dataDownloadPermission) {
    } else {
      history.push('/')
    }
  }

  handleDownloadAlignment = async() => {
    const { doDownloadAlignment } = this.props;
    await doDownloadAlignment()
    const { alignmentReducer } = this.props;
    if (alignmentReducer?.statusDownload === Success) {
      toast.success('Success, file was downloaded')
    } else if (alignmentReducer?.statusDownload === 2026) {
      toast.warn(`Sorry, you're unable to download this file. Please contact your administrator`)
    } else {
      toast.warn(`Sorry, ${alignmentReducer?.messageDownloadPermission}`)
    }
  }
  render() {
    const { alignmentReducer } = this.props;
    return(
      <div style={globalStyle.contentContainer}>
        {alignmentReducer?.loadingDownloadPermission ?
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Spin />
        </div> :
        <Result 
          icon={<Icon type={"download"} />}
          title="Download current Performance Data"
          extra={
            <Button
              type="primary"
              loading={alignmentReducer?.loadingDownload}
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
  doDownloadAlignmentPermission: () => dispatch(doGetAlignmentDownloadPermission()),
});

const mapStateToProps = (state) => ({
  alignmentReducer: state.alignmentReducer
});
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(Download);

export default withRouter(connectToComponent);
