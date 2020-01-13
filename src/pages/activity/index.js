import React, { Component } from 'react';
import {
  Button,
  Modal,
  Typography,
  Divider,
  message,
  Input,
  Spin,
  Form
} from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getListActivity, getActivityStatus } from '../../redux/actions/activity';
import TableActivity from './tableActivity';


const { confirm } = Modal;
const { Text, Title } = Typography;
const { TextArea } = Input;

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = async () => {
    const {
      GetThreadActivity,
      GetActivityStatus,
      match
    } = this.props;
    const { params } = match;
    const { idActivity } = params;
    await GetThreadActivity(idActivity);
    await GetActivityStatus();
    const activities = this.props.activityThread.activities;
    let dataSource = [];
    if (activities.length > 0 ) {
      dataSource = activities.map((d => {
        return {
          ...d,
          lastMessage: (d.lastReply !== null)? d.lastReply.feedback: '',
          actions: 'test'
        }
      }));
    }
    this.setState({dataSource});
  };


  render() {
    const { activityThread } = this.props;
    const { loadingActivity } = activityThread;
    const { kpiName } = activityThread;
    console.log('mine ', this.state.dataSource)
    return (
      <div>
        <div>
          <Divider />
          <Text strong> Activity</Text>
          <Text>
            This is an Online activity feedback session with your supperior.
          </Text>
          <Divider />
          <center>
            <Title level={4}>{`KPI : ${ kpiName|| ''}`}</Title>
            <br />
          </center>
        </div>
        {!loadingActivity?
          <div>
            <TableActivity dataSource={this.state.dataSource} loading={!(this.state.dataSource.length > 0)} />
          </div> : <center><Spin /></center>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activityThread: state.ActivityReducers,
});

const mapDispatchToProps = (dispatch) => ({
  GetThreadActivity: (activityID)=> dispatch(getListActivity(activityID)),
  GetActivityStatus: ()=> dispatch(getActivityStatus())
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);

export default Form.create({})(withRouter(connectToComponent));

Activity.propTypes = {
  kpiReducers: PropTypes.instanceOf(Object).isRequired,
  doSavingKpi: PropTypes.func,
  getKpiList: PropTypes.func,
  submitNext: PropTypes.func,
  userReducers: PropTypes.instanceOf(Object),
  stepChange: PropTypes.func,
  form: PropTypes.instanceOf(Object)
};
