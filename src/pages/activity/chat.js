import React, { Component } from 'react';
import {
  Button,
  Typography,
  Divider,
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
import globalStyle from '../../styles/globalStyles';
import apiUrl from '../../utils/apiUrl';

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
      GetActivityThreadChat,
      match
    } = this.props;
    const { params } = match;
    const { idActivity, idThread, userId } = params;
    await GetThreadActivity(idActivity, userId);
    await GetActivityThreadChat(idActivity, idThread);
    if (this.props.chat.feedbacks !== undefined) {
      this.setState({ load: false });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, match, doFeedback } = this.props;
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
    const { kpiName } = activityThread;
    const { name: chatName, fullName, feedbacks, userId } = chat;
    return (
      <div style={globalStyle.contentContainer}>
        <div>
          <Divider />
          <Text strong> Activity </Text>
          <Text>
            This is an Online activity feedback session with your supperior.
          </Text>
          <Divider />
          {
            (load) ?
              <center><Spin /></center> :
              <div>
                <center>
                  <Title level={4}>{`KPI : ${kpiName || ''}`}</Title>
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
                />&nbsp;&nbsp;
              <Text>Created By {fullName}</Text>
                <Divider />
                <ul style={{ textDecoration: 'none', listStyle: 'none' }}>
                  {feedbacks ?
                    feedbacks.map(d => (
                      <li>
                        <Card style={{ border: 'none' }}>
                          <div style={{display: 'flex'}}>
                          <Avatar
                            shape="circle"
                            size={'default'}
                            src={`${apiUrl()}/user/photo/${d.userId}`}
                            icon="user"
                            className="avatar"
                          />&nbsp;
                          <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Text strong level={1} style={{ display: 'inline', fontSize: '15px' }}>{d.feedback}</Text>
                            <span><Text level={1} style={{ display: 'inline', fontSize: '10px' }}>{d.fullName}</Text> - <Text strong level={1} style={{ display: 'inline', fontSize: '10px' }}>{d.creationDate}</Text></span>
                          </div></div>
                        </Card>
                      </li>

                    )) : <div></div>
                  }
                </ul>
              </div>
          }
        </div>
        <div>
          <Form.Item style={{ width: '40%' }}>
            {getFieldDecorator('comment', {
              rules: [{ required: true, message: 'please insert your chat' }],
            })(
              <TextArea
                autoSize={{ minRows: 5 }} placeholder={'What do you want to say ?'} />
            )}
          </Form.Item>
          <Button type="primary" onClick={this.handleSubmit} loading={loadingActivity} className="login-form-button">Send</Button>
        </div>
        <center>
          <Button onClick={() => this.props.history.goBack()} >Back</Button>
        </center>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activityThread: state.ActivityReducer,
  activityStatus: state.ActivityStatusReducer,
  chat: state.ActivityChatReducer
});

const mapDispatchToProps = (dispatch) => ({
  GetThreadActivity: (activityID, userId) => dispatch(getListActivity(activityID, userId)),
  GetActivityStatus: () => dispatch(getActivityStatus()),
  GetActivityThreadChat: (idActivity, idChat) => dispatch(getActivityThreadChat(idActivity, idChat)),
  doFeedback: (data) => dispatch(createChat(data))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default Form.create({})(withRouter(connectToComponent));

Chat.propTypes = {
  kpiReducer: PropTypes.instanceOf(Object).isRequired,
  doSavingKpi: PropTypes.func,
  getKpiList: PropTypes.func,
  submitNext: PropTypes.func,
  stepChange: PropTypes.func,
  form: PropTypes.instanceOf(Object)
};
