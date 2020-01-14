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
import { getListActivity, getActivityStatus, createActivity, updateActivity } from '../../redux/actions/activity';
import TableActivity from './tableActivity';
import FormSend from './component/form';

const { confirm } = Modal;
const { Text, Title } = Typography;
const { TextArea } = Input;

class Activity extends Component {
  constructor(props) {
    super(props);
    const {
      match
    } = this.props;
    const { params } = match;
    const { idActivity } = params;
    this.state = {
      dataSource: [],
      visible: false,
      titleForm: '',
      activityStatus: [],
      loading: true,
      dataModal: {
        name: '',
        status: '',
        kpiId: idActivity
      }
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
    if (activities && idActivity) {
      dataSource = activities.map((d => {
        return {
          key: d.id,
          ...d,
          lastMessage: (d.lastReply !== null) ? d.lastReply.feedback : '',
          actions: {
            threadId: d.id,
            idActivity
          }
        }
      }));
    }
    const statusList = Object.values(this.props.activityStatus);
    this.setState({dataSource, activityStatus: statusList, loading: false });
  };

  showModalForm = (key) => {
    const {
      GetThreadActivity,
      GetActivityStatus,
      match
    } = this.props;
    const { params } = match;
    const { idActivity } = params;
    const { dataSource } = this.state;
    const data = [...dataSource];
    if (key) { // edit activity
      const newData = data.filter((item) => item.key === key);
      this.setState({
        dataModal: {
          activityId: newData[0].id,
          name: newData[0].name,
          status: newData[0].status,
          kpiId: idActivity
        }
      });
    } else { // add activity
      this.setState({
        dataModal: {
          name: '',
          status: '',
          kpiId: idActivity
        }
      });
    }
    this.setState({ visible: true, titleForm: 'Add Activity'});
  };

  hideModalForm = e => {
    this.props.form.resetFields();
    this.setState({
      visible: false
    });
  };

  handleModalChangeForm = (data) => {
    this.setState({
      dataModal: data
    });
  }

  handleModalSubmit = () => {
    const { form, CreateActivity, UpdateActivity } = this.props;
    const { dataModal } = this.state;
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        if (dataModal.activityId) {
          await UpdateActivity(dataModal);
        } else {
          await CreateActivity(dataModal);
        }
        this.hideModalForm();
        this.getAllData();
      }
    });
  }

  render() {
    const { activityThread } = this.props;
    const { loadingActivity } = activityThread;
    const {loading } = this.state;
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
            <Title level={4}>{`KPI : ${kpiName || ''}`}</Title>
            <br />
          </center>
        </div>
        {loading === false ?
          <div>
            <TableActivity
              dataSource={this.state.dataSource}
              loading={false}
              showModalForm={this.showModalForm}
              statusActivity={this.state.activityStatus}
            />
            <center>
              <Button type="primary" onClick={() => this.showModalForm()}>Add Activity</Button>&nbsp;
              <Button type="default" onClick={()=> this.props.history.goBack()} >Back</Button>
              <FormSend
                form={this.props.form}
                handleModalSubmit={this.handleModalSubmit}
                handleModalChangeForm={this.handleModalChangeForm}
                visible={this.state.visible}
                dataModal={this.state.dataModal}
                titleForm={this.state.titleForm}
                hideModalForm={this.hideModalForm}
                statusActivity={this.state.activityStatus}
                confirmLoading={this.state.loading}
              />
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
  GetThreadActivity: (activityID) => dispatch(getListActivity(activityID)),
  GetActivityStatus: () => dispatch(getActivityStatus()),
  CreateActivity: (data) => dispatch(createActivity(data)),
  UpdateActivity: (data) => dispatch(updateActivity(data))
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
