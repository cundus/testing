import React, { Component } from 'react';
import {
  Button,
  Modal,
  Typography,
  Divider,
  message,
  Input,
  Spin,
  Form,
  Avatar,
  Card
} from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getListActivity, getActivityStatus, getActivityThreadChat } from '../../redux/actions/activity';
import TableActivity from './tableActivity';
import FormSend from './component/form';

const { confirm } = Modal;
const { Text, Title } = Typography;
const { TextArea } = Input;
const { REACT_APP_API_URL } = process.env;


class Chat extends Component {
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
      GetActivityThreadChat,
      match
    } = this.props;
    const { params } = match;
    const { idActivity, idThread } = params;
    await GetThreadActivity(idActivity);
    await GetActivityThreadChat(idActivity, idThread);
    // const activities = this.props.activityThread.activities;
    // let dataSource = [];
    // if (activities.length > 0 ) {
    //   dataSource = activities.map((d => {
    //     return {
    //       ...d,
    //       lastMessage: (d.lastReply !== null)? d.lastReply.feedback: '',
    //       actions: 'test'
    //     }
    //   }));
    // }
    // const statusList = Object.values(this.props.activityStatus);
    // this.setState({dataSource, activityStatus: statusList});
  };

  render() {
    const { activityThread, chat } = this.props;
    const { loadingActivity } = activityThread;
    const { kpiName } = activityThread;
    const { name: chatName, fullName, feedbacks, userId } = chat;
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
            <Title level={4}>{chatName}</Title>
            <Avatar
              shape="circle"
              size={'large'}
              src={`${REACT_APP_API_URL}/user/photo/${userId}`}
              icon="user"
              className="avatar"
              type="rounded"
            />&nbsp;
            <Text>Created By {fullName}</Text>
          <Divider/>
          <br/>
          <ul style={{textDecoration: 'none', listStyle: 'none'}}>
            { feedbacks ?
              feedbacks.map(d => (
                <li>
                  <Card style={{border: 'none'}}>
                  <Avatar
                  shape="circle"
                  size={'default'}
                  src={`${REACT_APP_API_URL}/user/photo/${d.userId}`}
                  icon="user"
                  className="avatar"
                />&nbsp;
                  <Text strong level={1} style={{display: 'inline', fontSize: '15px'}}>{d.feedback}</Text>
                  <br/>
                  <Text strong level={1} style={{display: 'inline', fontSize: '10px'}}>{d.fullName}</Text>
                  - <Text strong level={1} style={{display: 'inline', fontSize: '10px'}}>{d.creationDate}</Text>
                  </Card>
                </li>

              )): <div></div>
            }
          </ul>
        </div>
        <Form>
          <TextArea placeholder={'What do you want to say ?'}/>
          <Button type={'primary'}>Send</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activityThread: state.ActivityReducers,
  activityStatus: state.ActivityStatusReducers,
  chat: state.ActivityChatReducers
});

const mapDispatchToProps = (dispatch) => ({
  GetThreadActivity: (activityID)=> dispatch(getListActivity(activityID)),
  GetActivityStatus: ()=> dispatch(getActivityStatus()),
  GetActivityThreadChat: (idActivity, idChat) => dispatch(getActivityThreadChat(idActivity, idChat))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default Form.create({})(withRouter(connectToComponent));

Chat.propTypes = {
  kpiReducers: PropTypes.instanceOf(Object).isRequired,
  doSavingKpi: PropTypes.func,
  getKpiList: PropTypes.func,
  submitNext: PropTypes.func,
  stepChange: PropTypes.func,
  form: PropTypes.instanceOf(Object)
};
