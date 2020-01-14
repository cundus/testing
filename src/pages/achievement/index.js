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
import { getListAchivement } from '../../redux/actions/achievement';
import TableActivity from './tableActivity';
import FormSend from './component/form';

const { confirm } = Modal;
const { Text, Title } = Typography;
const { TextArea } = Input;

class Achievement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      visible: false,
      titleForm: '',
      activityStatus: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = async () => {
    const {
      GetThreadAchievement,
      match
    } = this.props;
    const { params } = match;
    const { idAchievement } = params;
    await GetThreadAchievement(idAchievement);
    const activities = this.props.activityThread.activities;
    let dataSource = [];
    if (activities && idAchievement ) {
      dataSource = activities.map((d => {
        return {
          ...d,
          lastMessage: (d.lastReply !== null)? d.lastReply.feedback: '',
          actions: {
            threadId: d.id,
            idAchievement
          }
        }
      }));
    }
    const statusList = Object.values(this.props.activityStatus);
    this.setState({dataSource, activityStatus: statusList, loading: false });
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
    const {loading } = this.state;
    const { kpiName } = activityThread;
    return (
      <div>
        <div>
          <Divider />
          <Text strong> Achievement</Text>
          <Text>
            This is an Online Achievement feedback session with your supperior.
          </Text>
          <Divider />
          <center>
            <Title level={4}>{`KPI : ${ kpiName|| ''}`}</Title>
            <br />
          </center>
        </div>
        {loading === false ?
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
  GetThreadAchievement: (Idachievement)=> dispatch(getListAchivement(Idachievement)),
  // GetActivityStatus: ()=> dispatch(getActivityStatus())
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Achievement);

export default Form.create({})(withRouter(connectToComponent));

Achievement.propTypes = {
  kpiReducers: PropTypes.instanceOf(Object).isRequired,
  doSavingKpi: PropTypes.func,
  getKpiList: PropTypes.func,
  submitNext: PropTypes.func,
  userReducers: PropTypes.instanceOf(Object),
  stepChange: PropTypes.func,
  form: PropTypes.instanceOf(Object)
};
