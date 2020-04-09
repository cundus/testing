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
import { doGetKpiList } from '../../redux/actions/kpi';

import TableActivity from './tableActivity';
import FormSend from './component/form';
import globalStyle from '../../styles/globalStyles';
import stepKpi from '../../utils/stepKpi';

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
      isSuperior: false,
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
      userReducers,
      doGetKpiList,
      match
    } = this.props;
    const { params } = match;
    const { idActivity, userId } = params;
    await GetActivityStatus();
    await GetThreadActivity(idActivity, userId);
    const isSuperior = (userId !== userReducers.result.user.userId)
    if (isSuperior) {
       await doGetKpiList(userId);
    }
    const activities = this.props.activityThread.activities;
    let dataSource = [];
    if (activities && idActivity) {
      dataSource = activities.map((d => {
        return {
          key: d.id,
          ...d,
          status: d.status[0].toUpperCase() + d.status.slice(1),
          lastMessage: (d.lastReply !== null) ? d.lastReply.feedback : '',
          actions: {
            threadId: d.id,
            idActivity
          }
        }
      }));
    }
    const statusList = Object.values(this.props.activityStatus);
    this.setState({dataSource, activityStatus: statusList, loading: false, isSuperior });
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
        },
        titleForm: 'Edit Activity'
      });
    } else { // add activity
      this.setState({
        dataModal: {
          name: '',
          status: '',
          kpiId: idActivity
        },
        titleForm: 'Add Activity'
      });
    }
    this.setState({ visible: true});
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
    const { activityThread, match, kpiReducers } = this.props;
    const { loadingActivity } = activityThread;
    const {loading } = this.state;
    const { kpiName } = activityThread;
    const { params } =  match;
    const { userId } = params;
    let stafname = '';
    if (this.state.isSuperior === true) {
      stafname = `${kpiReducers.user.firstName} ${kpiReducers.user.lastName}`
    }
    return (
      <div style={globalStyle.contentContainer}>
        <div>
          <Divider />
          <Text strong> Activity </Text>
          <Text>
            This is an Online activity feedback session with your supperior.
          </Text>
          <Divider />
          <center>
    <Title level={4}>{`KPI : ${kpiName || ''}`} {this.state.isSuperior === true ? `- ${stafname}` : ''}</Title>
            <br />
          </center>
        </div>
        {loading === false ?
          <div>
            <TableActivity
              dataSource={this.state.dataSource}
              loading={false}
              editable={this.props.step.currentStep === stepKpi[2]}
              showModalForm={this.showModalForm}
              statusActivity={this.state.activityStatus}
              userId={userId}
              isSuperior={this.state.isSuperior}
            />
            <center>
              {
               !this.state.isSuperior && (this.props.step.currentStep === stepKpi[2])?
                <Button type="primary" onClick={() => this.showModalForm()}>Add Activity</Button> :
                <div></div>
              }
              &nbsp;
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
  activityStatus: state.ActivityStatusReducers,
  userReducers: state.userReducers,
  kpiReducers: state.kpiReducers,
  step: state.userKpiStateReducers
});

const mapDispatchToProps = (dispatch) => ({
  GetThreadActivity: (activityID, userId) => dispatch(getListActivity(activityID, userId)),
  GetActivityStatus: () => dispatch(getActivityStatus()),
  CreateActivity: (data) => dispatch(createActivity(data)),
  UpdateActivity: (data) => dispatch(updateActivity(data)),
  doGetKpiList: (id) => dispatch(doGetKpiList(id))
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
