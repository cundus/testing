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
import FormSend from './component/form';

const { confirm } = Modal;
const { Text, Title } = Typography;
const { TextArea } = Input;

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      visible: false,
      titleForm: '',
      activityStatus: []
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
    await GetActivityStatus();
    await GetThreadActivity(idActivity);
    const activities = this.props.activityThread.activities;
    let dataSource = [];
    if (activities.length > 0 && idActivity ) {
      dataSource = activities.map((d => {
        return {
          ...d,
          lastMessage: (d.lastReply !== null)? d.lastReply.feedback: '',
          actions: {
            threadId: d.id,
            idActivity
          }
        }
      }));
    }
    const statusList = Object.values(this.props.activityStatus);
    this.setState({dataSource, activityStatus: statusList});
  };

  showModalForm = () => {
    this.setState({ visible: true, titleForm: 'Add Activity'});
  };

  hideModalForm = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { activityThread } = this.props;
    const { loadingActivity } = activityThread;
    const { kpiName } = activityThread;
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
        {kpiName?
          <div>
            <TableActivity dataSource={this.state.dataSource} loading={false}  statusActivity={this.state.activityStatus}/>
             <center>
              <Button type="primary" onClick={this.showModalForm.bind(this)}>Add Activity</Button>&nbsp;
              <Button type="default" onClick={()=> this.props.history.goBack()} >Back</Button>
              <FormSend visible={this.state.visible} titleForm={this.state.titleForm} hide={this.hideModalForm} statusActivity={this.state.activityStatus}/>
            </center>
          </div> : <center><Spin /></center>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activityThread: state.ActivityReducers,
  activityStatus: state.ActivityStatusReducers
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
