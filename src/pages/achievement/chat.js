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
import { getListActivity, getActivityStatus, getActivityThreadChat, createChat } from '../../redux/actions/activity';
import TableActivity from './tableActivity';
import FormSend from './component/form';
import globalStyle from '../../styles/globalStyles';
import apiUrl from '../../utils/apiUrl';

const { confirm } = Modal;
const { Text, Title } = Typography;
const { TextArea } = Input;


class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      visible: false,
      titleForm: '',
      activityStatus: [],
      load: true
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
    if ( this.props.chat.feedbacks !== undefined) {
      this.setState({ load: false });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, match, doFeedback, chat} = this.props;
    const { params } = match;
    const { idThread } = params;
    const { validateFields } = form;
    validateFields(async (err, values) => {
      if (!err) {
        const data = Object.assign(values, { activityId: idThread });
        this.setState({ load: true });
        await doFeedback(data);
        form.resetFields();
        await this.getAllData();
      }
    });
  };

  render() {
    const { load } = this.state;
    const { activityThread, chat, form } = this.props;
    const { getFieldDecorator } = form;
    const { loadingActivity } = activityThread;
    const { loadingActivityChat } = chat;
    const { kpiName } = activityThread;
    const { name: chatName, fullName, feedbacks, userId } = chat;
    return (
      <div style={globalStyle.contentContainer}>
        <div>
          <Divider />
          <Text strong> Activity</Text>
          <Text>
            This is an Online activity feedback session with your supperior.
          </Text>
          <Divider />
          {
            loadingActivityChat || loadingActivity || load ?
            <center><Spin/></center> :
            <div>
              <center>
                <Title level={4}>{`KPI : ${ kpiName|| ''}`}</Title>
                <br />
              </center>
              <Title level={4}>{chatName}</Title>
              <Avatar
                shape="circle"
                size={'large'}
                src={`${apiUrl()}/user/photo/${userId}`}
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
                      src={`${apiUrl()}/user/photo/${d.userId}`}
                      icon="user"
                      className="avatar"
                    />&nbsp;
                      <Text strong level={1} style={{display: 'inline', fontSize: '15px'}}>{d.feedback}</Text>
                      <br/>
                      <Text strong level={1} style={{display: 'inline', fontSize: '10px'}}>{d.fullName}</Text> - <Text strong level={1} style={{display: 'inline', fontSize: '10px'}}>{d.creationDate}</Text>
                      </Card>
                    </li>

                  )): <div></div>
                }
              </ul>
            </div>
          }
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('comment', {
              rules: [{ required: true, message: 'please insert your chat' }],
            })(
              <TextArea placeholder={'What do you want to say ?'}/>
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">Send</Button>
          </Form>
          <center>
          <Button onClick={()=> this.props.history.goBack()} >Back</Button>
          </center>
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
  GetActivityThreadChat: (idActivity, idChat) => dispatch(getActivityThreadChat(idActivity, idChat)),
  doFeedback: (data) => dispatch(createChat(data))
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
