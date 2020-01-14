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
        achievementName: '',
        achievementDate: '',
        kpiId: idActivity
      }
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = async () => {
    const {
      GetListAchivement,
      match
    } = this.props;
    const { params } = match;
    const { idAchievement } = params;
    await GetListAchivement(idAchievement);
    const activities = this.props.achievementThread.achievements;
    let dataSource = [];
    console.log('cie ', activities)
    if (activities.length > 0 && idAchievement) {
      dataSource = activities.map((d => {
        return {
          key: d.id,
          ...d,
          actions: {
            threadId: d.id,
            idAchievement
          }
        }
      }));
    }
    this.setState({dataSource, loading: false });
  };

  showModalForm = (key) => {
    const {
      GetThreadActivity,
      GetActivityStatus,
      match
    } = this.props;
    const { params } = match;
    const { idAchievement } = params;
    const { dataSource } = this.state;
    const data = [...dataSource];
    if (key) { // edit activity
      const newData = data.filter((item) => item.key === key);
      this.setState({
        dataModal: {
          activityId: newData[0].id,
          achievementName: newData[0].achievementName,
          achievementDate: newData[0].achievementDate,
          kpiId: idAchievement
        }
      });
    } else { // add activity
      this.setState({
        dataModal: {
          achievementName: '',
          achievementDate: '',
          kpiId: idAchievement
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
        if (dataModal.achievementId) {
          console.log('update', dataModal);
          // await UpdateActivity(dataModal);
        } else {
          console.log('create', dataModal);
          // await CreateActivity(dataModal);
        }
        // this.hideModalForm();
        // this.getAllData();
      }
    });
  }

  render() {
    const { achievementThread } = this.props;
    const { loadingActivity } = achievementThread;
    const {loading } = this.state;
    const { kpiName } = achievementThread;
    console.log('src', this.state.dataSource);
    return (
      <div>
        <div>
          <Divider />
          <Text strong> Achievement</Text>
          <Text>
            This is an Online achievement feedback session with your supperior.
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
  achievementThread: state.AchievementReducers
});

const mapDispatchToProps = (dispatch) => ({
  GetListAchivement: (idAchievement) => dispatch(getListAchivement(idAchievement))
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
